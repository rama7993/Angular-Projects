import { Component, OnInit } from '@angular/core';
import { fadeInAnimation } from '../../../animations/animation';

interface Experience {
  logo: string;
  designation: string;
  companyName: string;
  duration: string;
  description: string;
  details: string[];
}

@Component({
  selector: 'app-experience',
  templateUrl: './experience.component.html',
  styleUrls: ['./experience.component.scss'],
  animations: [fadeInAnimation],
  standalone: false,
})
export class ExperienceComponent implements OnInit {
  experiences: Experience[] = [
    {
      logo: './assets/images/satisfic.jpg',
      designation: 'Software Developer',
      companyName: 'Satisfic',
      duration: 'July 2022 - Present',
      description:
        'Dynamic Software Engineer architecting high-performance enterprise applications. Expert in Angular and the modern web stack, I specialize in building scalable, secure, and intuitive solutions that optimize complex business workflows.',
      details: [
        'Built high-performance CRM data tables using PrimeNG, supporting 10k+ records with inline editing, frozen columns, and dynamic templates to improve rendering efficiency.',
        'Delivered a Call Script Execution module with interactive previews, live sessions, Q&A capture, automated post-call scheduling, and email-based appointment booking, boosting agent productivity.',
        'Created a Social Monitoring dashboard with LinkedIn integration for centralized post management, real-time engagement tracking, and in-platform performance analytics, eliminating reliance on external tools.',
        'Developed telemarketing analytics dashboards to track agent performance, rankings, campaign appointment rates, and call utilization, along with Call Manager & Agent Calling Window features for agent availability scheduling.',
        'Developed reusable ECharts-based visualization components to display key metrics across multiple analytics dashboards, reducing manual reporting efforts by 40%.',
        'Designed and implemented RBAC with dynamic permission controls, improving security compliance and administrative efficiency.',
        'Enhanced Keycloak authentication with custom login, 2FA, and email templates for a consistent user experience.',
        'Resolved critical production issues, refactored modules for scalability, and added Jest unit tests with internal documentation using Docusaurus, reducing onboarding time by 50%.',
      ],
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  get experienceStats() {
    const totalAchievements = this.experiences.reduce(
      (sum, exp) => sum + exp.details.length,
      0,
    );
    const technologies = new Set([
      'Angular',
      'TypeScript',
      'JavaScript',
      'HTML5',
      'CSS3',
      'SCSS',
      'Node.js',
      'Git',
      'REST APIs',
    ]);

    return {
      companies: this.experiences.length,
      totalYears: this.calculateTotalYears(),
      achievements: totalAchievements,
      technologies: technologies.size,
    };
  }

  private calculateTotalYears(): string {
    // This is a simplified calculation - you can enhance this based on your actual experience
    const startYear = 2022;
    const currentYear = new Date().getFullYear();
    const years = currentYear - startYear;
    return years >= 1 ? `${years}+` : '< 1';
  }
}
