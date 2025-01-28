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

<!-- <div [ngClass]="orientationClass" class="text-view edit-view" *ngIf="editing; else readonly">
    <div class="edit-text" [textContent]="editingValue" (input)="onEditing($event)" contenteditable>
        {{editingValue}}
    </div>
    <div class="read-buttons-container">
        <div class="buttons">
            <button color="primary" mat-icon-button (click)="onApply()"><mat-icon>done</mat-icon></button>
            <button color="primary" mat-icon-button (click)="onCancel()"><mat-icon>cancel</mat-icon></button>
        </div>
    </div>
</div>

<ng-template #readonly>
    <div [ngClass]="orientationClass" class="text-view read-view">
        <div class="read-text">{{value}}</div>
        <div class="read-buttons-container">
            <div class="buttons">
                <button color="primary" mat-icon-button (click)="onEdit()"><mat-icon>edit</mat-icon></button>
            </div>
        </div>
    </div>
</ng-template> -->

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
        return errorAlert('unexpected values of Position:' + value)!;
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
    const newText = (event.target as HTMLElement).textContent ?? '';
    //this.editingValue = newText;
    this.value = newText;
  }

  private onEdit() {
    this.editing = true;
    this.editingValue.set(this.value);
  }

  private onApply() {
    this.editing = false;
    this.value = this.editingValue();
  }

  private onCancel() {
    this.editing = false;
    this.editingValue.set(this.value);
  }
}

export type Position = 'top' | 'right' | 'bottom' | 'left';
