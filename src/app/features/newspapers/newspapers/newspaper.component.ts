import {ChangeDetectionStrategy, Component, inject, Signal, signal} from '@angular/core';
import {Newspaper} from '../models/Newspaper';
import {ActivatedRoute} from '@angular/router';
import {NewspaperRepository} from '../services/NewspaperRepository';
import {finalize} from 'rxjs';
import {errorThrow} from '@common/help/help-fuctions';
import {IfSuccess} from '@common/components/errors/if-success.directive';
import {NewspaperViewComponent} from '../newspaper-view/newspaper-view.component';
import {LocaleHost} from "@common/lang-system/LocaleHost";
import {rxResource} from "@angular/core/rxjs-interop";
import {Result} from "@common/help/services/Result";

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

  public onPublish(value: Newspaper) {
    this.isUpdating.set(true);
    this.repository.update(this.lang(), value).pipe(finalize(() => this.isUpdating.set(false))).subscribe();//todo update view;
  }

  private readonly newspaperId = inject(ActivatedRoute).snapshot.paramMap.get('newspaperId') ?? errorThrow("Newspaper's Id can't be empty")!;
  private readonly repository = inject(NewspaperRepository);
  private readonly newspaperResource = rxResource({
    request: () => ({newspaperId: this.newspaperId, lang: this.lang()}),
    loader: ({request: {newspaperId, lang}}) => this.repository.findByPid(lang, newspaperId),
  });
  public readonly newspaper: Signal<Result<Newspaper> | undefined> = this.newspaperResource.value.asReadonly();
}
