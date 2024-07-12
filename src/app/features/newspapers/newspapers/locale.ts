import { TextDictionary } from "@common/lang-system/TextDictionary";
import { ITitleFactory, ITextFactory } from "@common/menu-system/IHasTitle";
import { IMenuItem } from "@common/menu-system/IMenuItem";


export class NewspaperTextFactory implements ITitleFactory, ITextFactory<NewspaperText>{
    constructor(){}
    getText(dictionary: TextDictionary) : NewspaperText{
        return  {
          title: dictionary.newspaper,
        };
    }
    getTitle(dictionary: TextDictionary) : NewspaperMenuItem{ return new NewspaperMenuItem(dictionary); }
 }
export interface NewspaperText{
    title: string;
}
export class NewspaperMenuItem implements IMenuItem{
    icon = 'Newspaper';
    title: string; constructor(dictionary: TextDictionary){ this.title = dictionary.newspaper; }
}