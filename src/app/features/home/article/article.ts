import {ContentMenuItems} from "@app/layout/content-menu/content-menu.items";

export interface Article extends ContentMenuItems {
  id: string;
  title: string;
  content: string;
}
