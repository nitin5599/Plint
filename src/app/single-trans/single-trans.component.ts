import { Component, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { ToastrService } from 'ngx-toastr';
import { ChartType, ChartOptions, ChartLegendLabelOptions } from 'chart.js';
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
    },
    
  };


  public emptyOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio:false,
    elements: {
      arc: {
          borderWidth: 0
      }
  },
    // segmentShowStroke: false,
    tooltips: {
      
      enabled: false
    },
    legend: {
      // display: true,
      // position: 'right'
    },
    // title:{
    //   text:"No Transactions Yet",
    //   position: "bottom",
      // display: true
    // }
    
  };

  public currentLabels: Label[] = [];
  public currentData: SingleDataSet = [];
  public todayLabels: Label[] = [];
  public todayData: SingleDataSet = [];
  public avgLabels: Label[] = [];
  public avgData: SingleDataSet = [];

  // public empty: Label[] = ['NO TRANSACTIONS']; 
  public emptydata: SingleDataSet = [100];

  
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];
  pieChartColors = [
    {
      backgroundColor: ['rgba(255,160,0,1)', 'rgb(33,150,243,1)', 'rgb(76,175,80,1)'
      , 'rgba(251,192,45,1)', 'rgb(41,98,255,1)', 'rgba(213,0,0,1)', 'rgb(255,138,128,1)' ],
    },
  ];
  emptyColors =[
     {
       backgroundColor:['rgb(38,166,154,1)']
     }
  ]; 
  
  todayLength: any;
  currLength: any;
  avgLength: any;
  
  constructor(private http: HttpClient, private toastr: ToastrService,private router: Router, private actRoute: ActivatedRoute,private modalService: NgbModal, private sanitizer: DomSanitizer) { 
    this.user_id = this.actRoute.snapshot.params.user_id;
    this.trip_id = this.actRoute.snapshot.params.trip_id;
    this.ongoing = this.actRoute.snapshot.params.state;
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();
  }

  ngOnInit(): void {
   this.Triptrans();
   this.CurrentExpenses();
   this.todayExpenses();
   this.avgExpenses();
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

CurrentExpenses()
{
  let API_URL = this.Url+'/em/user/'+this.user_id+'/trip/'+this.trip_id+'/analytics';
  this.http.get<any>(`${API_URL}`, {headers: this.headers})
  .subscribe((res: any) => {
    // console.log(res);
    let curr = res.data.current_trip_expenses; 
    this.currLength = curr.length;
    for (let i = 0; i < curr.length; i++)  
    {
      if(this.currentLabels !== [])
      {
        this.currentLabels.push(curr[i].code);
        this.currentData.push(curr[i].amount);
      }
      else
      {
        this.currentLabels = [curr[i].code];
        this.currentData = [curr[i].amount];  
      }
      
    }
   });
}

todayExpenses()
{
  let API_URL = this.Url+'/em/user/'+this.user_id+'/trip/'+this.trip_id+'/analytics';
  this.http.get<any>(`${API_URL}`, {headers: this.headers})
  .subscribe((res: any) => {
    // console.log(res);
    let today = res.data.todays_expenses;
    this.todayLength = today.length;
    for (let i = 0; i < today.length; i++)  
    {
      if(this.todayLabels !== [])
      {
        this.todayLabels.push(today[i].code);
        this.todayData.push(today[i].amount);
      }
      else
      {
        this.todayLabels = [today[i].code];
        this.todayData = [today[i].amount];  
      }
      
    }
   });
}

avgExpenses()
{
  let API_URL = this.Url+'/em/user/'+this.user_id+'/trip/'+this.trip_id+'/analytics';
  this.http.get<any>(`${API_URL}`, {headers: this.headers})
  .subscribe((res: any) => {
    console.log(res);
    let avg = res.data.current_trip_expenses;
    let num = res.data.num_trip_days_until_today;
    this.avgLength = avg.length;
    // console.log(this.todayLength);
    // console.log(num);
    for (let i = 0; i < avg.length; i++)  
    {
      if(this.avgLabels !== [])
      {
        this.avgLabels.push(avg[i].code);
        this.avgData.push(avg[i].amount/num);
      }
      else
      {
        this.avgLabels = [avg[i].code];
        this.avgData = [(avg[i].amount/num)];  
      }
    
    }
    // let avg = res.data.average_per_day_expenses;
    // this.avgLength = avg.length;
    // for (let j = 0; j < avg.length; j++)  
    // {
      // console.log(avg.length); 
      // let stat = res.data.average_per_day_expenses[i].stat;
      // console.log(stat.length); 
    //   for (let i = 0; i < stat.length; i++)  
    // {
    //   if(this.avgLabels !== [])
    //   {
    //     this.avgLabels.push(stat[i].category);
    //     this.avgData.push(stat[i].expense.average_expense);
    //   }
    //   else
    //   {
    //     this.avgLabels = [stat[i].category];
    //     this.avgData = [stat[i].expense.average_expense];  
    //   }
      
    // }
  // }
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


