import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { CoreService } from './shared/services/core.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {

  logout() {
    window.location.href = '/login';
  }

  title = 'frontend_frabrica';
  constructor(
    private router: Router,
  ) {
    // iconSet singleton
  }

  ngOnInit() {
    
    this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
