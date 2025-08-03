import { Component, signal } from '@angular/core';
import { Greeting } from '../components/greeting/greeting';
import { Counter } from '../components/counter/counter';

@Component({
  selector: 'app-home',
  imports: [Greeting,Counter],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home {
  Homemessage = signal("hello i am from home to greeting")
  Keyuphandler(event: KeyboardEvent) {
    console.log(`The Event: ${event.key}`)
  }
}
