import { makeApi } from "../src/api";
import { createCodeString } from "../src/utils";
import petStore from "./fixtures/pet-store.json";
import { describe, it } from "vitest";
import { factory, SyntaxKind, Node } from "typescript";

describe("Api tests", () => {
  it("should build", () => {
    console.log(
      createCodeString(
        factory.createArrowFunction(
          undefined,
          [
            factory.createTypeParameterDeclaration(
              undefined,
              factory.createIdentifier("T"),
              undefined,
              factory.createKeywordTypeNode(SyntaxKind.AnyKeyword),
            ),
          ],
          [
            factory.createParameterDeclaration(
              undefined,
              undefined,
              undefined,
              "a",
              undefined,
              undefined
            ),
          ],
          undefined,
          factory.createToken(SyntaxKind.EqualsGreaterThanToken),
          factory.createBlock([factory.createReturnStatement()], false)
        )
      )
    );
    // console.log(
    //   createCodeString(
    //     makeApi(petStore.paths["/pets"] as PathItemObject, "/pets", "get")
    //   )
    // );
  });
});


