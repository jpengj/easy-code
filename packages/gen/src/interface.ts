import ts, { factory } from "typescript";

const {
  createInterfaceDeclaration,
  createIdentifier,
  createPropertySignature,
  createKeywordTypeNode,
} = factory;

interface Property {
  label: string;
  type: string;
  comment?: string;
}

// 生成 interface
const makeInterface = (
  name: string,
  properties: Property[]
): ts.InterfaceDeclaration => {
  return createInterfaceDeclaration(
    undefined,
    undefined,
    createIdentifier(name),
    undefined,
    undefined,
    properties.map((i) =>
      createPropertySignature(
        undefined,
        createIdentifier(i.label),
        undefined,
        // TODO: 支持多种类型
        createKeywordTypeNode(parseSyntaxKind(i.type))
      )
    )
  );
};

const parseSyntaxKind = (type: string): ts.KeywordTypeSyntaxKind => {
  switch (type) {
    case "number":
      return ts.SyntaxKind.NumberKeyword;
    case "string":
      return ts.SyntaxKind.StringKeyword;
    case "boolean":
      return ts.SyntaxKind.BooleanKeyword;
    default:
      return ts.SyntaxKind.AnyKeyword;
  }
};

export { makeInterface };
