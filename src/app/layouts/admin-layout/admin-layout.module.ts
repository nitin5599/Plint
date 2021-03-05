import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import {MatTableModule} from '@angular/material/table';
import { CdkTableModule} from '@angular/cdk/table';
import {MatExpansionModule} from '@angular/material/expansion';
import { NgxPaginationModule } from 'ngx-pagination';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatIconModule } from '@angular/material/icon';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatSortModule} from '@angular/material/sort';
import { NgpSortModule } from "ngp-sort-pipe";
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'  

import { ChartsModule } from 'ng2-charts';
// import {MatPaginatorModule} from '@angular/material/paginator';
// import {MatTableDataSource} from '@angular/material/table';
import { UsertripComponent } from '../../usertrip/usertrip.component';
import { LoginComponent } from '../../login/login.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TeamMembersComponent } from '../../team-members/team-members.component';

import { EditProfileComponent } from '../../edit-profile/edit-profile.component';
import { EditCompanyComponent } from '../../edit-company/edit-company.component';
import { StartTripComponent } from '../../start-trip/start-trip.component';
import { UserslistComponent } from '../../userslist/userslist.component';
import { BackComponent } from '../../back/back.component';
import { TransLogComponent } from '../../trans-log/trans-log.component';
import { AddcompanyComponent } from '../../addcompany/addcompany.component';
import { ViewcompanyComponent } from '../../viewcompany/viewcompany.component';
import { CompmeetComponent } from '../../compmeet/compmeet.component';
import { ViewmeetingComponent } from '../../viewmeeting/viewmeeting.component';
import { ViewcompComponent } from '../../viewcomp/viewcomp.component';
import { AllcompaniesComponent } from '../../allcompanies/allcompanies.component';
import { ManagerlistComponent } from '../../managerlist/managerlist.component';
import { DsrComponent } from '../../dsr/dsr.component';
import { AttdialogComponent } from '../../attdialog/attdialog.component';
import { AttdComponent } from '../../attd/attd.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatRadioModule,
    MatIconModule,
    MatTableModule,
    MatTabsModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatSortModule,
    CdkTableModule,
    ChartsModule,
    NgxPaginationModule,
    NgpSortModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports:[
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
  ],
  declarations: [
    LoginComponent,
    UserProfileComponent,
    EditProfileComponent,
    EditCompanyComponent,
    UsertripComponent,
    StartTripComponent,
    UserslistComponent,
    TransLogComponent,
    BackComponent,
    AddcompanyComponent,
    ViewcompanyComponent,
    ViewmeetingComponent,
    CompmeetComponent,
    ViewcompComponent,
    AllcompaniesComponent,
    TeamMembersComponent,
    ManagerlistComponent,
    DsrComponent,
    AttdialogComponent,
    AttdComponent
  ]
})

export class AdminLayoutModule {}
