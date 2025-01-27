import {ChangeDetectionStrategy, Component, inject} from '@angular/core';
import {UserDataRepository} from '@common/permission-system/UserDataRepository';
import {UserRoles} from '@common/permission-system/UserRoles';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {AsyncPipe, KeyValuePipe} from '@angular/common';

@Component({
  selector: 'app-users-panel',
  templateUrl: './users-panel.component.html',
  styleUrl: './users-panel.component.css',
  imports: [
    MatTableModule,
    AsyncPipe,
    KeyValuePipe,
    MatFormFieldModule,
    MatSelectModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPanelComponent {

  public readonly userRoles: Map<number, string>;

  public constructor() {
    this.userRoles = getEnumWithNames(UserRoles);
  }

  public readonly displayedColumns = ['id', 'role'];

  public readonly userRepository = inject(UserDataRepository);
  public readonly users$ = this.userRepository.getAll();
}

function getEnumWithNames(type: object) {
  const keys = Object.keys(type);
  const names = keys.slice(keys.length / 2);
  return new Map(names.map((n, i) => [i, n]));
}
