import { Ctx } from "src/adjustmentsMachine";
import { getSelectItems } from "./getSelectItems";
import { NavigationMenuItem } from "src/navigationTypes";
import { expect } from "@jest/globals";

// Define some mocks NavigationMenuItem for the test
export const navigationMenuParent: NavigationMenuItem = {
  id: "parent",
  heading: "Test",
  type: "chapter",
  childrenIds: ["child1", "child2"],
};

export const navigationMenuChild1: NavigationMenuItem = {
  id: "child1",
  heading: "Test",
  type: "page",
  parentId: "parent",
  childrenIds: [],
};

export const navigationMenuChild2: NavigationMenuItem = {
  id: "child2",
  heading: "Test",
  type: "page",
  parentId: "parent",
  childrenIds: ["grandchild1", "grandchild2"],
};

export const navigationMenuGrandchild1: NavigationMenuItem = {
  id: "grandchild1",
  heading: "Test",
  type: "page-panel",
  parentId: "child2",
  childrenIds: [],
};

export const navigationMenuGrandchild2: NavigationMenuItem = {
  id: "grandchild2",
  heading: "Test",
  type: "page-panel",
  parentId: "child2",
  childrenIds: [],
};

describe("getSelectItems", () => {
  it("should return a set of items when deselectedIds is initially empty", () => {
    const context: Ctx = {
      deselectedIds: new Set(),
      navigationMenu: {
        parent: navigationMenuParent,
      },
    };

    const result = getSelectItems("parent", context);

    expect(result).toEqual(new Set());
  });

  it("should return a set of items when deselectedIds is not empty", () => {
    const context: Ctx = {
      deselectedIds: new Set(["child1", "child2"]),
      navigationMenu: {
        parent: navigationMenuParent,
      },
    };

    const result = getSelectItems("parent", context);

    expect(result).toEqual(new Set());
  });

  it("should handle nested children and parents correctly", () => {
    const context: Ctx = {
      deselectedIds: new Set([
        "parent",
        "child1",
        "child2",
        "grandchild1",
        "grandchild2",
      ]),
      navigationMenu: {
        parent: navigationMenuParent,
        child2: navigationMenuChild2,
        child1: navigationMenuChild1,
        grandchild2: navigationMenuGrandchild1,
        grandchild1: navigationMenuGrandchild2,
      },
    };

    const result = getSelectItems("parent", context);
    expect(result).toEqual(new Set());
  });
});
