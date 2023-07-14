import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CandidateService } from 'src/app/services/candidate.service';

@Component({
  selector: 'app-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.scss']
})
export class CompanyTableComponent implements OnInit{
  companies: any[] = [];

  paging: any = {
    pageNumber: 1,
    pageSize: 4
  }
  totalElements: number = 0;
  totalPages: number = 0;
  first: number = 0;

  constructor(
    private route: Router
  ) {}

  ngOnInit(): void {
    this.companies = [
      {
        id: 1,
        comapnyName: "ABCxyz",
        email: "example@gmail.com",
        phoneNumber: "03453xxx89",
        size: "Over 100"
      },
      {
        id: 2,
        comapnyName: "ABCxyz",
        email: "example@gmail.com",
        phoneNumber: "03453xxx89",
        size: "Over 100"
      },
      {
        id: 3,
        comapnyName: "ABCxyz",
        email: "example@gmail.com",
        phoneNumber: "03453xxx89",
        size: "Over 100"
      },
      {
        id: 4,
        comapnyName: "ABCxyz",
        email: "example@gmail.com",
        phoneNumber: "03453xxx89",
        size: "Over 100"
      },
      {
        id: 5,
        comapnyName: "ABCxyz",
        email: "example@gmail.com",
        phoneNumber: "03453xxx89",
        size: "Over 100"
      },
      {
        id: 6,
        comapnyName: "ABCxyz",
        email: "example@gmail.com",
        phoneNumber: "03453xxx89",
        size: "Over 100"
      }
    ]

    this.totalElements = this.companies.length
  }

  onLoadData(ev: any) {
    // if (ev) {
    //   this.paging.pageSize = ev.rows;
    //   this.paging.pageNumber = ev.first/ev.rows + 1;
    // }
  }

  onNavigateToDetail(id: string) {
    return this.route.navigate([`/company/${id}`]).then(r => {});
  }
}
