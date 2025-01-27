import {ChangeDetectionStrategy, Component} from '@angular/core';
import {routsPaths} from "@common/routes/routes";
import {FirebasePanelComponent} from './firebase-panel/firebase-panel.component';
import {MatDivider} from '@angular/material/divider';
import {UsersPanelComponent} from './users-panel/users-panel.component';
import {MatAnchor} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.scss',
  imports: [FirebasePanelComponent, MatDivider, UsersPanelComponent, MatAnchor, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPanelComponent {
  public readonly contentManager = routsPaths.contentManager;
}
