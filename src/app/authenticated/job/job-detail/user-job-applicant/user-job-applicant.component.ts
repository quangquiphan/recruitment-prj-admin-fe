import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { User } from 'src/app/model/user.model';
import AppConstant from 'src/app/utilities/app-constant';

@Component({
  selector: 'app-user-job-applicant',
  templateUrl: './user-job-applicant.component.html',
  styleUrls: ['./user-job-applicant.component.scss']
})
export class UserJobApplicantComponent implements OnInit{
  @Input() userApplicant: any[] = [];
  @Input() totalElements: number = 0;
  @Output() onReload: EventEmitter<any> = new EventEmitter();
  showUserDetail: boolean = false;
  first: number = 0;
  paging: any = {
    pageNumber: 1,
    pageSize: 10
  }
  userId: string = '';
  appConstant = AppConstant;

  constructor(
    private translateService: TranslateService
  ) {}

  ngOnInit(): void {
  }

  openPoup(id: string) {
    return [this.userId = id, this.showUserDetail = true];
  }

  parseYearExperience(yearExperience: string) {
    if (!yearExperience) yearExperience = 'NON_EXPERIENCE';
    return this.translateService.instant(`YEAR_EXPERIENCE.${yearExperience}`);
  }

  parseDate(date: string) {
    return moment(moment(date).subtract(7, 'hours')).format('DD-MM-YYYY HH:mm');
  }

  parseLabelDate(jobStatus: string, date: string, lastName: string, firstName: string) {
    if (jobStatus === this.appConstant.JOB_STATUS.APPLIED) {
      return this.translateService.instant('message.requested_on_date', 
        {name: lastName + ' ' + firstName, date: this.parseDate(date)});
    }

    return this.translateService.instant('message.rejected_on_date', 
      {name: lastName + ' ' + firstName, date: this.parseDate(date)});
  }
}
