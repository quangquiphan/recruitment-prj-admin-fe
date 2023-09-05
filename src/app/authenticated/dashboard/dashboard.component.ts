import { Component, OnInit } from '@angular/core';
import { DashboardService } from 'src/app/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit{
  dashboard: any;

  constructor(
    private dashboardService: DashboardService
  ) { }

  ngOnInit(): void {
    this.getDashboard();
  }

  getDashboard() {
    return this.dashboardService.dashboard().subscribe(
      res => {
        if (res.status === 200) {
          this.dashboard = res.data;
        }
      }
    )
  }
}
