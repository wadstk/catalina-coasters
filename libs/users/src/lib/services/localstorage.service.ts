import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalstorageService {

  constructor() { }

  setItem(data: string) {

    return localStorage.setItem('token', data);
    
  }
  getToken() {

    return localStorage.getItem('token');
    
  }

  removeToken() {
    return localStorage.removeItem('token')
  }

  isValidToken() {
    const token = this.getToken();
    if(token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      return !this._tokenExpired(tokenDecode.exp);
    } else {
      return false;
    }
  }

  getUserIdFromToken() {
    const token = this.getToken();
    if (token) {
      const tokenDecode = JSON.parse(atob(token.split('.')[1]));
      if (tokenDecode) {
        //console.log(tokenDecode._id);
        return tokenDecode._id;
      } else {
        return null;
      }
    } else {
      return null;
    }
  }

  private _tokenExpired(expiration): boolean {
    return Math.floor(new Date().getTime() / 1000) >= expiration;
  }
}
