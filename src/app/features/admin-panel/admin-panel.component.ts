import { Component, inject } from '@angular/core';
import { UserService } from '@common/permission-system/UserService';
import { switchMap } from 'rxjs';
import { UserDataRepository } from '../../common/permission-system/UserDataRepository';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrl: './admin-panel.component.css'
})
export class AdminPanelComponent {
}
