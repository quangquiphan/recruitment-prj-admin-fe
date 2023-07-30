import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toArray } from 'lodash';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-detail',
  templateUrl: './company-detail.component.html',
  styleUrls: ['./company-detail.component.scss']
})
export class CompanyDetailComponent implements OnInit{
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
  selectedTab: number = 0;
  companyId: any = '';
  company: any;

  constructor(
    private route: Router,
    private router: ActivatedRoute,
    private companyService: CompanyService
  ) {

  }
  
  ngOnInit(): void {
    this.companyId = this.router.snapshot.paramMap.get('id');
    this.getCompany(this.companyId);

    this.selectedTabViewUrl();
  }

  getCompany(id: any) {
    this.companyService.getCompany(id).subscribe(
      res => {
        console.log(res);
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
