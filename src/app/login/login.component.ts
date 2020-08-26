import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from  '@angular/forms';
import { Router } from  '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  myform: FormGroup;
  isSubmitted  =  false;

  account_validation_messages = {
    
    'email': [
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', message: 'Enter a valid email' }
    ],
    'password': [
      { type: 'required', message: 'Password is required' },
      { type: 'minlength', message: 'Password must be at least 5 characters long' },
      { type: 'pattern', message: 'Your password must contain at least one uppercase, one lowercase, and one number' }
    ]

    }

  constructor(private router: Router,private toastr: ToastrService, private fb: FormBuilder ) { }

  ngOnInit(): void {

    this.myform = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(6),
        Validators.required,
        // Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[a-zA-Z0-9]+$')
     ]))
  
    });
  
  }

  login(){
  
    console.log(this.myform.value);
    this.isSubmitted = true;
    if((this.myform.get('email').value == 'admin@gmail.com') && (this.myform.get('password').value == 'admin123'))
    {
      // alert('welcome admin');
      this.router.navigate(['user-profile']);
    }
    else 
    {
      this.toastr.error('Error', 'Try again', {
        timeOut: 3000,
      });
      // alert('something went wrong try again');
    }
    
  }

}
