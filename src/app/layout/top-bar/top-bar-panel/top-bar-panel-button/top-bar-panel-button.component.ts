import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-top-bar-panel-button',
  templateUrl: './top-bar-panel-button.component.html',
  styleUrl: './top-bar-panel-button.component.css',
  imports: [MatIconButton, MatIcon, MatButton],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopBarPanelButtonComponent {

  @Input() public horizontal = true;
  @Input({required: true}) public icon = '';
  @Input({required: true}) public text = '';
  @Output() public buttonClick = new EventEmitter<MouseEvent>();

  public onClick(event: MouseEvent) {
    this.buttonClick.emit(event);
  }

}
