import { pencilOutline, trashOutline } from "ionicons/icons";
import { PostViews } from '../models/index';
import { Action } from "../../../models/index";

export const POST_ACTIONS_BUTTON: Action[] = [
  {
    text: 'COMMON.LABELS.EDIT',
    icon: pencilOutline,
    color: 'light',
    role: 'edit'
  },
  {
    text: 'COMMON.LABELS.DELETE',
    icon: trashOutline,
    color: 'danger',
    role: 'delete',
    expandable: true
  }
];

export const POST_VIEWS_OPTIONS: any = {
  [PostViews.GRID]: {
    sizeLg: '6',
    sizeXl: '3',
    containerClass: 'px-3'
  },
  [PostViews.LIST]: {
    class: 'p-0',
    containerClass: 'p-0'
  }
}