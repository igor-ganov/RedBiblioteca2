import {ChangeDetectionStrategy, Component, Input, input, output, signal} from '@angular/core';
import {errorAlert} from '../../help/help-fuctions';
import {NgClass} from '@angular/common';

@Component({
  selector: 'app-text-editor',
  template: `
    <div class="edit-text" [ngClass]="inline()? 'inline' : ''" [textContent]="value" (input)="onEditing($event)"
         contenteditable>
      {{ editingValue() }}
    </div>
  `,
  styleUrl: './text-editor.component.css',
  imports: [NgClass],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextEditorComponent {
  private readonly _buttonPositions = signal<Position>('right');
  public readonly inline = input(false);

  @Input()
  public get buttonPositions(): Position {
    return this._buttonPositions();
  }

  public set buttonPositions(value: Position) {
    this._buttonPositions.set(value);
    this.orientationClass.set(this.getOrientationClassByPosition(value));
  }

  private getOrientationClassByPosition(value: Position): string {
    switch (value) {
      case 'top':
        return 'buttons-orientation-top';
      case 'bottom':
        return 'buttons-orientation-bottom';
      case 'left':
        return 'buttons-orientation-left';
      case 'right':
        return 'buttons-orientation-right';
      default:
        errorAlert('unexpected values of Position:' + value);
        return 'top';
    }
  }

  public readonly orientationClass = signal('buttons-orientation-right');

  private readonly _value = signal<string>(undefined!);
  public readonly valueChange = output<string>();

  @Input({required: true})
  public get value(): string {
    return this._value();
  }

  public set value(value: string) {
    this._value.set(value);
    this.editingValue.set(value);
    this.valueChange.emit(value);
  }

  public readonly editingValue = signal('');
  private readonly _editing = signal(false);
  public readonly editingChange = output<boolean>();

  @Input() public get editing() {
    return this._editing();
  }

  public set editing(value) {
    this._editing.set(value);
    this.editingChange.emit(value);
  }

  public onEditing(event: Event) {
    //this.editingValue = newText;
    this.value = (event.target as HTMLElement).textContent ?? '';
  }
}

export type Position = 'top' | 'right' | 'bottom' | 'left';
