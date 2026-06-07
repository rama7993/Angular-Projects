import { Component } from '@angular/core';

interface TimelineEvent {
  date: string;
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.scss'],
})
export class TimelineComponent {
  timelineEvents: TimelineEvent[] = [
    {
      date: '15 Dec',
      icon: 'fa-home',
      title: 'Lorem ipsum dolor sit amet',
      description:
        'Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus erat sagittis non. Ut blandit semper pretium.',
    },
    {
      date: '22 Oct',
      icon: 'fa-gift',
      title: 'Lorem ipsum dolor sit amet',
      description:
        'Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus erat sagittis non. Ut blandit semper pretium.',
    },
    {
      date: '10 Jul',
      icon: 'fa-user',
      title: 'Lorem ipsum dolor sit amet',
      description:
        'Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus erat sagittis non. Ut blandit semper pretium.',
    },
    {
      date: '18 May',
      icon: 'fa-running',
      title: 'Lorem ipsum dolor sit amet',
      description:
        'Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus erat sagittis non. Ut blandit semper pretium.',
    },
    {
      date: '10 Feb',
      icon: 'fa-cog',
      title: 'Lorem ipsum dolor sit amet',
      description:
        'Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus erat sagittis non. Ut blandit semper pretium.',
    },
    {
      date: '01 Jan',
      icon: 'fa-certificate',
      title: 'Lorem ipsum dolor sit amet',
      description:
        'Lorem ipsum dolor sit amet elit. Aliquam odio dolor, id luctus erat sagittis non. Ut blandit semper pretium.',
    },
  ];
}
