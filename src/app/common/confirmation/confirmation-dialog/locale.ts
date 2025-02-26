import {TextDictionary} from "@common/lang-system/TextDictionary";

export const ConfirmationDialogTextTag = 'ConfirmationDialogText'

export interface Locale {
  defaultTitle: string;
  defaultText: string;
  okButton: string;
  cancelButton: string;
}

export class ConfirmationDialogTextFactory {
  public getText(dictionary: TextDictionary): Locale {
    return {
      defaultTitle: dictionary.defaultConfirmationTitle,
      defaultText: dictionary.defaultConfirmationText,
      okButton: dictionary.buttonOk,
      cancelButton: dictionary.buttonCancel,
    };
  }
}
