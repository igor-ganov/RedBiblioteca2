import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {Newspaper} from '../models/Newspaper';
import {getFakeImage} from './getFakeImage';
import {NewspaperRepository} from '../services/NewspaperRepository';
import {Router} from '@angular/router';
import {routsPaths} from '@common/routes/routes';
import {LocaleHost} from '@common/lang-system/LocaleHost';
import {DatePipe} from '@angular/common';
import {NewspaperViewComponent} from '../newspaper-view/newspaper-view.component';
import {EventMessageQueue} from "@common/event-message-queue/EventMassageQueue";

@Component({
  selector: 'app-new-newspaper',
  template: `
    <app-newspaper-view [newspaper]="newspaper" [isUpdating]="isUpdating()" (published)="onPublish($event)"/>

  `,
  styleUrl: './new-newspaper.component.css',
  imports: [NewspaperViewComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewNewspaperComponent {
  private readonly datePipe = inject(DatePipe);
  public readonly newspaper: Newspaper = {
    id: '',
    title: 'Title',
    year: new Date().getFullYear().toString(),
    pid: this.datePipe.transform(new Date(), 'dd-MM-YY')!,
    month: this.datePipe.transform(new Date(), 'MMMM')!,
    description: 'Description',
    cover: getFakeImage(),
  }
  private readonly repository = inject(NewspaperRepository);
  public readonly isUpdating = signal(false);
  private readonly localeHost = inject(LocaleHost);
  private readonly lang = this.localeHost.language;
  private readonly eventMessageQueue = inject(EventMessageQueue);

  public async onPublish(newspaper: Newspaper) {
    this.isUpdating.set(true);
    const result = await this.repository.add(this.lang(), newspaper);
    if (result.successeful) {
      await this.redirectTo(newspaper);
      this.eventMessageQueue.pushInfo('Newspaper added');
    } else {
      this.eventMessageQueue.pushError(result.errorMessage);
    }
    this.isUpdating.set(true);
  }

  private readonly router = inject(Router);

  private redirectTo(newspaper: Newspaper) {
    return this.router.navigate([this.lang() + '/' + routsPaths.newspapers + '/' + newspaper.pid]);
  }
}
