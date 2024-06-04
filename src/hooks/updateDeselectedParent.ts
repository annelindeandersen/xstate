import { Ctx } from "src/adjustmentsMachine";

const updateDeselectedParent = (id: string, state: Ctx) => {
  const { navigationMenu, deselectedIds } = state;

  const deselects = [];

  // check if all children of a given parent are selected to then deselect the parent also
  const parent = navigationMenu[id].parentId;

  if (parent) {
    const allChildrenDeselected = navigationMenu[parent].childrenIds.every(
      (item) => deselectedIds.has(item)
    );
    allChildrenDeselected && deselects.push(parent);
  }

  return deselects;
};
