import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, interval, of } from 'rxjs';
import { Observable } from 'rxjs-compat';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.css'],
})
export class RxjsComponent implements OnInit {
  @ViewChild('button') button!: ElementRef;

  srcObs$ = of('Angular', 'React', 'Vue');
  innerObs$ = of(1, 2, 3);
  clicks$: Observable<Event> = new Observable();

  name: string = '';

  constructor() {}

  ngOnInit(): void {
    //this.switchMap();
  }

  ngAfterViewInit() {
    this.clicks$ = fromEvent(this.button.nativeElement, 'click');
    this.switchMapExample();
  }

  switchMap() {
    this.srcObs$
      .pipe(
        switchMap((data) => {
          console.log('Outer Observable:', data);
          return this.innerObs$;
        }),
      )
      .subscribe((result) => {
        console.log('Inner Observable Result:', result);
      });
  }

  switchMapExample() {
    this.clicks$
      .pipe(
        switchMap((event) => {
          return interval(500); // Emits values every 500ms
        }),
      )
      .subscribe((result) => {
        console.log('Result from switchMap:', result);
      });
  }
}
