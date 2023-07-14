import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-company-job',
  templateUrl: './company-job.component.html',
  styleUrls: ['./company-job.component.scss']
})
export class CompanyJobComponent implements OnInit{
  jobs: any[] = [];
  paging: any = {
    pageNumber: 1,
    pageSize: 2
  }
  totalElements: number = 0;
  first: number = 0;

  constructor() {}

  ngOnInit(): void {
    this.jobs = [
      {
        id: 0,
        jobName: 'Developer',
        salary: 'Expected',
        expiryDate: '21/07/2023',
        skills: [
          {
            id: 0,
            name: 'Java',
            level: 'Expert'
          },
          {
            id: 1,
            name: 'Java',
            level: 'Expert'
          },
          {
            id: 2,
            name: 'Java',
            level: 'Expert'
          },
          {
            id: 3,
            name: 'Java',
            level: 'Expert'
          },
          {
            id: 4,
            name: 'Java',
            level: 'Expert'
          }
        ],
        languages: [
          {
            id: 1,
            name: "English",
            level: 'Expert'
          },
          {
            id: 1,
            name: "English",
            level: 'Expert'
          },
          {
            id: 1,
            name: "English",
            level: 'Expert'
          }
        ]
      },
      {
        id: 1,
        jobName: 'Developer',
        salary: 'Expected',
        expiryDate: '01/07/2023',
        skills: [
          {
            id: 0,
            name: 'Java',
            level: 'Expert'
          },
          {
            id: 1,
            name: 'Java',
            level: 'Expert'
          },
          {
            id: 2,
            name: 'Java',
            level: 'Expert'
          },
          {
            id: 3,
            name: 'Java',
            level: 'Expert'
          },
          {
            id: 4,
            name: 'Java',
            level: 'Expert'
          }
        ],
        languages: [
          {
            id: 1,
            name: "English",
            level: 'Expert'
          },
          {
            id: 1,
            name: "English",
            level: 'Expert'
          },
          {
            id: 1,
            name: "English",
            level: 'Expert'
          }
        ]
      },
      {
        id: 2,
        jobName: 'Developer',
        salary: 'Expected',
        expiryDate: '21/07/2023',
        skills: [
          {
            id: 0,
            name: 'Java',
            level: 'Expert'
          },
          {
            id: 1,
            name: 'Java',
            level: 'Expert'
          },
          {
            id: 2,
            name: 'Java',
            level: 'Expert'
          },
          {
            id: 3,
            name: 'Java',
            level: 'Expert'
          },
          {
            id: 4,
            name: 'Java',
            level: 'Expert'
          }
        ],
        languages: [
          {
              id: 1,
              name: "English",
              level: 'Expert'
          },
          {
            id: 1,
            name: "English",
            level: 'Expert'
          },
          {
            id: 1,
            name: "English",
            level: 'Expert'
          }
        ]
      }
    ]

    this.totalElements = this.jobs.length;
  }

  onPageChange(ev: any) {
  }

  checkExpiryDateJob(expiryDate: string) {
    let expiry = new Date(expiryDate);
    let now = new Date();

    return expiry.getTime() - now.getTime() < 0;
  }
}
