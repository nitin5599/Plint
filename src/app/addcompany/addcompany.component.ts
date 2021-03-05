import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl,FormBuilder,FormGroup,Validators, FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UsercrudService } from '../services/usercrud.service';
import { ToastrService } from 'ngx-toastr';
import { data } from 'jquery';
import { ISO_8601 } from 'moment';

@Component({
  selector: 'app-addcompany',
  templateUrl: './addcompany.component.html',
  styleUrls: ['./addcompany.component.css']
})
export class AddcompanyComponent implements OnInit {

  headers = new HttpHeaders().set('Content-Type', 'application/json')
  .append('Authorization', 'Bearer ' + window.sessionStorage.getItem('access_token'));

  compform: FormGroup;
 
  items: Array<any>;

  constructor(public userservice: UsercrudService, private toastr: ToastrService,private http: HttpClient, public router: Router, public fb: FormBuilder) { }

  ngOnInit() {

    this.compform = this.fb.group({
      comp_name: ['', Validators.required],
      person_name: ['', Validators.required],      
      person_des: ['', Validators.required],
      item_email: this.fb.array([this.initemail()]),
      item_mob: this.fb.array([this.initmob()]),  
      loc_type: ['', Validators.required],
      loc_area: ['', Validators.required],
      addr: ['', Validators.required],
      refer: ['', Validators.required],
      });
}


showSubmit() {
  this.toastr.success('submitted successfully!');
}


initemail() 
{
  return this.fb.group({
    person_email: ['', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])],
  });
}

initmob() 
{
  return this.fb.group({
    person_mob: ['', Validators.compose([
      Validators.required,
      Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(10)
    ])],
  });
}

get email_formArr() {
  return this.compform.get('item_email') as FormArray;
}

get mob_formArr() {
  return this.compform.get('item_mob') as FormArray;
}

add_email() {
  this.email_formArr.push(this.initemail());
}

delete_email(index: number) {
  this.email_formArr.removeAt(index);
}

add_mob() {
  this.mob_formArr.push(this.initmob());
}

delete_mob(index: number) {
  this.mob_formArr.removeAt(index);
}

  onSubmit()
  {
    if(this.compform.valid)
    {
      let email_num = (this.compform.value.item_email.length);
      let mob_num = (this.compform.value.item_mob.length);
  
      let email = [];
      let phone = [];

      for(let i=0; i<email_num; i++)
      {
        email.push(          
            this.compform.value.item_email[i].person_email
          
      );
      }
      for(let i=0; i<mob_num; i++)
      {
        phone.push(
          
            this.compform.value.item_mob[i].person_mob
          
      );
      }

        const httpOptions = {
         "company_name": this.compform.value.comp_name,
         "default_person_met":{
          "name": this.compform.value.person_name,
          "email":email,
          "mobile":phone,
          "designation": this.compform.value.person_des
         },
         "company_address": this.compform.value.addr,
         "location":{
           "type": this.compform.value.loc_type,
           "area": this.compform.value.loc_area
         },
         "reference": this.compform.value.refer,
        };  
        // console.log(httpOptions);    
        this.http.post('https://api.plint.in/dsr/companies', httpOptions, {headers: this.headers})
        .subscribe((res) =>{
          console.log(res)
          this.showSubmit();
          this.reset(); 
          this.router.navigateByUrl('/view_company');
       });
    }
    else 
      { 
       this.toastr.error('Error', 'Try again', {
       timeOut: 3000,
       });
      }

  }

  reset()
  {
  this.compform = this.fb.group({
    comp_name: "",
    person_name: "",
    person_des: "",
     person_email:"",
    person_mob:"",
    loc_area: "",
    loc_type: "",
    addr: "",      
    refer: ""
  });
  }


}
