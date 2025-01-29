import { TextDictionary } from "@common/lang-system/TextDictionary";
import { ITitleFactory, ITextFactory } from "@common/menu-system/IHasTitle";
import { IMenuItem } from "@common/menu-system/IMenuItem";


export class FirebasePanelTextFactory implements ITitleFactory, ITextFactory<FirebasePanel>{
    public getText(dictionary: TextDictionary) : FirebasePanel{
        return  {
          title: dictionary.firebasePanel,
        };
    }
    public getTitle(dictionary: TextDictionary) : AdminMenuItem{ return new AdminMenuItem(dictionary); }
 }
export interface FirebasePanel{
    title: string;
}
export class AdminMenuItem implements IMenuItem{
    public icon = 'settings';
    public title: string;
    public constructor(dictionary: TextDictionary){ this.title = dictionary.admin; }
}
