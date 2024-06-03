import { updateLocalstorage } from "./hooks/updateLocalstorage";
import { setup, assign, createActor } from "xstate";
import { NavigationMenu } from "./navigationTypes";
import { updateDeselectItems } from "./hooks/updateDeselectItems";

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
          actions:
            // assign({
            //   deselectedIds: ({ context, event }) =>
            //     new Set([...context.deselectedIds, ...event.value.split(",")]),
            // }),
            assign({
              deselectedIds: ({ context, event }) => {
                const set: any[] = [];

                console.log("initial set", set, context.deselectedIds);

                if (context.deselectedIds.size > 0) {
                  for (let item of context.deselectedIds) {
                    console.log("Den klikkede:: ", event.value);
                    if (event.value.split(",").includes(item)) {
                      console.log("sletter :: ", item);

                      context.deselectedIds.delete(item);
                      console.log(context.deselectedIds);
                      // set.push(...context.deselectedIds);
                    } else {
                      console.log("tilføjer :: ", item);
                      context.deselectedIds.add(item);
                    }
                  }
                } else {
                  console.log("ingen længde, så adder kun");
                  set.push(...event.value.split(","));
                }

                console.log(new Set([...context.deselectedIds]));
                console.log(new Set([...set]));

                if (set.length > 0) {
                  return new Set([...set]);
                } else {
                  return new Set([...context.deselectedIds]);
                }
              },
            }),
        },
      },
    },
  },
});

const existsInDeselected = (id: string, context: Ctx): Set<string> => {
  const IDs = id.split(",");
  console.log(IDs);

  // if array, it will be the deselected children. They need to be deleted
  // if (IDs.length > 1) {
  for (let index = 0; index < IDs.length; index++) {
    console.log(IDs[index]);
    context.deselectedIds.delete(IDs[index]);
  }

  return context.deselectedIds;
  // }
  // return context?.deselectedIds?.delete(id);
};

// deselectedIds: ({ context, event }) =>
//                 (context.deselectedIds = existsInDeselected(
//                   event.value,
//                   context
//                 )
//                   ? new Set([...context.deselectedIds])
//                   : new Set([
//                       ...context.deselectedIds,
//                       ...event.value.split(","),
//                     ])),
