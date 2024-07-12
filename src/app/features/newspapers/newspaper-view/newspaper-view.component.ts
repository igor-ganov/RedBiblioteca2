import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { Newspaper } from '../models/Newspaper';
import { map, tap } from 'rxjs';
import { UserService } from '../../../common/permission-system/UserService';
import { toBase64 } from '../../../common/help/help-fuctions';

@Component({
  selector: 'app-newspaper-view',
  templateUrl: './newspaper-view.component.html',
  styleUrl: './newspaper-view.component.css'
})
export class NewspaperViewComponent {
  @Input({ required: true }) public isUpdating!: boolean;
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
    let fileList: FileList | null = element.files;
    const image = fileList?.[0];
    if(image) toBase64(image, v => newspaper.cover = v);
  }
  onPublish(newspaper: Newspaper) {
    this.published.next(newspaper);
  }
}
