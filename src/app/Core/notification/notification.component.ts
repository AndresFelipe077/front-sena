import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { NotificationService } from 'src/app/shared/services/notification-service';
import { NotificationOptions } from 'src/app/shared/models/notification-options.model';
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent {

  @ViewChild("notification") notificationRef!: ElementRef;

  constructor(
    private notificationService: NotificationService,
    private renderer2: Renderer2,
  ) { }

  showNotification: boolean = false;
  message: string = "";
  informationMessage: string = "";
  timeoutRef: any;

  hideNotification(): void {
    const notif = this.notificationRef.nativeElement;
    notif.className = "";
    this.renderer2.addClass(notif, "notification");
    setTimeout(() => { this.renderer2.addClass(notif, "active"); }, 200);
  }

  ngAfterViewInit(): void {
    const notif = this.notificationRef.nativeElement;
    this.notificationService.notify$.subscribe((res: any) => {
      if (this.timeoutRef) { clearTimeout(this.timeoutRef); }
      this.hideNotification();
      this.renderer2.addClass(notif, res.type)
      for (let position of res.position) { this.renderer2.addClass(notif, position); }
      this.message = res.message;
      this.informationMessage = res.informationMessage;
      document.documentElement.style.setProperty("--time", (String(res.time) + "ms"));
      this.timeoutRef = setTimeout(() => {
        this.renderer2.removeClass(notif, "active");
        this.renderer2.removeClass(notif, res.type)
        for (let position of res.position) { this.renderer2.removeClass(notif, position); }
      }, (res.time));

    })

    this.notificationService.clear$.subscribe(() => {
      this.renderer2.removeClass(notif, "active");
      if (this.timeoutRef) { clearTimeout(this.timeoutRef); }

    })


  }

}
