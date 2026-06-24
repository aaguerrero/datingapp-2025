import { HttpClient } from '@angular/common/http';
import { inject,Injectable,signal } from '@angular/core';
import { tap } from 'rxjs';

import { User } from '../../types/user';
import { RegisterCreds } from '../../types/register-creds';
import { LoginCreds } from '../../types/login-creds';

@Injectable({
  providedIn: 'root',
})
export class AccountService {

  private http = inject(HttpClient);
  currentUser = signal<User | null >(null);

  baseUrl = 'https://localhost:5001/api/';

  Register(creds:RegisterCreds){
    return this.http.post<User>(this.baseUrl + 'account/register',creds).pipe(
      tap(user => {
        if (user) {
            this.setCurrentUser(user)
        }

      })
    );
  }

  login(creds:LoginCreds){
    return this.http.post<User>(this.baseUrl + 'account/login',creds).pipe(
      tap(user => {
        if (user) {
            this.setCurrentUser(user)
        }

      })
    )
  }

  setCurrentUser(user:User){
    localStorage.setItem('user',JSON.stringify(user))
    this.currentUser.set(user)
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUser.set(null);
  }
  
}
