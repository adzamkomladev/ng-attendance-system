import { Component, OnInit, Input } from '@angular/core';
import { Invigilation } from 'src/app/shared/services/invigilation.service';

@Component({
  selector: 'app-peek-invigilation',
  templateUrl: './peek-invigilation.component.html',
  styleUrls: ['./peek-invigilation.component.css']
})
export class PeekInvigilationComponent implements OnInit {

  @Input() invigilation: Invigilation;

  constructor() { }

  ngOnInit() {
  }

}
