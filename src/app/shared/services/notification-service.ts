import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { NotificationOptions } from '../models/notification-options.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private notifyServe = new Subject();
  private clearnotifyServe = new Subject();
  notify$ = this.notifyServe.asObservable();
  clear$ = this.clearnotifyServe.asObservable();
  constructor() { }

  showNotification(options: NotificationOptions) {
    if (!options.position) { options.position = ["top", "right"] }
    if (!options.time) { options.time = 3000; }
    if (!options.type) {options.type = "fail"}
    this.notifyServe.next(options);
  }
  clearNotification() {
    this.clearnotifyServe.next(null);
  }
}