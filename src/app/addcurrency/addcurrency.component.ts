import { Component, OnInit} from '@angular/core';
import { FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UsercrudService } from '../services/usercrud.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-addcurrency',
  templateUrl: './addcurrency.component.html',
  styleUrls: ['./addcurrency.component.css']
})

export class AddcurrencyComponent implements OnInit {

  headers = new HttpHeaders().set('Content-Type', 'application/json')  
  .append('Authorization', 'Bearer ' + window.sessionStorage.getItem('access_token'));
 
  currency: Array<any>;
  addcurr: FormGroup;

  constructor(public userservice: UsercrudService,private toastr: ToastrService,private http: HttpClient, public router: Router, private actRoute: ActivatedRoute, public fb: FormBuilder) 
  { 
    this.addcurr = new FormGroup({
      amount: new FormControl('', Validators.required),
      currency: new FormControl('', Validators.required),
    });
  }  

  ngOnInit(): void {
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
 if(this.addcurr.valid)
  {     
      var add_curr = {
        amount: this.addcurr.value.amount,
        currency: this.addcurr.value.currency  
      }
    
      this.userservice.AddCurrency(add_curr)
      // .subscribe(res => {        
      //   console.log(res);
      //   this.showsubmit();
      //   this.ngOnInit();
      // });
      this.reset();
  }
  else 
  { 
    alert(console.error());
    this.toastr.error('Error', 'Try again', {
    timeOut: 3000,
    });
  }

}
reset()
{

this.addcurr = this.fb.group({
  amount: "",
  currency: "",
});

}

}
