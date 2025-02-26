import {ChangeDetectionStrategy, Component, inject, input, resource, Signal, signal} from '@angular/core';
import {Newspaper} from '../models/Newspaper';
import {NewspaperRepository} from '../services/NewspaperRepository';
import {IfSuccess} from '@common/components/errors/if-success.directive';
import {NewspaperViewComponent} from '../newspaper-view/newspaper-view.component';
import {LocaleHost} from "@common/lang-system/LocaleHost";
import {Result} from "@common/help/services/Result";
import {EventMessageQueue} from "@common/event-message-queue/EventMassageQueue";

@Component({
  selector: 'app-newspaper',
  template: `
    @let result = newspaper();
    <app-newspaper-view *ifSuccess="result as value" [newspaper]="value" [isUpdating]="isUpdating()"
                        (published)="onPublish($event)"/>

  `,
  styleUrl: './newspaper.component.css',
  imports: [IfSuccess, NewspaperViewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewspaperComponent {

  public readonly isUpdating = signal(false);

  private readonly lang = inject(LocaleHost).language;
  private readonly eventMessageQueue = inject(EventMessageQueue);

  public async onPublish(value: Newspaper) {
    this.isUpdating.set(true);
    const result = await this.repository.update(this.lang(), value);
    if (result.successeful) {
      //todo update view;
      this.eventMessageQueue.pushInfo('Newspaper updated');
    } else {
      this.eventMessageQueue.pushError(result.errorMessage);
    }
    this.isUpdating.set(false);
  }

  public readonly newspaperId = input.required<string>();
  private readonly repository = inject(NewspaperRepository);
  private readonly newspaperResource = resource({
    request: () => ({newspaperId: this.newspaperId(), lang: this.lang()}),
    loader: ({request: {newspaperId, lang}}) => this.repository.findByPid(lang, newspaperId),
  });
  public readonly newspaper: Signal<Result<Newspaper> | undefined> = this.newspaperResource.value.asReadonly();
}
