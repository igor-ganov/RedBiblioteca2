import {ChangeDetectionStrategy, Component, inject, input, OnInit} from '@angular/core';
import {ErrorResult} from '@common/help/services/Result';
import {EventMessageQueue} from "@common/event-message-queue/EventMassageQueue";

@Component({
  selector: 'app-errors',
  template: `
    <div class="container">
      @switch (result().resultCode) {
        @case (404) {
          <span class="text">404 Not found</span>
        }
        @case (500) {
          <span class="text">Internal Server Error</span>
        }
        @default {
          <span class="text">Unknown Error</span>
        }
      }
    </div>
  `,
  styleUrl: './errors.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorsComponent implements OnInit {
  public readonly result = input.required<ErrorResult>();
  private readonly eventMessageQueue = inject(EventMessageQueue);

  public ngOnInit(): void {
    this.eventMessageQueue.pushError(this.result().errorMessage);
  }
}
