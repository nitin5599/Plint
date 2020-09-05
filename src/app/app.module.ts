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

import { UsercrudService } from './services/usercrud.service';
import { AuthInterceptor} from './helpers/auth.interceptor';
import { SingleusertripComponent } from './singleusertrip/singleusertrip.component';
import { SingleTransComponent } from './single-trans/single-trans.component';
// import { UsertripComponent } from './usertrip/usertrip.component'
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSortModule} from '@angular/material/sort';
import {MatButtonModule} from '@angular/material/button';
// import {MatTableDataSourceModule} from '@angular/material/table';
import {MatTableModule} from '@angular/material/table';
import { CdkTableModule} from '@angular/cdk/table';
import {DataSource} from '@angular/cdk/table';

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
    NgxPaginationModule
    // MatTableDataSourceModule
    // MatTableDataSource

  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    SingleusertripComponent,
    SingleTransComponent,
    // UsertripComponent,

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
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
