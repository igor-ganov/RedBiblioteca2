import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIconButton, MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-top-bar-panel-button',
    templateUrl: './top-bar-panel-button.component.html',
    styleUrl: './top-bar-panel-button.component.css',
    imports: [MatIconButton, MatIcon, MatButton]
})
export class TopBarPanelButtonComponent {

  @Input() public horizontal = true;
  @Input({required: true}) public icon = '';
  @Input({required: true}) public text = '';
  @Output() onButtonClick = new EventEmitter<MouseEvent>();

  public onClick(event: MouseEvent) {
    this.onButtonClick.emit(event);
  }

}
