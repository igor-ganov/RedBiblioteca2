import {TextDictionary} from "@common/lang-system/TextDictionary";

export interface EventMessageQueueText {
  dismiss: string;
}

export class EventMessageQueueTextFactory {
  public getText(dictionary: TextDictionary): EventMessageQueueText {
    return {
      dismiss: dictionary.dismiss
    };
  }
}
