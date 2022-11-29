import {Component, OnDestroy} from '@angular/core';
import {filter, interval, map, Subject, take, takeUntil} from "rxjs";

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.scss']
})
export class OneComponent implements OnDestroy {

  public res1: number[] = [];
  public res2: number[] = [];
  public res3: number[] = [];

  private readonly numbers = interval(1000).pipe(take(20));

  private destroy$ = new Subject<void>();

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  public doTaskOne(): void {
    this.numbers.pipe(
      map((val) => val * 3),
      takeUntil(this.destroy$)
    ).subscribe((val) => {
      this.res1.push(val)
    })
  }

  public doTaskTwo(): void {
    this.numbers.pipe(
      take(7),
      takeUntil(this.destroy$)
    ).subscribe((val) => {
      this.res2.push(val)
    })
  }

  public doTaskThree(): void {
    this.numbers.pipe(
      filter((val) => val % 2 === 0),
      takeUntil(this.destroy$)
    ).subscribe((val) => {
      this.res3.push(val)
    })
  }
}
