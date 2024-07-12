import { TextDictionary } from "../../../common/lang-system/TextDictionary";
import { ITextFactory, ITitleFactory } from "../../../common/menu-system/IHasTitle";
import { IMenuItem } from "../../../common/menu-system/IMenuItem";

export class HomeTextFactory implements ITitleFactory, ITextFactory<HomeText>{
    constructor(){}
    getText(dictionary: TextDictionary) : HomeText{
        return  {
          title: dictionary.home,
        };
    }
    getTitle(dictionary: TextDictionary) : HomeMenuItem{ return new HomeMenuItem(dictionary); }
 }
export interface HomeText{
    title: string;
}
export class HomeMenuItem implements IMenuItem{
    icon = 'Home';
    title: string; constructor(dictionary: TextDictionary){ this.title = dictionary.home; }
}

