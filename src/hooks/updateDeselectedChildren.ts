import { Ctx } from "src/adjustmentsMachine";

export const updateDeselectedChildren = (id: string, state: Ctx): string[] => {
  const { navigationMenu } = state;

  const deselects: string[] = [];

  const getChildNavItems = (id: string) => {
    if (navigationMenu[id].childrenIds.length > 0) {
      const childrenIds = new Set(navigationMenu[id].childrenIds);

      // check if item has children
      if (navigationMenu[id].childrenIds.length > 0) {
        // run again for children
        childrenIds.size > 0 && childrenIds.forEach(getChildNavItems);

        deselects.push(id, ...childrenIds);
      } else {
        deselects.push(id);
      }
    } else {
      deselects.push(id);
    }
  };

  getChildNavItems(id);

  // ensure all values exist only once
  return [...new Set(deselects)];
};
