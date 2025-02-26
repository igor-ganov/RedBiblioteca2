import {Component, inject, OnDestroy} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {map, Subscription, switchMap, take} from 'rxjs';
import {TextHost} from "@common/lang-system/TextHost";
import {
  EventMessage,
  EventMessageLevel,
  EventMessageQueue,
  SourceType
} from "@common/event-message-queue/EventMassageQueue";
import {errorAlert, sendInfo} from "@common/help/help-fuctions";
import {EventMessageQueueText} from "@common/event-message-queue/event-message-queue/locale";

@Component({
  selector: 'app-event-message-queue',
  template: ``,
  styleUrls: ['./event-message-queue.component.scss'],
  standalone: true
})
export class EventMessageQueueComponent implements OnDestroy {
  private readonly snackBar = inject(MatSnackBar);
  private readonly textHost = inject(TextHost);

  private readonly eventMessageQueueSubscription: Subscription;

  public constructor() {
    const eventMessageQueue = inject(EventMessageQueue);
    const textHost = this.textHost;

    this.eventMessageQueueSubscription =

      eventMessageQueue.massagePushed$
        .pipe(
          switchMap(m => textHost.getText('eventMessageQueue').pipe(take(1), map(t => {
            return {message: m, text: t}
          }))),
          map(m => {
            if (m.message.sourceType !== SourceType.System) {
              if (m.message.level === EventMessageLevel.Error) errorAlert(m.message.message);
              if (m.message.level === EventMessageLevel.Info) sendInfo(m.message.message);
            }
            if (m.message.level > EventMessageLevel.Trace) {
              this.openSnackBar(m.message, m.text);
            }
          })).subscribe();
  }

  public ngOnDestroy(): void {
    this.eventMessageQueueSubscription.unsubscribe();
  }

  public openSnackBar(message: EventMessage, text: EventMessageQueueText) {
    this.snackBar.open(message.message, text.dismiss, {
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      duration: 5000,
      panelClass: this.getPanelClass(message.level)
    });
  }

  public getPanelClass(level: EventMessageLevel): string | undefined {
    switch (level) {
      case EventMessageLevel.Error:
        return 'error-panel';
      case EventMessageLevel.Info:
        return 'info-panel'
      case EventMessageLevel.Trace:
        return 'trace-panel'
      default:
        return undefined;
    }
  }
}
