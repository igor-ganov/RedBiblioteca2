import { Pipe, PipeTransform, inject } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';


@Pipe({
    name: 'base64toImage',
    standalone: false
})
export class Base64ToImage implements PipeTransform {
    private readonly _sanitizer = inject(DomSanitizer);
    transform(value: string | undefined): SafeResourceUrl | undefined {
        return value === undefined ? undefined : this._sanitizer.bypassSecurityTrustResourceUrl(value);
    }
}

@Pipe({
    name: 'base64toStyle',
    standalone: false
})
export class Base64ToStyle implements PipeTransform {
    private readonly _sanitizer = inject(DomSanitizer);
    transform(value: string | undefined): SafeResourceUrl | undefined {
        return value === undefined ? undefined : this._sanitizer.bypassSecurityTrustStyle(`url("${value}")`);
    }
}
