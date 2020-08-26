import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router } from '@angular/router';
import { UsercrudService } from '../services/usercrud.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})

export class UserProfileComponent implements OnInit {

  role: any[] = ['Admin', 'Senior_sales_manager', 'Regional_manager'];
  
  expmanager: any[] = ['Yes', 'No'];
  
  userform: FormGroup;
 
  items: Array<any>;

  constructor(public userservice: UsercrudService, public router: Router, public fb: FormBuilder) { }

  ngOnInit() {
    this.userform = this.fb.group({
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])],
      name: ['', Validators.required],
      role: ['', Validators.required],
      expmanager: ['', Validators.required],
      empcode: ['', Validators.required],
  });

  this.userservice.getUsers()
  .subscribe(result => {
    this.items = result;
  })

}

  onSubmit(value){
    if(this.userform.valid)
    {
      console.log(this.userform.value);
      this.userservice.createUser(value)
    .then(
      res => {
        window.alert('user submitted!');
        this.router.navigate(['/user-profile']);
        this.reset();
      }
    )
  }
  else 
  { 
    alert('Something went wrong try again!');
  }

  }

  reset()
  {
  this.userform = this.fb.group({
    empcode: "",
    name: "",
    email: "",
    role: "",
    expmanager: "",    
  });
  }


}
