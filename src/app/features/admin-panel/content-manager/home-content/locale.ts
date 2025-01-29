import { TextDictionary } from "@common/lang-system/TextDictionary";
import { ITitleFactory, ITextFactory } from "@common/menu-system/IHasTitle";
import { IMenuItem } from "@common/menu-system/IMenuItem";


export class HomeContentTextFactory implements ITitleFactory, ITextFactory<HomeContent>{
    public getText(dictionary: TextDictionary) : HomeContent{
        return  {
          title: dictionary.homeContent,
        };
    }
    public getTitle(dictionary: TextDictionary) : AdminMenuItem{ return new AdminMenuItem(dictionary); }
 }
export interface HomeContent{
    title: string;
}
export class AdminMenuItem implements IMenuItem{
    public icon = 'settings';
    public title: string;
    public constructor(dictionary: TextDictionary){ this.title = dictionary.admin; }
}
