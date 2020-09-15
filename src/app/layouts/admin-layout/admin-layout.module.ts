import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import {MatTableModule} from '@angular/material/table';
import { CdkTableModule} from '@angular/cdk/table';

import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
// import {MatPaginatorModule} from '@angular/material/paginator';
// import {MatTableDataSource} from '@angular/material/table';
import { UsertripComponent } from '../../usertrip/usertrip.component';
import { LoginComponent } from '../../login/login.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { EditProfileComponent } from '../../edit-profile/edit-profile.component';
import { StartTripComponent } from '../../start-trip/start-trip.component';
import { UserslistComponent } from '../../userslist/userslist.component';

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
    MatTableModule,
    CdkTableModule
    // MatPaginatorModule
  ],
  declarations: [
    LoginComponent,
    UserProfileComponent,
    EditProfileComponent,
    UsertripComponent,
    StartTripComponent,
    UserslistComponent

  ]
})

export class AdminLayoutModule {}
