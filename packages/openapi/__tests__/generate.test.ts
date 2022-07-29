import { describe, it, expect } from "vitest";
import { createSourceFile, ScriptTarget } from "typescript";

describe("Generate tests", () => {
  it("test", () => {
    const ret = createSourceFile("a.ts", `
      export const a = 1;
      export const b = 2;
    `, ScriptTarget.Latest);
    console.log(ret)
  });
});
