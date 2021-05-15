import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

import { User } from '../../../../models/user.model';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches),
    shareReplay()
  );

  userData : User;

  constructor(
    private router: Router,
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.user$.subscribe(data => {
      this.userData = data;
    });
  }

  logout() {
    this.authService.logout();
  }

}
