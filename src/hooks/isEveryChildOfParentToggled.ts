import { Ctx } from "src/adjustmentsMachine";

export const isEveryChildOfParentToggled = (id: string, state: Ctx) => {
  const { navigationMenu, deselectedIds } = state;

  return navigationMenu[id].childrenIds.every((item) =>
    deselectedIds.has(item)
  );
};
