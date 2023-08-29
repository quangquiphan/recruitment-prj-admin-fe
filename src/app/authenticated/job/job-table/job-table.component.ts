import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { Job } from 'src/app/model/job.model';
import { JobService } from 'src/app/services/job.service';
import AppData from 'src/app/utilities/app-data';

@Component({
  selector: 'app-job-table',
  templateUrl: './job-table.component.html',
  styleUrls: ['./job-table.component.scss']
})
export class JobTableComponent implements OnInit {
  jobs: Job[] = [];
  cities: any[] = [];
  paging: any = {
    pageNumber: 1,
    pageSize: 10

  }
  keyword: string = '';
  totalPages: number = 0;
  totalElements: number = 0
  first: number = 0;

  constructor(
    private route: Router,
    private jobService: JobService,
    private translateService: TranslateService,
  ) {}

  ngOnInit() {
    this.cities = AppData.getListCity();
  }

  loadData(ev: any) {
    if (ev) {
      this.paging.pageSize = ev.rows;
      this.paging.pageNumber = ev.first/ev.rows + 1;
    }
    
    return this.jobService.getJobs(this.paging).subscribe(
      res => {
        if (res.status === 200) {
          this.jobs = res.data.content;
          this.totalElements = res.data.totalElements;
          this.totalPages = res.data.totalPages;
        }
      }
    )
  }

  onSearch(ev?: any) {
    if (ev) {
      return this.jobService.searchJobs({searchKey: ev.value}).subscribe(
        res => {
          if (res.status === 200) {
            this.jobs = res.data;
          }
        }
      )  
    }
    return this.jobService.searchJobs({searchKey: this.keyword}).subscribe(
      res => {
        if (res.status === 200) {
          this.jobs = res.data;
        }
      }
    )
  }

  onDetailCandidate(id: string) {
    return this.route.navigate([`/job/${id}`]).then(r => {});
  }

  parseSalary(salary: string) {
    if (!salary) return;
    return this.translateService.instant(`salary.${salary}`);
  }
}
