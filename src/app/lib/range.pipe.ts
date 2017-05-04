import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'range'
})
export class RangePipe implements PipeTransform {
    transform<T>(input: any, range: number): number[]  {
        let result = input.slice();
        for (let i = 1; i <= range; i++) {
            result.push(i);
        }

        return result;
    }
}