import ts from "typescript";

// 实现自有类型接口, 与openapi类型脱钩，便于支持其他协议
interface ArrayTypeDescription {
  name: string;
  type: 'array';
  items: TypeDescription
  required: boolean;
  description?: string;
}

interface ObjectDetails {
  [key: string]: TypeDescription
}

interface ObjectTypeDescription {
  name: string;
  type: 'object';
  required: boolean;
  properties: ObjectDetails
  description?: string;
}

// 这里不处理 ref 类型，ref 应交由外部处理
interface BaseTypeDescription {
  name: string;
  required: boolean;
  type: 'number' | 'string' | 'boolean' | 'any';
  description?: string;
}

type TypeDescription = BaseTypeDescription | ObjectTypeDescription | ArrayTypeDescription;

type CreateInterface = (description: TypeDescription) => ts.InterfaceDeclaration

const createInterface: CreateInterface = (description) => {
  throw "not implemented";
}

export {
  createInterface,
}
