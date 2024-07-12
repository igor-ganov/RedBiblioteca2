import { Component, ElementRef, HostListener, Renderer2, ViewChild, inject } from '@angular/core';
import { SideMenuService } from '../services/SideMenuService';
import { MatButton } from '@angular/material/button';

@Component({
  selector: 'app-side-menu-button',
  templateUrl: './side-menu-button.component.html',
  styleUrl: './side-menu-button.component.css'
})
export class SideMenuButtonComponent {
  @ViewChild('menuButton') menu!: MatButton;
  public readonly sideMenuService = inject(SideMenuService);
  private readonly renderer = inject(Renderer2)
  constructor(){
    
  }
  @HostListener('window:click', ['$event'])
  closeMenuIfClickAway(e: Event)
  {
    if(this.sideMenuService.opened && !this.menu._elementRef.nativeElement.contains(e.target)) this.sideMenuService.opened = false;
  }
}
