import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-single-trans',
  templateUrl: './single-trans.component.html',
  styleUrls: ['./single-trans.component.css']
})

export class SingleTransComponent implements OnInit {

  Url: string = 'http://15.207.181.67:3000';
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  .append('Authorization', 'Bearer ' + window.sessionStorage.getItem('access_token'));
  
  user_id: string;
  trip_id: string;
  items: Array<any>;
  data: Array<any>;
  TotalRecords: String;
  Page: Number = 1;

  
  showModal: boolean;

  closeResult: string;
  
  constructor(private http: HttpClient, private actRoute: ActivatedRoute,private modalService: NgbModal, private sanitizer: DomSanitizer) { 
    this.user_id = this.actRoute.snapshot.params.user_id;
    this.trip_id = this.actRoute.snapshot.params.trip_id;
  }

  ngOnInit(): void {
   this.Triptrans();
  } 

  Triptrans() { 
    let API_URL = this.Url+'/em/user/'+this.user_id+'/trip/'+this.trip_id+'/transaction/list?skip=0&limit=100&sortBy=created_on&sortOrder=desc';
    this.http.get<any>(`${API_URL}`)

    .subscribe((res: any) => {
      this.items = res.data;
      this.TotalRecords = res.data.length;
      console.log(this.items);
    });
  }

  show()
  {
    this.showModal = true; // Show-Hide Modal Check
    
  }

  //Bootstrap Modal Close event
  
  hide()
  {
    this.showModal = false;

  }

}


