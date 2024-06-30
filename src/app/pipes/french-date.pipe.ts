import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'frenchDate',
  standalone: true,
})
export class FrenchDatePipe implements PipeTransform {
  transform(value: string): string {
    const date = new Date(value);
    if (!isNaN(date.getTime())) {
      // French date format: DD/MM/YYYY
      return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getFullYear()}`;
    }
    return 'Date invalide';
  }
}