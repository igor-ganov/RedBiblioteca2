import { TextDictionary } from "@common/lang-system/TextDictionary";
import { ITitleFactory, ITextFactory } from "@common/menu-system/IHasTitle";
import { IMenuItem } from "@common/menu-system/IMenuItem";


export class NewspapersTextFactory implements ITitleFactory, ITextFactory<NewspapersText>{
    constructor(){}
    getText(dictionary: TextDictionary) : NewspapersText{
        return  {
          title: dictionary.newspapers,
        };
    }
    getTitle(dictionary: TextDictionary) : NewspapersMenuItem{ return new NewspapersMenuItem(dictionary); }
 }
export interface NewspapersText{
    title: string;
}
export class NewspapersMenuItem implements IMenuItem{
    icon = 'Newspapers';
    title: string; constructor(dictionary: TextDictionary){ this.title = dictionary.newspapers; }
}