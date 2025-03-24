import {Directive, HostListener, inject, input, OnDestroy, output} from '@angular/core';
import {map, Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {ConfirmationDialogComponent} from "@common/confirmation/confirmation-dialog/confirmation-dialog.component";

@Directive({
  selector: '[appConfirmed]',
})
export class ConfirmationDirectiveDirective implements OnDestroy {
  private readonly dialog = inject(MatDialog);

  public readonly confirmationText = input<string | undefined>(undefined);
  public readonly confirmationTitle = input<string | undefined>(undefined);
  public readonly appConfirmed = output<MouseEvent>();

  public subscription?: Subscription;

  @HostListener('click')
  public onClick(e: MouseEvent) {
    if (this.subscription && !this.subscription.closed) this.subscription.unsubscribe();
    this.subscription = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        text: this.confirmationText(),
        title: this.confirmationTitle()
      }
    }).afterClosed()
      .pipe(map(r => {
        return {event: e as MouseEvent, confirmed: r !== undefined}
      }))
      .subscribe(e => {
        if (e.confirmed) this.appConfirmed.emit(e.event);
      });
  }

  public ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) this.subscription.unsubscribe();
  }
}
