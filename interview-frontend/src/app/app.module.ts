import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {CityComponent} from "./city/city.component";
import {FormsModule} from "@angular/forms";
import {CityService} from "./services/city.service";
import {SharedModule} from "./shared/shared.module";

@NgModule({
  declarations: [
    AppComponent,
    CityComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    SharedModule
  ],
  providers: [CityService],
  bootstrap: [AppComponent]
})
export class AppModule { }
