import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { UserslistComponent } from '../../userslist/userslist.component';
import { TeamMembersComponent } from '../../team-members/team-members.component';

import { EditProfileComponent } from '../../edit-profile/edit-profile.component';
import { EditCompanyComponent } from '../../edit-company/edit-company.component';
import { UsertripComponent } from '../../usertrip/usertrip.component';
import { SingleusertripComponent } from '../../singleusertrip/singleusertrip.component';
import { SingleTransComponent } from '../../single-trans/single-trans.component';
import { StartTripComponent } from '../../start-trip/start-trip.component';
import { TransLogComponent } from '../../trans-log/trans-log.component';
import { AddcompanyComponent } from '../../addcompany/addcompany.component';
import { ViewcompanyComponent } from '../../viewcompany/viewcompany.component';
import { CompmeetComponent } from '../../compmeet/compmeet.component';
import { ViewmeetingComponent } from '../../viewmeeting/viewmeeting.component';
import { ViewcompComponent } from '../../viewcomp/viewcomp.component';
import { HomeGuard } from 'app/auth/home.guard';
import { AllcompaniesComponent } from '../../allcompanies/allcompanies.component';
import { ManagerlistComponent } from '../../managerlist/managerlist.component';
import { DsrComponent } from '../../dsr/dsr.component';
import { AttdComponent } from '../../attd/attd.component';

export const AdminLayoutRoutes: Routes = [
    
    { path: 'user-profile', component: UserProfileComponent , canActivate:[HomeGuard]},
    { path: 'userslist', component: UserslistComponent , canActivate:[HomeGuard]},
    { path: 'managerslist', component: ManagerlistComponent , canActivate:[HomeGuard]},
    { path: 'team-members/:user_id', component: TeamMembersComponent , canActivate:[HomeGuard]},
    { path: 'dsr/:user_id', component: DsrComponent , canActivate:[HomeGuard]},
    { path: 'edit-profile/:user_id/:i', component: EditProfileComponent , canActivate:[HomeGuard]},
    { path: 'edit-company/:user_id/:i', component: EditCompanyComponent , canActivate:[HomeGuard]},
    { path: 'usertrips', component: UsertripComponent , canActivate:[HomeGuard]},
    { path: 'log', component: TransLogComponent , canActivate:[HomeGuard]},
    { path: 'add_company', component: AddcompanyComponent , canActivate:[HomeGuard]},
    { path: 'view_company', component: ViewcompanyComponent , canActivate:[HomeGuard]},
    { path: 'comp_meet', component: CompmeetComponent , canActivate:[HomeGuard],
    //   children: [{
    //     path: '',
    //     loadChildren: './layouts/admin-layout/admin-layout.module#AdminLayoutModule'
    //   }]
    },
    { path: 'all_companies', component: AllcompaniesComponent , canActivate:[HomeGuard]},
    { path: 'attendence/:user_id', component: AttdComponent , canActivate:[HomeGuard]},
    { path: 'view_meets/:user_id', component: ViewmeetingComponent , canActivate:[HomeGuard]},
    { path: 'view_compainies/:user_id', component: ViewcompComponent , canActivate:[HomeGuard]},
    { path: 'usertrip/start-trip/:_id', component: StartTripComponent , canActivate:[HomeGuard]},
    { path: 'usertrip/:user_id', component: SingleusertripComponent , canActivate:[HomeGuard]},
    { path: 'transactions/:user_id/:trip_id/:state', component: SingleTransComponent , canActivate:[HomeGuard]}

];
