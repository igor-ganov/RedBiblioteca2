import {computed} from "@angular/core";

export function computedWhenDefined<T, TResult>(request: () => T | undefined, computeFn: (value: T) => TResult) {
  return computed(() => {
    const value = request();
    if (value !== undefined) {
      return computeFn(value);
    }
    return undefined;
  });
}
