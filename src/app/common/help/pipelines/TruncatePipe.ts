import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'truncate'})
export class TruncatePipe implements PipeTransform {
    transform(value: string | undefined, limit: number = 20, replaceSymbol: string = '...'): string | undefined {
        return value && value.length > limit ? value.substring(0, limit) + replaceSymbol : value;
    }
}