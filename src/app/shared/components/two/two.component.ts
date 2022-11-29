import {Component, OnDestroy} from '@angular/core';
import {concatMap, delay, exhaustMap, interval, mergeMap, of, repeat, Subject, take, takeUntil} from "rxjs";

@Component({
  selector: 'app-two',
  templateUrl: './two.component.html',
  styleUrls: ['./two.component.scss']
})
export class TwoComponent implements OnDestroy {

  public res1: number[] = [];
  public res2: number[] = [];
  public res3: number[] = [];
  public res4: number[] = [];

  private readonly numbers = interval(1000).pipe(take(20));

  private destroy$ = new Subject<void>();

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public doTaskOne(): void {

    this.numbers.pipe(
      exhaustMap((val) => of(val).pipe(delay(200), repeat(6))),
      takeUntil(this.destroy$)
    ).subscribe((val) => this.res1.push(val))

  }

  public doTaskTwo(): void {
    this.numbers.pipe(
      concatMap(() => interval(100).pipe(take(10))),
      takeUntil(this.destroy$)
    ).subscribe((val) => this.res2.push(val))

  }

  public doTaskThree(): void {

    this.numbers.pipe(
      concatMap((val) => {
        if (val % 2 === 0) {
          return of(val).pipe(delay(300), repeat(5))
        }
        return of(val);
      }),
      takeUntil(this.destroy$)
    ).subscribe((val) => this.res3.push(val))

  }

  public doTaskFour(): void {

    this.numbers.pipe(
      mergeMap((val) => of(val).pipe(delay(300), repeat(5))),
      takeUntil(this.destroy$)
    ).subscribe((val) => this.res4.push(val))

  }
}

