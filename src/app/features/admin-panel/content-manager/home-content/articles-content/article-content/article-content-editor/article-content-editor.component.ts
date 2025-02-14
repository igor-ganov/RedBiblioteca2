import {ChangeDetectionStrategy, Component, HostListener, input, output, viewChild} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {outputFromObservable, toObservable, toSignal} from "@angular/core/rxjs-interop";
import {filter, map, mergeWith, Observable, switchMap} from "rxjs";
import {Article} from "@app/features/home/services/article";

@Component({
  selector: 'app-article-content-editor',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  template: `
    @let v = value();
    <form #form="ngForm" (ngSubmit)="onSubmit(form, v)" class="container" method="dialog">
      <div class="fields">
        <mat-form-field>
          <mat-label>Title</mat-label>
          <input type="text" matInput [(ngModel)]="v.title" name="title">
        </mat-form-field>
        <mat-form-field>
          <mat-label>Home page order</mat-label>
          <input type="number" matInput [(ngModel)]="v.homePageOrder" name="homePageOrder">
        </mat-form-field>
        <mat-form-field>
          <mat-label>Content</mat-label>
          <textarea matInput [(ngModel)]="v.content" name="description"></textarea>
        </mat-form-field>
      </div>
      <button mat-raised-button color="primary" [disabled]="(!v.title || !v.content) || !isEditing()">
        Publish
      </button>
    </form>
  `,
  styles: `
    .container {
      width: 100%;
      padding: 0.5em;
      display: grid;
      place-content: center;
      grid-template-columns: 1fr;
    }

    .fields {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleContentEditorComponent {
  public readonly isUpdating = input.required<boolean>();
  public readonly published = output<Article>();
  public readonly value = input.required<Article>();

  private readonly _form = viewChild(NgForm);

  private readonly isEditing$: Observable<boolean> = toObservable(this._form).pipe(
    filter(f => f !== undefined),
    map(f => f.valueChanges ? {
      form: f,
      valueChanges: f.valueChanges,
      submitted$: f.ngSubmit.asObservable()
    } : undefined),
    filter(f => f !== undefined),
    switchMap(f => f.valueChanges.pipe(mergeWith(f.submitted$), map(v => ({form: f.form, value: v})))),
    map(f => (f.form.dirty ?? false) && !f.form.submitted)
  );
  public isEditing = toSignal(this.isEditing$, {initialValue: false});

  public readonly isEditingChange = outputFromObservable(this.isEditing$);

  @HostListener('window:beforeunload', ['$event'])
  public unloadNotification($event: BeforeUnloadEvent): string | undefined {
    if (this.isEditing()) {
      $event.preventDefault();
    }
    return;
  }


  public onSubmit(form: NgForm, value: Article) {
    this.published.emit(value);
  }
}
