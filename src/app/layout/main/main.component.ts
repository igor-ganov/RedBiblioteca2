import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  selector: 'app-main',
  template: `
<div class="container">
  <router-outlet/>
</div>

`,
  styleUrl: './main.component.css',
  imports: [RouterOutlet],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainComponent {

}
