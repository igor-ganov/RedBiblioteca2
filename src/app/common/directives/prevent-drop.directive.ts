import {Directive, HostListener} from '@angular/core';
import {map, mergeWith, Observable, of} from "rxjs";
import {outputFromObservable, toSignal} from "@angular/core/rxjs-interop";
import {NgForm} from "@angular/forms";

@Directive({
  selector: '[appPreventDrop]',
})
export class PreventDropDirective {

  public constructor(private readonly _form: NgForm) {
  }

  private readonly valueChanges$ = this._form.valueChanges ?? of();
  private readonly submitted$ = this._form.ngSubmit.asObservable();
  private readonly isEditing$: Observable<boolean> = this.valueChanges$.pipe(
    mergeWith(this.submitted$),
    map(() => (this._form.dirty ?? false) && !this._form.submitted)
  );
  public isEditing = toSignal(this.isEditing$, {initialValue: false});

  public readonly appPreventDrop = outputFromObservable(this.isEditing$);

  @HostListener('window:beforeunload', ['$event'])
  public unloadNotification($event: BeforeUnloadEvent): string | undefined {
    if (this.isEditing()) {
      $event.preventDefault();
    }
    return;
  }
}
