import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxSliderComponent } from './ngx-slider.component';

@NgModule({
  declarations: [NgxSliderComponent],
  imports: [CommonModule, FormsModule],
  exports: [NgxSliderComponent]
})
export class NgxSliderModule {}
