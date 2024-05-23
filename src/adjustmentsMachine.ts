import { setup, assign } from "xstate";

export const adjustmentsMachine = setup({
  types: {
    context: {} as { toggledIDs: Set<string> },
    events: {} as
      | { type: "ADJUST" }
      | { type: "CLOSE" }
      | { type: "TOGGLE"; value: string },
  },
}).createMachine({
  id: "adjustmentsMachine",
  context: { toggledIDs: new Set([]) },
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
        TOGGLE: {
          actions: assign({
            toggledIDs: ({ context, event }) =>
              (context.toggledIDs = new Set([
                ...context.toggledIDs,
                event.value,
              ])),
          }),
        },
      },
    },
  },
});
