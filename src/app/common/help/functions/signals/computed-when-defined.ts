import {computed} from "@angular/core";

export function computedWhenDefined<T, TResult>(params: () => T | undefined, computeFn: (value: T) => TResult) {
  return computed(() => {
    const value = params();
    if (value !== undefined) {
      return computeFn(value);
    }
    return undefined;
  });
}
