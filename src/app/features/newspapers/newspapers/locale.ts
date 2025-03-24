import {TextDictionary} from "@common/lang-system/TextDictionary";
import {ITextFactory, ITitleFactory} from "@common/menu-system/IHasTitle";
import {IMenuItem} from "@common/menu-system/IMenuItem";


export class NewspaperTextFactory implements ITitleFactory, ITextFactory<NewspaperText> {
  public getText(dictionary: TextDictionary): NewspaperText {
    return {
      title: dictionary.newspaper,
    };
  }

  public getTitle(dictionary: TextDictionary): NewspaperMenuItem {
    return new NewspaperMenuItem(dictionary);
  }
}

export interface NewspaperText {
  title: string;
}

export class NewspaperMenuItem implements IMenuItem {
  public icon = 'Newspaper';
  public title: string;

  public constructor(dictionary: TextDictionary) {
    this.title = dictionary.newspaper;
  }
}
