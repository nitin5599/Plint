import { Routes } from '@angular/router';

import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { EditProfileComponent } from '../../edit-profile/edit-profile.component';
import { UsertripComponent } from '../../usertrip/usertrip.component';
import { SingleusertripComponent } from '../../singleusertrip/singleusertrip.component';
import { SingleTransComponent } from '../../single-trans/single-trans.component';
export const AdminLayoutRoutes: Routes = [
    
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'edit-profile/:user_id/:emp_id',   component: EditProfileComponent },
    { path: 'usertrips', component: UsertripComponent },
    { path: 'usertrip/:user_id', component: SingleusertripComponent },
    { path: 'transactions/:user_id/:trip_id', component: SingleTransComponent }

];
