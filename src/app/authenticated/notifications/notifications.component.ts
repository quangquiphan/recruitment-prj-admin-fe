import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Company } from 'src/app/model/company.model';
import { Notification } from 'src/app/model/notification.model';
import { CompanyService } from 'src/app/services/company.service';
import { NotificationService } from 'src/app/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss']
})
export class NotificationsComponent implements OnInit{
  notifications: Notification[] = [];
  companies: Company[] = [];
  paging: any = {
    companyId: '',
    filter: 'ALL',
    pageNumber: 1,
    pageSize: 5
  }
  totalElements: number = 0;
  totalPages: number = 0;
  first: number = 0;
  loading: boolean = false;
  companyId: string = '';

  constructor(
    private companyService: CompanyService,
    private translateService: TranslateService,
    private notificationService: NotificationService,
  ) {
    
  }

  ngOnInit(): void {
    this.getAllCompany();
  }

  getAllCompany() {
    return this.companyService.getAllCompany({pageNumber: 1, pageSize: 1000}).subscribe(
      res => {
        if (res.status === 200) {
          this.companies = res.data.content;
        }
      }
    )
  }

  onLoadData(ev?:any) {
    this.paging.companyId = this.companyId;

    if (ev.value) {
      this.paging.pageNumber = ev.first / ev.rows + 1;
    }

    return this.notificationService.getAllNotificationsByCompany(this.paging).subscribe(
      res => {
        if (res.status === 200) {
          this.notifications = res.data.content;
          this.totalElements = res.data.totalElements;
          this.totalPages = res.data.totalPages;
        }
      }
    )
  }

  parseContent(content: string, lastName: string, firstName: string, position: string) {
    return this.translateService.instant(`message.${content}`, {name: lastName + ' ' + firstName, position: position});
  }
}
