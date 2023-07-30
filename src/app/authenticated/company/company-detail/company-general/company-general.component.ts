import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-company-general',
  templateUrl: './company-general.component.html',
  styleUrls: ['./company-general.component.scss']
})
export class CompanyGeneralComponent {
  @Input() company: any = [];

}
