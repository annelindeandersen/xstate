import { updateLocalstorage } from "./hooks/updateLocalstorage";
import { setup, assign } from "xstate";
import { NavigationMenu } from "./navigationTypes";

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
      | { type: "SAVE" }
      | { type: "DELETE"; value: string },
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
            updateLocalstorage("1", [...context.deselectedIds].join(", ")),
        },
        TOGGLE: {
          actions: assign({
            deselectedIds: ({ context, event }) => {
              if (context.deselectedIds.size > 0) {
                for (let item of event.value.split(",")) {
                  // if one of the toggled includes deselected item delete it
                  if (context.deselectedIds.has(item)) {
                    context.deselectedIds.delete(item);
                  } else {
                    context.deselectedIds.add(item);
                  }
                }
              } else {
                return new Set([...event.value.split(",")]);
              }
              return new Set([...context.deselectedIds]);
            },
          }),
        },
      },
    },
  },
});
