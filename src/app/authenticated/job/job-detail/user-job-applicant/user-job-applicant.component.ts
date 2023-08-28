import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { User } from 'src/app/model/user.model';

@Component({
  selector: 'app-user-job-applicant',
  templateUrl: './user-job-applicant.component.html',
  styleUrls: ['./user-job-applicant.component.scss']
})
export class UserJobApplicantComponent implements OnInit{
  @Input() userApplicant: User[] = [];
  @Input() totalElements: number = 0;
  @Output() onReload: EventEmitter<any> = new EventEmitter();
  showUserDetail: boolean = false;
  first: number = 0;
  paging: any = {
    pageNumber: 1,
    pageSize: 10
  }
  userId: string = '';
  users: any [] = [];

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
}
