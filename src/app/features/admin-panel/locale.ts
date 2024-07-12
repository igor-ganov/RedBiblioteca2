import { TextDictionary } from "@common/lang-system/TextDictionary";
import { ITitleFactory, ITextFactory } from "@common/menu-system/IHasTitle";
import { IMenuItem } from "@common/menu-system/IMenuItem";


export class AdminTextFactory implements ITitleFactory, ITextFactory<AdminText>{
    constructor(){}
    getText(dictionary: TextDictionary) : AdminText{
        return  {
          title: dictionary.admin,
        };
    }
    getTitle(dictionary: TextDictionary) : AdminMenuItem{ return new AdminMenuItem(dictionary); }
 }
export interface AdminText{
    title: string;
}
export class AdminMenuItem implements IMenuItem{
    icon = 'Admin';
    title: string; constructor(dictionary: TextDictionary){ this.title = dictionary.admin; }
}