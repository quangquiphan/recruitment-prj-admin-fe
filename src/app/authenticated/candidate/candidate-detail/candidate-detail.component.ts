import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { CandidateService } from 'src/app/services/candidate.service';
import AppConstant from 'src/app/utilities/app-constant';
import { environment } from 'src/environment/environment';

@Component({
  selector: 'app-candidate-detail',
  templateUrl: './candidate-detail.component.html',
  styleUrls: ['./candidate-detail.component.scss']
})
export class CandidateDetailComponent implements OnChanges {
  @Input() userId: string = '';
  ev = environment;
  appConstant = AppConstant;
  candidate: any;
  isCv: boolean = false;
  workhistory: any[] = [];
  education: any[] = [];
  skill: any[] = [];
  language: any[] = [];
  user: any = {
    avatar: ''
  };
  pdfSource: string = "https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf";
  constructor(
    private candidateService: CandidateService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.getCandidate(this.userId);
    this.workhistory = [
      {
        id: 1,
        companyName: "CTy ABCxyz",
        fromDate: '12/12/2022',
        toDate: '21/08/2023',
        position: "Fullstack Developer",
        description: "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore dignissimos obcaecati commodi beatae explicabo excepturi maiores doloremque ipsum neque asperiores ratione vero, sit dolor quasi ab modi et itaque debitis!</p>",
        projects: [
          {
            projectName: "AXYZ",
            fromDate: '12/12/2022',
            toDate: '21/04/2023',
            position: "Front-end developer",
            teamSize: 12,
            technology: "Angular, html/scss, bootstrap 5",
            description: "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore dignissimos obcaecati commodi beatae explicabo excepturi maiores doloremque ipsum neque asperiores ratione vero, sit dolor quasi ab modi et itaque debitis!</p>"
          },
          {
            projectName: "DCA",
            fromDate: '12/01/2023',
            toDate: '21/08/2023',
            position: "Back-end developer",
            teamSize: 10,
            technology: "Java, mysql, spring boot",
            description: "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore dignissimos obcaecati commodi beatae explicabo excepturi maiores doloremque ipsum neque asperiores ratione vero, sit dolor quasi ab modi et itaque debitis!</p>"
          }
        ]
      },
      {
        id: 2,
        companyName: "CTy ABCxyz",
        fromDate: '12/12/2022',
        toDate: '21/08/2023',
        position: "Fullstack Developer",
        description: "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore dignissimos obcaecati commodi beatae explicabo excepturi maiores doloremque ipsum neque asperiores ratione vero, sit dolor quasi ab modi et itaque debitis!</p>",
        projects: [
          {
            projectName: "AXYZ",
            fromDate: '12/12/2022',
            toDate: '21/04/2023',
            position: "Front-end developer",
            teamSize: 12,
            technology: "Angular, html/scss, bootstrap 5",
            description: "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore dignissimos obcaecati commodi beatae explicabo excepturi maiores doloremque ipsum neque asperiores ratione vero, sit dolor quasi ab modi et itaque debitis!</p>"
          },
          {
            projectName: "DCA",
            fromDate: '12/01/2023',
            toDate: '21/08/2023',
            position: "Back-end developer",
            teamSize: 10,
            technology: "Java, mysql, spring boot",
            description: "<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore dignissimos obcaecati commodi beatae explicabo excepturi maiores doloremque ipsum neque asperiores ratione vero, sit dolor quasi ab modi et itaque debitis!</p>"
          }
        ]
      }
    ]

    this.education = [
      {
        id: 1,
        schoolName: "Nguyen Tat Thanh University",
        description: "",
        course: "Information technology",
        fromDate: "12/08/2019",
        toDate: "",
        current: true
      }
    ]

    this.skill = [
      {
        id: 1,
        name: "Java",
        level: "Expert"
      },
      {
        id: 2,
        name: "NodeJs",
        level: "Beginer"
      },
      {
        id: 3,
        name: "PHP",
        level: "Immediate"
      }
    ]

    this.language = [
      {
        id: 1,
        name: "English",
        level: "Immedidate"
      },
      {
        id: 2,
        name: "Japanese",
        level: "Beginer"
      },
      {
        id: 3,
        name: "Korea",
        level: "Beginer"
      }
    ]
  }

  getCandidate(id: string) {
    this.candidateService.getCandidate(id).subscribe(
      res => {
        if (res.status === 200) {
          this.candidate = res.data;
          this.isCv = res.data.cv?true:false;
          // this.pdfSource = res.data.cv;
        }
      }
    )
  }

}
