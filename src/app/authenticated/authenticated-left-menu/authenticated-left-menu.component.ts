import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthUser } from 'src/app/model/auth-user.model';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-authenticated-left-menu',
  templateUrl: './authenticated-left-menu.component.html',
  styleUrls: ['./authenticated-left-menu.component.scss']
})
export class AuthenticatedLeftMenuComponent implements OnInit{
  authUser: AuthUser | undefined;
  selectItem: any;
  leftMenuItems: any[] = [];

  constructor(
    private route: Router,
    private authenticateService: AuthenticateService
  ) {}

  ngOnInit(): void {
    this.initMenu();
    this.getInfo();
  }

  initMenu() {
    this.selectItem = this.route.url;

    this.leftMenuItems = [
      {
        id: 0,
        label: 'label.candidate',
        path: '/candidate',
        size: 24,
        icon: '../../../assets/images/icons/users.svg'
      },
      {
        id: 1,
        label: 'label.company',
        path: '/company',
        size: 24,
        icon: '../../../assets/images/icons/buliding.svg'
      },
      {
        id: 2,
        label: 'label.job',
        path: '/job',
        size: 24,
        icon: '../../../assets/images/icons/briefcase.svg'
      }
    ]

    this.leftMenuItems.forEach(item => {
      if (this.selectItem.includes(item.path)) {
        return this.selectItem = item.path;
      }
    })
  }

  getInfo() {
    this.authenticateService.getAuthInfo().subscribe(
      res => {
        if (res.status === 200) {
          this.authUser = res.data;
        }
      }
     )
  }

  onSelectItem(ev: any) {
    this.route.navigate([ev.path]).then(r => {});    
    return this.selectItem = ev.path;
  }

  parserName(auth: AuthUser | undefined) {
    if (!auth?.firstName && !auth?.lastName) {
      return auth?.role;
    }
    
    return auth.firstName?auth.firstName:'' + " " + auth.lastName?auth.lastName:'';
  }

  parseAvatarText(auth: AuthUser | undefined) {
    if (auth?.firstName || auth?.lastName) {
      return auth?.firstName.charAt(0) + auth?.lastName.charAt(0);
    }

    if (auth?.role === "ADMIN") {
      return auth?.role.charAt(0) + auth?.role.charAt(1);
    }
    
    return auth?.email.charAt(0).toUpperCase();
  }
}
