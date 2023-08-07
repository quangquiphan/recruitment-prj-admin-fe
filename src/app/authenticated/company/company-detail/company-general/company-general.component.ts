import { Component, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-company-general',
  templateUrl: './company-general.component.html',
  styleUrls: ['./company-general.component.scss']
})
export class CompanyGeneralComponent {
  @Input() company: any = [];

  constructor(private translateService: TranslateService) {}

  parseSize(size: string) {
    return this.translateService.instant(`SIZE.${size}`);
  }
}
