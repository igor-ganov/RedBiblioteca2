import {TextDictionary} from "@common/lang-system/TextDictionary";
import {ITextFactory, ITitleFactory} from "@common/menu-system/IHasTitle";
import {IMenuItem} from "@common/menu-system/IMenuItem";


export class ContentManagerTextFactory implements ITitleFactory, ITextFactory<ContentManager> {
  public getText(dictionary: TextDictionary): ContentManager {
    return {
      title: dictionary.contentManager,
    };
  }

  public getTitle(dictionary: TextDictionary): ContentManagerMenuItem {
    return new ContentManagerMenuItem(dictionary);
  }
}

export interface ContentManager {
  title: string;
}

export class ContentManagerMenuItem implements IMenuItem {
  public icon = 'settings';
  public title: string;

  public constructor(dictionary: TextDictionary) {
    this.title = dictionary.contentManager;
  }
}
