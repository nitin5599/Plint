import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
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
    this.user_id = this.actRoute.snapshot.params.user_id;
  }  

  ngOnInit(): void {
    this.tripform = new FormGroup({
      amount: new FormControl('', Validators.required),
      rate: new FormControl('', Validators.required),
      employee_id: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
    });
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

onSubmit()
{
 if(this.tripform.valid)
  {     
    if (this.tripform.value.currency == 'USD')
    {
      var trip_usd = {
        employee_id: this.tripform.value.employee_id,
        amount: parseInt(this.tripform.value.amount),
        currency: this.tripform.value.currency,
        rate: parseFloat(this.tripform.value.rate),   
      }
      this.userservice.createTripUsd(trip_usd)
      .subscribe(res => {        
        console.log(res);
        this.showsubmit();
        this.ngOnInit();
        // this.refresh();
        // this.router.navigate(['usertrip/'+this.user_id]);
      });
      this.reset();
    }
    else
    {
      var trip_local = {
        employee_id: this.tripform.value.employee_id,
        amount: parseInt(this.tripform.value.amount),
        currency: this.tripform.value.currency,
        rate: parseFloat(this.tripform.value.rate),
      }
      this.userservice.createTriplocal(trip_local)
      .subscribe(res => {
        console.log(res);
        this.showsubmit();
        // this.refresh();
        // this.router.navigate(['usertrip/'+this.user_id]);
      });
      this.reset();
    }
  
  }
  else 
  { 
    alert(console.error());
    this.toastr.error('Error', 'Try again', {
    timeOut: 3000,
    });
  }

}

// refresh(): void{
//   this.router.navigateByUrl("/usertrip/"+this.user_id , { skipLocationChange: true }).then(() => {
//     console.log(decodeURI(this.loc.path()));
//     this.router.navigate([decodeURI(this.loc.path())]);
//   })
// }

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
