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
      }
    };
    loopThroughNav(items);
  }
  return new Set([...context.deselectedIds]);
};
