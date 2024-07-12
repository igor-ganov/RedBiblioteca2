import { TextDictionary } from "@common/lang-system/TextDictionary";
import { ITitleFactory, ITextFactory } from "@common/menu-system/IHasTitle";
import { IMenuItem } from "@common/menu-system/IMenuItem";


export class AboutTextFactory implements ITitleFactory, ITextFactory<AboutText>{
    constructor(){}
    getText(dictionary: TextDictionary) : AboutText{
        return  {
          title: dictionary.about,
        };
    }
    getTitle(dictionary: TextDictionary) : AboutMenuItem{ return new AboutMenuItem(dictionary); }
 }
export interface AboutText{
    title: string;
}
export class AboutMenuItem implements IMenuItem{
    icon = 'About';
    title: string; constructor(dictionary: TextDictionary){ this.title = dictionary.about; }
}