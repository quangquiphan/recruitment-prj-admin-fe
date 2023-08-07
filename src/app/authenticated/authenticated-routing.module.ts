import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { CandidateComponent } from "./candidate/candidate.component";
import { AuthenticatedComponent } from "./authenticated.component";
import { AuthGuard } from "../interceptors/auth-guard.service";
import { CompanyComponent } from "./company/company.component";
import { CompanyTableComponent } from "./company/company-table/company-table.component";
import { JobComponent } from "./job/job.component";
import { JobTableComponent } from "./job/job-table/job-table.component";
import { JobDetailComponent } from "./job/job-detail/job-detail.component";
import { CompanyDetailComponent } from "./company/company-detail/company-detail.component";
import { SkillsComponent } from "./skills/skills.component";
import { SkillComponent } from "./skills/skill/skill.component";

const routes: Routes = [
    {
        path: '',
        component: AuthenticatedComponent,
        canActivate: [AuthGuard],
        children: [
            {
                path: 'candidate',
                component: CandidateComponent
            },
            {
                path: 'company',
                component: CompanyComponent,
                children: [
                    {
                        path: '',
                        component: CompanyTableComponent
                    },
                    {
                        path: ':id',
                        component: CompanyDetailComponent,
                        children: [
                            {
                                path: 'general',
                                component: CompanyDetailComponent
                            },
                            {
                                path: 'jobs',
                                component: CompanyDetailComponent
                            },
                            {
                                path: 'account',
                                component: CompanyDetailComponent
                            }
                        ]
                    }
                ]
            },
            {
                path: 'job',
                component: JobComponent,
                children: [
                    {
                        path: '',
                        component: JobTableComponent
                    },
                    {
                        path: ':id',
                        component: JobDetailComponent,
                        children: [
                            {
                                path: 'matches',
                                component: JobDetailComponent
                            },
                            {
                                path: 'applied',
                                component: JobDetailComponent
                            },
                            {
                                path: 'rejected',
                                component: JobDetailComponent
                            }
                        ]
                    }
                ]
            },
            {
                path: 'skills',
                component: SkillsComponent,
                children: [
                    {
                        path: '',
                        component: SkillComponent
                    },
                    {
                        path: 'language',
                        component: SkillComponent
                    }
                ]
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AuthenticatedRoutingModule{}