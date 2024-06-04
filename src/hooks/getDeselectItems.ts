import { Ctx } from "src/adjustmentsMachine";
import { updateDeselectedChildren } from "./updateDeselectedChildren";
import { updateDeselectedParent } from "./updateDeselectedParent";

export const getDeselectItems = (id: string, context: Ctx): Set<string> => {
  const items = updateDeselectedChildren(id, context);

  if (context.deselectedIds.size > 0) {
    const loopThroughNav = (navigationItems: string[]) => {
      for (let item of navigationItems) {
        // if deselectedIds does not include toggled item add it
        if (!context.deselectedIds.has(item)) {
          context.deselectedIds.add(item);
        }

        // check if it even needs to loop through parents TODO
        const parentIds = updateDeselectedParent(item, context);
        if (parentIds) {
          loopThroughNav(parentIds);
        }
      }
    };
    loopThroughNav(items);
  } else {
    return new Set([...items]);
  }
  return new Set([...context.deselectedIds]);
};
