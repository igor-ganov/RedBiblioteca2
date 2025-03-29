import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from '@angular/material/dialog';
import {MatButton} from '@angular/material/button';
import {AsyncPipe} from '@angular/common';
import {TextDictionaryService} from "@common/lang-system/TextDictionaryService";
import {Observable} from "rxjs";
import {TextDictionary} from "@common/lang-system/TextDictionary";

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    @if (text$ | async; as text) {
      <h1 mat-dialog-title>{{ data.title ?? text.defaultConfirmationTitle }}</h1>
      <div mat-dialog-content>
        <p>{{ data.text ?? text.defaultConfirmationText }}</p>
      </div>
      <div class="buttons-container" mat-dialog-actions>
        <button mat-button (click)="onNoClick()">{{ text.buttonCancel }}</button>
        <button mat-button mat-dialog-close="confirm" cdkFocusInitial>{{ text.buttonOk }}</button>
      </div>
    }
  `,
  styles: `
    .buttons-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
    }`,
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatDialogTitle, MatDialogContent, MatDialogActions, MatButton, MatDialogClose, AsyncPipe]
})
export class ConfirmationDialogComponent {
  public dialogRef = inject<MatDialogRef<ConfirmationDialogComponent>>(MatDialogRef);
  public data = inject<ConfirmationDialogData>(MAT_DIALOG_DATA);

  public text$: Observable<TextDictionary>;

  public constructor() {

    this.text$ = inject(TextDictionaryService).textDictionary$;
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface ConfirmationDialogData {
  text?: string;
  title?: string;
}
