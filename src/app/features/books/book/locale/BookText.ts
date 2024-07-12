// import { TextDictionary } from "../../../../common/lang-system/TextDictionary";

import { TextDictionary } from "@common/lang-system/TextDictionary";
import { ITitleFactory, ITextFactory } from "@common/menu-system/IHasTitle";
import { IMenuItem } from "@common/menu-system/IMenuItem";



export class BookTextFactory implements ITitleFactory, ITextFactory<BookText>{
    constructor(){}
    getText(dictionary: TextDictionary) : BookText{
        return  {
          title: dictionary.book,
        };
    }
    getTitle(dictionary: TextDictionary) : BookMenuItem{ return new BookMenuItem(dictionary); }
 }
export interface BookText{
    title: string;
}
export class BookMenuItem implements IMenuItem{
    icon = 'Book';
    title: string; constructor(dictionary: TextDictionary){ this.title = dictionary.book; }
}

