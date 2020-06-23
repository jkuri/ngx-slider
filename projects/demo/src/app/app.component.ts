import { Component } from '@angular/core';
import { RangeSliderValue } from 'ngx-rangeslider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  fontSize = 14;
  values: RangeSliderValue[] = [
    { value: 12, placeholder: '12px' },
    { value: 14, placeholder: '14px' },
    { value: 15, placeholder: '15px' },
    { value: 16, placeholder: '16px' },
    { value: 18, placeholder: '18px' },
    { value: 20, placeholder: '20px' },
    { value: 24, placeholder: '24px' }
  ];
}
