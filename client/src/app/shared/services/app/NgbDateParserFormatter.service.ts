// import { padNumber, toInteger, isNumber } from '@ng-bootstrap/ng-bootstrap/util/util';
import { NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Injectable } from '@angular/core';

// export function NGB_DATEPICKER_PARSER_FORMATTER_FACTORY() {
//   return new NgbDateISOParserFormatter();
// }

/**
 * Abstract type serving as a DI token for the service parsing and formatting dates for the NgbInputDatepicker
 * directive. A default implementation using the ISO 8601 format is provided, but you can provide another implementation
 * to use an alternative format.
 */
// @Injectable({providedIn: 'root', useFactory: NGB_DATEPICKER_PARSER_FORMATTER_FACTORY})
// export abstract class NgbDateParserFormatter {
  /**
   * Parses the given value to an NgbDateStruct. Implementations should try their best to provide a result, even
   * partial. They must return null if the value can't be parsed.
   * @param value the value to parse
   */
  // abstract parse(value: string): NgbDateStruct;

  /**
   * Formats the given date to a string. Implementations should return an empty string if the given date is null,
   * and try their best to provide a partial result if the given date is incomplete or invalid.
   * @param date the date to format as a string
   */
  // abstract format(date: NgbDateStruct): string;
// }

@Injectable()
export class NgbDateCustomParserFormatter extends NgbDateParserFormatter {

  parse(value: string): NgbDateStruct {
    if (value) {
      const dateParts = value.trim().split('/');
      if (dateParts.length === 1 && isNumber(dateParts[0])) {
        return {day: toInteger(dateParts[0]), month: null, year: null};
      } else if (dateParts.length === 2 && isNumber(dateParts[0]) && isNumber(dateParts[1])) {
        return {day: toInteger(dateParts[0]), month: toInteger(dateParts[1]), year: null};
      } else if (dateParts.length === 3 && isNumber(dateParts[0]) && isNumber(dateParts[1]) && isNumber(dateParts[2])) {
        return {day: toInteger(dateParts[0]), month: toInteger(dateParts[1]), year: toInteger(dateParts[2])};
      }
    }
    return null;
  }

  format(date: NgbDateStruct): string {
    return date ?
      `${isNumber(date.day) ? padNumber(date.day) : ''}/${isNumber(date.month) ? padNumber(date.month) : ''}/${date.year}` :
      '';
  }
}

export function toInteger(value: any): number {
  return parseInt(`${value}`, 10);
}

export function toString(value: any): string {
  return (value !== undefined && value !== null) ? `${value}` : '';
}

export function getValueInRange(value: number, max: number, min = 0): number {
  return Math.max(Math.min(value, max), min);
}

export function isString(value: any): value is string {
  return typeof value === 'string';
}

export function isNumber(value: any): value is number {
  return !isNaN(toInteger(value));
}

export function isInteger(value: any): value is number {
  return typeof value === 'number' && isFinite(value) && Math.floor(value) === value;
}

export function isDefined(value: any): boolean {
  return value !== undefined && value !== null;
}

export function padNumber(value: number) {
  if (isNumber(value)) {
    return `0${value}`.slice(-2);
  } else {
    return '';
  }
}

export function regExpEscape(text) {
  return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
}