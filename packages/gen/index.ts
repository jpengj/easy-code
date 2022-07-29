import ts, { factory } from "typescript";

type createArrowFunction = (
  pparameters: readonly ts.ParameterDeclaration[],
  type: ts.TypeNode | undefined,
  body: ts.ConciseBody
) => ts.ArrowFunction;

type createVariableDeclaration = (
  identifier: ts.Identifier,
  initializer?: ts.Expression | undefined
) => ts.VariableDeclaration;

type createExportStatement = () => void
