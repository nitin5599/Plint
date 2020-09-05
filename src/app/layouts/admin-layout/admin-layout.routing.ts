import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { UsertripComponent } from '../../usertrip/usertrip.component';
import { SingleusertripComponent } from '../../singleusertrip/singleusertrip.component';
import { SingleTransComponent } from '../../single-trans/single-trans.component';
export const AdminLayoutRoutes: Routes = [
    
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'usertrips', component: UsertripComponent },
    { path: 'usertrip/:user_id', component: SingleusertripComponent },
    { path: 'transactions/:user_id/:trip_id', component: SingleTransComponent }

];
