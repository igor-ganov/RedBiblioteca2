import {ChangeDetectionStrategy, Component, computed, inject, input, resource, signal, Signal} from '@angular/core';
import {Article, ArticleRepository} from "@app/features/home/services/article.repository";
import {Result, toResult} from "@common/help/services/Result";
import {LocaleHost} from "@common/lang-system/LocaleHost";
import {ActivatedRoute, Router} from "@angular/router";
import {ArticleContentEditorComponent} from "./article-content-editor/article-content-editor.component";
import {IfSuccess} from "@common/components/errors/if-success.directive";
import {EventMessageQueue} from "@common/help/services/EventMassageQueue";

@Component({
  selector: 'app-article-content',
  imports: [
    ArticleContentEditorComponent,
    IfSuccess
  ],
  template: `
    <app-article-content-editor
      *ifSuccess="requestResult() as value"
      [value]="value"
      [isUpdating]="isUpdating()"
      (published)="onSave($event)"/>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleContentComponent {
  public readonly pid = input.required<string | 'new'>();
  public readonly isUpdating = signal(false);
  private readonly isNew = computed(() => this.pid() === 'new');
  private readonly repository = inject(ArticleRepository)
  private readonly localeHost = inject(LocaleHost)
  private readonly requestResource = resource({
    request: () => ({lang: this.localeHost.language(), pid: this.pid(), isNew: this.isNew()}),
    loader: ({request: {lang, pid, isNew}}) => isNew ? this.createNew() : this.repository.findByPid(lang, pid),
  });
  public requestResult: Signal<Result<Article> | undefined> = computed(() => this.requestResource.value());

  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly eventMessageQueue = inject(EventMessageQueue);

  public async onSave(value: Article) {
    this.isUpdating.set(true);
    if (this.isNew()) {
      value.pid = value.title.replace(/\s+/g, '-').toLowerCase();
      //TODO pid unique validation
    }
    const requestResult = this.isNew() ?
      await this.repository.add(this.localeHost.language(), value) :
      await this.repository.update(this.localeHost.language(), value);
    if (requestResult.successeful) {
      await this.router.navigate([requestResult.result.pid], {relativeTo: this.route.parent});
      this.eventMessageQueue.pushInfo('Article added');
    } else {
      this.eventMessageQueue.pushError(requestResult.errorMessage);
    }
    this.isUpdating.set(false);
  }

  private async createNew() {
    return toResult<Article>({
      id: '',
      title: 'Title',
      description: 'Description',
      pid: ''
    });
  }
}
