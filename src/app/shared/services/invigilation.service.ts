import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import * as firebase from 'firebase/app';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { LecturerService } from './lecturer.service';

export interface Invigilation {
  key?: string;
  classroom: string;
  courseCode: string;
  from: firebase.firestore.Timestamp;
  to: firebase.firestore.Timestamp;
  students: string[];
}

@Injectable({
  providedIn: 'root'
})
export class InvigilationService {

  private invigilationCollection: AngularFirestoreCollection<Invigilation>;

  constructor(private lecturerService: LecturerService, private afDB: AngularFirestore) {
    this.invigilationCollection = this.lecturerService.getLecturerDoc().collection('invigilations');
  }

  getAll(): Observable<Invigilation[]> {
    return this.invigilationCollection.snapshotChanges().pipe(
      map(res => res.map(val => {

        const data = val.payload.doc.data() as Invigilation;
        data.key = val.payload.doc.id;

        return data;
      }))
    );
  }

  getNextInvigilation(): Observable<Invigilation> {
    return this.getAll().pipe(map(invigilations =>
      invigilations.sort((a, b) => {
        if (a > b) { return 1; }
        if (a < b) { return -1; }

        return 0;
      })[0]
    ));
  }

  get(key: string): Observable<Invigilation> {
    return this.invigilationCollection.doc(key)
      .snapshotChanges()
      .pipe(map(val => {
        const data = val.payload.data() as Invigilation;
        data.key = val.payload.id;

        return data;
      }));
  }
}
