import {ChangeDetectionStrategy, Component, input, linkedSignal, output, signal} from '@angular/core';
import {FormsModule, NgForm} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {outputFromObservable, toObservable} from "@angular/core/rxjs-interop";
import {PreventDropDirective} from "@common/directives/prevent-drop.directive";
import {Newspaper} from "app/features/newspapers/models/Newspaper";
import {toBase64} from "@common/help/help-fuctions";
import {ClickOrEnterDirective} from "@common/directives/click-or-enter.directive";
import {Base64ToImage} from "@common/help/pipelines/Base64ToImage";

@Component({
  selector: 'app-newspaper-content-editor',
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    PreventDropDirective,
    ClickOrEnterDirective,
    Base64ToImage
  ],
  template: `
    @let v = value();
    <form #form="ngForm" (appPreventDrop)="isEditing.set($event)" [ngFormOptions]="{updateOn: 'change'}"
          (ngSubmit)="onSubmit(form, v)" class="container"
          method="dialog">
      <div class="fields">
        <mat-form-field>
          <mat-label>Title</mat-label>
          <input type="text" matInput [(ngModel)]="v.title" name="title" required>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Year</mat-label>
          <input type="text" matInput [(ngModel)]="v.year" name="year" required>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Month</mat-label>
          <input type="text" matInput [(ngModel)]="v.month" name="month" required>
        </mat-form-field>
        <mat-form-field>
          <mat-label>Description</mat-label>
          <textarea matInput [(ngModel)]="v.description" name="description"></textarea>
        </mat-form-field>
        <div class="image">
          <mat-label>Description</mat-label>
          <input #importImage hidden type="file" onclick="this.value=null"
                 (change)="onImageUploaded($event, v)" [accept]="'image/*'"/>
          <img tabindex="0" class="editable-image" (clickOrEnter)="importImage.click()"
               [src]="cover() | base64toImage" alt="cover">
        </div>
      </div>
      <button mat-raised-button color="primary" [disabled]="form.invalid || !isEditing()">
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

    .image {
      grid-area: image;
      padding: 3em;
      display: grid;
      justify-content: center;
      align-items: center;

      > img {
        object-fit: contain;
        width: 100%;
        height: 100%;
        max-height: 80vh;
        max-width: 90vw;
      }
    }

    .editable-image:hover {
      cursor: pointer;
      filter: blur(1px);
    }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewspaperContentEditorComponent {
  public readonly isUpdating = input.required<boolean>();
  public readonly published = output<Newspaper>();
  public readonly value = input.required<Newspaper>();
  public readonly isEditing = signal(false);
  public readonly isEditingChange = outputFromObservable(toObservable(this.isEditing));
  public readonly cover = linkedSignal(() => this.value().cover);

  public onImageUploaded(event: Event, newspaper: Newspaper) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    const image = fileList?.[0];
    if (image) toBase64(image, v => {
      newspaper.cover = v;
      this.cover.set(v);
    });
  }

  public onSubmit(form: NgForm, value: Newspaper) {
    this.published.emit(value);
  }
}
