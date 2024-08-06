import {catchError, Observable, retry, Subscription, throwError} from "rxjs";
import {Injectable} from "@angular/core";

@Injectable()
export class SubscriptionManager {
  private readonly subscribtions: Subscription[] = [];

  public createSubscriptionFor<T>(observable: Observable<T>,
                                  handler: ((value: T) => void) | undefined = undefined,
                                  onError: ((value: Error) => void) | undefined = undefined,
                                  onFinal: (() => void) | undefined = undefined,): void {
    let subscribe: Subscription | undefined;
    subscribe = observable.subscribe({
      next: result => {
        if (handler) {
          try {
            handler(result);
          } finally {
            if (onFinal) onFinal();
          }
        } else if (onFinal) onFinal();
      },
      error: error => {
        if (onError) {
          try {
            onError(error);
          } finally {
            if (onFinal) onFinal();
          }
        } else if (onFinal) onFinal();
      }
    })
    this.subscribtions.push(subscribe)
  }

  public createSubscription<T>(obs: Observable<T>,
                               handler: ((value: T) => void) | undefined = undefined,
                               onError: ((value: Error) => void) | undefined = undefined,
                               onFinal: (() => void) | undefined = undefined,
                               retries: number | undefined = undefined,
                               delay = 1000): void {
    this.createSubscriptionFor(obs.pipe(
      catchError(error => {
        console.error('Retry');
        return throwError(() => error);
      }),
      retry({delay: delay, count: retries}),
    ), handler, onError, onFinal);
  }

  public clearSubscriptions() {
    for (const subscribtion of this.subscribtions) {
      subscribtion.unsubscribe();
    }
    this.subscribtions.length = 0;
  }
}
