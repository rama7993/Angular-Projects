import { Component, OnInit, HostListener } from '@angular/core';
import { ModeToggleService } from '../../../services/mode-toggle/mode-toggle.service';
import { Mode } from '../../../services/mode-toggle/mode-toggle.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: false,
})
export class HeaderComponent implements OnInit {
  theme!: Mode;
  isScrolled = false;

  navItems = [
    { name: 'Home', link: '#home', active: true },
    { name: 'About', link: '#about', active: false },
    { name: 'Skills', link: '#skills', active: false },
    { name: 'Experience', link: '#experience', active: false },
    { name: 'Education', link: '#education', active: false },
    { name: 'Projects', link: '#projects', active: false },
    { name: 'Certifications', link: '#certifications', active: false },
    { name: 'Contact', link: '#contact', active: false },
  ];

  constructor(private modeToggleService: ModeToggleService) {}

  ngOnInit(): void {
    this.getTheme();
    this.updateActiveSection();
  }

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.isScrolled = window.scrollY > 50;
    this.updateActiveSection();
  }

  getTheme = () => {
    this.modeToggleService.modeChanged$.subscribe((mode) => {
      this.theme = mode;
    });
  };

  setActive(item: any): void {
    this.navItems.forEach((navItem) => (navItem.active = false));
    item.active = true;
  }

  toggle() {
    this.modeToggleService.toggleMode();
  }

  updateActiveSection() {
    const sections = this.navItems.map((item) => item.link.substring(1));
    const scrollPosition = window.scrollY + 100;

    for (let i = sections.length - 1; i >= 0; i--) {
      const section = document.getElementById(sections[i]);
      if (section && section.offsetTop <= scrollPosition) {
        this.navItems.forEach((navItem) => (navItem.active = false));
        this.navItems[i].active = true;
        break;
      }
    }
  }

  scrollToSection(sectionId: string) {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
