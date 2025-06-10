import {ChangeDetectionStrategy, Component, HostListener, inject, viewChild} from '@angular/core';
import {SideMenuService} from '../services/SideMenuService';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-side-menu-button',
  template: `
    <button #menuButton
            color="primary"
            class="icon-button"
            (click)="sideMenuService.opened = !sideMenuService.opened"
            mat-stroked-button>
      <mat-icon>menu</mat-icon>
    </button>

  `,
  styleUrl: './side-menu-button.component.css',
  imports: [MatButton, MatIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuButtonComponent {
  public readonly menu = viewChild.required<MatButton>('menuButton');
  public readonly sideMenuService = inject(SideMenuService);

  @HostListener('window:click', ['$event'])
  public closeMenuIfClickAway(e: Event) {
    if (!this.sideMenuService.opened) return;
    if (e.target instanceof Node && this.menu()._elementRef.nativeElement.contains(e.target)) return;
    this.sideMenuService.opened = false;
  }
}
