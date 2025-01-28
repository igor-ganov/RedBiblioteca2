import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {Newspaper} from '../models/Newspaper';
import {getFakeImage} from './getFakeImage';
import {NewspaperRepository} from '../services/NewspaperRepository';
import {finalize} from 'rxjs';
import {Router} from '@angular/router';
import {routsPaths} from '@common/routes/routes';
import {LocaleHost} from '@common/lang-system/LocaleHost';
import {DatePipe} from '@angular/common';
import {NewspaperViewComponent} from '../newspaper-view/newspaper-view.component';

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

  public onPublish(newspaper: Newspaper) {
    this.isUpdating.set(true);
    newspaper.id = newspaper.title.toLocaleLowerCase().replaceAll(' ', '-').replaceAll('\n', '');
    this.repository.add(this.lang(), newspaper).pipe(finalize(() => this.isUpdating.set(true))).subscribe(() => this.redirectTo(newspaper));
  }

  private readonly router = inject(Router);

  private redirectTo(newspaper: Newspaper) {
    return this.router.navigate([this.lang() + '/' + routsPaths.newspapers + '/' + newspaper.pid]);
  }
}
