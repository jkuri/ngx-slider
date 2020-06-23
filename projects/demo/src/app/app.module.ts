import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgxRangesliderModule } from 'ngx-rangeslider';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, NgxRangesliderModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
