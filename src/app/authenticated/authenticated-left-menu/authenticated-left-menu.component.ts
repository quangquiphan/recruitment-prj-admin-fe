import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthUser } from 'src/app/model/auth-user.model';
import { AuthenticateService } from 'src/app/services/authenticate.service';
import AppConstant from 'src/app/utilities/app-constant';
import AppUtil from 'src/app/utilities/app-util';

@Component({
  selector: 'app-authenticated-left-menu',
  templateUrl: './authenticated-left-menu.component.html',
  styleUrls: ['./authenticated-left-menu.component.scss']
})
export class AuthenticatedLeftMenuComponent implements OnInit{
  changePasswordForm: FormGroup = new FormGroup({});
  authUser: AuthUser | undefined;
  isChangePasswordPopup: boolean = false;
  selectedTab: any;
  href: any;
  menuItems: MenuItem[] = []
  leftMenuItems: any[] = [
    {
      id: 0,
      label: 'label.dashboard',
      path: '/dashboard',
      size: 24,
      icon: '../../../assets/images/icons/dashboard.svg'
    },
    {
      id: 1,
      label: 'label.candidate',
      path: '/candidate',
      size: 24,
      icon: '../../../assets/images/icons/users.svg'
    },
    {
      id: 2,
      label: 'label.company',
      path: '/company',
      size: 24,
      icon: '../../../assets/images/icons/buliding.svg'
    },
    {
      id: 3,
      label: 'label.job',
      path: '/job',
      size: 24,
      icon: '../../../assets/images/icons/briefcase.svg'
    },
    {
      id: 4,
      label: 'label.skills',
      path: '/skills',
      size: 24,
      icon: '../../../assets/images/icons/colorfilter.svg'
    },
    {
      id: 5,
      label: 'label.notifications',
      path: '/notifications',
      size: 24,
      icon: '../../../assets/images/icons/notification.svg'
    }
  ];

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private messageService: MessageService,
    private translateService: TranslateService,
    private authenticateService: AuthenticateService
  ) {
    this.changePasswordForm = this.fb.group({
      oldPassword: ['', [
        Validators.required,
        Validators.pattern(AppConstant.PATTERNS.PASSWORD)
      ]],
      newPassword: ['', [
        Validators.required,
        Validators.pattern(AppConstant.PATTERNS.PASSWORD)
      ]],
      confirmNewPassword: ['', [
        Validators.required,
        Validators.pattern(AppConstant.PATTERNS.PASSWORD)
      ]]
    })
  }

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
      },
      {
        icon: 'pi pi-eye',
        label: this.translateService.instant('label.change_password'),
        command: () => {
          this.isChangePasswordPopup = true;
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

  onChangePassword() {
    let params = {
      oldPassword: AppUtil.hasMD5(this.changePasswordForm.value.oldPassword),
      newPassword: AppUtil.hasMD5(this.changePasswordForm.value.newPassword),
      confirmNewPassword: AppUtil.hasMD5(this.changePasswordForm.value.confirmNewPassword),
    }
    
    return this.authenticateService.changePassword(AppUtil.toSnakeCaseKey(params)).subscribe(
      res => {
        if (res.status === 200) {
          AppUtil.getMessageSuccess(this.messageService, this.translateService,
            'message.change_password_successfully');
          this.isChangePasswordPopup = false;
          this.changePasswordForm.reset();
        } else {
          AppUtil.getMessageFailed(this.messageService, this.translateService,
            'message.change_password_failed');
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
    if (url.includes('dashboard')) {
      this.selectedTab = 0;
    } else if (url.includes('candidate')) {
      this.selectedTab = 1;
    } else if (url.includes('company')) {
      this.selectedTab = 2;
    }else if (url.includes('job')) {
      this.selectedTab = 3;
    }  else if (url.includes('skills')) {
      this.selectedTab = 4;
    }  else if (url.includes('notifications')) {
      this.selectedTab = 5;
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
