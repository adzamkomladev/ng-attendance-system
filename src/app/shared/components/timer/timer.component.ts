import { Component, OnInit, Input } from '@angular/core';
import { Invigilation } from '../../services/invigilation.service';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {
  @Input() invigilation: Invigilation;

  constructor() {}

  ngOnInit() {}

  getTitle(): string {
    return Date.now() >= this.invigilation.from.toDate().getSeconds()
      ? 'Next invigilation in: '
      : 'Invigilation ends in: ';
  }

  getTime() {
    if (Date.now() >= this.invigilation.from.toDate().getSeconds()) {
      return (Date.now() - this.invigilation.from.toDate().getSeconds()) * 1000;
    }

    return this.invigilation.from.toDate().getSeconds() - Date.now() * 1000;
  }
}
