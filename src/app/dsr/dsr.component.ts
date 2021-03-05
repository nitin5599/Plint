import { Component,ViewChild, OnInit } from '@angular/core';
import {FormGroup, FormControl, FormBuilder, Validators} from '@angular/forms';
import { ChartType, ChartOptions, ChartLegendLabelOptions, ChartDataSets } from 'chart.js';
import { SingleDataSet, Label, monkeyPatchChartJsLegend, monkeyPatchChartJsTooltip } from 'ng2-charts';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Location } from '@angular/common';
import { MatFormFieldControl } from '@angular/material/form-field';

@Component({
  selector: 'app-dsr',
  templateUrl: './dsr.component.html',
  styleUrls: ['./dsr.component.css'],
})
export class DsrComponent implements OnInit {

  Url: string = 'https://api.plint.in';
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  .append('Authorization', 'Bearer ' + window.sessionStorage.getItem('access_token'));

  user_id: string;
  items: Array<any>;
  sheet = '';
  cust: Array<any>;
  locations: Array<any>;
  meetings: Array<any>;
  alerts: Array<any>;
  current_loc = '';
  current_day = 200;
  elseBlock: boolean = true;

  currUser_name: string;
  
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: 
    {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    },
  };
  
  currUser_most_meetings: any;
  currUser_top_meetings: any;
  currUser_avg_meetings: any;
  currUser_top_qoutation: any;

  public currUser: Label[] = [];
  public currUserData: ChartDataSets[] = [
    {data:[]}
  ];

  public mostuniqueClients: Label[] = [];
  public mostuniqueClientsData: ChartDataSets[] = [
    
  ];

  public currmonth: Label[] = [];
  public currmonthData: ChartDataSets[] = [];

  public perweek: Label[] = [];
  public perweekData: ChartDataSets[] = [];

  public topqoutation: Label[] = [];
  public topqoutationData: ChartDataSets[] = [];

  barChartType: ChartType = 'bar';
  barChartLegend = false;
  public barChartPlugins = [];

  dateRangeForm: FormGroup;

  constructor(private http: HttpClient, private fb: FormBuilder, private actRoute: ActivatedRoute, private location: Location) 
  {
    this.user_id = this.actRoute.snapshot.params.user_id;
  }

  rangeFormGroup = new FormGroup({  
    start: new FormControl('', Validators.required),  
    end: new FormControl('', Validators.required)  
  })  

  ngOnInit(): void {  
    this.CurrUser();
    this.most_meetings_unique_companies();
    this.top_meetings_curr_month();
    this.top_quotation_by_emp();
    this.avg_meetings_per_week();

    this.http.get<any>('https://api.plint.in/dsr/users/'+this.user_id+'/companies/list').subscribe(res => {
      this.cust = res.data;
    });
    
    this.http.get<any>('https://api.plint.in/dsr/locations').subscribe(res => {
      this.locations = res.data;
    });
    
    this.http.get<any>('https://api.plint.in/admin/users?nonAdminUsers=false').subscribe(res2 => {
      for(let i=0; i < res2.data.length; i++)
      {
        if(this.user_id==res2.data[i]._id)
        {
          this.currUser_name = res2.data[i].name;
          break;
        }
      }
    });   

    this.rangeFormGroup = this.fb.group({
      start: new FormControl('', Validators.required),
      end: new FormControl('', Validators.required)
    });

  }
    
  onFormSubmit() 
  {
    if(this.rangeFormGroup.valid)
    {
      let from = new Date(this.rangeFormGroup.value.start).toISOString();
      let to = new Date(this.rangeFormGroup.value.end).toISOString();

      this.http.get<any>('https://api.plint.in/dsr/users/'+this.user_id+'/meetings/sheet?startDate='+from+'&endDate='+to).subscribe(res => {
        this.sheet = res.data;
      });
    }
    else
      console.log(this.rangeFormGroup.value)
  }

  goBack() {
    this.location.back();
  }
  
  goForward() {
    this.location.forward();
  }

  changeLoc(e) {
    if(e=='')
    {
     this.current_loc = '';
    }
    else
    {
      this.http.get<any>('https://api.plint.in/dsr/locations').subscribe(res => {
        for(let i=0; i < res.data.length; i++)
        {
          if(e==res.data[i].area)
          {
            this.current_loc = res.data[i].area;
            break;
          }
        }
      });
    }
  }

  changeDays(e)
  {
    this.http.get<any>('https://api.plint.in/dsr/users/'+this.user_id+'/meetings?limit=10&skip=0&d='+e).subscribe(res => {
      this.meetings = res.data;
    });
  }

  changeAlertDays(e) 
  {
    this.http.get<any>('https://api.plint.in/dsr/users/'+this.user_id+'/meetings?limit=10&skip=0&follow_up_days='+e).subscribe(res => {
      this.alerts = res.data;
    });
  }

  CurrUser()
  {    
    let API_URL1 = this.Url+'/dsr/users/'+this.user_id+'/meetings/analytics';
    
    this.http.get<any>(`${API_URL1}`)
    .subscribe((res1: any) => {
      // (res1.data.meetings_with_distinct_companies).toString()
      if(res1.data.meetings_with_distinct_companies===0)
      this.currUser_most_meetings = '5';
      this.currUser_avg_meetings = res1.data.average_per_week_meetings_in_current_month;
      this.currUser_top_meetings = res1.data.total_meetings_in_current_month;
      this.currUser_top_qoutation = res1.data.total_employee_quotations;
    });
  }

  most_meetings_unique_companies()
  {
    let API_URL = this.Url+'/dsr/meetings/analytics';
    
    this.http.get<any>(`${API_URL}`, {headers: this.headers})
    .subscribe((res: any) => {
      // console.log(res)
    for(let i=0; i < res.data.top_meetings_by_employees_with_unique_companies.length; i++)
    {
      if(this.user_id!=res.data.top_meetings_by_employees_with_unique_companies[i]._id)
      {
        this.mostuniqueClientsData.push({label : '', backgroundColor: 'rgba(75,192,192,0.8)', hoverBackgroundColor: 'rgba(75,192,192,0.8)', data:[]});
        this.mostuniqueClientsData[i].data[i]=(res.data.top_meetings_by_employees_with_unique_companies[i].num_meetings);
        this.mostuniqueClients.push(res.data.top_meetings_by_employees_with_unique_companies[i].name);
      }        
      else
      {
        this.mostuniqueClientsData.push({label : '', backgroundColor: 'rgb(0, 128, 128)', hoverBackgroundColor: 'rgb(0, 128, 128)', data:[]});
        this.mostuniqueClientsData[i].data[i]=(this.currUser_most_meetings);
        this.mostuniqueClients.push(this.currUser_name);
      }      
    }

    // this.mostuniqueClientsData.push({label : '', backgroundColor: 'rgb(0, 128, 128)', hoverBackgroundColor: 'rgb(0, 128, 128)', data:[]});
    // this.mostuniqueClientsData.data = (this.currUser_most_meetings);
    // this.mostuniqueClients.push(this.currUser_name);

    console.log(this.mostuniqueClients, this.mostuniqueClientsData);
    });  
  }
  
  top_meetings_curr_month()
  {
    let API_URL = this.Url+'/dsr/meetings/analytics';
    
    this.http.get<any>(`${API_URL}`, {headers: this.headers})
    .subscribe((res: any) => {
        
    for(let i=0; i < res.data.top_meetings_in_current_month.length; i++)
      {
        this.currmonthData.push({label : res.data.top_meetings_in_current_month[i].name, data:[]});      
        this.currmonthData[i].data[i]=(res.data.top_meetings_in_current_month[i].total_meetings);
  
        this.currmonth.push(res.data.top_meetings_in_current_month[i].name);
      }
    });
  }

  avg_meetings_per_week()
  {
    let API_URL = this.Url+'/dsr/meetings/analytics';

    this.http.get<any>(`${API_URL}`, {headers: this.headers})
    .subscribe((res: any) => {

    for(let i=0; i < res.data.average_meetings_per_week_in_current_month.length; i++)
      {
        this.perweekData.push({label : res.data.average_meetings_per_week_in_current_month[i].name, data:[]});      
        this.perweekData[i].data[i]=(res.data.average_meetings_per_week_in_current_month[i].total_meetings);
  
        this.perweek.push(res.data.average_meetings_per_week_in_current_month[i].name);
      }

    //  console.log(this.perweek, this.perweekData);
    });
  }

  top_quotation_by_emp()
  {
    let API_URL = this.Url+'/dsr/meetings/analytics';
    
    this.http.get<any>(`${API_URL}`, {headers: this.headers})
    .subscribe((res: any) => {
    
    for(let i=0; i < res.data.top_quotations_by_employees.length; i++)
      {
        this.topqoutationData.push({label : res.data.top_quotations_by_employees[i].name, data:[]});      
        this.topqoutationData[i].data[i]=(res.data.top_quotations_by_employees[i].total_quotations  );
  
        this.topqoutation.push(res.data.top_quotations_by_employees[i].name);
      }
    });  
  }
  

}

