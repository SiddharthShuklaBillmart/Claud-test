import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-counter',
  imports: [],
  templateUrl: './counter.html',
  styleUrl: './counter.scss'
})
export class Counter {
  Counterval = signal(0)
  Increment() {
    this.Counterval.update((val) => val + 1)
  }
  decrement() {
    this.Counterval.update((val) => val - 1)
  }
  Reset() {
    this.Counterval.set(0)
  }
}
