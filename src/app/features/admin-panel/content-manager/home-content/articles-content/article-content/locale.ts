import {TextDictionary} from "@common/lang-system/TextDictionary";
import {ITextFactory, ITitleFactory} from "@common/menu-system/IHasTitle";
import {IMenuItem} from "@common/menu-system/IMenuItem";


export class ArticleContentTextFactory implements ITitleFactory, ITextFactory<ArticleContent> {
  public getText(dictionary: TextDictionary): ArticleContent {
    return {
      title: dictionary.articleContent,
    };
  }

  public getTitle(dictionary: TextDictionary): ArticleContentMenuItem {
    return new ArticleContentMenuItem(dictionary);
  }
}

export interface ArticleContent {
  title: string;
}

export class ArticleContentMenuItem implements IMenuItem {
  public icon = 'settings';
  public title: string;

  public constructor(dictionary: TextDictionary) {
    this.title = dictionary.articleContent;
  }
}
