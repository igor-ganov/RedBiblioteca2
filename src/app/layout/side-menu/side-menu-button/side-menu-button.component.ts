import {ChangeDetectionStrategy, Component, HostListener, inject, viewChild} from '@angular/core';
import {SideMenuService} from '../services/SideMenuService';
import {MatButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-side-menu-button',
  templateUrl: './side-menu-button.component.html',
  styleUrl: './side-menu-button.component.css',
  imports: [MatButton, MatIcon],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideMenuButtonComponent {
  public readonly menu = viewChild.required<MatButton>('menuButton');
  public readonly sideMenuService = inject(SideMenuService);

  @HostListener('window:click', ['$event'])
  public closeMenuIfClickAway(e: Event) {
    if (this.sideMenuService.opened && !this.menu()._elementRef.nativeElement.contains(e.target)) this.sideMenuService.opened = false;
  }
}
