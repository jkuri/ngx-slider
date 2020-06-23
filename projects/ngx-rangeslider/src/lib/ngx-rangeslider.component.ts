import {
  Component,
  OnInit,
  ElementRef,
  Renderer2,
  Input,
  OnChanges,
  SimpleChanges,
  OnDestroy,
  HostListener
} from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { RangeSliderOptions, defaultOptions, RangeSliderValue } from './ngx-rangeslider.interface';
import { fromEvent, Subscription, merge } from 'rxjs';
import { mergeMap, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'ngx-rangeslider',
  templateUrl: './ngx-rangeslider.component.html',
  styleUrls: ['./ngx-rangeslider.component.sass'],
  providers: [{ provide: NG_VALUE_ACCESSOR, useExisting: NgxRangesliderComponent, multi: true }]
})
export class NgxRangesliderComponent implements ControlValueAccessor, OnInit, OnChanges, OnDestroy {
  @Input() options: RangeSliderOptions;
  @Input() values: RangeSliderValue[] = [];

  innerValue: number;
  opts: RangeSliderOptions;
  el: HTMLElement;
  grid: HTMLElement;
  gridValues: HTMLElement;
  dashes: { v: RangeSliderValue; el: HTMLElement; placeholder: HTMLElement; left: number }[];
  bar: HTMLElement;
  sub = new Subscription();

  private onTouchedCallback: () => void = () => {};
  private onChangeCallback: (_: any) => void = () => {};

  get value(): number {
    return this.innerValue;
  }

  set value(val: number) {
    this.innerValue = val;
    this.onChangeCallback(this.innerValue);
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.opts = { ...defaultOptions(), ...this.options };
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('options' in changes || 'values' in changes) {
      this.opts = { ...defaultOptions(), ...this.options };
      this.el = this.elementRef.nativeElement;
      this.grid = this.el.querySelector('.rangeslider-grid');
      this.gridValues = this.el.querySelector('.rangeslider-grid-values');
      this.init();
      this.initDrag();
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.destroy();
  }

  draw(): void {}

  init(): void {
    this.renderer.setStyle(this.grid, 'width', this.opts.width);
    this.renderer.setStyle(this.grid, 'height', `${this.opts.gridHeight}px`);
    this.renderer.setStyle(this.grid, 'background', this.opts.gridColor);
    this.renderer.setStyle(this.grid, 'border-radius', `${this.opts.gridBorderRadius}px`);

    this.renderer.setStyle(this.gridValues, 'width', `${this.grid.clientWidth - this.opts.gridPadding * 2}px`);
    this.renderer.setStyle(this.gridValues, 'height', `${this.opts.gridHeight}px`);
    this.renderer.setStyle(this.gridValues, 'position', `absolute`);
    this.renderer.setStyle(this.gridValues, 'top', 0);
    this.renderer.setStyle(this.gridValues, 'left', `${this.opts.gridPadding}px`);
    this.renderer.setStyle(this.gridValues, 'cursor', `pointer`);

    const [min, max] = [Math.min(...this.values.map(v => v.value)), Math.max(...this.values.map(v => v.value))];
    this.dashes = [...this.values].map(v => {
      const el = this.renderer.createElement('div');
      const top = this.gridValues.clientHeight / 2 - this.opts.dashHeight / 2;
      const leftPercent = ((v.value - min) / (max - min)) * 100;
      const left = Math.round((this.gridValues.clientWidth / 100) * leftPercent);

      this.renderer.appendChild(this.gridValues, el);
      this.renderer.setStyle(el, 'background', this.opts.dashColor);
      this.renderer.setStyle(el, 'width', `${this.opts.dashWidth}px`);
      this.renderer.setStyle(el, 'height', `${this.opts.dashHeight}px`);
      this.renderer.setStyle(el, 'position', 'absolute');
      this.renderer.setStyle(el, 'top', `${top}px`);
      this.renderer.setStyle(el, 'left', `${left}px`);

      const placeholder = this.renderer.createElement('span');
      placeholder.innerHTML = v.placeholder;
      this.renderer.setStyle(placeholder, 'position', 'absolute');
      this.renderer.setStyle(placeholder, 'color', this.opts.dashMarkColor);
      this.renderer.setStyle(placeholder, 'font-family', this.opts.dashMarkFont);
      this.renderer.setStyle(placeholder, 'font-size', `${this.opts.dashMarkFontSize}px`);
      this.renderer.setStyle(placeholder, 'font-weight', this.opts.dashMarkFontWeight);
      this.renderer.setStyle(placeholder, 'user-select', 'none');
      this.renderer.appendChild(this.gridValues, placeholder);
      this.renderer.setStyle(placeholder, 'top', `${top - (placeholder.clientHeight + this.opts.dashMarkPadding)}px`);
      this.renderer.setStyle(placeholder, 'left', `${left - placeholder.clientWidth / 2}px`);

      return { v, el, placeholder, left };
    });

    this.bar = this.renderer.createElement('span');
    this.renderer.setStyle(this.bar, 'background', this.opts.barColor);
    this.renderer.setStyle(this.bar, 'width', `${this.opts.barWidth}px`);
    this.renderer.setStyle(this.bar, 'height', `${this.opts.barHeight}px`);
    this.renderer.setStyle(this.bar, 'border-radius', `${this.opts.barBorderRadius}px`);
    this.renderer.setStyle(this.bar, 'position', 'absolute');
    this.renderer.setStyle(this.bar, 'cursor', 'pointer');
    const value = this.value || min;
    if (!this.values.find(v => v.value === value)) {
      throw new Error(`value ${value} is not listed in input values`);
    }
    const barLeftPercent = ((value - min) / (max - min)) * 100;
    const barLeft = Math.round((this.gridValues.clientWidth / 100) * barLeftPercent);
    this.renderer.setStyle(this.bar, 'top', `${this.gridValues.clientHeight / 2 - this.opts.barHeight / 2}px`);
    this.renderer.setStyle(this.bar, 'left', `${barLeft - this.opts.barWidth / 2}px`);
    this.renderer.appendChild(this.gridValues, this.bar);

    const current = this.dashes.find(d => d.v.value === value);
    this.renderer.setStyle(current.placeholder, 'color', this.opts.dashMarkSelectedColor);
  }

  setBarPosition(): void {
    const [min, max] = [Math.min(...this.values.map(v => v.value)), Math.max(...this.values.map(v => v.value))];
    const value = this.value || min;
    if (!this.values.find(v => v.value === value)) {
      throw new Error(`value ${value} is not listed in input values`);
    }
    const barLeftPercent = ((value - min) / (max - min)) * 100;
    const barLeft = Math.round((this.gridValues.clientWidth / 100) * barLeftPercent);
    this.renderer.setStyle(this.bar, 'left', `${barLeft - this.opts.barWidth / 2}px`);

    this.dashes.forEach(d => this.renderer.setStyle(d.placeholder, 'color', this.opts.dashMarkColor));
    const current = this.dashes.find(d => d.v.value === value);
    this.renderer.setStyle(current.placeholder, 'color', this.opts.dashMarkSelectedColor);
  }

  initDrag(): void {
    const mousemove = fromEvent(document.documentElement, 'mousemove');
    const touchmove = fromEvent(document.documentElement, 'touchmove');
    const mousedown = fromEvent(this.bar, 'mousedown');
    const touchstart = fromEvent(this.el, 'touchstart');
    const mouseup = fromEvent(document.documentElement, 'mouseup');
    const touchend = fromEvent(document.documentElement, 'touchend');

    const mousedrag = mousedown.pipe(
      mergeMap((e: MouseEvent) => {
        const pageX = e.pageX;
        const left = parseFloat(this.bar.style.left);

        return mousemove.pipe(
          map((emove: MouseEvent) => {
            emove.preventDefault();
            return left + emove.pageX - pageX;
          }),
          takeUntil(mouseup)
        );
      })
    );

    const touchdrag = touchstart.pipe(
      mergeMap((e: TouchEvent) => {
        const pageX = e.targetTouches[0].pageX;
        const left = parseFloat(this.bar.style.left);

        return touchmove.pipe(
          map((tmove: TouchEvent) => {
            return left + tmove.targetTouches[0].pageX - pageX;
          }),
          takeUntil(touchend)
        );
      })
    );

    const dragSub = merge(...[mousedrag, touchdrag]).subscribe((left: number) => {
      document.body.addEventListener('selectstart', this.preventDefaultEvent, false);
      this.renderer.setStyle(document.body, 'touch-action', 'pan-x');
      this.renderer.setStyle(document.body, 'user-select', 'none');

      const [min, max] = [
        Math.min(...this.dashes.map(d => parseFloat(d.el.style.left))),
        Math.max(...this.dashes.map(d => parseFloat(d.el.style.left)))
      ];

      if (left >= min && left <= max) {
        this.renderer.setStyle(this.bar, 'left', `${left - this.bar.clientWidth / 2}px`);
        const closest = this.findClosest(parseFloat(this.bar.style.left));
        this.value = closest.v.value;
        this.dashes.forEach(d => this.renderer.setStyle(d.placeholder, 'color', this.opts.dashMarkColor));
        const current = this.dashes.find(d => d.v.value === this.value);
        this.renderer.setStyle(current.placeholder, 'color', this.opts.dashMarkSelectedColor);
      }

      if (left < min || left > max) {
        this.setBarPosition();
      }
    });

    const dragEndSub = merge(...[mouseup, touchend]).subscribe(() => {
      document.body.removeEventListener('selectstart', this.preventDefaultEvent, false);
      this.renderer.setStyle(document.body, 'touch-action', 'unset');
      this.renderer.setStyle(document.body, 'user-select', 'default');

      const closest = this.findClosest(parseFloat(this.bar.style.left));
      this.value = closest.v.value;
      this.setBarPosition();
    });

    this.sub.add(dragSub);
    this.sub.add(dragEndSub);
  }

  findClosest(left: number): { v: RangeSliderValue; el: HTMLElement; placeholder: HTMLElement; left: number } {
    return this.dashes.reduce((prev, curr) => (Math.abs(curr.left - left) < Math.abs(prev.left - left) ? curr : prev));
  }

  destroy(): void {
    this.dashes.forEach(d => {
      this.gridValues.removeChild(d.el);
      this.gridValues.removeChild(d.placeholder);
    });
    this.dashes = [];
    this.gridValues.removeChild(this.bar);
  }

  preventDefaultEvent(e: MouseEvent): void {
    e.preventDefault();
    e.stopPropagation();
  }

  writeValue(val: number) {
    if (!val) {
      return;
    }
    this.innerValue = val;
    this.setBarPosition();
  }

  registerOnChange(fn: any) {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any) {
    this.onTouchedCallback = fn;
  }

  @HostListener('window:resize', ['$event']) onResize() {
    this.destroy();
    this.init();
    this.initDrag();
  }
}
