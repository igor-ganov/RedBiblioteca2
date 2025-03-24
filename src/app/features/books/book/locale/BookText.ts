// import { TextDictionary } from "../../../../common/lang-system/TextDictionary";

import {TextDictionary} from "@common/lang-system/TextDictionary";
import {ITextFactory, ITitleFactory} from "@common/menu-system/IHasTitle";
import {IMenuItem} from "@common/menu-system/IMenuItem";


export class BookTextFactory implements ITitleFactory, ITextFactory<BookText> {
  public getText(dictionary: TextDictionary): BookText {
    return {
      title: dictionary.book,
    };
  }

  public getTitle(dictionary: TextDictionary): BookMenuItem {
    return new BookMenuItem(dictionary);
  }
}

export interface BookText {
  title: string;
}

export class BookMenuItem implements IMenuItem {
  public icon = 'Book';
  public title: string;

  public constructor(dictionary: TextDictionary) {
    this.title = dictionary.book;
  }
}

