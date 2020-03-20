import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ValidationErrors, AbstractControl } from '@angular/forms';
import { LoginService } from './login.service';
import { User } from 'src/app/models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  newUser: boolean = false;
  registerForm: FormGroup;
  loginForm: FormGroup;
  showPassword: boolean;
  activeUser: User = {
    realm: "",
    username: "",
    email: "",
    password: "",
    emailVerified: false,
    id: null,
  };
  logged_in: boolean = false;

  constructor(private fb: FormBuilder, private loginService: LoginService, private router: Router) {


    //Form Group for Registration
    this.registerForm = fb.group({
      'username': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(12)])],
      'email': [null, Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])],
      'password': [null, Validators.compose([Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}')])],
      'retype_password': [null, Validators.compose([Validators.required, this.matchValues('password')])]
    })

    //Form Group for Login
    this.loginForm = fb.group({
      'username': [null, Validators.compose([Validators.required, Validators.minLength(5), Validators.maxLength(12)])],
      'password': [null, Validators.compose([Validators.required, Validators.minLength(9)])]
    })
  }


  ngOnInit() { }

  //Fired on Sign Up button click event
  register(value: any): void {
    console.log('Form submited!')
    console.log(value);
    this.activeUser.username = value.username;
    this.activeUser.password = value.password;
    this.activeUser.email = value.email;
    this.loginService.registerUser(this.activeUser).then(response => {
      console.log(response);
      this.newUser = false;
    });
  }

  //Fired on Login button click event
  login(value: any): void {
    console.log('Form submited!')
    console.log(value);
    this.activeUser.username = value.username;
    this.activeUser.password = value.password;
    this.activeUser.email = value.email;
    this.loginService.loginUser(this.activeUser).then(response => {
      console.log(response);
      this.newUser = false;
    });
    this.router.navigate(['']);
  }

  //Match typed passwords while registration
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

  //Toggle show/hide password
  public onPasswordToggle(): void {
    this.showPassword = !this.showPassword;
  }
}
