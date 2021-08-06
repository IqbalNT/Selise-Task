import {
  AbstractControl,
  ValidatorFn,
} from '@angular/forms';

export class CustomValidators {


  static match(controlName: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const targetControl = control.parent && control.parent.get(controlName);
      if (!targetControl || targetControl.value !== control.value) {
        return { match: true };
      }
      return null;
    };
  }

  static emailCheck(control: AbstractControl) {
    const val = control.value;
    if (val === null || val === '') {
      return null;
    }

    const pattern1 =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // const pattern1 = /[-!$%^&*()_+|~=`{}[:;<>?,.@#\]]/g;
    const pattern2 =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (val.toString().match(pattern1) || val.toString().match(pattern2)) {
      return null;
    } else {
      return { email: true };
    }
  }

  static cellNumberCheck(control: AbstractControl) {
    const val = control.value;
    if (val === null || val === '') {
      return null;
    }

    const pattern1 = /(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/;
    // const pattern1 = /[-!$%^&*()_+|~=`{}[:;<>?,.@#\]]/g;
    const pattern2 = /(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/;
    if (val.toString().match(pattern1) || val.toString().match(pattern2)) {
      return null;
    } else {
      return { cellNumber: true };
    }
  }
  static alfaNumericCheck(control: AbstractControl) {
    const val = control.value;
    if (val === null || val === '') {
      return null;
    }

    const pattern1 = /^[a-zA-Z0-9]{3}$/;
    // const pattern1 = /[-!$%^&*()_+|~=`{}[:;<>?,.@#\]]/g;
    const pattern2 = /^[a-zA-Z0-9]{3}$/;
    if (val.toString().match(pattern1) || val.toString().match(pattern2)) {
      return null;
    } else {
      return { alfaNumeric: true };
    }
  }

}
