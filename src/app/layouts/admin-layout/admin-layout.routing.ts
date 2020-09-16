import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { UserslistComponent } from '../../userslist/userslist.component';
import { EditProfileComponent } from '../../edit-profile/edit-profile.component';
import { UsertripComponent } from '../../usertrip/usertrip.component';
import { SingleusertripComponent } from '../../singleusertrip/singleusertrip.component';
import { SingleTransComponent } from '../../single-trans/single-trans.component';
import { StartTripComponent } from '../../start-trip/start-trip.component';
import { TransLogComponent } from '../../trans-log/trans-log.component';
import { HomeGuard } from 'app/auth/home.guard';

export const AdminLayoutRoutes: Routes = [
    
    { path: 'user-profile', component: UserProfileComponent , canActivate:[HomeGuard]},
    { path: 'userslist', component: UserslistComponent , canActivate:[HomeGuard]},
    { path: 'edit-profile/:user_id/:i', component: EditProfileComponent , canActivate:[HomeGuard]},
    { path: 'usertrips', component: UsertripComponent , canActivate:[HomeGuard]},
    { path: 'log', component: TransLogComponent , canActivate:[HomeGuard]},
    { path: 'usertrip/start-trip/:_id', component: StartTripComponent , canActivate:[HomeGuard]},
    { path: 'usertrip/:user_id', component: SingleusertripComponent , canActivate:[HomeGuard]},
    { path: 'transactions/:user_id/:trip_id/:state', component: SingleTransComponent , canActivate:[HomeGuard]}

];
