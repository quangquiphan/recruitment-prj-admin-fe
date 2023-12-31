import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthenticateService } from "../services/authenticate.service";
import { Observable, map, of } from "rxjs";
import { AuthUser } from "../model/auth-user.model";
import AppConstant from "../utilities/app-constant";
import AppUtil from "../utilities/app-util";
import { MessageService } from "primeng/api";
import { TranslateService } from "@ngx-translate/core";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private messageService: MessageService,
        private translateService: TranslateService,
        private authenticateService: AuthenticateService
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> {
        if (!this.authenticateService.token) {
            this.router.navigate(['sign-in']).then((r) => {});
            return of(true);
        }

        return this.authenticateService.getAuthInfo().pipe(
            map(
                (res: any) => {
                    const authUser: AuthUser = res.data;
                    this.authenticateService.setAuthUser(authUser);
                    if (authUser.role !== AppConstant.USER_ROLE.ADMIN) {
                        AppUtil.getMessageFailed(this.messageService, this.translateService,
                            'message.permission_access_denied');
                        this.authenticateService.clearSession();
                        this.router.navigate(['/sign-in']).then((r) => {});
                        return false;
                    }
                    return true;
                },
                (error: any) => {
                    this.authenticateService.clearSession();
                    this.router.navigate(['/sign-in']).then((r) => {});
                    return false;
                }
            )
        );
    }
}