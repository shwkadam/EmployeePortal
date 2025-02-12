import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removePrefix',
  standalone: true
})
export class RemovePrefixPipe implements PipeTransform {

  transform(value: string): string {
    if (!value) return value;
    return value.replace(/^(Mr\.|Mrs\.)\s*/i, '').trim();
  }

}
