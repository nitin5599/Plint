import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl,FormBuilder,FormGroup,Validators, FormArray} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UsercrudService } from '../services/usercrud.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common'; 
import { Subject } from 'rxjs';

@Component({
  selector: 'app-start-trip',
  templateUrl: './start-trip.component.html',
  styleUrls: ['./start-trip.component.css']
})
export class StartTripComponent implements OnInit {

  headers = new HttpHeaders().set('Content-Type', 'application/json')  
  .append('Authorization', 'Bearer ' + window.sessionStorage.getItem('access_token'));
 
  currency: Array<any>;
  emp_id: String;
  user_id: String;
  data: any;
  tripform: FormGroup;

  constructor(public userservice: UsercrudService,private toastr: ToastrService,private loc: Location,private http: HttpClient, public router: Router, private actRoute: ActivatedRoute, public fb: FormBuilder) 
  { 
    this.emp_id = this.actRoute.snapshot.params._id;

    this.tripform = new FormGroup({
      employee_id: new FormControl(),
      itemRows: this.fb.array([this.initItemRows()]),
    });

    // const toSelect = this.getCurrency();
    // this.tripform.get('itemRows').setValue(toSelect[0]);
  }  

  ngOnInit(): void {
    this.user_id = this.actRoute.snapshot.params.user_id;
    this.getCurrency();
  }

showsubmit() 
{
  this.toastr.success('submitted successfully!');
}

getCurrency()
{
  this.http.get<any>('http://15.207.181.67:3000/em/currencies').subscribe(res => {
    this.currency = res.data;
    });  
}

get formArr() {
  return this.tripform.get('itemRows') as FormArray;
}

initItemRows() 
{
  return this.fb.group({
    amount:['', Validators.required] ,
    rate: ['', Validators.required],
    currency: ['USD', Validators.required],
  });
}

addNewRow() {
  this.formArr.push(this.initItemRows());
}

deleteRow(index: number) {
  this.formArr.removeAt(index);
}

onSubmit()
{
  
if(this.tripform.valid)
{     
  let num = (this.tripform.value.itemRows.length);
  let starting_balance = [];
  
  for(let i=0; i<num; i++)
  {
    if(this.tripform.value.itemRows[i].currency == "USD")
    {
    let usdamount = parseInt(this.tripform.value.itemRows[i].amount)
    let usdrate = parseFloat(this.tripform.value.itemRows[i].rate)
    starting_balance.push(
         {
             "holding":
            {
             "currency":this.tripform.value.itemRows[i].currency,
             "amount":usdamount
            },
           "inr_to_usd_conversion_rate":usdrate
          }
     );
    }
    else
    {
    let localamount = parseInt(this.tripform.value.itemRows[i].amount)
    let localrate = parseFloat(this.tripform.value.itemRows[i].rate)
    starting_balance.push(
     {
             "holding":
            {
             "currency":this.tripform.value.itemRows[i].currency,
             "amount":localamount
            },
           "usd_to_local_currency_conversion_rate":localrate
      }
     );
    }

  }

this.userservice.userStartTrip(this.emp_id, starting_balance)
  .subscribe((res) =>{
      console.log(res)
      this.showsubmit();
      this.reset(); 
      this.router.navigateByUrl('/usertrips');
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
this.tripform = this.fb.group({
  employee_id: "",
  amount: "",
  currency: "",
  rate: "",  
});
}

}
