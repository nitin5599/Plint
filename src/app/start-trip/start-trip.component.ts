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
    // console.log(this.emp_id)

    this.tripform = new FormGroup({
      employee_id: new FormControl(),
      itemRows: this.fb.array([this.initItemRows()]),
    });
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
    currency: ['', Validators.required],
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
 console.log(num)

 let formusd = [];
 let formlocal = [];
  for(let i=0; i<num; i++)
  {
    if(this.tripform.value.itemRows[i].currency == 'USD')
    {
    // console.log(this.tripform.value.itemRows[i])
    // parseInt(this.tripform.value.itemRows[i].amount)
    // parseFloat(this.tripform.value.itemRows[i].rate)
    // this.createTripUsd(this.tripform.value.itemRows[i]);
    formusd.push(
      
         {
             "holding":
            {
             "currency":this.tripform.value.itemRows[i].currency,
             "amount":this.tripform.value.itemRows[i].amount
            },
           "inr_to_usd_conversion_rate":this.tripform.value.itemRows[i].rate
          }
      
     );
  }
    else
    {
     // console.log(this.tripform.value.itemRows[i])
    //  formlocal.push(this.tripform.value.itemRows[i]);
    formlocal.push(
     {
             "holding":
            {
             "currency":this.tripform.value.itemRows[i].currency,
             "amount":this.tripform.value.itemRows[i].amount
            },
           "usd_to_local_currency_conversion_rate":this.tripform.value.itemRows[i].rate
          
      }
     );
    }
  }

console.log(formusd);
console.log(formlocal);
let formcombo: any[] = formusd.concat(formlocal);
console.log(formcombo)

this.userservice.userStartTrip(this.emp_id, formcombo)
.subscribe((res) =>{
console.log(res)
this.showsubmit();
this.reset();
}
);

}
  else 
  { 
    alert(console.error());
    this.toastr.error('Error', 'Try again', {
    timeOut: 3000,
    });
  }

}


createTripUsd( formcombo: FormArray)
{
  const httpOptions = {
      "starting_balance":
       [
         formcombo,
       ],
        "employee_id": this.emp_id        
  }; 

  console.log(httpOptions)
  // let API_URL = `${this.Url}/em/user/trip`;
  // return this.http.post<any>(`${API_URL}`, httpOptions, {headers: this.headers})
  // .pipe(
  //   map((data: any) => {
  //     return data;  
  //   })
  // )
}

createTriplocal(formlocal: FormArray)
{
  const httpOptions = 
  {
     "starting_balance": 
     [{
        "holding":
         {
          "amount":formlocal.controls['amount'].value,
          "currency":formlocal.controls['currency'].value
         },
        "usd_to_local_currency_conversion_rate":formlocal.controls['rate'].value  
      }],
      "employee_id": this.emp_id  
  }; 
  console.log(httpOptions)
  // let API_URL = `${this.Url}/em/user/trip`;
  // return this.http.post<any>(`${API_URL}`, httpOptions, {headers: this.headers})
  // .pipe(
  //   map((data: any) => {
  //     return data;  
  //   })
  // )
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













// onSubmit(){
  // let formControls = new FormArray([]);
  // formControls = <FormArray>this.reviewForm.get('controlArray');
  // this.formService.createForm(formControls)
  //   .subscribe(
  //     data => console.log(data),
  //     error => console.error(error)
  // );
  // this.reviewForm.reset();
  // // console.log(formControls);        
// }

// @Injectable()
// export class FormService {
//   constructor(private http: Http) {}

//   createForm(formControls: FormArray) {
//       const body = JSON.stringify(formControls); //this gives error
//       const headers = new Headers({'Content-Type': 'application/json'});
//       return this.http.post('http://localhost:3000/api/form', body, {headers: headers})
//           .map((response: Response) => response.json())
//           .catch((error: Response) => Observable.throw(error.json()));
//   }

// }