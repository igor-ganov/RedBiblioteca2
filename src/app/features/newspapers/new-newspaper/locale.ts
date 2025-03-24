import {TextDictionary} from "@common/lang-system/TextDictionary";
import {ITextFactory, ITitleFactory} from "@common/menu-system/IHasTitle";
import {IMenuItem} from "@common/menu-system/IMenuItem";


export class NewNewspaperTextFactory implements ITitleFactory, ITextFactory<NewNewspaperText> {
  public getText(dictionary: TextDictionary): NewNewspaperText {
    return {
      title: dictionary.newnewspaper,
    };
  }

  public getTitle(dictionary: TextDictionary): NewNewspaperMenuItem {
    return new NewNewspaperMenuItem(dictionary);
  }
}

export interface NewNewspaperText {
  title: string;
}

export class NewNewspaperMenuItem implements IMenuItem {
  public icon = 'NewNewspaper';
  public title: string;

  public constructor(dictionary: TextDictionary) {
    this.title = dictionary.newnewspaper;
  }
}
