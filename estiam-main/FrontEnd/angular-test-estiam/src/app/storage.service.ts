import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setSetting(key: string, value: string) {
    window.localStorage.setItem(key, value);
  }

  getSetting(key: string) {
    return window.localStorage.getItem(key);
  }

  removeSetting(key: string) {
    window.localStorage.removeItem(key);
  }

}
