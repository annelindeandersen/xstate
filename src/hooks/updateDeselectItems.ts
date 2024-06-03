import { NavigationMenu } from "./../navigationTypes";
import { Ctx } from "src/adjustmentsMachine";

export const updateDeselectItems = (id: string, state: Ctx): string[] => {
  const parentTypes = new Set([
    "course",
    "chapter",
    "section-group",
    "question-group",
    "grid-group",
    "page",
  ]);

  const { navigationMenu, deselectedIds } = state;

  const deselects: string[] = [];

  const getChildNavItems = (id: string) => {
    if (parentTypes.has(navigationMenu[id].type)) {
      const childrenIds = new Set(navigationMenu[id].childrenIds);

      // check if item has children
      if (navigationMenu[id].childrenIds.length > 0) {
        // run again for children
        childrenIds.size > 0 && childrenIds.forEach(getChildNavItems);

        deselects.push(id, ...childrenIds);
      } else {
        deselects.push(id);
      }
    } else {
      deselects.push(id);
    }
  };

  getChildNavItems(id);

  // if (deselectedIds.has())

  // deselectedIds.forEach(getChildNavItems); // DEN HER <<<<

  // const deselectedSet = new Set(deselects);
  // console.log(deselectedSet);

  // const areSetsEqual = (a: Set<string>, b: Set<string>) =>
  //   a.size === b.size && [...a].every((value) => b.has(value));

  // if (areSetsEqual(deselectedSet, deselectedIds)) {
  //   console.log("they are equal");
  //   deselects.length = 0;
  // }

  // console.log(deselects);
  return deselects;
};
