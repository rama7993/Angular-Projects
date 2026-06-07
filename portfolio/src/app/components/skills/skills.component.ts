import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ModeToggleService } from '../../../services/mode-toggle/mode-toggle.service';
import { Mode } from '../../../services/mode-toggle/mode-toggle.model';

Chart.register(...registerables);

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.scss'],
  standalone: false,
})
export class SkillsComponent implements OnInit, AfterViewInit, OnDestroy {
  skills = [
    {
      name: 'Angular',
      image: './assets/skills/angular.svg',
      level: 95,
      category: 'Frontend',
      color: '#DD0031',
    },
    {
      name: 'TypeScript',
      image: './assets/skills/typescript.svg',
      level: 92,
      category: 'Frontend',
      color: '#3178C6',
    },
    {
      name: 'JavaScript',
      image: './assets/skills/javascript.svg',
      level: 90,
      category: 'Frontend',
      color: '#F7DF1E',
    },
    {
      name: 'HTML',
      image: './assets/skills/html.svg',
      level: 96,
      category: 'Frontend',
      color: '#E34F26',
    },
    {
      name: 'CSS',
      image: './assets/skills/css.svg',
      level: 94,
      category: 'Frontend',
      color: '#1572B6',
    },
    {
      name: 'SCSS',
      image: './assets/skills/sass.svg',
      level: 90,
      category: 'Frontend',
      color: '#CC6699',
    },
    {
      name: 'React',
      image: './assets/skills/react.svg',
      level: 75,
      category: 'Frontend',
      color: '#61DAFB',
    },
    {
      name: 'Bootstrap',
      image: './assets/skills/bootstrap.svg',
      level: 88,
      category: 'Frontend',
      color: '#7952B3',
    },
    {
      name: 'NodeJs',
      image: './assets/skills/nodejs.svg',
      level: 75,
      category: 'Backend',
      color: '#339933',
    },
    {
      name: 'NestJs',
      image: './assets/skills/nestjs.svg',
      level: 72,
      category: 'Backend',
      color: '#E0234E',
    },
    {
      name: 'Express',
      image: './assets/skills/express.svg',
      level: 70,
      category: 'Backend',
      color: '#000000',
    },
    {
      name: 'MongoDb',
      image: './assets/skills/mongodb.svg',
      level: 75,
      category: 'Database',
      color: '#47A248',
    },
    {
      name: 'MySQL',
      image: './assets/skills/mysql.svg',
      level: 70,
      category: 'Database',
      color: '#4479A1',
    },
    {
      name: 'PostgreSQL',
      image: './assets/skills/postgresql.svg',
      level: 72,
      category: 'Database',
      color: '#336791',
    },
    {
      name: 'Java',
      image: './assets/skills/java.svg',
      level: 65,
      category: 'Backend',
      color: '#007396',
    },
    {
      name: 'Python',
      image: './assets/skills/python.svg',
      level: 62,
      category: 'Backend',
      color: '#3776AB',
    },
    {
      name: 'C++',
      image: './assets/skills/cpp.svg',
      level: 60,
      category: 'Backend',
      color: '#00599C',
    },
    {
      name: 'C',
      image: './assets/skills/c.svg',
      level: 60,
      category: 'Backend',
      color: '#A8B9CC',
    },
    {
      name: 'Git',
      image: './assets/skills/git.svg',
      level: 80,
      category: 'Tools',
      color: '#F05032',
    },
  ];

  skillCategories = ['Frontend', 'Backend', 'Database', 'Tools'];
  selectedCategory = 'All';
  skillChart: Chart | null = null;
  isDarkMode = false;
  private themeChangeListener?: () => void;

  constructor(private modeToggleService: ModeToggleService) {}

  ngOnInit() {
    this.modeToggleService.modeChanged$.subscribe((mode: Mode) => {
      this.isDarkMode = mode === Mode.DARK;
      if (this.skillChart) {
        this.skillChart.destroy();
        setTimeout(() => this.createSkillChart(), 100);
      }
    });
  }

  ngAfterViewInit() {
    this.createSkillChart();
    this.setupThemeListener();
  }

  ngOnDestroy() {
    if (this.skillChart) {
      this.skillChart.destroy();
    }
    if (this.themeChangeListener) {
      this.themeChangeListener();
    }
  }

  private setupThemeListener() {
    // Relying on ModeToggleService in ngOnInit
  }

  filterSkills(category: string) {
    this.selectedCategory = category;
  }

  get filteredSkills() {
    if (this.selectedCategory === 'All') {
      return this.skills;
    }
    return this.skills.filter(
      (skill) => skill.category === this.selectedCategory
    );
  }

  createSkillChart() {
    const ctx = document.getElementById('skillChart') as HTMLCanvasElement;
    if (!ctx) return;

    const frontendSkills = this.skills.filter((s) => s.category === 'Frontend');
    const backendSkills = this.skills.filter((s) => s.category === 'Backend');
    const databaseSkills = this.skills.filter((s) => s.category === 'Database');

    // Get theme-aware colors
    const isDarkMode = this.isDarkMode;
    const textColor = isDarkMode ? '#e6e6e6' : '#6c757d'; // Muted text only in light mode

    this.skillChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: ['Frontend', 'Backend', 'Database'],
        datasets: [
          {
            data: [
              frontendSkills.reduce((sum, skill) => sum + skill.level, 0) /
                frontendSkills.length,
              backendSkills.reduce((sum, skill) => sum + skill.level, 0) /
                backendSkills.length,
              databaseSkills.reduce((sum, skill) => sum + skill.level, 0) /
                databaseSkills.length,
            ],
            backgroundColor: [
              isDarkMode
                ? 'rgba(102, 126, 234, 0.8)'
                : 'rgba(102, 126, 234, 0.9)',
              isDarkMode
                ? 'rgba(118, 75, 162, 0.8)'
                : 'rgba(118, 75, 162, 0.9)',
              isDarkMode
                ? 'rgba(78, 205, 196, 0.8)'
                : 'rgba(78, 205, 196, 0.9)',
            ],
            borderColor: [
              isDarkMode ? 'rgba(102, 126, 234, 1)' : 'rgba(102, 126, 234, 1)',
              isDarkMode ? 'rgba(118, 75, 162, 1)' : 'rgba(118, 75, 162, 1)',
              isDarkMode ? 'rgba(78, 205, 196, 1)' : 'rgba(78, 205, 196, 1)',
            ],
            borderWidth: 2,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: {
              color: textColor,
              font: {
                size: isDarkMode ? 14 : 15,
                weight: 'normal',
              },
              padding: isDarkMode ? 20 : 25,
              usePointStyle: true,
              pointStyle: 'circle',
              boxWidth: isDarkMode ? 12 : 14,
              boxHeight: isDarkMode ? 12 : 14,
            },
          },
          tooltip: {
            backgroundColor: isDarkMode
              ? 'rgba(24, 23, 23, 0.95)'
              : 'rgba(255, 255, 255, 0.95)',
            titleColor: textColor,
            bodyColor: textColor,
            borderColor: isDarkMode
              ? 'rgba(50, 50, 50, 1)'
              : 'rgba(200, 200, 200, 1)',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: true,
          },
        },
      },
    });
  }
}
