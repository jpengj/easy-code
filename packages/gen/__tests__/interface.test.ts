import { makeInterface } from "../src/interface";
import { createCodeString } from "../src/utils";
import { describe, it, expect } from 'vitest'

describe("Model tests", () => {
  it("Should make interface code string", () => {
    const properties = [
      { label: "id", type: "number" },
      { label: "name", type: "string" },
      { label: "age", type: "number" },
      { label: "disabled", type: "boolean" },
    ];
    const result = makeInterface("User", properties);

    expect(
      createCodeString(result)
    ).toBe(
      `interface User {\r\n    id: number;\r\n    name: string;\r\n    age: number;\r\n    disabled: boolean;\r\n}`
    );
  });
});
