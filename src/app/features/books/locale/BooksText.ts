import {TextDictionary} from "@common/lang-system/TextDictionary";
import {ITextFactory, ITitleFactory} from "@common/menu-system/IHasTitle";
import {IMenuItem} from "@common/menu-system/IMenuItem";


export class BooksTextFactory implements ITitleFactory, ITextFactory<BooksText> {
  public getText(dictionary: TextDictionary): BooksText {
    return {
      title: dictionary.books,
    };
  }

  public getTitle(dictionary: TextDictionary): BooksMenuItem {
    return new BooksMenuItem(dictionary);
  }
}

export interface BooksText {
  title: string;
}

export class BooksMenuItem implements IMenuItem {
  public icon = 'Books';
  public title: string;

  public constructor(dictionary: TextDictionary) {
    this.title = dictionary.books;
  }
}

