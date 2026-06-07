import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
  standalone: false,
})
export class AboutComponent implements OnInit {
  stats = [
    {
      icon: 'pi pi-code',
      value: '3+',
      label: 'Years Experience',
    },
    {
      icon: 'pi pi-briefcase',
      value: '10+',
      label: 'Projects Completed',
    },
    {
      icon: 'pi pi-users',
      value: '15+',
      label: 'Technologies Used',
    },
    {
      icon: 'pi pi-trophy',
      value: '5+',
      label: 'Honors & Awards',
    },
  ];

  highlights = [
    'Enterprise Application Architecture',
    'High-Performance UI Engineering',
    'Scalable State Management (NgRx)',
    'Secure Authentication & RBAC',
    'Complex System Design',
  ];

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy() {}
}
