import {Component} from '@angular/core';
import {
  concatAll, concatMap,
  delay,
  exhaustAll, exhaustMap,
  filter,
  interval,
  map,
  mergeAll, mergeMap,
  of,
  repeat,
  switchAll,
  switchMap,
  take
} from "rxjs";

@Component({
  selector: 'app-two',
  templateUrl: './two.component.html',
  styleUrls: ['./two.component.scss']
})
export class TwoComponent {

  public res1: number[] = [];
  public res2: number[] = [];
  public res3: number[] = [];
  public res4: number[] = [];

  doTaskOne() {
    const numbers = interval(1000).pipe(take(20));

    const res = numbers.pipe(
      exhaustMap((val) => of(val).pipe(delay(200), repeat(6)))
    )

    res.pipe().subscribe((val) => this.res1.push(val))

  }

  doTaskTwo() {
    const numbers = interval(1000).pipe(take(20));
    const res = numbers.pipe(
      map(() => interval(100).pipe(take(10)))
    )
    res.pipe(concatAll()).subscribe((val) => this.res2.push(val))
  }

  doTaskThree() {
    const numbers = interval(1000).pipe(take(20));

    const res = numbers.pipe(

      concatMap((val) => {
        if (val % 2 === 0) {
          return of(val).pipe(delay(300), repeat(5))
        }
        return of(val);
      })

    )

    res.pipe().subscribe((val) => this.res3.push(val))
  }

  doTaskFour() {
    const numbers = interval(1000).pipe(take(20));

    const res = numbers.pipe(
      mergeMap((val) => of(val).pipe(delay(300), repeat(5)))
    )

    res.pipe().subscribe((val) => this.res4.push(val))
  }
}

