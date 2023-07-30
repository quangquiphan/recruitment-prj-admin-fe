import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CandidateService } from 'src/app/services/candidate.service';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit{
  candidates: any[] = [];
  id: string = '';

  paging: any = {
    pageNumber: 1,
    pageSize: 10
  }
  totalElements: number = 0;
  totalPages: number = 0;
  first: number = 0;
  showUserDetail: boolean = false;

  constructor(
    private route: Router,
    private translateService: TranslateService,
    private candidateService: CandidateService
  ) {}

  ngOnInit(): void {
    
  }

  onLoadData(ev: any) {
    if (ev) {
      this.paging.pageSize = ev.rows;
    }
    
    this.paging.pageNumber = this.first + 1;

    this.candidateService.getAllCandidate(this.paging).subscribe(
      res => {
        if (res.status === 200) {
          this.candidates = res.data.content;
          this.totalPages = res.data.totalPages;
          this.totalElements = res.data.totalElements;
        }
      }
    )
  }

  openPdf(id: string) {
    this.candidateService.downloadPDF(id).subscribe(
      (res : any) => {
        const fileUrl = URL.createObjectURL(res);
        window.open(fileUrl, "mozillaWindow", "popup");
      }
    )
  }

  openUserDetailPopup(id: string) {
    return [this.id = id, this.showUserDetail = true];
  }

  checkCV(item: any) {
    return item.cv?true:false;
  }

  getYearExperience(year: any) {
    if (year) {
      return this.translateService.instant(`YEAR_EXPERIENCE.${year}`);
    }

    return 0;
  }
}
