import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';

import { InvigilationService, Invigilation } from 'src/app/shared/services/invigilation.service';
import { switchMap } from 'rxjs/operators';
import { StudentService, Student } from 'src/app/shared/services/student.service';

@Component({
  selector: 'app-invigilation-details',
  templateUrl: './invigilation-details.component.html',
  styleUrls: ['./invigilation-details.component.css']
})
export class InvigilationDetailsComponent implements OnInit {
  invigilation$: Observable<Invigilation>;
  students$: Observable<Student[]>;

  constructor(private inviilationService: InvigilationService, private studentService: StudentService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    const key = this.route.snapshot.paramMap.get('key');

    this.invigilation$ = this.inviilationService.get(key);

    this.students$ = this.invigilation$.pipe(
      switchMap(val => this.studentService.getSome(val.students))
    );
  }

}
