import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NguiAutoCompleteModule } from '@ngui/auto-complete';
import { AppComponent } from './app.component';
import { CitiesAutocompleteComponent } from './cities-autocomplete/cities-autocomplete.component';
import { HomeComponent } from './home/home.component';
import { ApiService } from './service/api.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    CitiesAutocompleteComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NguiAutoCompleteModule
  ],
  providers: [
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
