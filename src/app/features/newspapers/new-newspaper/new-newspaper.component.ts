import {Component, inject} from '@angular/core';
import {Newspaper} from '../models/Newspaper';
import {getFakeImage} from './getFakeImage';
import {NewspaperRepository} from '../services/NewspaperRepository';
import {finalize} from 'rxjs';
import {Router} from '@angular/router';
import {routsPaths} from '@common/routes/routes';
import {LocaleHost} from '@common/lang-system/LocaleHost';
import {DatePipe} from '@angular/common';

@Component({
  selector: 'app-new-newspaper',
  templateUrl: './new-newspaper.component.html',
  styleUrl: './new-newspaper.component.css'
})
export class NewNewspaperComponent {
  private datePipe = inject(DatePipe);
  public newspaper: Newspaper = {
    id: '',
    title: 'Title',
    year: new Date().getFullYear().toString(),
    pid: this.datePipe.transform(new Date(), 'dd-MM-YY')!,
    month: this.datePipe.transform(new Date(), 'MMMM')!,
    description: 'Description',
    cover: getFakeImage(),
  }
  private repository = inject(NewspaperRepository);
  public isUpdating = false;

  public onPublish(newspaper: Newspaper) {
    this.isUpdating = true;
    newspaper.id = newspaper.title.toLocaleLowerCase().replaceAll(' ', '-').replaceAll('\n', '');
    this.repository.add(newspaper).pipe(finalize(() => this.isUpdating = true)).subscribe(() => this.redirectTo(newspaper));
  }

  private readonly router = inject(Router);
  private readonly localeHost = inject(LocaleHost);

  redirectTo(newspaper: Newspaper): void {
    this.router.navigate([this.localeHost.getLanguage() + '/' + routsPaths.newspapers + '/' + newspaper.pid]);
  }
}
