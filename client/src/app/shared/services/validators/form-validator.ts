import { Injectable } from '@angular/core';
import { AbstractControl, FormControl, ValidationErrors, FormGroup, FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormValidatorService {

  constructor() { }

  static matchConfirmPassword(control: FormControl): ValidationErrors | null {
    if (!control.parent) {
      return;
    }

    const passwordCtrl = control.parent.get('password') as FormControl;
    const repasswordCtrl = control as FormControl;
    if (!passwordCtrl) {
      throw new Error('mathcConfirmPassword(): password control is not found in the parent group');
    }

    passwordCtrl.valueChanges.subscribe(() => {
      repasswordCtrl.updateValueAndValidity();
    });

    const password = passwordCtrl.value;
    const repassword = repasswordCtrl.value;

    if (password !== repassword) {
      return {passwordNotMatched: true};
    }
    return null;
  }

  isInvalid(control: AbstractControl) {
    const invalid = control.invalid && ( control.touched || control.dirty );
    return invalid ? 'form-control-danger' : '';
  }

  // mark all controls dirty
  markControlsTouched(group: any) {
    for(let i in group.controls){
      group.controls[i].markAsTouched();
      if(group.controls[i] instanceof FormGroup || group.controls[i] instanceof FormArray) {
        this.markControlsTouched(group.controls[i]);
      }
    }
  }

  minCalDate = {year: 1700, month: 1, day:1}

}
