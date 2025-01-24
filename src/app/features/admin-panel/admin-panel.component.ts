import {Component} from '@angular/core';
import {routsPaths} from "@common/routes/routes";

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
})
export class AdminPanelComponent {
  public readonly contentManager = routsPaths.contentManager;
}
