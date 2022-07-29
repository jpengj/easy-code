import { describe, it, expect } from "vitest";
import {
  ApiNameType,
  createApiNameGen,
  createFilterFn,
  createPathTypeName,
} from "../src/configure";

describe("Configure tests", () => {
  it("Filter fn should valid.", () => {
    const isValid = createFilterFn(
      ["hello", /^world/, (path: string) => path === "HelloWorld"],
      ["a", /^b/, (path: string) => path === "c"]
    );

    expect(isValid("hello")).toBeTruthy();
    expect(isValid("worlds")).toBeTruthy();
    expect(isValid("HelloWorld")).toBeTruthy();
    expect(isValid("a")).toBeFalsy();
    expect(isValid("bcd")).toBeFalsy();
    expect(isValid("c")).toBeFalsy();
  });

  it("Should priority excludes.", () => {
    const isValid = createFilterFn(["hello", "world"], ["hello"]);

    expect(isValid("hello")).toBeFalsy();
    expect(isValid("world")).toBeTruthy();
  });

  it("Should create path type name", () => {
    expect(createPathTypeName("/hello/world", "get")).toBe("getHelloWorld");

    expect(createPathTypeName("/list/{detailId}", "get")).toBe(
      "getListByDetailId"
    );

    expect(createPathTypeName("/record/{type}/{status}", "get")).toBe(
      "getRecordByTypeWithStatus"
    );
  });

  it("CreateApiNameGen priority test.", () => {
    const nameCreator = createApiNameGen(
      ApiNameType.operationId,
      new Set<string>(),
      {
        "/hello": () => "getHello",
      }
    );

    // First use rewrite map
    expect(
      nameCreator({
        operationId: "hello",
        path: "/hello",
        method: "get",
      })
    ).toBe("getHello");

    // Then use operationId
    expect(
      nameCreator({
        operationId: "hello",
        path: "/hello/world",
        method: "get",
      })
    ).toBe("hello");

    // Then use path
    expect(
      nameCreator({
        operationId: "hello",
        path: "/hello/world",
        method: "get",
      })
    ).toBe("getHelloWorld");
  });
});
