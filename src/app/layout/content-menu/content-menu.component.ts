import {ChangeDetectionStrategy, Component, input} from '@angular/core';
import {ContentMenuItems} from "@app/layout/content-menu/content-menu.items";
import {MatButton} from '@angular/material/button';
import {RouterLink} from '@angular/router';

@Component({
  selector: 'app-content-menu',
  template: `
<div class="container">
  <div class="box">
    @for(item of items(); track item.id){
      <button class="menu-item" color="basic" [routerLink]="'.'" [fragment]="item.id" mat-stroked-button>
        <span>{{item.title}}</span>
      </button>
    }
  </div>
</div>

`,
  styleUrl: './content-menu.component.css',
  imports: [MatButton, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentMenuComponent {
  public readonly items = input.required<ContentMenuItems[]>();
}
