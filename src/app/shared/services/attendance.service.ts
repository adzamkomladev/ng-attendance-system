import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable, from, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

export interface Attendance {
  key?: string;
  invigilation: string;
  present: string[];
}
@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  attendancesCollection: AngularFirestoreCollection<Attendance>;

  constructor(private afDB: AngularFirestore) {
    this.attendancesCollection = this.afDB.collection('attendances');
  }

  getAll(): Observable<Attendance[]> {
    return this.attendancesCollection.snapshotChanges().pipe(
      map(res =>
        res.map(val => {
          const data = val.payload.doc.data();
          data.key = val.payload.doc.id;

          return data;
        })
      )
    );
  }

  async getByInvigilation(key: string): Promise<Observable<Attendance>> {
    const response = await this.attendancesCollection.ref
      .where('invigilation', '==', key)
      .get();

    if (response.empty) {
      console.log('Hello');
      const attendance: Attendance = { invigilation: key, present: [] };

      const val = await this.attendancesCollection.add(attendance);

      return this.attendancesCollection
        .doc<Attendance>(val.id)
        .snapshotChanges()
        .pipe(
          map(snapShot => {
            const data = snapShot.payload.data();
            data.key = snapShot.payload.id;

            return data;
          })
        );
    }

    const attendance = response.docChanges()[0].doc.data() as Attendance;
    attendance.key = response.docChanges()[0].doc.id;

    return of(attendance);
  }

  markPresent(attendance: Attendance): void {
    this.attendancesCollection
      .doc(attendance.key)
      .update(attendance)
      .then(() => console.log('Attendance updated successfully!!'))
      .catch(err => console.error(err));
  }
}
