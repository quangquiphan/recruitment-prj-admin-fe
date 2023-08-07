import {
    Component, Input, OnInit
}
from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MessageService } from 'primeng/api';
import {
    LanguageService
}
from 'src/app/services/language.service';
import {
    SkillService
}
from 'src/app/services/skill.service';
import AppUtil from 'src/app/utilities/app-util';

@Component({ selector: 'app-skill-table', templateUrl: './skill-table.component.html', styleUrls: ['./skill-table.component.scss'] }) export class SkillTableComponent implements OnInit {
    @Input() selectedTab: number = 0;
    id: string = '';
    skillForm: FormGroup = new FormGroup({});
    skills: any[] = [];
    totalElements: number = 0;
    totalPages: number = 0;
    paging:any = {
        pageNumber: 1,
        pageSize: 10
    }
    first: number = 0;
    loading: boolean = false;
    isSearch: boolean = false;
    isEdit: boolean = false;
    keyword: string = '';
    label: string = '';
    disable: boolean = false;
    isShowSkillFormPopup: boolean = false;

    constructor(
      private fb: FormBuilder,
      private skillService: SkillService, 
      private langService: LanguageService,
      private messageService: MessageService,
      private translateService: TranslateService
    ) {
      this.skillForm = this.fb.group({
        name: ['', Validators.required]
      })
    }

    ngOnInit():void {}

    onLoadData(ev?: any, isSearch?: boolean) {
        this.skills = [];

        if(ev) {
          this.first = ev.first;
          this.paging.pageNumber =(this.first / ev.rows) + 1;
          this.paging.pageSize = ev.rows;
        }

      this.checkLoadDate(this.isSearch);        

    }

    onGetSkills(paging: any) {
        this.skillService.getPageSkill(this.paging).subscribe(
          res => { 
            if(res.status === 200) { 
              this.totalPages = res.data.totalPages; 
              this.totalElements = res.data.totalElements; 
              this.skills = res.data.content; 
            } 
          })
    }

    onGetLangs(paging: any) {
        this.langService.getPageLang(this.paging).subscribe(
          res => { 
            if(res.status === 200) { 
              this.totalPages = res.data.totalPages; 
              this.totalElements = res.data.totalElements; 
              this.skills = res.data.content; 
            } 
          })
    }

    searchSkill(keyword: string) {
        let param = {
            keyword: keyword,
            pageNumber: this.paging.pageNumber,
            pageSize: this.paging.pageSize
        }

        if (this.selectedTab == 0) {
          this.skillService.searchSkill(param).subscribe(
            res => {
              if (res.status === 200) {
                this.totalPages = res.data.totalPages; 
                this.totalElements = res.data.totalElements; 
                this.skills = res.data.content;
              }
            }
          )
        } else {
          this.langService.searchLang(param).subscribe(
            res => {
              if (res.status === 200) {
                this.totalPages = res.data.totalPages; 
                this.totalElements = res.data.totalElements; 
                this.skills = res.data.content;
              }
            }
          )
        }
    }

    checkLoadDate(isSearch: boolean) {
      if(isSearch) {
        this.searchSkill(this.keyword);
      } else {
        if(this.selectedTab === 0) {
            this.onGetSkills(this.paging);
        }
        else {
            this.onGetLangs(this.paging);
        }
      }
    }

    onSubmit(isEdit: boolean) {
      if (isEdit) {
        this.editSkill(this.skillForm.value.name);
      } else {
        this.addSkill(this.skillForm.value.name);
      }
    }

    onOpen(id: string) {
      this.disable = false;
      this.isShowSkillFormPopup = true; 
      if (id) {
        this.id = id;
        this.isEdit = true;

        this.getSkill();
        if (this.selectedTab === 0) {
          this.label = 'label.edit_skill';
        } else {
          this.label = 'label.edit_language';
        }
      } else {
        this.isEdit = false;

        if (this.selectedTab === 0) {
          this.label = 'label.add_skill';
        } else {
          this.label = 'label.add_language';
        }
      }
    }

    addSkill(name: string) {
      this.disable = true;

      if (this.selectedTab === 0) {
        let params = {
          skillName: name
        }

        this.skillService.addSkill(AppUtil.toSnakeCaseKey(params)).subscribe(
          res => {
            if (res.status === 200) {
              AppUtil.getMessageSuccess(this.messageService, this.translateService, 
                'message.add_skill_successfully');
              this.onLoadData();
              this.isShowSkillFormPopup = false;
              this.skillForm.reset();
            } else {
              AppUtil.getMessageFailed(this.messageService, this.translateService,
                'message.add_skill_failed');
            }
          }
        )
      } else {
        let params = {
          language: name
        }

        this.langService.addLanguage(AppUtil.toSnakeCaseKey(params)).subscribe(
          res => {
            if (res.status === 200) {
              AppUtil.getMessageSuccess(this.messageService, this.translateService, 
                'message.add_language_successfully');
              this.onLoadData();
              this.isShowSkillFormPopup = false;
              this.skillForm.reset();
            } else {
              AppUtil.getMessageFailed(this.messageService, this.translateService, 
                'message.add_language_failed')
            }
          }
        )
      }
    }

    editSkill(name: string) {
      this.disable = true;

      if (this.selectedTab === 0) {
        let params = {
          skillName: name
        }

        this.skillService.editSkill(this.id, AppUtil.toSnakeCaseKey(params)).subscribe(
          res => {
            if (res.status === 200) {
              AppUtil.getMessageSuccess(this.messageService, this.translateService, 
                'message.edit_skill_successfully');
              this.onLoadData();
              this.isShowSkillFormPopup = false;
              this.skillForm.reset();
            } else {
              AppUtil.getMessageFailed(this.messageService, this.translateService, 
                'message.edit_skill_failed');
            }
          }
        )
      } else {
        let params = {
          language: name
        }

        this.langService.editLanguage(this.id, AppUtil.toSnakeCaseKey(params)).subscribe(
          res => {
            if (res.status === 200) {
              AppUtil.getMessageSuccess(this.messageService, this.translateService, 
                'message.edit_language_successfully');
              this.onLoadData();
              this.isShowSkillFormPopup = false;
              this.skillForm.reset();
            } else {
              AppUtil.getMessageFailed(this.messageService, this.translateService, 
                'message.edit_language_failed');
            }
          }
        )
      }
    }

    onDelete() {
      if (this.selectedTab === 0) {
        this.skillService.deleteSkill(AppUtil.toSnakeCaseKey(this.id)).subscribe(
          res => {
            if (res.status === 200) {
              AppUtil.getMessageSuccess(this.messageService, this.translateService,
                'message.delete_successfully')
              this.onLoadData();
              this.isShowSkillFormPopup = false;
            }
          }
        )
      } else {
        this.langService.deleteLang(AppUtil.toSnakeCaseKey(this.id)).subscribe(
          res => {
            if (res.status === 200) {
              AppUtil.getMessageSuccess(this.messageService, this.translateService,
                'message.delete_successfully')
              this.onLoadData();
              this.isShowSkillFormPopup = false;
            }
          }
        )
      }
    }

    onCancel() {
      this.skillForm.reset();
      this.isEdit = false;
      this.isShowSkillFormPopup = false;
    }

    getSkill() {
      if (this.selectedTab === 0) {
        this.skillService.getSkill(this.id).subscribe(
          res => {
            if (res.status === 200) {
              this.skillForm.patchValue({
                name: res.data.skillName
              })
            }
          }
        )
      } else {
        this.langService.getLang(this.id).subscribe(
          res => {
            if (res.status === 200) {
              console.log(res.data);
              
              this.skillForm.patchValue({
                name: res.data.language
              })
            }
          }
        )
      }
    }
}

