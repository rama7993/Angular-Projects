import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterPipe implements PipeTransform {

  transform(val: any, filteredString: string, prop: string): any {
    if (val.length === 0 || filteredString === '') return val
    const res: any[] = []
    for (const item of val) {

      if (item[prop] === filteredString) {
        res.push(item)
      }
    }
    return res
  }

}
