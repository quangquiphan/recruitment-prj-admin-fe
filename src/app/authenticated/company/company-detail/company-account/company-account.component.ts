import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import AppConstant from 'src/app/utilities/app-constant';

@Component({
  selector: 'app-company-account',
  templateUrl: './company-account.component.html',
  styleUrls: ['./company-account.component.scss']
})
export class CompanyAccountComponent implements OnInit{
  accountForm: FormGroup = new FormGroup({})
  paging: any = {
    pageNumber: 1,
    pageSize: 10
  }
  constant = AppConstant;
  first: number = 0;
  totalElements: number = 0;
  showMemberSetting: boolean = false;

  constructor(
    private fb: FormBuilder
  ) {
    this.accountForm = this.fb.group({
      id: [''],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', Validators.pattern(AppConstant.PATTERNS.EMAIL)],
      role: [this.constant.USER_ROLE.ADMIN_COMPANY]
    })
  }

  ngOnInit(): void {
    
  }

  onPageChange(ev: any) {

  }

  onSubmit() {
  }

  onOpen(id: string) {
    this.showMemberSetting = true;
    this.accountForm.patchValue({
      id: id
    })
  }

  onCancel() {
    this.showMemberSetting = false;
    this.accountForm.reset();
  }
}
