import { Component } from '@angular/core';
import { RangeSliderValue, RangeSliderOptions } from 'ngx-rangeslider';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  fontSize = 14;
  fontWeight = 400;
  fontSizeValues: RangeSliderValue[] = [
    { value: 8, placeholder: '8px' },
    { value: 12, placeholder: '12px' },
    { value: 14, placeholder: '14px' },
    { value: 15, placeholder: '15px' },
    { value: 16, placeholder: '16px' },
    { value: 18, placeholder: '18px' },
    { value: 20, placeholder: '20px' },
    { value: 24, placeholder: '24px' }
  ];
  fontWeightValues: RangeSliderValue[] = [
    { value: 100, placeholder: 'thin' },
    { value: 300, placeholder: 'light' },
    { value: 400, placeholder: 400 },
    { value: 500, placeholder: 500 },
    { value: 600, placeholder: 600 },
    { value: 700, placeholder: 'bold' },
    { value: 800, placeholder: 800 },
    { value: 900, placeholder: 'black' }
  ];
  darkOptions: RangeSliderOptions = {
    gridColor: '#4F545C',
    dashColor: '#4F545C',
    dashMarkColor: '#4F545C',
    dashMarkSelectedColor: '#68d391',
    dashMarkFontWeight: 900,
    dashMarkFontSize: 12,
    dashMarkPadding: 12,
    barColor: '#ffffff'
  };
}
