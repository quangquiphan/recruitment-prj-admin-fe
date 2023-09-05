import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MenuItem, MessageService } from 'primeng/api';
import { CandidateService } from 'src/app/services/candidate.service';
import { UserService } from 'src/app/services/user.service';
import AppUtil from 'src/app/utilities/app-util';

@Component({
  selector: 'app-candidate',
  templateUrl: './candidate.component.html',
  styleUrls: ['./candidate.component.scss']
})
export class CandidateComponent implements OnInit{
  candidates: any[] = [];
  id: string = '';
  userId: string = '';
  keyword: string = '';
  paging: any = {
    pageNumber: 1,
    pageSize: 10
  }
  totalElements: number = 0;
  totalPages: number = 0;
  first: number = 0;
  showUserDetail: boolean = false;
  item: MenuItem[] = [];
  isConfirmDelete: boolean = false;

  constructor(
    private userService: UserService,
    private messageService: MessageService,
    private translateService: TranslateService,
    private candidateService: CandidateService
  ) {}

  ngOnInit(): void {
    this.item = [
      {
        label: this.translateService.instant('label.remove'),
        command: () => {
          this.isConfirmDelete = true;
        }
      }
    ]
  }

  onLoadData(ev?: any) {
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

  onDelete() {
    return this.userService.deleteUser(this.userId).subscribe(
      res => {
        if (res.status === 200) {
          this.isConfirmDelete = false;
          this.onLoadData();
          AppUtil.getMessageSuccess(this.messageService, this.translateService,
            'message.remove_candidate_successfully')
        } else {
          this.isConfirmDelete = false;
          AppUtil.getMessageFailed(this.messageService, this.translateService,
            'message.remove_candidate_failed')
        }
      }
    )
  }

  onSearch(keyword: string) {
    if (!keyword) {
      this.onLoadData();
    }
    
    return this.userService.searchUser({keyword}).subscribe(
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

  getYearExperience(yearExperience: string) {
    if (!yearExperience) yearExperience = 'NON_EXPERIENCE';
    return this.translateService.instant(`YEAR_EXPERIENCE.${yearExperience}`);
  }
}
