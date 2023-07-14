import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { toArray } from 'lodash';
import AppConstant from 'src/app/utilities/app-constant';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.scss']
})
export class JobDetailComponent implements OnInit{
  tabViews: any[] = [
    {
      index: 0,
      label: 'Matches'
    },
    {
      index: 1,
      label: 'Applied'
    }
  ]
  selectedTab: number = 0;
  jobId: any = '';
  jobStatus: string  = '';

  constructor(
    private route: Router,
    private router: ActivatedRoute
  ) {

  }
  
  ngOnInit(): void {
    this.jobId = this.router.snapshot.paramMap.get('id');
    
    this.selectedTabViewUrl();
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
    }

    this.activatedTabView(this.selectedTab);
  }

  onBack() {
    return this.route.navigate(['/job']).then(r => {});
  }

  onChangeTabView(event: any) {
    this.selectedTab = event.index;
    this.activatedTabView(this.selectedTab);
  }

  activatedTabView(selectedTab: number) {
    let tab = '';

    if (selectedTab === 0) {
      this.jobStatus = AppConstant.JOB_STATUS.MATCHES;
      tab = "matches";  
    } 
    
    if (selectedTab === 1) {
      this.jobStatus = AppConstant.JOB_STATUS.APPLIED;
      tab = "applied";
    }

    return this.route.navigate([`/job/${this.jobId}/${tab}`]).then(r => {});
  }
}
