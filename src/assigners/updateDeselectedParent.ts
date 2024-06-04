import { Ctx } from "src/adjustmentsMachine";
import { isEveryChildOfParentToggled } from "../utils/isEveryChildOfParentToggled";

export const updateDeselectedParent = (id: string, context: Ctx) => {
  const { navigationMenu, deselectedIds } = context;

  const parentIds: string[] = [];

  const getParent = (id: string) => {
    // check if all children of a given parent are selected to then deselect the parent also
    const parent = navigationMenu[id].parentId;

    if (parent) {
      const allChildrenDeselected = isEveryChildOfParentToggled(
        parent,
        context
      );
      if (allChildrenDeselected && navigationMenu[parent].type !== "page") {
        parentIds.push(parent);
      }

      // if not all children are deselected, parent HAS to be active
      if (!allChildrenDeselected) {
        deselectedIds.delete(parent);
      }

      // run again for parent in case its own parent needs deselecting
      getParent(parent);
    }
  };

  getParent(id);

  return parentIds;
};
