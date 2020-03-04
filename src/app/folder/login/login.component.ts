import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  newUser: boolean = false;
  name: string;
  authForm: FormGroup;
  showPassword: boolean;
  logForm(form) {
    console.log(form.value)
  }
  constructor(fb: FormBuilder) {
    this.authForm = fb.group({
      'username': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(10)])],
      'email': [null, Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(8)])],
      'retype_password': [null, Validators.compose([Validators.required, this.matchValues('password')])],
    })
  }

  register(value: any): void {
    console.log('Form submited!')
    console.log(value);
  }
  ngOnInit() { }

  login(form) {
    // this.authService.register(form.value).subscribe((res) => {
    //   this.router.navigateByUrl('home');
    // });
    console.log(form.value);
  }

  matchValues(
    matchTo: string // name of the control to match to
  ): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null => {
      return !!control.parent &&
        !!control.parent.value &&
        control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
    };
  }

  public onPasswordToggle(): void {
    this.showPassword = !this.showPassword;
  }
}
