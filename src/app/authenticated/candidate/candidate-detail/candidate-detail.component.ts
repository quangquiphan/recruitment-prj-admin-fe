import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { User } from 'src/app/model/user.model';
import { CandidateService } from 'src/app/services/candidate.service';
import AppConstant from 'src/app/utilities/app-constant';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.scss']
})
export class CandidateDetailComponent implements OnChanges {
  @Input() userId: string = '';
  ev = environment;
  appConstant = AppConstant;
  candidate: User | undefined;
  constructor(
    private candidateService: CandidateService,
    private translateService: TranslateService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getCandidate(this.userId);
  }

  getCandidate(id: string) {
    this.candidateService.getCandidate(id).subscribe(
      res => {
        if (res.status === 200) {
          this.candidate = res.data;
        }
      }
    )
  }

  getFullName(firstName: any, lastName: any) {
    return firstName + " " + lastName;
  }

  parseFromAndToDate(fromDate: string, toDate: string, isCurrent: boolean) {
    if (isCurrent) {
      return moment(moment(fromDate).toDate()).format(AppConstant.DATE_FORMAT.MONTH_YEAR) + ' - ' +
        this.translateService.instant('label.now');
    }

    return moment(moment(fromDate).toDate()).format(AppConstant.DATE_FORMAT.MONTH_YEAR) + ' - ' +
      moment(moment(toDate).toDate()).format(AppConstant.DATE_FORMAT.MONTH_YEAR)
  }

  parseYearExperience(yearExperience: string) {
    if (!yearExperience) yearExperience = 'NON_EXPERIENCE';
    return this.translateService.instant(`YEAR_EXPERIENCE.${yearExperience}`);
  }

  parseGender(gender: string) {
    if (!gender) return '';

    return this.translateService.instant(`gender.${gender}`)
  }
}
