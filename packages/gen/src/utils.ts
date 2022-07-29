import {
  createPrinter,
  createSourceFile,
  EmitHint,
  Node,
  ScriptTarget,
} from "typescript";

const createCodeString = (node: Node) => {
  const printer = createPrinter();
  return printer.printNode(
    EmitHint.Unspecified,
    node,
    createSourceFile("", "", ScriptTarget.ESNext)
  );
};

const writeAsFile = (node: Node, path: string) => {

}

export { createCodeString, writeAsFile };
