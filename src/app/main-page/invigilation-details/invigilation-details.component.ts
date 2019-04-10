import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable, Subscription } from 'rxjs';

import {
  InvigilationService,
  Invigilation
} from 'src/app/shared/services/invigilation.service';
import { switchMap, subscribeOn, map, take } from 'rxjs/operators';
import {
  StudentService,
  Student
} from 'src/app/shared/services/student.service';
import {
  Attendance,
  AttendanceService
} from 'src/app/shared/services/attendance.service';

@Component({
  selector: 'app-invigilation-details',
  templateUrl: './invigilation-details.component.html',
  styleUrls: ['./invigilation-details.component.css']
})
export class InvigilationDetailsComponent implements OnInit {
  invigilation$: Observable<Invigilation>;
  students$: Observable<Student[]>;
  attendance: Attendance;

  constructor(
    private inviilationService: InvigilationService,
    private studentService: StudentService,
    private attendanceService: AttendanceService,
    private route: ActivatedRoute
  ) {}

  async ngOnInit() {
    const key = this.route.snapshot.paramMap.get('key');

    this.invigilation$ = this.inviilationService.get(key);

    this.students$ = this.invigilation$.pipe(
      switchMap(val => this.studentService.getSome(val.students))
    );

    const attendance$ = await this.attendanceService.getByInvigilation(key);

    attendance$
      .pipe(take(1))
      .subscribe(attendance => (this.attendance = attendance));
  }

  onClick(studentKey: string) {
    this.attendance.present.push(studentKey);
    this.attendanceService.markPresent(this.attendance);
  }
}
