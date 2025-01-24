import { Component } from '@angular/core';

@Component({
    selector: 'app-top-bar-panel',
    templateUrl: './top-bar-panel.component.html',
    styleUrl: './top-bar-panel.component.css',
    standalone: false
})
export class TopBarPanelComponent {
  public opened = false;
  onOpenSlider(){
    this.opened =! this.opened;
  }
}
