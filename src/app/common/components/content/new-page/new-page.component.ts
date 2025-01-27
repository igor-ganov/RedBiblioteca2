import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styleUrl: './new-page.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewPageComponent {

}
