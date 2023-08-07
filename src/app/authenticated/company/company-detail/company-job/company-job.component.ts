import { Component, Input, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-company-job',
  templateUrl: './company-job.component.html',
  styleUrls: ['./company-job.component.scss']
})
export class CompanyJobComponent implements OnInit{
  @Input() companyId: string = '';
  jobs: any[] = [];
  paging: any = {
    pageNumber: 1,
    pageSize: 10
  }
  totalElements: number = 0;
  totalPages: number = 0;
  first: number = 0;

  constructor(
    private jobService: JobService
  ) {}

  ngOnInit(): void {
    this.getAllJobs();
    this.totalElements = this.jobs.length;
  }

  onPageChange(ev: any) {
  }

  checkExpiryDateJob(expiryDate: string) {
    let expiry = new Date(expiryDate);
    let now = new Date();

    return expiry.getTime() - now.getTime() < 0;
  }

  getAllJobs() {
    let params = {
      companyId: this.companyId,
      pageNumber: this.paging.pageNumber,
      pageSize: this.paging.pageSize
    }

    this.jobService.getJobsByCompanyId(params).subscribe(
      res => {
        if (res.status === 200) {
          this.jobs = res.data.content;
          this.totalElements = res.data.totalElements,
          this.totalPages = res.data.totalPages;
        }
      }
    )
  }
}
