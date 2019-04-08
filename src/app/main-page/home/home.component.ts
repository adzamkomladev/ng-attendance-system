import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { InvigilationService, Invigilation } from 'src/app/shared/services/invigilation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  invigilations$: Observable<Invigilation[]>;
  nextInvigilation$: Observable<Invigilation>;

  constructor(private invigilationService: InvigilationService) { }

  ngOnInit() {
    this.invigilations$ = this.invigilationService.getAll();
    this.nextInvigilation$ = this.invigilationService.getNextInvigilation();
  }

}
