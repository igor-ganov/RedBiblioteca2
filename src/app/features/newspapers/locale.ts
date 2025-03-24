import {TextDictionary} from "@common/lang-system/TextDictionary";
import {ITextFactory, ITitleFactory} from "@common/menu-system/IHasTitle";
import {IMenuItem} from "@common/menu-system/IMenuItem";


export class NewspapersTextFactory implements ITitleFactory, ITextFactory<NewspapersText> {
  public getText(dictionary: TextDictionary): NewspapersText {
    return {
      title: dictionary.newspapers,
    };
  }

  public getTitle(dictionary: TextDictionary): NewspapersMenuItem {
    return new NewspapersMenuItem(dictionary);
  }
}

export interface NewspapersText {
  title: string;
}

export class NewspapersMenuItem implements IMenuItem {
  public icon = 'Newspapers';
  public title: string;

  public constructor(dictionary: TextDictionary) {
    this.title = dictionary.newspapers;
  }
}
