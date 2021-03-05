import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ToastrModule } from 'ngx-toastr';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AdminLayoutModule } from '../app/layouts/admin-layout/admin-layout.module';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { HomeGuard } from './auth/home.guard';
import { NgxImgZoomModule  } from 'ngx-img-zoom';

import { UsercrudService } from './services/usercrud.service';
import { AuthInterceptor} from './helpers/auth.interceptor';
import { SingleusertripComponent } from './singleusertrip/singleusertrip.component';
import { SingleTransComponent } from './single-trans/single-trans.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatRadioModule} from '@angular/material/radio';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core'  
import { MatInputModule } from '@angular/material/input';
import { CdkTableModule} from '@angular/cdk/table';
import { ChartsModule } from 'ng2-charts';
import { ConfirmComponent } from './confirm/confirm.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { EditCompanyComponent } from './edit-company/edit-company.component';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    ToastrModule.forRoot(),
    RouterModule,
    AppRoutingModule,
    AdminLayoutModule,
    MatPaginatorModule,
    MatSortModule,
    MatButtonModule,
    CdkTableModule,
    MatTableModule,
    MatTabsModule, 
    MatRadioModule,
    MatDialogModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    NgxPaginationModule,
    MatIconModule,
    MatCardModule,
    ChartsModule,
    NgApexchartsModule,
    NgxImgZoomModule
  ],

  exports:[
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    SingleusertripComponent,
    SingleTransComponent,
    ConfirmComponent,
    // EditCompanyComponent
  ],

  providers: [
    UsercrudService, 
    HomeGuard,
    {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ConfirmComponent]
})
export class AppModule { }
