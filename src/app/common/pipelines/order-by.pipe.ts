import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'orderBy',
  pure: true
})
export class OrderByPipe implements PipeTransform {

  public transform<T>(value: T[], ...orderKey: (keyof T)[]): T[] {
    console.log(value);
    if (orderKey.length == 0) return value;
    if (orderKey.length == 1) return value.sort((a, b) => a[orderKey[0]] > b[orderKey[0]] ? 1 : -1);
    else return value.sort((a, b) => {
      for (const key of orderKey) {
        if (a[key] > b[key]) return 1;
        if (a[key] < b[key]) return -1;
      }
      return 0;
    });

  }
}
