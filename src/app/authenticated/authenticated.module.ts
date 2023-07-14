import { NgModule } from "@angular/core";
import { AuthenticatedComponent } from "./authenticated.component";
import { CommonModule } from "@angular/common";
import { AuthenticatedRoutingModule } from "./authenticated-routing.module";
import { PrimeNgModule } from "../prime-ng/prime-ng.module";
import { AuthenticatedLeftMenuComponent } from './authenticated-left-menu/authenticated-left-menu.component';
import { CandidateComponent } from './candidate/candidate.component';
import { ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { CandidateDetailComponent } from './candidate/candidate-detail/candidate-detail.component';
import { CompanyComponent } from './company/company.component';
import { CompanyTableComponent } from './company/company-table/company-table.component';
import { JobComponent } from './job/job.component';
import { JobTableComponent } from './job/job-table/job-table.component';
import { JobDetailComponent } from './job/job-detail/job-detail.component';
import { CompanyDetailComponent } from './company/company-detail/company-detail.component';
import { CompanyGeneralComponent } from './company/company-detail/company-general/company-general.component';
import { CompanyJobComponent } from './company/company-detail/company-job/company-job.component';
import { UserJobApplicantComponent } from './job/job-detail/user-job-applicant/user-job-applicant.component';
import { CompanyAccountComponent } from './company/company-detail/company-account/company-account.component';

@NgModule({
    declarations: [
        CandidateComponent,
        AuthenticatedComponent,
        AuthenticatedLeftMenuComponent,
        CandidateDetailComponent,
        CompanyComponent,
        CompanyTableComponent,
        JobComponent,
        JobTableComponent,
        JobDetailComponent,
        CompanyDetailComponent,
        CompanyGeneralComponent,
        CompanyJobComponent,
        UserJobApplicantComponent,
        CompanyAccountComponent,
    ],

    imports: [
        CommonModule,
        PrimeNgModule,
        TranslateModule,
        ReactiveFormsModule,
        AuthenticatedRoutingModule,
    ]
})
export class AuthenticatedModule{}