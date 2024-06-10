import { Ctx } from "src/adjustmentsMachine";
import { isEveryChildOfParentToggled } from "./isEveryChildOfParentToggled";
import { NavigationMenuItem } from "src/navigationTypes";

// Define a mock NavigationMenuItem for the test
export const navigationMenu: NavigationMenuItem = {
  id: "parent",
  heading: "Test",
  type: "chapter",
  parentId: "1",
  path: "/some-path",
  index: "1",
  childrenIds: [],
};

describe("isEveryChildOfParentToggled", () => {
  it("should return true when all children are deselected", () => {
    const context: Ctx = {
      deselectedIds: new Set(["child1", "child2", "child3"]),
      navigationMenu: {
        parent: {
          ...navigationMenu,
          childrenIds: ["child1", "child2", "child3"],
        },
      },
    };

    expect(isEveryChildOfParentToggled("parent", context)).toBe(true);
  });

  it("should return false when some children are not deselected", () => {
    const context: Ctx = {
      deselectedIds: new Set(["child1", "child2"]),
      navigationMenu: {
        parent: {
          ...navigationMenu,
          childrenIds: ["child1", "child2", "child3"],
        },
      },
    };

    expect(isEveryChildOfParentToggled("parent", context)).toBe(false);
  });

  it("should return false when no children are deselected", () => {
    const context: Ctx = {
      deselectedIds: new Set(),
      navigationMenu: {
        parent: {
          ...navigationMenu,
          childrenIds: ["child1", "child2", "child3"],
        },
      },
    };

    expect(isEveryChildOfParentToggled("parent", context)).toBe(false);
  });

  it("should return true when the parent has no children", () => {
    const context: Ctx = {
      deselectedIds: new Set(),
      navigationMenu: {
        parent: {
          ...navigationMenu,
          childrenIds: [],
        },
      },
    };

    expect(isEveryChildOfParentToggled("parent", context)).toBe(true);
  });
});
