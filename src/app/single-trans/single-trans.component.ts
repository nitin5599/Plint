import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { ChartType, ChartOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';

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
  ongoing: string;
  showModal: boolean;

  closeResult: string;

  public pieChartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio:false,
    legend:{
      position: 'right'
    }
  };
  public pieChartLabels: Label[] = [];
  public pieChartData: SingleDataSet = [30, 50, 20, 10, 10, 10, 10];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  pieChartColors = [
    {
      backgroundColor: ['rgba(155, 191, 224)', 'rgba(232, 160, 154)', 'rgba(0, 105, 92)'
      , 'rgba(218, 247, 166)', 'rgba(255, 195, 0)', 'rgba(255, 87, 51)', 'rgba(84, 110, 122)' ],
    },
  ];
  

  
  constructor(private http: HttpClient, private toastr: ToastrService,private router: Router, private actRoute: ActivatedRoute,private modalService: NgbModal, private sanitizer: DomSanitizer) { 
    this.user_id = this.actRoute.snapshot.params.user_id;
    this.trip_id = this.actRoute.snapshot.params.trip_id;
    this.ongoing = this.actRoute.snapshot.params.state;
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
   this.Triptrans();
   this.getExpenses();
  } 

  Triptrans() { 
    let API_URL = this.Url+'/em/user/'+this.user_id+'/trip/'+this.trip_id+'/transaction/list?skip=0&limit=100&sortBy=created_on&sortOrder=desc';
    this.http.get<any>(`${API_URL}`)

    .subscribe((res: any) => {
      this.items = res.data;
      this.TotalRecords = res.length;
    });
  }

showendtrip() 
{
  this.toastr.success('Trip ended successfully!');
}
  EndTrip()
{
  let API_URL = this.Url+'/em/user/'+this.user_id+'/trip/'+this.trip_id+'/end';
  this.http.put<any>(`${API_URL}`, {headers: this.headers})
  .subscribe((res: any) => {
    console.log(res);
    this.showendtrip();
    this.router.navigate(['usertrip/'+this.user_id]);
  });
}

getExpenses()
{
  let API_URL = this.Url+'/em/expenseTypes';
  this.http.get<any>(`${API_URL}`, {headers: this.headers})
  .subscribe((res: any) => {
    for (let i = 0; i < res.data.length; i++)  
    {
      if(this.pieChartLabels !== [])
      {
        this.pieChartLabels.push(res.data[i].code);
      }
      else
      {
        this.pieChartLabels = [res.data[i].code];  
      }
      
    }
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


