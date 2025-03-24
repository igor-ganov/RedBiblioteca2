import {TextDictionary} from "@common/lang-system/TextDictionary";
import {ITextFactory, ITitleFactory} from "@common/menu-system/IHasTitle";
import {IMenuItem} from "@common/menu-system/IMenuItem";


export class NewBookTextFactory implements ITitleFactory, ITextFactory<NewBookText> {
  public getText(dictionary: TextDictionary): NewBookText {
    return {
      title: dictionary.newbook,
    };
  }

  public getTitle(dictionary: TextDictionary): NewBookMenuItem {
    return new NewBookMenuItem(dictionary);
  }
}

export interface NewBookText {
  title: string;
}

export class NewBookMenuItem implements IMenuItem {
  public icon = 'NewBook';
  public title: string;

  public constructor(dictionary: TextDictionary) {
    this.title = dictionary.newbook;
  }
}

