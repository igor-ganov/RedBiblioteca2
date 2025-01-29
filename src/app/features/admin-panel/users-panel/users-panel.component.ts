import {ChangeDetectionStrategy, Component, inject, resource} from '@angular/core';
import {UserDataRepository} from '@common/permission-system/UserDataRepository';
import {UserRoles} from '@common/permission-system/UserRoles';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import {KeyValuePipe} from '@angular/common';
import {IfSuccess} from "@common/components/errors/if-success.directive";

@Component({
  selector: 'app-users-panel',
  template: `

    <table *ifSuccess="result() as users" mat-table [dataSource]="users" class="mat-elevation-z8">
      <ng-container matColumnDef="id">
        <th mat-header-cell *matHeaderCellDef> Email</th>
        <td mat-cell *matCellDef="let element"> {{ element.email }}</td>
      </ng-container>
      <ng-container matColumnDef="role">
        <th mat-header-cell *matHeaderCellDef> Role</th>
        <td mat-cell *matCellDef="let element">
          <mat-form-field>
            <mat-label>Role</mat-label>
            <mat-select [(value)]="element.role">
              @for (role of userRoles | keyvalue; track role.key) {
                <mat-option [value]="role.key">
                  {{ role.value }}
                </mat-option>
              }
            </mat-select>
          </mat-form-field>
        </td>
      </ng-container>
      <tr mat-header-row *matHeaderRowDef="displayedColumns"></tr>
      <tr mat-row *matRowDef="let row; columns: displayedColumns;"></tr>
    </table>
  `,
  styleUrl: './users-panel.component.css',
  imports: [
    MatTableModule,
    KeyValuePipe,
    MatFormFieldModule,
    MatSelectModule,
    IfSuccess
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersPanelComponent {

  public readonly userRoles: Map<number, string>;

  public constructor() {
    this.userRoles = getEnumWithNames(UserRoles);
  }

  public readonly displayedColumns = ['id', 'role'];

  public readonly userRepository = inject(UserDataRepository);
  private readonly usersResource = resource({loader: () => this.userRepository.getAll()});
  public readonly result = this.usersResource.value.asReadonly();
}

function getEnumWithNames(type: object) {
  const keys = Object.keys(type);
  const names = keys.slice(keys.length / 2);
  return new Map(names.map((n, i) => [i, n]));
}
