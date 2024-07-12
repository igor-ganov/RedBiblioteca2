import { TextDictionary } from "@common/lang-system/TextDictionary";
import { ITitleFactory, ITextFactory } from "@common/menu-system/IHasTitle";
import { IMenuItem } from "@common/menu-system/IMenuItem";


export class NewNewspaperTextFactory implements ITitleFactory, ITextFactory<NewNewspaperText>{
    constructor(){}
    getText(dictionary: TextDictionary) : NewNewspaperText{
        return  {
          title: dictionary.newnewspaper,
        };
    }
    getTitle(dictionary: TextDictionary) : NewNewspaperMenuItem{ return new NewNewspaperMenuItem(dictionary); }
 }
export interface NewNewspaperText{
    title: string;
}
export class NewNewspaperMenuItem implements IMenuItem{
    icon = 'NewNewspaper';
    title: string;
    constructor(dictionary: TextDictionary){
        this.title = dictionary.newnewspaper; 
    }
}