import { TextDictionary } from "@common/lang-system/TextDictionary";
import { ITitleFactory, ITextFactory } from "@common/menu-system/IHasTitle";
import { IMenuItem } from "@common/menu-system/IMenuItem";



export class NewBookTextFactory implements ITitleFactory, ITextFactory<NewBookText>{
    constructor(){}
    getText(dictionary: TextDictionary) : NewBookText{
        return  {
          title: dictionary.newbook,
        };
    }
    getTitle(dictionary: TextDictionary) : NewBookMenuItem{ return new NewBookMenuItem(dictionary); }
 }
export interface NewBookText{
    title: string;
}
export class NewBookMenuItem implements IMenuItem{
    icon = 'NewBook';
    title: string;
    constructor(dictionary: TextDictionary){this.title = dictionary.newbook; }
}

