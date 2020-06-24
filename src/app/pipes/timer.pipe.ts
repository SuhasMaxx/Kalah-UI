import { Pipe, PipeTransform } from '@angular/core';
/*
 * Raise the value exponentially
 * Takes an exponent argument that defaults to 1.
 * Usage:
 *   value | exponentialStrength:exponent
 * Example:
 *   {{ 2 | exponentialStrength:10 }}
 *   formats to: 1024
*/
@Pipe({name: 'timer'})
export class TimerPipe implements PipeTransform {
  transform(value: number): string {
    if(value < 59){
    if(value < 10){
        return '00:0'+value;
    } else return '00:'+value;
    } else {
    let min  = Math.floor(value/60);
    let sec = value%60;
    return (min < 10 ? '0'+min : min) + ':' + (sec < 10 ? '0'+sec : sec);
    }
  }
}