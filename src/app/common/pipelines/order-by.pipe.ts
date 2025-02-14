import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'orderBy',
  pure: true
})
export class OrderByPipe implements PipeTransform {

  public transform<T>(value: T[], orderKey: keyof T): T[] {
    console.log(value);
    return value.sort((a, b) => a[orderKey] > b[orderKey] ? 1 : -1);
  }
}
