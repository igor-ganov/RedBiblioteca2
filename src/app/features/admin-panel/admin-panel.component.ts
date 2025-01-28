import {ChangeDetectionStrategy, Component} from '@angular/core';
import {routsPaths} from "@common/routes/routes";
import {FirebasePanelComponent} from './firebase-panel/firebase-panel.component';
import {MatDivider} from '@angular/material/divider';
import {UsersPanelComponent} from './users-panel/users-panel.component';
import {MatAnchor} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-admin-panel',
  template: `
<div class="container">
  <div>
    <span>Firebase panel</span>
    <app-firebase-panel/>
    <mat-divider/>
  </div>
  <div>
    <span>User panel</span>
    <app-users-panel/>
    <mat-divider/>
  </div>
  <div class="content-manager">
    <span>Content manager</span>
    <a [routerLink]="[contentManager]" mat-stroked-button>Open</a>
  </div>
</div>

`,
  styleUrl: './admin-panel.component.scss',
  imports: [FirebasePanelComponent, MatDivider, UsersPanelComponent, MatAnchor, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminPanelComponent {
  public readonly contentManager = routsPaths.contentManager;
}
