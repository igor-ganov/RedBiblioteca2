import {TextDictionary} from "@common/lang-system/TextDictionary";
import {ITextFactory, ITitleFactory} from "@common/menu-system/IHasTitle";
import {IMenuItem} from "@common/menu-system/IMenuItem";


export class ArticlesContentTextFactory implements ITitleFactory, ITextFactory<ArticlesContent> {
  public getText(dictionary: TextDictionary): ArticlesContent {
    return {
      title: dictionary.articlesContent,
    };
  }

  public getTitle(dictionary: TextDictionary): ArticlesContentMenuItem {
    return new ArticlesContentMenuItem(dictionary);
  }
}

export interface ArticlesContent {
  title: string;
}

export class ArticlesContentMenuItem implements IMenuItem {
  public icon = 'settings';
  public title: string;

  public constructor(dictionary: TextDictionary) {
    this.title = dictionary.articlesContent;
  }
}
