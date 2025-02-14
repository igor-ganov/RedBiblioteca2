import {Pipe, PipeTransform} from "@angular/core";

@Pipe({
  name: 'filterNullBy',
  pure: true
})
export class FilterNullByPipe implements PipeTransform {

  public transform<T>(value: T[], orderKey: keyof T): T[] {
    console.log(value);
    return value.filter((a) => a[orderKey] != null);
  }
}
