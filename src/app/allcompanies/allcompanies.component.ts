import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { UsercrudService } from '../services/usercrud.service';
import { ConfirmService } from '../services/confirm.service'; 
import {MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig} from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-allcompanies',
  templateUrl: './allcompanies.component.html',
  styleUrls: ['./allcompanies.component.css']
})
export class AllcompaniesComponent implements OnInit {

 
  Url: string = 'https://api.plint.in';

  headers = new HttpHeaders().set('Content-Type', 'application/json')
  .append('Authorization', 'Bearer ' + window.sessionStorage.getItem('access_token'));
    
  user_id: string;
  tripId: string;
  items: Array<any>;
  export_item: Array<any>;

  constructor(private actRoute: ActivatedRoute, private conf: ConfirmService, private http: HttpClient,public userservice: UsercrudService, private toastr: ToastrService) 
  {
    this.user_id = this.actRoute.snapshot.params.user_id;
  }

  ngOnInit(): void {
    this.getCompanyData();
    let API_URL = `${this.Url}/dsr/companies/export`;
    this.http.get<any>(`${API_URL}`).subscribe(res => {
      this.export_item = res.data.url;
      // console.log(this.export_item); 
    });
  }

  getCompanyData(){
    let API_URL = `${this.Url}/dsr/companies`;
    this.http.get<any>(`${API_URL}`)
     .subscribe(res => {
      this.items = res.data;
      // console.log(res);
    });
  }

  deluser(_id: String)
  {
    this.conf.OpenDialog('Are you sure you want to delete this record?')
    .afterClosed().subscribe(res => {
      if(res)
      {        
        let API_URL = `${this.Url}/dsr/companies/${_id}`;
        
        this.http.delete(`${API_URL}`, {headers : this.headers})
          .subscribe((val) => {
            // console.log(val);
            this.showDelete();
            this.getCompanyData();
          });
      }
    });
    
  }
  
  showupdate() {
    this.toastr.success('updated successfully!');
  }
  
  showDelete() {
    this.toastr.success('Deleted successfully!');
  }

}
