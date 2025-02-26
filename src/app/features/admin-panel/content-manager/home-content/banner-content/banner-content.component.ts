import {ChangeDetectionStrategy, Component, inject, resource, Signal, signal} from '@angular/core';
import {IFormContent} from "@common/routes/routes";
import {
  BannerContentEditorComponent
} from "@app/features/admin-panel/content-manager/home-content/banner-content/banner-content-editor/banner-content-editor.component";
import {IfSuccess} from "@common/components/errors/if-success.directive";
import {LocaleHost} from "@common/lang-system/LocaleHost";
import {Result, toResult} from "@common/help/services/Result";
import {EventMessageQueue} from "@common/event-message-queue/EventMassageQueue";
import {computedWhenDefined} from "@common/help/functions/signals/computed-when-defined";
import {HomeBanner, HomeBannerRepository} from "@app/features/home/services/banner.repository";

@Component({
  selector: 'app-banner-content',
  imports: [
    BannerContentEditorComponent,
    IfSuccess
  ],
  template: `
    <app-banner-content-editor
      *ifSuccess="requestResult() as value"
      [value]="value"
      [isUpdating]="isUpdating()"
      (isEditingChange)="isEditingSignal.set($event)"
      (published)="onSave($event)"
    />
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BannerContentComponent implements IFormContent {
  public readonly isUpdating = signal(false);
  private readonly repository = inject(HomeBannerRepository)
  private readonly localeHost = inject(LocaleHost)
  private readonly requestResource = resource({
    request: () => ({lang: this.localeHost.language()}),
    loader: ({request: {lang}}) => this.repository.get(lang),
  });
  private readonly isNew = computedWhenDefined(
    () => this.requestResource.value(),
    r => !r.successeful && r.resultCode === 404
  );
  public requestResult: Signal<Result<HomeBanner> | undefined> = computedWhenDefined(
    () => this.requestResource.value(),
    r => this.isNew() ? createNew() : r);

  private readonly eventMessageQueue = inject(EventMessageQueue);

  public isEditingSignal = signal(false);

  public isEditing(): boolean {
    return this.isEditingSignal();
  }

  public async onSave(value: HomeBanner) {
    this.isUpdating.set(true);
    const requestResult = this.isNew() ?
      await this.repository.add(this.localeHost.language(), value) :
      await this.repository.update(this.localeHost.language(), value);
    console.log(requestResult);
    if (requestResult.successeful) {
      this.eventMessageQueue.pushInfo('Home banner added');
      this.requestResource.reload();
    } else {
      this.eventMessageQueue.pushError(requestResult.errorMessage);
    }
    this.isUpdating.set(false);

  }
}

function createNew(): Result<HomeBanner> {
  return toResult({
    title: 'new banner',
    subtitle: 'subtitle',
    content: 'content'
  });
}
