import {DestroyRef, inject, Injectable} from "@angular/core";
import {catchError, firstValueFrom, Observable, Subscription, throwError} from "rxjs";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {EventMessageQueue} from "@common/help/services/EventMassageQueue";

@Injectable()
export class SubscriptionService {
  private readonly destroyRef = inject(DestroyRef);
  private readonly eventMessageQueue = inject(EventMessageQueue);


  public subscribe<T>(observable: Observable<T>,
                      optionsOrHandler: ({
                        errorMessage?: string,
                        handler?: (value: T) => void
                      } | ((value: T) => void)) = {}): Subscription {
    const handler = typeof optionsOrHandler === 'function' ? optionsOrHandler : optionsOrHandler.handler;
    const errorMessage = typeof optionsOrHandler === 'function' ? undefined : optionsOrHandler.errorMessage;
    return observable.pipe(
      takeUntilDestroyed(this.destroyRef),
      catchError(e => {
        this.eventMessageQueue.pushError(errorMessage ?? e);
        return throwError(() => e);
      })
    )
      .subscribe(handler);
  }

  public async runAsync<T>(observable: Observable<T> | Promise<T>) {
    try {
      if (observable instanceof Promise) return await observable;
      return await firstValueFrom(observable);
    } catch (e) {
      this.eventMessageQueue.pushError(e instanceof Error ? e : JSON.stringify(e));
    }
    return;
  }
}

export function createSubscriptionService(): SubscriptionService {
  return new SubscriptionService();
}

export const createErrorHandler = () => {
  const eventMessageQueue = inject(EventMessageQueue);
  return <T>(errorMessage?: string) =>
    catchError<T, Observable<T>>((error) => {
      eventMessageQueue.pushError(errorMessage ?? error);
      return throwError(() => error);
    });
}
