import { Ctx } from "src/adjustmentsMachine";

export const isEveryChildOfParentToggled = (id: string, context: Ctx) => {
  const { navigationMenu, deselectedIds } = context;

  return navigationMenu[id].childrenIds.every((item) =>
    deselectedIds.has(item)
  );
};
