import {TextDictionary} from "@common/lang-system/TextDictionary";
import {ITextFactory, ITitleFactory} from "@common/menu-system/IHasTitle";
import {IMenuItem} from "@common/menu-system/IMenuItem";


export class BannerContentTextFactory implements ITitleFactory, ITextFactory<BannerContent> {
  public getText(dictionary: TextDictionary): BannerContent {
    return {
      title: dictionary.bannerContent,
    };
  }

  public getTitle(dictionary: TextDictionary): BannerContentMenuItem {
    return new BannerContentMenuItem(dictionary);
  }
}

export interface BannerContent {
  title: string;
}

export class BannerContentMenuItem implements IMenuItem {
  public icon = 'settings';
  public title: string;

  public constructor(dictionary: TextDictionary) {
    this.title = dictionary.bannerContent;
  }
}
