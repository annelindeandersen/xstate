import { Ctx } from "src/adjustmentsMachine";
import { updateDeselectedChildren } from "./updateDeselectedChildren";
import { updateDeselectedParent } from "./updateDeselectedParent";

export const getSelectItems = (id: string, context: Ctx): Set<string> => {
  const items = updateDeselectedChildren(id, context);

  if (context.deselectedIds.size > 0) {
    const loopThroughNav = (navigationItems: string[]) => {
      for (let item of navigationItems) {
        // if deselectedIds includes toggled item delete it
        if (context.deselectedIds.has(item)) {
          context.deselectedIds.delete(item);
        }

        const parentIds = updateDeselectedParent(item, context);
        if (parentIds) {
          loopThroughNav(parentIds);
        }

        // check if it even needs to change the parent before going there
        // const parentId = context.navigationMenu[item].parentId;
        // if (parentId) {
        //   const allChildrenDeselected = context.navigationMenu[
        //     parentId
        //   ].childrenIds.every((item) => context.deselectedIds.has(item));

        //   if (allChildrenDeselected) {
        //     const parentIds = updateDeselectedParent(item, context);
        //     if (parentIds) {
        //       loopThroughNav(parentIds);
        //     }
        //   }
        // }
      }
    };
    loopThroughNav(items);
  }
  return new Set([...context.deselectedIds]);
};
