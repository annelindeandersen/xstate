import { updateLocalstorage } from "./utils/updateLocalstorage";
import { setup, assign } from "xstate";
import { NavigationMenu } from "./navigationTypes";
import { getSelectItems } from "./assigners/getSelectItems";
import { getDeselectItems } from "./assigners/getDeselectItems";

export interface Ctx {
  deselectedIds: Set<string>;
  navigationMenu: NavigationMenu;
}

export const adjustmentsMachine = setup({
  types: {
    context: {} as {
      deselectedIds: Set<string>;
      navigationMenu: NavigationMenu;
    },
    events: {} as
      | { type: "SET_MENU"; value: NavigationMenu }
      | { type: "TOGGLE"; value: string }
      | { type: "ADJUST" }
      | { type: "CLOSE" }
      | { type: "SAVE" },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMICsCusAuBbMAdtrALLIDGAFgJYFgB05ANgPaxgDEAggCIBSAVQDKAFQDaABgC6iUAAc21bNRYFZIAB6IAjAGYAnPQDsADgBsAFgCsR-btsAmIxKsAaEAE9ETi-W1HtEwcHfQsLE38LAF8o91RMHHwiUgoaOnp4rGwOAGEAGQB5IQBRSRkkEAVYJRU1Cq0EbSsJenMAoxCrM21tMPcvBGDfXSs7SIszbocYuPQspOIyKloGTJwOIS4ANVLpdSqa1XUGh0t6YIkJC0jdB109fp0jM3obCJdr8P19MxmQNbwhEWqRWGTm6xEBQA4lC8rtyvJFMojvVvDZWh1dCZwiYTLoDBZHggIvRbiEetjtGZTPoYrEQAQWBA4OoAQsUss6PskbVjogALRmImCv5soEctIMZhsMDc6rIuqgBoWBxE04vBxWKlmcwhFxOUXgwHJJaSsEJbByw6KzTean0SYWFwSbo2LF3NXPVr4kImfS47QOCS6OlRIA */
  id: "adjustmentsMachine",
  context: { deselectedIds: new Set([]), navigationMenu: {} },
  initial: "close",
  on: {
    SET_MENU: {
      actions: assign({ navigationMenu: ({ event }) => event.value }),
    },
  },
  states: {
    close: {
      on: {
        ADJUST: "adjust",
      },
    },
    adjust: {
      on: {
        CLOSE: "close",
        SAVE: {
          actions: ({ context }) =>
            updateLocalstorage(
              "Deselected id's for adjustment",
              [...context.deselectedIds].join(", ")
            ),
        },
        TOGGLE: {
          actions: assign({
            deselectedIds: ({ context, event }) => {
              if (context.deselectedIds.has(event.value)) {
                return getSelectItems(event.value, context);
              } else {
                return getDeselectItems(event.value, context);
              }
            },
          }),
        },
      },
    },
  },
});
