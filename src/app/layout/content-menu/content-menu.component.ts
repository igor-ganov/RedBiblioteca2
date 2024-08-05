import {Component, Input} from '@angular/core';
import {ContentMenuItems} from "@app/layout/content-menu/content-menu.items";

@Component({
  selector: 'app-content-menu',
  templateUrl: './content-menu.component.html',
  styleUrl: './content-menu.component.css'
})
export class ContentMenuComponent {
  @Input({required: true})
  public items!: ContentMenuItems[];
}
