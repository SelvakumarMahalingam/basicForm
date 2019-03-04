/**
 * Created BY HMSPL
 * Moment date pipe
 * Modified By selva on 25/08/2018
 * Modified Description : Created pipe for date
 */
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customFilter'
})
export class CustomFilterPipe implements PipeTransform {
  transform(items: any[], event: any): any {
    if (!items || !event.value && !event.prop) {
      return items;
    }
    return items.filter(item => {
      return item[event.prop].toString().search(event.value) !== -1;
    });
  }

}
