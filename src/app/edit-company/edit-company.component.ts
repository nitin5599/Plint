import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl,FormBuilder,FormGroup, FormArray, Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UsercrudService } from '../services/usercrud.service';
import { ToastrService } from 'ngx-toastr';
import { first } from "rxjs/operators";
import { Location } from '@angular/common';

export interface Company {
  company_name: String;
  company_addr: String;
  name: String;
  desg: String;
  email: Array<any>;
  mobile: Array<any>;
  loc_type: String;
  loc_area: String;
}

@Component({
  selector: 'app-edit-company',
  templateUrl: './edit-company.component.html',
  styleUrls: ['./edit-company.component.css']
})
export class EditCompanyComponent implements OnInit {

  
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  role: any[] = ['admin', 'senior_sales_manager', 'regional_manager', 'associate_vice_president'];
  
  is_expense_manager_user: boolean;
  
  editform: FormGroup;
  parent_user_id: Array<any>;
  items: [];
  emp_id: String;
  user_id: String;
  formupdated: boolean = false;
  // user: Company[];
  data: any;
  pos: any;

  datalist: [];

  value;
  display: string = '';
  man_name: string;
  
  constructor(public userservice: UsercrudService,private toastr: ToastrService, private location: Location, private http: HttpClient, public router: Router, private actRoute: ActivatedRoute, public fb: FormBuilder) 
  {
    this.editform = this.fb.group({
      email: this.fb.array(['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])]),
      mobile: this.fb.array(['', [Validators.required, Validators.pattern("[0-9]{11}")]]),
      name: ['', Validators.required],
      type: ['', Validators.required],
      area: ['', Validators.required],
      designation: ['', Validators.required],
      company_address: ['', Validators.required],
      company_name: ['', Validators.required],
  });

    this.user_id = this.actRoute.snapshot.params.user_id;

    this.pos = this.actRoute.snapshot.params.i;
  }  

  ngOnInit(): void {

    this.http.get<any>('https://api.plint.in/dsr/companies').subscribe(res => {
      this.items = res.data;
      // console.log(this.items);
      for (var index in res.data) 
      {
        if(this.user_id == res.data[index]._id)
        {
          this.emp_id = res.data[index].employee_id;

          this.editform = this.fb.group({
            email: this.fb.array([res.data[index].default_person_met.email, Validators.compose([
              Validators.required,
              Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
            ])]),
            mobile: this.fb.array([res.data[index].default_person_met.mobile, [Validators.required, Validators.pattern("[0-9]{11}")]]),
            name: [res.data[index].default_person_met.name, Validators.required],
            type: [res.data[index].location.type, Validators.required],
            area: [res.data[index].location.area, Validators.required],
            designation: [res.data[index].default_person_met.designation, Validators.required],
            company_address: [res.data[index].company_address, Validators.required],
            company_name: [res.data[index].company_name, Validators.required],
        });
        
          // this.editform = new FormGroup({
          //   company_name: new FormControl(res.data[index].company_name),
          //   company_address: new FormControl(res.data[index].company_address),
          //   name: new FormControl(res.data[index].default_person_met.name),
          //   designation: new FormControl(res.data[index].default_person_met.designation),
          //   email: new FormArray([res.data[index].default_person_met.email]),
          //   mobile: new FormArray([res.data[index].default_person_met.mobile]),
          //   type: new FormControl(res.data[index].location.type),
          //   area: new FormControl(res.data[index].location.area),            
          // })
        break;
        }
      }
    });  
   
  }

  goBack() {
    this.location.back();
  }
  
  goForward() {
    this.location.forward();
  }
  
  showupdate() 
  {
    this.toastr.success('updated successfully!');
  }

  onUpdate()
  {
    let cmp_data = {
        "company_name": this.editform.value.company_name,
        "default_person_met": 
        {
          "name": this.editform.value.name,
          "designation": this.editform.value.designation,
          "mobile": [this.editform.value.mobile],
          "email": [this.editform.value.email]
        },
        "company_address": this.editform.value.company_address,
        "location":
        {
          "type": this.editform.value.type,
          "area": this.editform.value.area
        }
    };

    console.log(cmp_data);

    this.userservice.updateCompany(cmp_data, this.user_id)
    // .pipe(first())
    .subscribe((res) => {
        if(res.message==="Company details successfully updated") 
        {
          this.showupdate();
          this.router.navigate(['all_companies']);
        }
        else
        { 
          this.toastr.error('Error', 'Try again', {
            timeOut: 3000,
          });
        }
      },
      error => {
        console.log(error);
      });
  }


}
