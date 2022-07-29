import { OpenAPIObject, PathItemObject, OperationObject } from "openapi3-ts";

type FunctionFilter = (path: string[]) => boolean;

const pathItemToMethods = (configure: PathItemObject) => {
  return [
    configure.get,
    configure.post,
    configure.put,
    configure.delete,
    configure.patch,
    configure.options,
    configure.head,
    configure.trace,
  ].filter(Boolean) as OperationObject[];
};

const generator = (
  spec: OpenAPIObject,
  isValidPath: FunctionFilter,
  isValidTag: FunctionFilter
) => {
  const apis = [];
  const beans = [];

  for (const [path, configure] of Object.entries(spec.paths)) {
    pathItemToMethods(configure).forEach((operate) => {
      if (isValidPath([path]) || isValidTag(operate.tags ?? [])) {
        apis.push(`${path} ${operate.operationId}`);
        beans.push(`${operate.operationId}`);
      }
    });
  }
};

export { generator, FunctionFilter };
