import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toArray } from 'lodash';
import { Job } from 'src/app/model/job.model';
import { CompanyService } from 'src/app/services/company.service';
import { JobService } from 'src/app/services/job.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit{
  jobs: Job[] = [];
  jobShow: Job[] = [];
  accountMember: any[] = [];
  accountMemberShow: any[] = [];
  companyId: any = '';
  company: any;
  selectedTab: number = 0;
  totalElements: number = 0;
  totalPages: number = 0;
  paging: any = {
    companyId: '',
    pageNumber: 1,
    pageSize: 10
  }
  tabViews: any[] = [
    {
      index: 0,
      label: 'label.general'
    },
    {
      index: 1,
      label: 'label.jobs'
    },
    {
      index: 2,
      label: 'label.account'
    }
  ]

  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private jobService: JobService,
    private userService: UserService,
    private companyService: CompanyService,
  ) {

  }
  
  ngOnInit(): void {
    this.companyId = this.router.snapshot.paramMap.get('id');
    this.getCompany(this.companyId);    
    this.getAllJobs();
    this.getCompanyMember();
    this.selectedTabViewUrl();
  }

  getAllJobs() {
    let params = {
      companyId: this.companyId
    }

    this.jobService.getJobsByCompanyId(params).subscribe(
      res => {
        if (res.status === 200) {
          this.jobs = res.data;
          for (let i = 0; i < this.jobs.length; i++) {
            if (i >= (this.paging.pageNumber - 1) && i < this.paging.pageNumber * this.paging.pageSize) {
              this.jobShow.push(this.jobs[i]);
            }
          }
        }
      }
    )
  }

  getCompanyMember() {
    this.paging.companyId = this.companyId;
    return this.userService.getCompanyMember(this.paging).subscribe(
      res => {
        if (res.status === 200) {
          this.accountMember = res.data.content;
          this.totalElements = res.data.totalElements;
          this.totalPages = res.data.totalPages;
          
          for (let i = 0; i < this.accountMember.length; i++) {
            if (i >= (this.paging.pageNumber - 1) && i < this.paging.pageNumber * this.paging.pageSize) {
              this.accountMemberShow.push(this.accountMember[i]);
            }
          }
        }
      }
    )    
  }

  onReloadJob(ev: any) {
    if (ev) {
      this.jobShow = [];
      this.paging.pageNumber = ev.first/ev.rows + 1;
    }
    
    for (let i = 0; i < this.jobs.length; i++) {
      if (i >= (this.paging.pageNumber - 1) && i < this.paging.pageNumber * this.paging.pageSize) {
        this.jobShow.push(this.jobs[i]);
      }
    }

    return this.jobShow;
  }

  onReloadAccount(ev :any){
    if (ev === 'reload') {
      return this.getCompanyMember();
    }

    if (ev) {
      this.accountMemberShow = [];
      this.paging.pageNumber = ev.first/ev.rows + 1;
    }
    
    for (let i = 0; i < this.accountMember.length; i++) {
      if (i >= (this.paging.pageNumber - 1) && i < this.paging.pageNumber * this.paging.pageSize) {
        this.accountMemberShow.push(this.accountMember[i]);
      }
    }

    return this.accountMemberShow;
  }

  getCompany(id: any) {
    this.companyService.getCompany(id).subscribe(
      res => {
        this.company = res.data;
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

    switch (map.get('tab')) {
      case 'general':
      case '':
        this.selectedTab = 0;        
        break;
    
      case 'jobs':
        this.selectedTab = 1;
        break;

      case 'account':
        this.selectedTab = 2;
        break;
    }

    this.activatedTabView(this.selectedTab);
  }

  onBack() {
    return this.route.navigate(['/company']).then(r => {});
  }

  onChangeTabView(event: any) {
    this.selectedTab = event.index;
    this.activatedTabView(this.selectedTab);
  }

  activatedTabView(selectedTab: number) {
    let tab = '';
    if (selectedTab === 0) {
      tab = "general";
    } else if (selectedTab === 1) {
      tab = "jobs"
    } else if (selectedTab === 2) {
      tab = "account";
    }

    return this.route.navigate([`/company/${this.companyId}/${tab}`]).then(r => {});
  }
}
