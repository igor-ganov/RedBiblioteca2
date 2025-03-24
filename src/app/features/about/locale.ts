import {TextDictionary} from "@common/lang-system/TextDictionary";
import {ITextFactory, ITitleFactory} from "@common/menu-system/IHasTitle";
import {IMenuItem} from "@common/menu-system/IMenuItem";


export class AboutTextFactory implements ITitleFactory, ITextFactory<AboutText> {
  public getText(dictionary: TextDictionary): AboutText {
    return {
      title: dictionary.about,
    };
  }

  public getTitle(dictionary: TextDictionary): AboutMenuItem {
    return new AboutMenuItem(dictionary);
  }
}

export interface AboutText {
  title: string;
}

export class AboutMenuItem implements IMenuItem {
  public icon = 'About';
  public title: string;

  public constructor(dictionary: TextDictionary) {
    this.title = dictionary.about;
  }
}
