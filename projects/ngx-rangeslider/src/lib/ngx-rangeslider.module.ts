import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxRangesliderComponent } from './ngx-rangeslider.component';

@NgModule({
  declarations: [NgxRangesliderComponent],
  imports: [CommonModule, FormsModule],
  exports: [NgxRangesliderComponent]
})
export class NgxRangesliderModule {}
