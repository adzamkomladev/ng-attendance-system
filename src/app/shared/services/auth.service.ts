import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';

export interface User {
  uid: string;
  displayName?: string;
  photoURL?: string;
  email: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afAtuh: AngularFireAuth, private router: Router) { }

  login(email: string, password: string): void {
    this.afAtuh.auth
      .signInWithEmailAndPassword(email, password)
      .then(response => {
        localStorage.setItem('user', JSON.stringify(response.user as User));

        const url = localStorage.getItem('returUrl') || '/';

        this.router.navigate([url]);

        localStorage.removeItem('returnUrl');
      }).catch(err => console.error(err));
  }

  logout(): void {
    this.afAtuh.auth.signOut().then(() => {
      localStorage.removeItem('user');

      this.router.navigate(['/login']);
    }).catch(err => console.error(err));
  }

  getAuthenticatedUser(): User {
    return JSON.parse(localStorage.getItem('user'));
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('user');
  }

}
