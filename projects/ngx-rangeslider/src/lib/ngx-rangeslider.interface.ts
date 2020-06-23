export interface RangeSliderOptions {
  width?: string;
  gridHeight?: number;
  gridColor?: string;
  gridBorderRadius?: number;
  gridPadding?: number;
  dashColor?: string;
  dashWidth?: number;
  dashHeight?: number;
  dashMarkColor?: string;
  dashMarkSelectedColor?: string;
  dashMarkFont?: string;
  dashMarkFontSize?: number;
  dashMarkFontWeight?: number;
  dashMarkPadding?: number;
  barColor?: string;
  barWidth?: number;
  barHeight?: number;
  barBorderRadius?: number;
}

export interface RangeSliderValue {
  value: number;
  placeholder: string | number;
}

export function defaultOptions(): RangeSliderOptions {
  return {
    width: '100%',
    gridHeight: 10,
    gridColor: '#ACB3D7',
    gridBorderRadius: 4,
    gridPadding: 8,
    dashColor: '#ACB3D7',
    dashWidth: 2,
    dashHeight: 26,
    dashMarkColor: '#ACB3D7',
    dashMarkSelectedColor: '#5362ac',
    dashMarkFont: 'sans-serif',
    dashMarkFontSize: 10,
    dashMarkFontWeight: 600,
    dashMarkPadding: 8,
    barColor: '#5362ac',
    barWidth: 10,
    barHeight: 26,
    barBorderRadius: 4
  };
}
