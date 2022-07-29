const realType = (v: any) => {
  return Object.prototype.toString.call(v).slice(8, -1);
};

const isString = (v: any): v is string => {
  return typeof v === "string";
};

const isObject = (v: any): v is object => {
  return realType(v) === "Object";
};

const isArray = <T = any>(v: any): v is T[] => {
  return Array.isArray(v);
};

const isFunction = (v: any): v is Function => {
  return typeof v === "function";
};

const isNumber = (v: any): v is number => {
  return typeof v === "number";
};

const isBoolean = (v: any): v is boolean => {
  return typeof v === "boolean";
};

const isFloat = (v: any): v is number => {
  return isNumber(v) && !isInteger(v);
};

const isInteger = (v: any): v is number => {
  return isNumber(v) && v % 1 === 0;
};

const isEmpty = (v: any) => {
  if (isArray(v)) {
    return v.length === 0;
  }
  if (isObject(v)) {
    return Object.keys(v).length === 0;
  }
  throw new Error("isEmpty only accept array or object");
};

export {
  isInteger,
  isArray,
  isBoolean,
  isEmpty,
  isFloat,
  isFunction,
  isNumber,
  isObject,
  isString,
  realType,
};
