import { assign } from "xstate";

export const toggleAdjustments = () => {
  assign({
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
  });
};
