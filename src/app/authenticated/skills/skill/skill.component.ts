import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { toArray } from 'lodash';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.scss']
})
export class SkillComponent implements OnInit{
  tabViews: any[] = [
    {
      index: 0,
      label: 'label.skills'
    },
    {
      index: 1,
      label: 'label.languages'
    }
  ]
  selectedTab: number = 0;
  tabName: string = 'skills';

  constructor(
    private route: Router
  ) {}

  ngOnInit(): void {
    this.selectedTabViewUrl();
  }

  selectedTabViewUrl() {
    let arr = toArray(this.route.routerState.snapshot.url.split("/"))
    const map = new Map();
    
    if (arr.length < 3) {
      arr.push("");
    }
    
    
    map.set('tab', arr[2]);

    switch (map.get('tab')) {
      case '':
        this.selectedTab = 0;        
        break;
    
      case 'language':
        this.selectedTab = 1;
        break;
    }

    this.activatedTabView(this.selectedTab);
  }

  onBack() {
    return this.route.navigate(['/skills']).then(r => {});
  }

  onChangeTabView(event: any) {
    this.selectedTab = event.index;
    this.activatedTabView(this.selectedTab);
  }

  activatedTabView(selectedTab: number) {
    let tab = '';
    if (selectedTab === 0) {
      tab = '';
      this.tabName = "skills";
    } else if (selectedTab === 1) {
      tab = 'language'
      this.tabName = "languages"
    }

    return this.route.navigate([`/skills/${tab}`]).then(r => {});
  }
}
