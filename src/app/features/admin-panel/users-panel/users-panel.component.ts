import { Component, inject, OnInit } from '@angular/core';
import { UserData, UserDataRepository } from '@common/permission-system/UserDataRepository';
import { UserRoles } from '@common/permission-system/UserRoles';
import { UserService } from '@common/permission-system/UserService';
import { Observable } from 'rxjs';
import { MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow } from '@angular/material/table';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';
import { MatOption } from '@angular/material/core';
import { AsyncPipe, KeyValuePipe } from '@angular/common';

@Component({
    selector: 'app-users-panel',
    templateUrl: './users-panel.component.html',
    styleUrl: './users-panel.component.css',
    imports: [MatTable, MatColumnDef, MatHeaderCellDef, MatHeaderCell, MatCellDef, MatCell, MatFormField, MatLabel, MatSelect, MatOption, MatHeaderRowDef, MatHeaderRow, MatRowDef, MatRow, AsyncPipe, KeyValuePipe]
})
export class UsersPanelComponent implements OnInit {

  public userRoles: Map<number, string>;

  constructor(){
    this.userRoles = getEnumWithNames(UserRoles);
  }

  public displayedColumns = ['id', 'role'];

  userRepository = inject(UserDataRepository);
  userService = inject(UserService);
  users$?: Observable<UserData[]>;
  ngOnInit(): void {
    setTimeout(() => {
      this.users$ = this.userRepository.getAll();
    });
  }
}

function getEnumNames(type: {}){
  const keys = Object.keys(type);
  return keys.slice(keys.length / 2);
}
function getEnumWithNames(type: {}){
  const keys = Object.keys(type);
  const names = keys.slice(keys.length / 2);
  return new Map(names.map((n, i) => [i, n]));
}