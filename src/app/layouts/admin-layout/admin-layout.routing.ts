import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { UserslistComponent } from '../../userslist/userslist.component';
import { EditProfileComponent } from '../../edit-profile/edit-profile.component';
import { UsertripComponent } from '../../usertrip/usertrip.component';
import { SingleusertripComponent } from '../../singleusertrip/singleusertrip.component';
import { SingleTransComponent } from '../../single-trans/single-trans.component';
import { StartTripComponent } from '../../start-trip/start-trip.component';
import { TransLogComponent } from '../../trans-log/trans-log.component';

export const AdminLayoutRoutes: Routes = [
    
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'userslist',   component: UserslistComponent },
    { path: 'edit-profile/:user_id/:i',   component: EditProfileComponent },
    { path: 'usertrips', component: UsertripComponent },
    { path: 'log', component: TransLogComponent },
    { path: 'usertrip/start-trip/:_id', component: StartTripComponent },
    { path: 'usertrip/:user_id', component: SingleusertripComponent },
    { path: 'transactions/:user_id/:trip_id/:state', component: SingleTransComponent }

];
