import {ChangeDetectionStrategy, Component, computed, inject, input, resource, signal, Signal} from '@angular/core';
import {Result, toResult} from "@common/help/services/Result";
import {LocaleHost} from "@common/lang-system/LocaleHost";
import {ActivatedRoute, Router} from "@angular/router";
import {NewspaperContentEditorComponent} from "./newspaper-content-editor/newspaper-content-editor.component";
import {IfSuccess} from "@common/components/errors/if-success.directive";
import {EventMessageQueue} from "@common/event-message-queue/EventMassageQueue";
import {IFormContent} from "@common/routes/routes";
import {NewspaperRepository} from "app/features/newspapers/services/NewspaperRepository";
import {Newspaper} from "app/features/newspapers/models/Newspaper";
import {getFakeImage} from "app/features/newspapers/new-newspaper/getFakeImage";
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-newspaper-content',
  imports: [
    NewspaperContentEditorComponent,
    IfSuccess
  ],
  template: `
    <app-newspaper-content-editor
      *ifSuccess="requestResult() as value"
      [value]="value"
      [isUpdating]="isUpdating()"
      (isEditingChange)="isEditingSignal.set($event)"
      (published)="onSave($event)"/>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewspaperContentComponent implements IFormContent {

  public readonly pid = input.required<string | 'new'>();
  public readonly isUpdating = signal(false);
  private readonly isNew = computed(() => this.pid() === 'new');
  private readonly repository = inject(NewspaperRepository)
  private readonly localeHost = inject(LocaleHost)
  private readonly requestResource = resource({
    params: () => ({lang: this.localeHost.language(), pid: this.pid(), isNew: this.isNew()}),
    loader: ({params: {lang, pid, isNew}}) => isNew ? this.createNew() : this.repository.findByPid(lang, pid),
  });
  public requestResult: Signal<Result<Newspaper> | undefined> = computed(() => this.requestResource.value());

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly eventMessageQueue = inject(EventMessageQueue);

  public isEditingSignal = signal(false);

  public isEditing(): boolean {
    return this.isEditingSignal();
  }

  public async onSave(value: Newspaper) {
    this.isUpdating.set(true);
    if (this.isNew()) {
      value.pid = value.title.replace(/\s+/g, '-').toLowerCase();
      //TODO pid unique validation
    }
    const requestResult = this.isNew() ?
      await this.repository.add(this.localeHost.language(), value) :
      await this.repository.update(this.localeHost.language(), value);
    console.log(requestResult);
    if (requestResult.successeful) {
      await this.router.navigate(['../'], {relativeTo: this.route});
      this.eventMessageQueue.pushInfo('Newspaper added');
    } else {
      this.eventMessageQueue.pushError(requestResult.errorMessage);
    }
    this.isUpdating.set(false);
  }

  private readonly datePipe = inject(DatePipe);

  private async createNew() {
    return toResult<Newspaper>({
      id: '',
      title: 'Title',
      year: new Date().getFullYear().toString(),
      pid: this.datePipe.transform(new Date(), 'dd-MM-yy')!,
      month: this.datePipe.transform(new Date(), 'MMMM')!,
      description: 'Description',
      cover: getFakeImage(),
    });
  }
}
