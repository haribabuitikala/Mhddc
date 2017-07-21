import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'escapeHtml' })
export class EscapeHtmlPipe implements PipeTransform {
    transform(value: any, args: any[] = []) {
        // We don't like bold text, it's dangerous! Remove it!

        // Naive detection!
        // if(value.indexOf('<b>') != -1) {
        //   return value.replace('<b>', '').replace('<\/b>', '');
        // }
        if (value) {
            return value.replace(/&#(\d+);/g, function (match, dec) {
                return String.fromCharCode(dec);
            });
        }


    }
}



