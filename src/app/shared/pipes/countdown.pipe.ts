import { Pipe, PipeTransform } from '@angular/core';
import { Invigilation } from '../services/invigilation.service';

@Pipe({
  name: 'countdown'
})
export class CountdownPipe implements PipeTransform {
  transform(value: Invigilation, args?: any): string {
    return null;
  }
}
