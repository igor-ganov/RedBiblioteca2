import { Component, EventEmitter, Input, Output } from '@angular/core';
import { errorAlert } from '../../help/help-fuctions';

@Component({
    selector: 'app-text-editor',
    templateUrl: './text-editor.component.html',
    styleUrl: './text-editor.component.css',
    standalone: false
})
export class TextEditorComponent {
  private _buttonPositions: Position = 'right';
  @Input()
  public inline = false;
  @Input()
  public get buttonPositions(): Position {
    return this._buttonPositions;
  }
  public set buttonPositions(value: Position) {
    this._buttonPositions = value;
    this.orientationClass = this.getOrientationClassByPosition(value);
  }
  private getOrientationClassByPosition(value: Position): string{
    switch (value) {
      case 'top': return 'buttons-orientation-top';
      case 'bottom': return 'buttons-orientation-bottom';
      case 'left': return 'buttons-orientation-left';
      case 'right': return 'buttons-orientation-right';
      default: return errorAlert('unexpected values of Position:' + value)!;
    }
  }
  public orientationClass = 'buttons-orientation-right';

  private _value!: string;
  @Output() public readonly valueChange = new EventEmitter<string>();
  @Input({ required: true })
  public get value(): string {
    return this._value;
  }
  public set value(value: string) {
    this._value = value;
    this.editingValue = value;
    this.valueChange.emit(value);
  }
  public editingValue = '';
  private _editing = false;
  @Output() public readonly editingChange = new EventEmitter<boolean>();
  @Input() public get editing() {
    return this._editing;
  }
  public set editing(value) {
    this._editing = value;
    this.editingChange.emit(value);
  }
  onEditing(event: Event) {
    const newText = (event.target as HTMLElement).textContent ?? '';
    //this.editingValue = newText;
    this.value = newText;
  }
  onEdit() {
    this.editing = true;
    this.editingValue = this.value;
  }
  onApply() {
    this.editing = false;
    this.value = this.editingValue;
  }
  onCancel() {
    this.editing = false;
    this.editingValue = this.value;
  }
}

export type Position = 'top' | 'right' | 'bottom' | 'left';