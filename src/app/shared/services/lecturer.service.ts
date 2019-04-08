import { Injectable } from '@angular/core';

import { AngularFirestoreDocument, AngularFirestore } from '@angular/fire/firestore';

import { AuthService } from './auth.service';

export interface Lecturer {
  key?: string;
  firstName: string;
  lastName: string;
  otherNames?: string;
  title: string;
}

@Injectable({
  providedIn: 'root'
})
export class LecturerService {

  private lecturerDoc: AngularFirestoreDocument<Lecturer>;

  constructor(private auth: AuthService, private afDB: AngularFirestore) {
    this.lecturerDoc = this.afDB.collection('lecturers').doc(this.auth.getAuthenticatedUser().uid);
  }

  getLecturerDoc(): AngularFirestoreDocument<Lecturer> {
    return this.lecturerDoc;
  }
}
