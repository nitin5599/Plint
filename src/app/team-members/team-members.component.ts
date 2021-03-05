import { Component, OnInit } from '@angular/core';
import { FormControl,FormBuilder,FormGroup,Validators} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-team-members',
  templateUrl: './team-members.component.html',
  styleUrls: ['./team-members.component.css']
})
export class TeamMembersComponent implements OnInit {


  Url: string = 'https://api.plint.in/';
  headers = new HttpHeaders().set('Content-Type', 'application/json')
  .append('Authorization', 'Bearer ' + window.sessionStorage.getItem('access_token'));
    
  user_id: string;
  tripId: string;
  items: Array<any>;

  constructor(private actRoute: ActivatedRoute,private http: HttpClient,) 
  {
    this.user_id = this.actRoute.snapshot.params.user_id;
  }

  ngOnInit(): void {
    this.getData();
    // console.log(this.user_id)
  }

  getData(){
    this.http.get<any>('https://api.plint.in/dsr/users/'+this.user_id+'/team', {headers: this.headers}).subscribe(res => {
      this.items = res.data;
      // console.log(this.items);
    });  
  }

}
