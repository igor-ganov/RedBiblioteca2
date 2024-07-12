import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-top-bar-panel-button',
  templateUrl: './top-bar-panel-button.component.html',
  styleUrl: './top-bar-panel-button.component.css'
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
