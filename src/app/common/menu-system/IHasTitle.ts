import { TextDictionary } from "../lang-system/TextDictionary";
import { IMenuItem } from "./IMenuItem";


export interface ITitleFactory {
    getTitle(dictionary: TextDictionary): IMenuItem;
}
export interface ITextFactory<T> {
    getText(dictionary: TextDictionary) : T;
}