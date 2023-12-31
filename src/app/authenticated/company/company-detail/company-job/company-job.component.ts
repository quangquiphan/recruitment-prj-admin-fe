import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as moment from 'moment';
import { Job } from 'src/app/model/job.model';

@Component({
  selector: 'app-company-job',
  templateUrl: './company-job.component.html',
  styleUrls: ['./company-job.component.scss']
})
export class CompanyJobComponent implements OnInit{
  @Input() jobs: Job[] = [];
  @Input() totalElements: number = 0;
  @Output() onReloadData: EventEmitter<any> = new EventEmitter();
  first: number = 0;
  paging: any = {
    companyId: '',
    pageNumber: 1,
    pageSize: 10
  }

  constructor(
    private translateService: TranslateService,
  ) {}

  ngOnInit(): void {
    
  }

  parseSalary(salary: string) {
    if (!salary) return;
    return this.translateService.instant(`salary.${salary}`);
  }

  parseDate(expiry: string) {
    let now = new Date();
    let expiryDate = new Date(moment(expiry).add(1, 'day').toDate()); 
    let result = (expiryDate.getTime() - now.getTime())/(1000 * 60);
    
    if (Math.round(result/(60*24)) > 1) {
      result = Math.round(result / (60*24));
      return this.translateService.instant(`label.${result > 1 ? 'num_days' : 'num_day'}`, {number: result});
    }

    if (Math.round(result/(60)) > 1) {
      result = Math.round(result / (60));
      return this.translateService.instant(`label.${result > 1 ? 'num_hours' : 'num_hour'}`, {number: result});
    }

    result = Math.round(result);
    return this.translateService.instant(`label.${result > 1 ? 'num_minutes' : 'num_minute'}`, {number: result});
  }
}
