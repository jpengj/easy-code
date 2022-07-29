const pathToCamelCase = (path: string) => {
  return path.replace(/\/(\w)/g, (_, $1) => $1.toUpperCase());
};

export { pathToCamelCase };
