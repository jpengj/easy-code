import { describe, it, expect } from "vitest";
import { resolveRef } from "../src/openapi";

describe("Openapi tests", () => {
  it("resolveRef test", () => {
    expect(
      resolveRef("#/components/schemas/User", {
        components: {
          schemas: { User: {} },
        },
      })
    ).toEqual({});

    expect(
      resolveRef("#/components/schemas", {
        components: {
          schemas: { User: undefined },
        },
      })
    ).toEqual({ User: undefined });

    expect(
      resolveRef("#/badValue1/badValue2/badValue3", {
        components: {
          schemas: { User: undefined },
        },
      })
    ).toEqual(undefined);
  });
});
