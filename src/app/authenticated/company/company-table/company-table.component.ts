import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { escape } from 'lodash';
import { MessageService } from 'primeng/api';
import { CompanyService } from 'src/app/services/company.service';
import AppConstant from 'src/app/utilities/app-constant';
import AppData from 'src/app/utilities/app-data';
import AppUtil from 'src/app/utilities/app-util';

@Component({
  selector: 'app-company-table',
  templateUrl: './company-table.component.html',
  styleUrls: ['./company-table.component.scss']
})
export class CompanyTableComponent implements OnInit{
  companyForm: FormGroup = new FormGroup({})
  companies: any[] = [];
  isShowAddCompanyPopup: boolean = false;
  loading: boolean = false;
  companySizes: any = [];
  keyword: string = '';
  paging: any = {
    pageNumber: 1,
    pageSize: 10
  }
  totalElements: number = 0;
  totalPages: number = 0;
  first: number = 0;

  constructor(
    private route: Router,
    private fb: FormBuilder,
    private companyService: CompanyService,
    private messageService: MessageService,
    private translateService: TranslateService
  ) {
    this.companySizes = AppData.getCompanySize(this.translateService);
    this.companyForm = this.fb.group({
      companyName: ['', Validators.required],
      email: ['', Validators.pattern(AppConstant.PATTERNS.EMAIL)],
      phoneNumber: ['', Validators.pattern(AppConstant.PATTERNS.PHONE)],
      size: [AppConstant.COMPANY_SIZE.FORM_11_TO_25]
    })
  }

  ngOnInit(): void {
    this.onLoadData();
  }

  getAllCompany(paging: any) {
    this.companyService.getAllCompany(paging).subscribe(
      res => {
        if (res.status === 200) {
          this.companies = res.data.content;
          this.totalElements = res.data.totalElements;
          this.totalPages = res.data.totalPages;
        }
      }
    )

    return this.loading = false;
  }

  onLoadData(ev?: any) {
    this.loading = true;
    if (ev) {
      this.paging.pageSize = ev.rows;
      this.paging.pageNumber = ev.first/ev.rows + 1;
    }
    
    return this.getAllCompany(this.paging);
  }

  onSubmit() {
    return this.companyService.addCompany(AppUtil.toSnakeCaseKey(this.companyForm.value))
      .subscribe(
        res => {
          if (res.status === 200) {
            AppUtil.getMessageSuccess(this.messageService, this.translateService,
              'message.add_company_successfully');
            this.getAllCompany(this.paging);
            this.isShowAddCompanyPopup = false;
            this.companyForm.reset();
          } else {
            AppUtil.getMessageSuccess(this.messageService, this.translateService,
              'message.add_company_failed');
          }
        }
      )
  }

  onCancel() {
    this.isShowAddCompanyPopup = false;
    return this.companyForm.reset();
  }

  onSearch(keyword: string) {
    if (!keyword) return this.onLoadData();

    return this.companyService.searchCompany({keyword}).subscribe(
      res => {
        if (res.status === 200) {
          this.companies = res.data.content;
          this.totalElements = res.data.totalElements;
          this.totalPages = res.data.totalPages;
        }
      }
    )
  }

  onNavigateToDetail(id: string) {
    return this.route.navigate([`/company/${id}`]).then(r => {});
  }

  parseSize(size: string) {
    return this.translateService.instant(`SIZE.${size}`);
  }
}
