import { Ctx } from "src/adjustmentsMachine";
import { isEveryChildOfParentToggled } from "./isEveryChildOfParentToggled";

export const updateDeselectedParent = (id: string, state: Ctx) => {
  const { navigationMenu, deselectedIds } = state;

  const parentIds: string[] = [];

  const getParent = (id: string) => {
    // check if all children of a given parent are selected to then deselect the parent also
    const parent = navigationMenu[id].parentId;

    console.log(deselectedIds);

    if (parent) {
      const allChildrenDeselected = isEveryChildOfParentToggled(parent, state);
      allChildrenDeselected && parentIds.push(parent);
      console.log(allChildrenDeselected);

      // if not all children are deselected, parent HAS to be active
      if (!allChildrenDeselected) {
        state.deselectedIds.delete(parent);
      }

      // run again for parent in case its own parent needs deselecting
      getParent(parent);
    }
  };

  getParent(id);

  return parentIds;
};
