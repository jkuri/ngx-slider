# NgxRangeslider

Angular Range Slider as seen on Discord.

## Installation

Using Angular CLI:

```sh
ng add @jkuri/ngx-slider
```

or

```sh
npm install @jkuri/ngx-slider
```

Then in your module:

```ts
import { NgxSliderModule } from '@jkuri/ngx-slider';

@NgModule({
  imports: [NgxSliderModule]
})
```

In your template:

```html
<ngx-slider [(ngModel)]="fontSize" [values]="fontSizeValues" [options]="darkOptions"></ngx-slider>
```

And in your component (example):

```ts
import { SliderValue, SliderOptions } from '@jkuri/ngx-slider';

fontSize = 14;
fontSizeValues: SliderValue[] = [
  { value: 8, placeholder: '8px' },
  { value: 12, placeholder: '12px' },
  { value: 14, placeholder: '14px' },
  { value: 15, placeholder: '15px' },
  { value: 16, placeholder: '16px' },
  { value: 18, placeholder: '18px' },
  { value: 20, placeholder: '20px' },
  { value: 24, placeholder: '24px' }
];
darkOptions: SliderOptions = {
  gridColor: '#4F545C',
  dashColor: '#4F545C',
  dashMarkColor: '#4F545C',
  dashMarkSelectedColor: '#68d391',
  dashMarkFontWeight: 900,
  dashMarkFontSize: 12,
  dashMarkPadding: 12,
  barColor: '#ffffff'
};
```

## License

MIT
