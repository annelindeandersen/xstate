export interface NavigationMenuItem {
  id: string;
  heading: string;
  path?: string;
  index?: string;
  type: NavigationLinkItemType;
  parentId?: string;
  childrenIds: string[];
}

export type NavigationLinkItemType =
  | "activity"
  | "course"
  | "chapter"
  | "page"
  | "page-panel"
  | "question-group"
  | "section-group"
  | "grid-page"
  | "grid-group"
  | "text-page";

export type NavigationMenu = Record<string, NavigationMenuItem>;
