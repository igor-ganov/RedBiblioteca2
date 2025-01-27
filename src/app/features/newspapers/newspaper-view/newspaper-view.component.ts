import {ChangeDetectionStrategy, Component, inject, input, output} from '@angular/core';
import {Newspaper} from '../models/Newspaper';
import {map} from 'rxjs';
import {UserService} from '@common/permission-system/UserService';
import {toBase64} from '@common/help/help-fuctions';
import {TextEditorComponent} from '@common/components/text-editor/text-editor.component';
import {MatButton} from '@angular/material/button';
import {MatProgressSpinner} from '@angular/material/progress-spinner';
import {AsyncPipe} from '@angular/common';
import {Base64ToImage} from '@common/help/pipelines/Base64ToImage';

@Component({
  selector: 'app-newspaper-view',
  templateUrl: './newspaper-view.component.html',
  styleUrl: './newspaper-view.component.css',
  imports: [TextEditorComponent, MatButton, MatProgressSpinner, AsyncPipe, Base64ToImage],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewspaperViewComponent {
  public readonly isUpdating = input.required<boolean>();
  public readonly published = output<Newspaper>();
  public readonly newspaper = input.required<Newspaper>();

  public readonly readonly$ = inject(UserService).currentUser$.pipe(map(u => u === undefined));

  public onImageUploaded(event: Event, newspaper: Newspaper) {
    const element = event.currentTarget as HTMLInputElement;
    const fileList: FileList | null = element.files;
    const image = fileList?.[0];
    if (image) toBase64(image, v => newspaper.cover = v);
  }

  public onPublish(newspaper: Newspaper) {
    this.published.emit(newspaper);
  }
}
