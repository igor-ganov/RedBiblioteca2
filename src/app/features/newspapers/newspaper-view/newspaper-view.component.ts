import { Component, EventEmitter, Input, Output, inject, input } from '@angular/core';
import { Newspaper } from '../models/Newspaper';
import { map } from 'rxjs';
import { UserService } from '@common/permission-system/UserService';
import { toBase64 } from '@common/help/help-fuctions';
import { TextEditorComponent } from '../../../common/components/text-editor/text-editor.component';
import { MatButton } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { AsyncPipe } from '@angular/common';
import { Base64ToImage } from '@common/help/pipelines/Base64ToImage';

@Component({
    selector: 'app-newspaper-view',
    templateUrl: './newspaper-view.component.html',
    styleUrl: './newspaper-view.component.css',
    imports: [TextEditorComponent, MatButton, MatProgressSpinner, AsyncPipe, Base64ToImage]
})
export class NewspaperViewComponent {
  public readonly isUpdating = input.required<boolean>();
  @Output() published = new EventEmitter<Newspaper>();
  private _newspaper!: Newspaper;
  @Input({ required: true })
  public get newspaper(): Newspaper {
    return this._newspaper;
  }
  public set newspaper(value: Newspaper) {
    this._newspaper = value;
  }
  public readonly readonly$ = inject(UserService).currentUser$.pipe(map(u => u === undefined));

  onImageUploaded(event: Event, newspaper: Newspaper) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    const image = fileList?.[0];
    if(image) toBase64(image, v => newspaper.cover = v);
  }
  onPublish(newspaper: Newspaper) {
    this.published.next(newspaper);
  }
}
