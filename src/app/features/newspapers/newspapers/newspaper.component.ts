import {ChangeDetectionStrategy, Component, inject, signal} from '@angular/core';
import {Newspaper} from '../models/Newspaper';
import {ActivatedRoute} from '@angular/router';
import {NewspaperRepository} from '../services/NewspaperRepository';
import {finalize} from 'rxjs';
import {errorThrow} from '@common/help/help-fuctions';
import {IfSuccess} from '@common/components/errors/if-success.directive';
import {NewspaperViewComponent} from '../newspaper-view/newspaper-view.component';
import {AsyncPipe} from '@angular/common';

@Component({
  selector: 'app-newspaper',
  templateUrl: './newspaper.component.html',
  styleUrl: './newspaper.component.css',
  imports: [IfSuccess, NewspaperViewComponent, AsyncPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewspaperComponent {

  public readonly isUpdating = signal(false);

  public onPublish(value: Newspaper) {
    this.isUpdating.set(true);
    this.repository.update(value).pipe(finalize(() => this.isUpdating.set(false))).subscribe();//todo update view;
  }

  private readonly newspaperId = inject(ActivatedRoute).snapshot.paramMap.get('newspaperId') ?? errorThrow("Newspaper's Id can't be empty")!;
  private readonly repository = inject(NewspaperRepository);
  public readonly newspaper$ = this.repository.findByPid(this.newspaperId);
}
