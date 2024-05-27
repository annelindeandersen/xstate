import { updateLocalstorage } from "./hooks/updateLocalstorage";
import { setup, assign } from "xstate";

// interface Adjustment {
//   [listId: string]: Set<string>;
// }

export const adjustmentsMachine = setup({
  types: {
    context: {} as { selectedIds: Set<string> },
    events: {} as
      | { type: "TOGGLE"; value: string }
      | { type: "ADJUST" }
      | { type: "CLOSE" }
      | { type: "SAVE" },
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QEMICsCusAuBbMAdtrALLIDGAFgJYFgB05ANgPaxgDEAggCIBSAVQDKAFQDaABgC6iUAAc21bNRYFZIAB6IAjAGYAnPQDsADgBsAFgCsR-btsAmIxKsAaEAE9ETi-W1HtEwcHfQsLE38LAF8o91RMHHwiUgoaOnp4rGwOAGEAGQB5IQBRSRkkEAVYJRU1Cq0EbSsJenMAoxCrM21tMPcvBGDfXSs7SIszbocYuPQspOIyKloGTJwOIS4ANVLpdSqa1XUGh0t6YIkJC0jdB109fp0jM3obCJdr8P19MxmQNbwhEWqRWGTm6xEBQA4lC8rtyvJFMojvVvDZWh1dCZwiYTLoDBZHggIvRbiEetjtGZTPoYrEQAQWBA4OoAQsUss6PskbVjogALRmImCv5soEctIMZhsMDc6rIuqgBoWBxE04vBxWKlmcwhFxOUXgwHJJaSsEJbByw6KzTean0SYWFwSbo2LF3NXPVr4kImfS47QOCS6OlRIA */
  id: "adjustmentsMachine",
  context: { selectedIds: new Set([]) },
  initial: "close",
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
            updateLocalstorage("1", [...context.selectedIds].join(", ")),
        },
        TOGGLE: {
          actions: assign({
            selectedIds: ({ context, event }) =>
              (context.selectedIds = context.selectedIds.delete(event.value)
                ? new Set([...context.selectedIds])
                : new Set([...context.selectedIds, event.value])),
          }),
        },
      },
    },
  },
});
