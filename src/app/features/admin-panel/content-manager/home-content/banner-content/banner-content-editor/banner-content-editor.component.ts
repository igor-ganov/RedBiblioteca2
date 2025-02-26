import {ChangeDetectionStrategy, Component, input, output, signal} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {outputFromObservable, toObservable} from "@angular/core/rxjs-interop";
import {PreventDropDirective} from "@common/directives/prevent-drop.directive";
import {HomeBanner} from "@app/features/home/services/banner.repository";

@Component({
  selector: 'app-banner-content-editor',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    PreventDropDirective
  ],
  template: `
    @let v = value();
    <form #form="ngForm" (appPreventDrop)="isEditing.set($event)" (ngSubmit)="onSubmit(v)" class="container"
          method="dialog">
      <div class="fields">
        <mat-form-field>
          <mat-label>Title</mat-label>
          <textarea matInput [(ngModel)]="v.title" name="title" required></textarea>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Subtitle</mat-label>
          <textarea matInput [(ngModel)]="v.subtitle" name="subtitle" required></textarea>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Text</mat-label>
          <textarea matInput [(ngModel)]="v.content" name="text" required></textarea>
        </mat-form-field>
      </div>
      <button mat-raised-button color="primary" [disabled]="!form.valid || !isEditing()">
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
export class BannerContentEditorComponent {
  public readonly isUpdating = input.required<boolean>();
  public readonly published = output<HomeBanner>();
  public readonly value = input.required<HomeBanner>();
  public readonly isEditing = signal(false);
  public readonly isEditingChange = outputFromObservable(toObservable(this.isEditing));

  public onSubmit(value: HomeBanner) {
    this.published.emit(value);
  }
}
