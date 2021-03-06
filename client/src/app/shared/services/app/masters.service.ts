import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms'
import { of } from "rxjs";

@Injectable
({
  providedIn: 'root',
})

export class MastersService {

    constructor() {
    }
    
public hours: any = {rows:[
    { id: '00', name: '00'}, 
    { id: '01', name: '01'}, 
    { id: '02', name: '02'}, 
    { id: '03', name: '03'}, 
    { id: '04', name: '04'}, 
    { id: '05', name: '05'}, 
    { id: '06', name: '06'}, 
    { id: '07', name: '07'}, 
    { id: '08', name: '08'}, 
    { id: '09', name: '09'}, 
    { id: '10', name: '10'}, 
    { id: '11', name: '11'}, 
    { id: '12', name: '12'}, 
    { id: '13', name: '13'}, 
    { id: '14', name: '14'}, 
    { id: '15', name: '15'}, 
    { id: '16', name: '16'}, 
    { id: '17', name: '17'}, 
    { id: '18', name: '18'}, 
    { id: '19', name: '19'}, 
    { id: '20', name: '20'}, 
    { id: '21', name: '21'}, 
    { id: '22', name: '22'}, 
    { id: '23', name: '23'}, 
]}

public minutes: any = {rows: [
    {id: '00', name: '00'},
    {id: '01', name: '01'},
    {id: '02', name: '02'},
    {id: '03', name: '03'},
    {id: '04', name: '04'},
    {id: '05', name: '05'},
    {id: '06', name: '06'},
    {id: '07', name: '07'},
    {id: '08', name: '08'},
    {id: '09', name: '09'},
    {id: '10', name: '10'},
    {id: '11', name: '11'},
    {id: '12', name: '12'},
    {id: '13', name: '13'},
    {id: '14', name: '14'},
    {id: '15', name: '15'},
    {id: '16', name: '16'},
    {id: '17', name: '17'},
    {id: '18', name: '18'},
    {id: '19', name: '19'},
    {id: '20', name: '20'},
    {id: '21', name: '21'},
    {id: '22', name: '22'},
    {id: '23', name: '23'},
    {id: '24', name: '24'},
    {id: '25', name: '25'},
    {id: '26', name: '26'},
    {id: '27', name: '27'},
    {id: '28', name: '28'},
    {id: '29', name: '29'},
    {id: '30', name: '30'},
    {id: '31', name: '31'},
    {id: '32', name: '32'},
    {id: '33', name: '33'},
    {id: '34', name: '34'},
    {id: '35', name: '35'},
    {id: '36', name: '36'},
    {id: '37', name: '37'},
    {id: '38', name: '38'},
    {id: '39', name: '39'},
    {id: '40', name: '40'},
    {id: '41', name: '41'},
    {id: '42', name: '42'},
    {id: '43', name: '43'},
    {id: '44', name: '44'},
    {id: '45', name: '45'},
    {id: '46', name: '46'},
    {id: '47', name: '47'},
    {id: '48', name: '48'},
    {id: '49', name: '49'},
    {id: '50', name: '50'},
    {id: '51', name: '51'},
    {id: '52', name: '52'},
    {id: '53', name: '53'},
    {id: '54', name: '54'},
    {id: '55', name: '55'},
    {id: '56', name: '56'},
    {id: '57', name: '57'},
    {id: '58', name: '58'},
    {id: '59', name: '59'},
]}

getHourMaster() {
    return of(this.hours);
}

getMinuteMaster() {
    return of(this.minutes);
}

}
