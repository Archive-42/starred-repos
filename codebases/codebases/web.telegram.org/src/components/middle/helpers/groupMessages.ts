import { ApiMessage } from '../../../api/types';
import { IAlbum } from '../../../types';

import { getDayStart } from '../../../util/dateFormat';
import { isActionMessage } from '../../../modules/helpers';

type SenderGroup = (ApiMessage | IAlbum)[];

const GROUP_INTERVAL_SECONDS = 600; // 10 minutes

export type MessageDateGroup = {
  originalDate: number;
  datetime: number;
  senderGroups: SenderGroup[];
};

export function isAlbum(messageOrAlbum: ApiMessage | IAlbum): messageOrAlbum is IAlbum {
  return 'albumId' in messageOrAlbum;
}

export function groupMessages(messages: ApiMessage[], firstUnreadId?: number) {
  let currentSenderGroup: SenderGroup = [];
  let currentDateGroup = {
    originalDate: messages[0].date,
    datetime: Number(getDayStart(messages[0].date * 1000)),
    senderGroups: [currentSenderGroup],
  };
  let currentAlbum: IAlbum | undefined;

  const dateGroups: MessageDateGroup[] = [currentDateGroup];

  messages.forEach((message, index) => {
    if (message.isInAlbum) {
      if (!currentAlbum) {
        currentAlbum = {
          albumId: message.groupedId!,
          messages: [message],
          mainMessage: message,
        };
      } else {
        currentAlbum.messages.push(message);
        if (message.content.text) {
          currentAlbum.mainMessage = message;
        }
      }
    } else {
      currentSenderGroup.push(message);
    }

    const nextMessage = messages[index + 1];

    if (
      currentAlbum
      && (!nextMessage || !nextMessage.groupedId || nextMessage.groupedId !== currentAlbum.albumId)
    ) {
      currentSenderGroup.push(currentAlbum);
      currentAlbum = undefined;
    }
    if (nextMessage) {
      const nextMessageDayStartsAt = Number(getDayStart(nextMessage.date * 1000));
      if (currentDateGroup.datetime !== nextMessageDayStartsAt) {
        currentDateGroup = {
          originalDate: nextMessage.date,
          datetime: nextMessageDayStartsAt,
          senderGroups: [],
        };
        dateGroups.push(currentDateGroup);

        currentSenderGroup = [];
        currentDateGroup.senderGroups.push(currentSenderGroup);
      } else if (
        nextMessage.id === firstUnreadId
        || message.senderId !== nextMessage.senderId
        || message.isOutgoing !== nextMessage.isOutgoing
        || isActionMessage(message)
        || isActionMessage(nextMessage)
        || (
          message.forwardInfo && nextMessage.forwardInfo
          && (
            message.forwardInfo.senderUserId !== nextMessage.forwardInfo.senderUserId
            || message.forwardInfo.fromChatId !== nextMessage.forwardInfo.fromChatId
            || message.forwardInfo.hiddenUserName !== nextMessage.forwardInfo.hiddenUserName
          )
        )
        || message.inlineButtons
        || nextMessage.inlineButtons
        || (nextMessage.date - message.date) > GROUP_INTERVAL_SECONDS
      ) {
        currentSenderGroup = [];
        currentDateGroup.senderGroups.push(currentSenderGroup);
      }
    }
  });

  return dateGroups;
}
