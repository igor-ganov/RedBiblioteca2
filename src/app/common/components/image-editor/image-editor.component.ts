import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-image-editor',
  template: `
<p>image-editor works!</p>

`,
  styleUrl: './image-editor.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageEditorComponent {

}
