import {
  navigationMenuParent,
  navigationMenuChild2,
} from "./getSelectItems.test";
import { Ctx } from "src/adjustmentsMachine";
import { getDeselectItems } from "./getDeselectItems";

describe("getDeselectItems", () => {
  it("should return a set of items when deselectedIds is initially empty", () => {
    const context: Ctx = {
      deselectedIds: new Set(),
      navigationMenu: {
        parent: { ...navigationMenuParent },
      },
    };

    const result = getDeselectItems("parent", context);
    expect(result).toEqual(new Set(["child1", "child2", "parent"]));
  });

  it("should not deselect parent when all children are deselected if of type page", () => {
    const context: Ctx = {
      deselectedIds: new Set(["child2"]),
      navigationMenu: {
        parent: { ...navigationMenuParent, type: "page" },
      },
    };

    const result = getDeselectItems("child1", context);
    expect(result).toEqual(new Set(["child1", "child2"]));
  });

  it("should return a set of items when deselectedIds is not empty", () => {
    const context: Ctx = {
      deselectedIds: new Set(["child1"]),
      navigationMenu: {
        parent: { ...navigationMenuParent },
      },
    };

    const result = getDeselectItems("parent", context);

    expect(result).toEqual(new Set(["child1", "child2", "parent"]));
  });

  it("should handle nested children and parents correctly", () => {
    const context: Ctx = {
      deselectedIds: new Set(["child1"]),
      navigationMenu: {
        parent: { ...navigationMenuParent },
        child2: {
          ...navigationMenuChild2,
        },
      },
    };

    const result = getDeselectItems("parent", context);

    expect(result).toEqual(
      new Set(["child1", "child2", "grandchild1", "grandchild2", "parent"])
    );
  });
});
