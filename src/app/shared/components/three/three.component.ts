import {Component, OnDestroy} from '@angular/core';
import {combineLatest, forkJoin, interval, map, Observable, Subject, take, takeUntil, zip} from "rxjs";

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.scss']
})
export class ThreeComponent implements OnDestroy {
  public res1: string[][] = [];
  public res2: string[][] = [];
  public res3: string[][] = [];

  private readonly source1: Observable<string> = interval(200).pipe(take(10), map((val) => 'source1 val = ' + val));
  private readonly source2: Observable<string> = interval(300).pipe(take(10), map((val) => 'source2 val = ' + val));
  private readonly source3: Observable<string> = interval(400).pipe(take(10), map((val) => 'source3 val = ' + val));

  private destroy$ = new Subject<void>();

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  doTaskOne() {
    combineLatest(this.source1, this.source2, this.source3).pipe(
      takeUntil(this.destroy$)
    ).subscribe((val: string[]) => this.res1.push(val))
  }

  doTaskTwo() {
    forkJoin(this.source1, this.source2, this.source3).pipe(
      takeUntil(this.destroy$)
    ).subscribe((val: string[]) => this.res2.push(val))
  }

  doTaskThree() {
    zip(this.source1, this.source2, this.source3).pipe(
      takeUntil(this.destroy$)
    ).subscribe((val: string[]) => this.res3.push(val))
  }
}
