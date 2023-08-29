import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem } from 'primeng/api';
import { AuthUser } from 'src/app/model/auth-user.model';
import { AuthenticateService } from 'src/app/services/authenticate.service';

@Component({
  selector: 'app-authenticated-left-menu',
  templateUrl: './authenticated-left-menu.component.html',
  styleUrls: ['./authenticated-left-menu.component.scss']
})
export class AuthenticatedLeftMenuComponent implements OnInit{
  authUser: AuthUser | undefined;
  selectedTab: any;
  href: any;
  menuItems: MenuItem[] = []
  leftMenuItems: any[] = [
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
    },
    {
      id: 3,
      label: 'label.skills',
      path: '/skills',
      size: 24,
      icon: '../../../assets/images/icons/colorfilter.svg'
    },
    {
      id: 4,
      label: 'label.notifications',
      path: '/notifications',
      size: 24,
      icon: '../../../assets/images/icons/notification.svg'
    }
  ];

  constructor(
    private route: Router,
    private translateService: TranslateService,
    private authenticateService: AuthenticateService
  ) {}

  ngOnInit(): void {
    this.initMenu();
    this.getInfo();

  }

  initMenu() {
    this.route.events.subscribe((e : any) => {
      if (e?.routerEvent) {
        this.href = e?.routerEvent.url;
        this.selectedTab = e?.routerEvent.id;
        this.getSelectedTab(this.href);        
      }
    })

    this.menuItems = [
      {
        icon: 'pi pi-sign-out',
        label: this.translateService.instant('button.sign_out'),
        command: () => {
          this.logout();
        }
      }
    ]
  }

  logout() {
    return this.authenticateService.logout().subscribe(
      res => {
        if (res.status === 200) {
          this.authenticateService.deleteToken();
          this.authenticateService.clearSession();
          this.authenticateService.doResetAuthUser();
          this.authenticateService.setAuthUser(undefined);
          this.route.navigate(['/sign-in']).then(r => {});
        }
      }
    )
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

  getSelectedTab(url: any) {
    if (url.includes('candidate')) {
      this.selectedTab = 0;
    } else if (url.includes('company')) {
      this.selectedTab = 1;
    } else if (url.includes('job')) {
      this.selectedTab = 2;
    }else if (url.includes('skills')) {
      this.selectedTab = 3;
    }  else if (url.includes('notifications')) {
      this.selectedTab = 4;
    }
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
