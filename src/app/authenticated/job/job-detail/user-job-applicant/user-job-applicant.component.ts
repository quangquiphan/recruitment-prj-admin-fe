import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { User } from 'src/app/model/user.model';
import { CandidateService } from 'src/app/services/candidate.service';
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
    pageSize: 5
  }
  userId: string = '';
  appConstant = AppConstant;

  constructor(
    private translateService: TranslateService,
    private candidateService: CandidateService,
  ) {}

  ngOnInit(): void {
  }

  openPoup(user: any) {
    if (user.cv || user.cv !== null) {
      return this.openPdf(user.userId);
    }
    return [this.userId = user.user.Id, this.showUserDetail = true];
  }

  openPdf(id: string) {
    this.candidateService.downloadPDF(id).subscribe(
      (res : any) => {
        const fileUrl = URL.createObjectURL(res);
        window.open(fileUrl, "mozillaWindow", "popup");
      }
    )
  }

  parseYearExperience(yearExperience: string) {
    if (!yearExperience) yearExperience = 'NON_EXPERIENCE';
    return this.translateService.instant(`YEAR_EXPERIENCE.${yearExperience}`);
  }

  parseDate(date: string) {
    return moment(moment(date).subtract(7, 'hours')).format('DD-MM-YYYY HH:mm');
  }

  parseLabelDate(u: any) {
    if (u.jobStatus === AppConstant.JOB_STATUS.APPLIED) {
      return this.translateService.instant('message.requested_on_date', 
        {name: u.lastName + ' ' + u.firstName, date: this.parseDate(u.createdDate)});
    }

    return this.translateService.instant('message.rejected_on_date', 
      {name: u.lastName + ' ' + u.firstName, date: this.parseDate(u.updatedDate)});
  }
}
