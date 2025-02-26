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
import {TextHost} from "@common/lang-system/TextHost";

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    @if (text$ | async; as text) {
      <h1 mat-dialog-title>{{ data.title ?? text.defaultTitle }}</h1>
      <div mat-dialog-content>
        <p>{{ data.text ?? text.defaultText }}</p>
      </div>
      <div class="buttons-container" mat-dialog-actions>
        <button mat-button (click)="onNoClick()">{{ text.cancelButton }}</button>
        <button mat-button mat-dialog-close="confirm" cdkFocusInitial>{{ text.okButton }}</button>
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

  public text$;

  public constructor() {
    const textHost = inject(TextHost);

    this.text$ = textHost.getText('confirmationDialogText');
  }

  public onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface ConfirmationDialogData {
  text?: string;
  title?: string;
}
