import {Component} from '@angular/core';
import {combineLatest, combineLatestAll, forkJoin, interval, map, mergeAll, take, zip} from "rxjs";

@Component({
  selector: 'app-three',
  templateUrl: './three.component.html',
  styleUrls: ['./three.component.scss']
})
export class ThreeComponent {
  public res1: string[][] = [];
  public res2: string[][] = [];
  public res3: string[][] = [];

  doTaskOne() {
    const source1 = interval(200).pipe(take(10), map((val) => 'source1 val = ' + val));
    const source2 = interval(300).pipe(take(10), map((val) => 'source2 val = ' + val));
    const source3 = interval(400).pipe(take(10), map((val) => 'source3 val = ' + val));

    combineLatest(source1, source2, source3).subscribe((val: string[]) =>this.res1.push(val))
  }

  doTaskTwo() {
    const source1 = interval(200).pipe(take(10), map((val) => 'source1 val = ' + val));
    const source2 = interval(300).pipe(take(10), map((val) => 'source2 val = ' + val));
    const source3 = interval(400).pipe(take(10), map((val) => 'source3 val = ' + val));

    forkJoin(source1, source2, source3).subscribe((val: string[]) => this.res2.push(val))
  }

  doTaskThree() {
    const source1 = interval(200).pipe(take(10), map((val) => 'source1 val = ' + val));
    const source2 = interval(300).pipe(take(10), map((val) => 'source2 val = ' + val));
    const source3 = interval(400).pipe(take(10), map((val) => 'source3 val = ' + val));

    zip(source1, source2, source3).subscribe((val: string[]) =>this.res3.push(val))

  }
}
