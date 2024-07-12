import { TextDictionary } from "@common/lang-system/TextDictionary";
import { ITitleFactory, ITextFactory } from "@common/menu-system/IHasTitle";
import { IMenuItem } from "@common/menu-system/IMenuItem";


export class BooksTextFactory implements ITitleFactory, ITextFactory<BooksText>{
    constructor(){}
    getText(dictionary: TextDictionary) : BooksText{
        return  {
          title: dictionary.books,
        };
    }
    getTitle(dictionary: TextDictionary) : BooksMenuItem{ return new BooksMenuItem(dictionary); }
 }
export interface BooksText{
    title: string;
}
export class BooksMenuItem implements IMenuItem{
    icon = 'Books';
    title: string; constructor(dictionary: TextDictionary){ this.title = dictionary.books; }
}

