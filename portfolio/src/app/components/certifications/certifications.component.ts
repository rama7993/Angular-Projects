import { Component, OnInit } from '@angular/core';

interface Certification {
  name: string;
  platform: string;
  link: string;
  category: string;
  icon: string;
  date: string;
  description: string;
  certId?: string;
  embedUrl?: string;
  level: 'Basic' | 'Intermediate' | 'Advanced';
  type: 'skill' | 'role';
}

@Component({
  selector: 'app-certifications',
  templateUrl: './certifications.component.html',
  styleUrls: ['./certifications.component.scss'],
  standalone: false,
})
export class CertificationsComponent implements OnInit {
  selectedCategory: string = 'All';
  categories: string[] = [
    'All',
    'Frontend',
    'Backend',
    'Algorithms',
    'Database',
  ];

  certifications: Certification[] = [
    // HackerRank Certificates
    {
      name: 'Problem Solving (Basic)',
      platform: 'HackerRank',
      link: 'https://www.hackerrank.com/certificates/88274e81bd0d',
      embedUrl: 'https://www.hackerrank.com/certificates/iframe/88274e81bd0d',
      category: 'Algorithms',
      icon: 'pi pi-cog',
      date: '2020',
      description:
        'Covers basic topics of data structures (arrays, strings) and algorithms (sorting and searching)',
      level: 'Basic',
      type: 'skill',
    },
    {
      name: 'Python (Basic)',
      platform: 'HackerRank',
      link: 'https://www.hackerrank.com/certificates/b60e8bfd0465',
      embedUrl: 'https://www.hackerrank.com/certificates/iframe/b60e8bfd0465',
      category: 'Backend',
      icon: 'pi pi-code',
      date: '2020',
      description:
        'Fundamental Python programming concepts including data types, control structures, and functions',
      level: 'Basic',
      type: 'skill',
    },
    {
      name: 'SQL (Basic)',
      platform: 'HackerRank',
      link: 'https://www.hackerrank.com/certificates/466238b2871f',
      embedUrl: 'https://www.hackerrank.com/certificates/iframe/466238b2871f',
      category: 'Database',
      icon: 'pi pi-database',
      date: '2021',
      description:
        'Basic SQL queries including SELECT, WHERE, JOIN, and aggregate functions',
      level: 'Basic',
      type: 'skill',
    },
    {
      name: 'JavaScript (Basic)',
      platform: 'HackerRank',
      link: 'https://www.hackerrank.com/certificates/d356008e6329',
      embedUrl: 'https://www.hackerrank.com/certificates/iframe/d356008e6329',
      category: 'Frontend',
      icon: 'pi pi-code',
      date: '2021',
      description:
        'Core JavaScript concepts including variables, functions, objects, and DOM manipulation',
      level: 'Basic',
      type: 'skill',
    },
    {
      name: 'SQL (Intermediate)',
      platform: 'HackerRank',
      link: 'https://www.hackerrank.com/certificates/0eaed67db4d9',
      embedUrl: 'https://www.hackerrank.com/certificates/iframe/0eaed67db4d9',
      category: 'Database',
      icon: 'pi pi-database',
      date: '2021',
      description:
        'Advanced SQL concepts including subqueries, window functions, and complex joins',
      level: 'Intermediate',
      type: 'skill',
    },
    {
      name: 'Angular (Basic)',
      platform: 'HackerRank',
      link: 'https://www.hackerrank.com/certificates/fd45c0738bce',
      embedUrl: 'https://www.hackerrank.com/certificates/iframe/fd45c0738bce',
      category: 'Frontend',
      icon: 'pi pi-code',
      date: '2025',
      description:
        'Fundamental Angular concepts including components, services, and dependency injection',
      level: 'Basic',
      type: 'skill',
    },
    {
      name: 'Angular (Intermediate)',
      platform: 'HackerRank',
      link: 'https://www.hackerrank.com/certificates/6952ecf199b4',
      embedUrl: 'https://www.hackerrank.com/certificates/iframe/6952ecf199b4',
      category: 'Frontend',
      icon: 'pi pi-code',
      date: '2025',
      description:
        'Advanced Angular features including routing, forms, HTTP client, and state management',
      level: 'Intermediate',
      type: 'skill',
    },
    {
      name: 'Frontend Developer (React)',
      platform: 'HackerRank',
      link: 'https://www.hackerrank.com/certificates/aa53806e3674',
      embedUrl: 'https://www.hackerrank.com/certificates/iframe/aa53806e3674',
      category: 'Frontend',
      icon: 'pi pi-code',
      date: '2025',
      description:
        'Comprehensive React development skills including hooks, state management, and component architecture',
      level: 'Intermediate',
      type: 'role',
    },
    {
      name: 'Node (Basic)',
      platform: 'HackerRank',
      link: 'https://www.hackerrank.com/certificates/c0aa2fdf1e6a',
      embedUrl: 'https://www.hackerrank.com/certificates/iframe/c0aa2fdf1e6a',
      category: 'Backend',
      icon: 'pi pi-server',
      date: '2025',
      description:
        'Node.js fundamentals including modules, file system operations, and asynchronous programming',
      level: 'Basic',
      type: 'skill',
    },
    {
      name: 'JavaScript (Intermediate)',
      platform: 'HackerRank',
      link: 'https://www.hackerrank.com/certificates/5e98be0c9229',
      embedUrl: 'https://www.hackerrank.com/certificates/iframe/5e98be0c9229',
      category: 'Frontend',
      icon: 'pi pi-code',
      date: '2025',
      description:
        'Advanced JavaScript concepts including closures, prototypes, async/await, and ES6+ features',
      level: 'Intermediate',
      type: 'skill',
    },
    // Other Certifications
    {
      name: '50-day, 100-day, 365-day, and 500-day LeetCode streak badges, including full-month streak achievements',
      platform: 'LeetCode',
      link: 'https://leetcode.com/u/rama_koti_reddy/',
      category: 'Algorithms',
      icon: 'pi pi-calendar',
      date: '2023',
      description: 'Consistent coding practice and algorithmic problem-solving',
      level: 'Basic',
      type: 'skill',
    },
    {
      name: 'C, C++, Python, Java, SQL, HTML, CSS, and JavaScript Certifications',
      platform: 'Programming Hub',
      link: 'https://drive.google.com/drive/folders/14ROTUxxHsBt1mKr6JTuFChGnrqhrlf5j',
      category: 'Backend',
      icon: 'pi pi-database',
      date: '2022',
      description: 'Comprehensive programming language certifications',
      level: 'Basic',
      type: 'skill',
    },
  ];

  constructor() {}

  ngOnInit(): void {}

  filterCertifications(category: string): void {
    this.selectedCategory = category;
  }

  get filteredCertifications(): Certification[] {
    if (this.selectedCategory === 'All') {
      return this.certifications;
    }
    return this.certifications.filter(
      (cert) => cert.category === this.selectedCategory
    );
  }

  get certificationStats() {
    return {
      total: this.certifications.length,
      frontend: this.certifications.filter(
        (cert) => cert.category === 'Frontend'
      ).length,
      backend: this.certifications.filter((cert) => cert.category === 'Backend')
        .length,
      algorithms: this.certifications.filter(
        (cert) => cert.category === 'Algorithms'
      ).length,
      database: this.certifications.filter(
        (cert) => cert.category === 'Database'
      ).length,
      hackerrank: this.certifications.filter(
        (cert) => cert.platform === 'HackerRank'
      ).length,
    };
  }

  getLevelColor(level: string): string {
    switch (level) {
      case 'Basic':
        return '#22c55e';
      case 'Intermediate':
        return '#f59e0b';
      case 'Advanced':
        return '#ef4444';
      default:
        return '#6b7280';
    }
  }

  getTypeIcon(type: string): string {
    return type === 'role' ? 'pi pi-briefcase' : 'pi pi-star';
  }

  scrollToSection(sectionId: string): void {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
