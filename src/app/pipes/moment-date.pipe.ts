/**
 * Created BY HMSPL
 * Moment date pipe
 * Modified By selva on 10/08/2018
 * Modified Description : Created pipe for date
 */
import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';
@Pipe({
  name: 'momentDate'
})
export class MomentDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    try {
      if (moment(value).isValid()) {
        if (moment(value).format('DD/MM/YYYY') === moment().subtract(1, 'day').format('DD/MM/YYYY')) {
          return 'Yesterday';
        } else if (moment(value).format('DD/MM/YYYY') === moment().format('DD/MM/YYYY')) {
          return 'Today';
        } else if (moment(value).format('DD/MM/YYYY') === moment(new Date()).add(1, 'day').format('DD/MM/YYYY')) {
          return 'Tomorrow';
        } else {
          return moment(value).format('DD/MM/YYYY');
        }
      }
    } catch (err) {
      return 'Invalid Date';
    }
  }

}
