/**
 * Created BY HMSPL
 * Moment date pipe 
 * Modified By selva on 10/08/2018
 * Modified Description : Created pipe for date
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'units'
})
export class UnitsPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if (value >= 1000 && value <= 9000) {
      return value.toString().charAt(0) + 'K';
    } else if (value >= 10000 && value <= 90000) {
      return value.toString().substring(0, 2) + 'K';
    } else if (value >= 100000 && value <= 900000) {
      return value.toString().charAt(0) + 'M';
    } else if (value >= 1000000 && value <= 9000000) {
      return value.toString().substring(0, 2) + 'M';
    } else {
      return value;
    }
  }

}
