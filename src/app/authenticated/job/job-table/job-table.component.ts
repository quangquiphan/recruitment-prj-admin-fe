import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-table',
  templateUrl: './job-table.component.html',
  styleUrls: ['./job-table.component.scss']
})
export class JobTableComponent implements OnInit {
  jobs: any[] = [];
  paging: any = {
    pageNumber: 1,
    pageSize: 4
  }
  totalPages: number = 0;
  totalElements: number = 0
  first: number = 0;

  constructor(
    private route: Router
  ) {}

  ngOnInit() {
    this.jobs = [
      {
        id: 1,
        jobName: 'Java',
        position: 'developer',
        salary: '$ Thuong luong',
        city: 'HCM',
      },
      {
        id: 2,
        jobName: 'Java',
        position: 'developer',
        salary: '$ Thuong luong',
        city: 'HCM',
      },
      {
        id: 3,
        jobName: 'Java',
        position: 'developer',
        salary: '$ Thuong luong',
        city: 'HCM',
      },
      {
        id: 4,
        jobName: 'Java',
        position: 'developer',
        salary: '$ Thuong luong',
        city: 'HCM',
      },
      {
        id: 5,
        jobName: 'Java',
        position: 'developer',
        salary: '$ Thuong luong',
        city: 'HCM',
      },
      {
        id: 6,
        jobName: 'Java',
        position: 'developer',
        salary: '$ Thuong luong',
        city: 'HCM',
      }
    ]
  }

  loadData(ev: any) {
    
  }

  onDetailCandidate(id: string) {
    return this.route.navigate([`/job/${id}`]).then(r => {});
  }
}
