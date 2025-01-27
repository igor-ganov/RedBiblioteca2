import {Component, input} from '@angular/core';
import {ContentMenuItems} from "@app/layout/content-menu/content-menu.items";
import { MatButton } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-content-menu',
    templateUrl: './content-menu.component.html',
    styleUrl: './content-menu.component.css',
    imports: [MatButton, RouterLink]
})
export class ContentMenuComponent {
  public readonly items = input.required<ContentMenuItems[]>();
}
