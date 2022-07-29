import {
  factory,
  SyntaxKind,
  NodeFlags,
  ParameterDeclaration,
  VariableDeclaration,
  TypeNode,
  ConciseBody,
  Identifier,
  Expression,
} from "typescript";

const createExportStatement = factory.createVariableStatement.bind(null, [
  factory.createModifier(SyntaxKind.ExportKeyword),
]);

const createConstVariableDeclaration = (declaration: VariableDeclaration) => {
  return factory.createVariableDeclarationList([declaration], NodeFlags.Const);
};

const createVariableDeclaration = (
  identifier: Identifier,
  initializer?: Expression | undefined
) => {
  return factory.createVariableDeclaration(
    identifier,
    undefined,
    undefined,
    initializer
  );
};

const createArrowFunction = (
  parameters: readonly ParameterDeclaration[],
  type: TypeNode | undefined,
  body: ConciseBody
) => {
  return factory.createArrowFunction(
    undefined,
    undefined,
    parameters,
    type,
    factory.createToken(SyntaxKind.EqualsGreaterThanToken),
    body
  );
};

const createConstArrowFunctionDeclaration = (
  identifier: Identifier,
  parameters: ParameterDeclaration[],
  body: ConciseBody,
  type?: TypeNode
) => {
  return createConstVariableDeclaration(
    createVariableDeclaration(
      identifier,
      createArrowFunction(parameters, type, body)
    )
  );
};

export {
  createArrowFunction,
  createExportStatement,
  createVariableDeclaration,
  createConstVariableDeclaration,
  createConstArrowFunctionDeclaration,
}