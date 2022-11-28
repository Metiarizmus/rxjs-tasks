import {Component} from '@angular/core';
import {filter, interval, map, take} from "rxjs";

@Component({
  selector: 'app-one',
  templateUrl: './one.component.html',
  styleUrls: ['./one.component.scss']
})
export class OneComponent {

  public res1: number[] = [];
  public res2: number[] = [];
  public res3: number[] = [];

  doTaskOne() {
    const numbers = interval(1000).pipe(take(20));
    numbers.pipe(
      map((val) => val * 3)
    ).subscribe((val) => {
      this.res1.push(val)
    })
  }

  doTaskTwo() {
    const numbers = interval(1000).pipe(take(20));
    numbers.pipe(
      take(7)
    ).subscribe((val) => {
      this.res2.push(val)
    })
  }

  doTaskThree() {
    const numbers = interval(1000).pipe(take(20));
    numbers.pipe(
      filter((val) => val%2===0)
    ).subscribe((val) => {
      this.res3.push(val)
    })
  }
}
