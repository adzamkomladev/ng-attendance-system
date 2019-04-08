import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Student {
  key?: string;
  firstName: string;
  lastName: string;
  otherNames?: string;
  indexNumber: string;
  level: 300;
}
@Injectable({
  providedIn: 'root'
})
export class StudentService {

  studentsCollection: AngularFirestoreCollection<Student>;

  constructor(private afDB: AngularFirestore) {
    this.studentsCollection = this.afDB.collection<Student>('students');
  }

  getSome(ids: string[]): Observable<Student[]> {
    return this.studentsCollection.
      snapshotChanges()
      .pipe(
        map(res => res.map(val => {
          const data = val.payload.doc.data() as Student;
          data.key = val.payload.doc.id;

          return data;
        }).filter(student => ids.includes(student.key)))
      );
  }
}
