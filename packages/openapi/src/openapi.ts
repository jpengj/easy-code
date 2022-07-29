import { OpenAPIObject, OperationObject, PathItemObject } from "openapi3-ts";
import fs from "fs";
import {
  Configure,
  FilterFn,
  normalizeConfigure,
  Operation,
  resolveDocument,
  RewriteFn,
} from "./configure";
import { generateApi } from "./generate/generate";

type OpenapiConfig = Exclude<Configure, "document"> & {
  /**
   * openapi 文档路径，url 或者 json
   */
  document: string | OpenAPIObject;
};


const createOpenApi = async (config: OpenapiConfig) => {
  if (!canUseDir(config.dir)) {
    return;
  }
  const document = await resolveDocument<OpenAPIObject>(config.document);

  const { pathFilter, tagFilter, createApiName, isValidHeader } =
    normalizeConfigure(config);

  const { apiPool } = makeOpenApiConfig(
    document,
    tagFilter,
    pathFilter,
    createApiName
  );

  const refResolver = resolveRef.bind(null, document);

  generateApi(apiPool, { isValidHeader, refResolver });
};

// 验证填入的路径是否合法
const canUseDir = async (path: string) => {
  const stat = await fs.promises.lstat(path);
  return stat.isDirectory();
};

const supportedMethods = ["get", "post", "put", "delete", "head", "patch"];

// 组装所有支持的请求方法描述
const getOperations = (pathItem: PathItemObject) => {
  const operations: { [key: string]: OperationObject } = {};
  for (const method of supportedMethods) {
    if (pathItem[method]) {
      operations[method] = pathItem[method];
    }
  }
  return operations;
};

// 用 `#/someKeyA/someKeyB/someKeyC` 查找对象值
const resolveRef = <T = any>(root: any, ref: string): T | undefined => {
  const paths = ref.split("/");
  let ret = root;
  while (paths.length > 1 && ret) {
    paths.shift();
    ret = ret[paths[0]];
  }
  return ret;
};

const makeOpenApiConfig = (
  document: OpenAPIObject,
  isValidTag: FilterFn,
  isValidPath: FilterFn,
  createApiName: RewriteFn
) => {
  const apiPool: Operation[] = [];

  for (const [path, pathItem] of Object.entries(document.paths)) {
    // 获取所有能支持的请求方法
    const operations = getOperations(pathItem);
    for (const [method, operation] of Object.entries(operations)) {
      // 一个接口可能对应多个tag, 如果有一个tag 匹配, 则认为是有效的
      if (operation.tags?.some(isValidTag) || isValidPath(path)) {
        const normalizedOperation = { method, path, ...operation };
        const name = createApiName(normalizedOperation);
        apiPool.push({ ...normalizedOperation, name });
      }
    }
  }

  return {
    apiPool,
  };
};

export { resolveRef };

export default createOpenApi;
