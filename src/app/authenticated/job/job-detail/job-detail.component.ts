import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { toArray } from 'lodash';
import { Job } from 'src/app/model/job.model';
import { JobService } from 'src/app/services/job.service';
import { UserJobService } from 'src/app/services/user-job.service';
import AppConstant from 'src/app/utilities/app-constant';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit{
  userApplicant: any[] = [];
  userApplicantShow: any[] = [];
  job: Job | undefined;
  jobId: any = '';
  jobStatus: string  = '';
  selectedTab: number = 0;
  totalElements: number = 0;
  paging: any = {
    major: '',
    jobId: '',
    pageNumber: 1,
    pageSize: 10
  }
  tabViews: any[] = [
    {
      index: 0,
      label: 'label.matches'
    },
    {
      index: 1,
      label: 'label.applied'
    },
    {
      index: 2,
      label: 'label.rejected'
    }
  ]

  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private jobService: JobService,
    private userJobService: UserJobService,
    private translateService: TranslateService,
  ) {

  }
  
  ngOnInit(): void {
    this.jobId = this.router.snapshot.paramMap.get('id');
    this.getJobDetail();
    
  }

  getUserApplicant(status: string) {
    this.userApplicant = [];
    this.userApplicantShow = [];
    return this.userJobService.getListApplicant(status, this.paging).subscribe(
      res => {
        if (res.status === 200) {
          this.userApplicant = res.data.content;
          this.totalElements = res.data.totalElements;

          for (let i = 0; i < this.userApplicant.length; i++) {
            if (i >= (this.paging.pageNumber - 1) 
              && i < (this.paging.pageNumber * this.paging.pageSize)) {
              this.userApplicantShow.push(this.userApplicant[i]);
            }
          }
          
        }
      }
    )
  }

  getJobDetail() {
    return this.jobService.getJob(this.jobId).subscribe(
      res => {
        if (res.status === 200) {
          this.job = res.data;
          this.paging.jobId = res.data.id;
          this.paging.major = res.data.categoryJob;
          this.selectedTabViewUrl();
        }
      }
    )
  }

  selectedTabViewUrl() {
    let arr = toArray(this.route.routerState.snapshot.url.split("/"))
    const map = new Map();
    
    if (arr.length === 3) {
      arr.push();
    }

    map.set('tab', arr[3]);

    if (map.get('tab') === 'matches' || !map.get('tab')) {
      this.selectedTab = 0;
    } else if (map.get('tab') === 'applied') {
      this.selectedTab = 1;
    } else if (map.get('tab') === 'rejected') {
      this.selectedTab = 2;
    }

    this.activatedTabView(this.selectedTab);
  }

  onBack() {
    return this.route.navigate(['/job']).then(r => {});
  }

  onReload(ev: any) {
    this.userApplicantShow = [];

    if (ev) {
      this.paging.pageNumber = ev.first/ev.rows + 1;
    }

    for (let i = 0; i < this.userApplicant.length; i++) {
      if (i >= (this.paging.pageNumber - 1) 
          && i < (this.paging.pageNumber * this.paging.pageSize)) {
        this.userApplicantShow.push(this.userApplicant[i]);
      }
    }

    return this.userApplicantShow;
  }

  onChangeTabView(event: any) {
    this.selectedTab = event.index;
    this.activatedTabView(this.selectedTab);
  }

  activatedTabView(selectedTab: number) {
    let tab = '';
    this.paging.jobId = this.jobId;

    if (selectedTab === 0) {
      this.jobStatus = AppConstant.JOB_STATUS.MATCHES;
      tab = "matches";
      this.paging.major = this.job?.categoryJob;
    } 
    
    if (selectedTab === 1) {
      this.jobStatus = AppConstant.JOB_STATUS.APPLIED;
      tab = "applied";
    }
    
    if (selectedTab === 2) {
      this.jobStatus = AppConstant.JOB_STATUS.REJECTED;
      tab = "rejected";
    }

    this.getUserApplicant(tab);
    return this.route.navigate([`/job/${this.jobId}/${tab}`]).then(r => {});
  }

  parseSalary(salary: string) {
    if (!salary) return;
    return this.translateService.instant(`salary.${salary}`);
  }
}
