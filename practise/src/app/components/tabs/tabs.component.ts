import { Component, Input } from '@angular/core';

export interface TabItem {
  title: string;
  content: string;
}

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent {
  @Input() tabs: TabItem[] = [
    { title: 'Profile', content: 'This is the profile tab content.' },
    { title: 'Settings', content: 'Here are the settings for your account.' },
    { title: 'Notifications', content: 'You have NO new notifications.' }
  ];
  activeTabIndex: number = 0;

  setActiveTab(index: number) {
    this.activeTabIndex = index;
  }
}
