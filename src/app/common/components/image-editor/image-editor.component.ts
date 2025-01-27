import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-image-editor',
  templateUrl: './image-editor.component.html',
  styleUrl: './image-editor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageEditorComponent {

}
