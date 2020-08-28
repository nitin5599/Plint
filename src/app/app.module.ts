import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { RouterModule } from '@angular/router';
 
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { AdminLayoutModule } from '../app/layouts/admin-layout/admin-layout.module';

import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import { HomeGuard } from './auth/home.guard';

import { UsercrudService } from './services/usercrud.service';
import { AuthInterceptor} from './helpers/auth.interceptor'


@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    ComponentsModule,
    ToastrModule.forRoot(),
    RouterModule,
    AppRoutingModule,
    AdminLayoutModule
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,

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
  bootstrap: [AppComponent]
})
export class AppModule { }
