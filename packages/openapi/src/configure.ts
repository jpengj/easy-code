import { isString, isArray, isEmpty, pathToCamelCase } from "@easy-code/shared";

type RewriteFn = (operation: Partial<Operation>) => string;

type Rewrite = string | RewriteFn;

type FilterFn = (path: string) => boolean;
type Filter = string | RegExp | FilterFn;

interface Operation {
  path: string;
  method: string;
  name: string;
  [key: string]: any
};

interface RewriteMapping {
  [key: string]: Rewrite;
}

// api 命名规则类型
enum ApiNameType {
  operationId = 1,
  methodWithPath,
}

type DisableHeaderOptions = string[];

interface Configure {
  /**
   * 文档路径
   */
  document: string;
  /**
   * 是否把header中的参数传递到 methods 中
   * 如 Authentication、Content-Type 等
   * true表示全部在header中，false表示禁用
   * 如传入字符串，则表示，禁用传递的选项
   * 默认为true
   */
  headersInMethods: boolean | DisableHeaderOptions;
  /**
   * 生成的文件存放路径
   */
  dir: string;
  /**
   * 对包含的元素进行筛选，如未传入则为所有
   * tag 和 path 是或的关系，如果有一个为true, 则包含
   */
  includesTags?: Filter[];
  includesPaths?: Filter[];
  /**
   * 排除包含的tag, 优先级高于 includesTags
   * tag 和 path 是或的关系，如果有一个为true, 则排除
   */
  excludesTags?: Filter[];
  excludesPaths?: Filter[];
  /**
   * 针对制定的path，手动重写api名称
   */
  rewriteApiNames?: RewriteMapping;

  /**
   * methodWithPath 使用 请求方式 + 路径 的方式命名 api，这种方式不会重复，但
   * 可读性会低于 operationId (假设接口端注解规范)
   *
   * 如果没有指定，默认为 methodWithPath
   * 如果设置为 ApiNameType.operationId, 如果遇到重复时或为空时，将会报错处理。
   * 这时需要配合 rewriteApiNames 使用
   */
  apiNameType?: ApiNameType;
}

const resolveHttpDocument = async <T>(url: string) => {
  const response = await fetch(url);
  const json = await response.json();
  return json as T;
};

// 把url类型文档解析成对象
const resolveDocument = <T>(document: T | string) => {
  if (isString(document)) {
    return resolveHttpDocument<T>(document);
  }
  return document;
};


// 把筛选器转换为函数式筛选器
const mapFilterToFns = (filters: Filter[]) => {
  return filters.map((pattern) => {
    if (isString(pattern)) {
      return (path: string) => path === pattern;
    }
    if (pattern instanceof RegExp) {
      return pattern.test.bind(pattern);
    }
    return pattern;
  });
};

// 把筛选器includes和excludes组合成一个函数，直接调用即可完成筛选
const createFilterFn = (includes: Filter[] = [], excludes: Filter[] = []) => {
  const includesFns = mapFilterToFns(includes);
  const excludesFns = mapFilterToFns(excludes);
  // 如果为空，则不验证是否包含
  const uncheckedIncludes = isEmpty(includes);

  // 是不是每一个都不匹配，才表示不包含
  const isExclude = (path: string) => {
    return excludesFns.every((exclude) => !exclude(path));
  };

  // 是不是有一个匹配，才表示包含
  const isInclude = (path: string) => {
    return uncheckedIncludes || includesFns.some((include) => include(path));
  };

  return (path: string) => {
    return isExclude(path) ?? isInclude(path);
  };
};

const createReplacer = (addonBefore: string) => {
  return (_: string, [first, ...other]: string) => {
    return addonBefore + first.toUpperCase() + other.join("");
  };
};

// 匹配路径中的插槽参数，可匹配多个
const SLOT_PATTERN = /\/{(\w+)}/;

// 根据 `configure.apiNameType` 对方法进行命令。
const createPathTypeName = (path: string, methods: string) => {
  // To camel case
  let name = methods.toLowerCase() + pathToCamelCase(path);
  if (SLOT_PATTERN.test(path)) {
    name = name.replace(SLOT_PATTERN, createReplacer("By"));

    while (SLOT_PATTERN.test(name)) {
      name = name.replace(SLOT_PATTERN, createReplacer("With"));
    }
  }
  return name;
};

const createApiNameGen = (
  nameType: ApiNameType,
  recordSet: Set<string>,
  rewriteMap: RewriteMapping
): RewriteFn => {
  return (operation) => {
    // rewriteMap 优先级最高
    if (rewriteMap[operation.path!]) {
      const rewrite = rewriteMap[operation.path!];
      const rewriteName = isString(rewrite) ? rewrite : rewrite(operation);
      // 如果重复了
      if (recordSet.has(rewriteName)) {
        throw new Error(
          `Config.rewriteMap.${operation.path} generated value ${rewriteName} is duplicated`
        );
      }
      recordSet.add(rewriteName);
      return rewriteName;
    }
    // 如果为operationId命名模式，将会在重复的时候转而使用 path type
    if (
      nameType === ApiNameType.operationId &&
      operation.operationId != null &&
      !recordSet.has(operation.operationId)
    ) {
      recordSet.add(operation.operationId);
      return operation.operationId;
    }
    return createPathTypeName(operation.path!, operation.method!);
  };
};

const isValidHeader = (
  headersInMethods: boolean | string[],
  option: string
) => {
  if (isArray(headersInMethods)) {
    return !headersInMethods.includes(option);
  }
  return headersInMethods;
};

// 把颗粒度较高的参数组合成多个函数，降低之后使用复杂度
const normalizeConfigure = (conf: Configure) => {
  // 用于验证是否有重复的operationId
  const recordSet = new Set<string>();
  conf.apiNameType ??= ApiNameType.methodWithPath;
  conf.rewriteApiNames ??= {};

  const pathFilter = createFilterFn(conf.includesPaths, conf.excludesPaths);
  const tagFilter = createFilterFn(conf.includesTags, conf.excludesTags);

  const createApiName = createApiNameGen(
    conf.apiNameType,
    recordSet,
    conf.rewriteApiNames
  );

  return {
    pathFilter,
    tagFilter,
    createApiName,
    isValidHeader: isValidHeader.bind(null, conf.headersInMethods),
  };
};

export { FilterFn, Configure, RewriteFn, Operation };
export {
  createFilterFn,
  createPathTypeName,
  createApiNameGen,
  resolveDocument,
  resolveHttpDocument,
  normalizeConfigure,
  ApiNameType,
};
