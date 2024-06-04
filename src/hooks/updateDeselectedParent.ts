import { Ctx } from "src/adjustmentsMachine";

export const updateDeselectedParent = (id: string, state: Ctx) => {
  const { navigationMenu, deselectedIds } = state;

  const parentIds: string[] = [];

  const getParent = (id: string) => {
    // check if all children of a given parent are selected to then deselect the parent also
    const parent = navigationMenu[id].parentId;

    console.log(deselectedIds);

    if (parent) {
      const allChildrenDeselected = navigationMenu[parent].childrenIds.every(
        (item) => deselectedIds.has(item)
      );
      allChildrenDeselected && parentIds.push(parent);

      // run again for parent in case its own parent needs deselecting
      getParent(parent);
    }
  };

  getParent(id);

  return parentIds;
};
