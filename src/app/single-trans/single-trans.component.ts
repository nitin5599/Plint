import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DomSanitizer } from '@angular/platform-browser';
import { Location } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { ChartType, ChartOptions, ChartLegendLabelOptions } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { NgxImgZoomService } from "ngx-img-zoom";

@Component({
  selector: 'app-single-trans',
  templateUrl: './single-trans.component.html',
  styleUrls: ['./single-trans.component.css']
})

export class SingleTransComponent implements OnInit {

  Url: string = 'https://api.plint.in';
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  .append('Authorization', 'Bearer ' + window.sessionStorage.getItem('access_token'));
  
  user_id: string;
  trip_id: string;
  items: Array<any>;
  expitems: Array<any>;
  cli_items: Array<any>;
  re_items: Array<any>;
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
      display: false,
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
    tooltips: {
      
      enabled: false
    },
    legend: {
      display: true,
    },
    
  };
e;
  public currentLabels: Label[] = [];
  public currentData: SingleDataSet = [];
  public todayLabels: Label[] = [];
  public todayData: SingleDataSet = [];
  public avgLabels: Label[] = [];
  public avgData: SingleDataSet = [];

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
  
  image:any;

  constructor(private http: HttpClient, private toastr: ToastrService, public dialog: MatDialog, private location: Location, private router: Router, private actRoute: ActivatedRoute,private modalService: NgbModal, private sanitizer: DomSanitizer) { 
    this.user_id = this.actRoute.snapshot.params.user_id;
    this.trip_id = this.actRoute.snapshot.params.trip_id;
    this.ongoing = this.actRoute.snapshot.params.state;
    monkeyPatchChartJsTooltip();
    monkeyPatchChartJsLegend();

  }

  ngOnInit(): void {

    this.curr_trans();
     this.exptrans();
     this.client_re_trans();
     this.client_trans();

   this.CurrentExpenses();
   this.todayExpenses();
   this.avgExpenses();
  }

  changeSuit(e) {

    let api = this.Url+'/em/user/'+this.user_id+'/trip/'+this.trip_id+'/transaction/list?skip=0&limit=100&sortBy=created_on&sortOrder=desc&';
    
    let API_URL = api+'type=currency_conversion&v='+e;
    this.http.get<any>(`${API_URL}`)

    .subscribe((res: any) => {
      // console.log(res.data)
      this.items = res.data;
      this.TotalRecords = res.length;
    });
  
    let API_URL1 = api+'type=expense&v='+e;
    this.http.get<any>(`${API_URL1}`)

    .subscribe((res1: any) => {
      // console.log(res1.data)
      this.expitems = res1.data;
      this.TotalRecords = res1.length;
    });

    let API_URL2 = api+'&type=reimbursement&v='+e;
    this.http.get<any>(`${API_URL2}`)

    .subscribe((res2: any) => {
      // console.log(res2.data)
      this.cli_items = res2.data;
      this.TotalRecords = res2.length;
    });

    let API_URL3 = api+'type=client_reimbursement&v='+e;
    this.http.get<any>(`${API_URL3}`)

    .subscribe((res3: any) => {
      // console.log(res3.data)
      this.re_items = res3.data;
      this.TotalRecords = res3.length;
    });

  }

  goBack() {
    this.location.back();
  }
  
  goForward() {
    this.location.forward();
  }
  
  isVerified()
  {
    this.toastr.success('Trip Verified!')
  }
  curr_trans() { 
    let API_URL = this.Url+'/em/user/'+this.user_id+'/trip/'+this.trip_id+'/transaction/list?skip=0&limit=100&sortBy=created_on&sortOrder=desc&type=currency_conversion';
    this.http.get<any>(`${API_URL}`)

    .subscribe((res: any) => {
      // console.log(res.data)
      this.items = res.data;
      this.TotalRecords = res.length;
    });
  }

  exptrans() { 
    let API_URL = this.Url+'/em/user/'+this.user_id+'/trip/'+this.trip_id+'/transaction/list?skip=0&limit=100&sortBy=created_on&sortOrder=desc&type=expense';
    this.http.get<any>(`${API_URL}`)

    .subscribe((res: any) => {
      console.log(res)
      // console.log(res.data.receipt_image_file_id)
      this.expitems = res.data;
      // console.log(this.expitems.receipt_image_file_id)
      this.TotalRecords = res.length;
    });
  }

  client_trans() { 
    let API_URL = this.Url+'/em/user/'+this.user_id+'/trip/'+this.trip_id+'/transaction/list?skip=0&limit=100&sortBy=created_on&sortOrder=desc&type=reimbursement';
    this.http.get<any>(`${API_URL}`)

    .subscribe((res: any) => {
      // console.log(res.data)
      this.cli_items = res.data;
      this.TotalRecords = res.length;
    });
  }

  client_re_trans() { 
    let API_URL = this.Url+'/em/user/'+this.user_id+'/trip/'+this.trip_id+'/transaction/list?skip=0&limit=100&sortBy=created_on&sortOrder=desc&type=client_reimbursement';
    this.http.get<any>(`${API_URL}`)

    .subscribe((res: any) => {
      // console.log(res.data)
      this.re_items = res.data;
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
    // console.log(res);
    this.showendtrip();
    this.router.navigate(['usertrip/'+this.user_id]);
  });
}

isVerify(txnId: String)
{
  console.log(txnId);
  let API_URL = this.Url+'/admin/trip/'+this.trip_id+'/transaction/'+txnId+'/verify';
  this.http.put<any>(`${API_URL}`, {headers: this.headers})
  .subscribe((res: any) => {
    // console.log(res);
    this.isVerified();
    this.ngOnInit()
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
        this.currentData.push(Math.round((curr[i].amount)*1000)/1000);
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
        this.todayData.push(Math.round((today[i].amount)*1000)/1000);
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
    // console.log(res);
    let avg = res.data.current_trip_expenses;
    let num = res.data.num_trip_days_until_today;
    if(num == 0)
    {
      num=1;
    }
    this.avgLength = avg.length;
    for (let i = 0; i < avg.length; i++)  
    {
      if(this.avgLabels !== [])
      {
        this.avgLabels.push(avg[i].code);
        this.avgData.push(Math.round((avg[i].amount/num)*1000)/1000);
      }
      else
      {
        this.avgLabels = [avg[i].code];
        this.avgData = [(avg[i].amount/num)];  
      }
    
    }
   });
}

showimage(imghref,display)
{
  this.image = imghref;
  this.showModal = true;
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

  public ngOnDestroy() : void {

  }
  
}


