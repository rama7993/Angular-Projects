# 🚀 Rama Koti Reddy Yerram - Portfolio

A modern, responsive, and interactive portfolio website showcasing my skills, projects, and professional experience as a Full Stack Developer and Angular Specialist.

## 🌟 Live Demo

**[View Live Portfolio](https://rama7993.github.io/portfolio/)**

## ✨ Features

### 🎨 Modern Design
- **Glassmorphism UI**: Modern glass-like design elements with backdrop blur effects
- **Dark/Light Theme**: Seamless theme switching with persistent user preference
- **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- **Smooth Animations**: AOS (Animate On Scroll) library for engaging scroll animations
- **Particle Background**: Interactive particle system in the hero section

### 🛠️ Technical Stack
- **Frontend**: Angular 18, TypeScript, SCSS, Bootstrap 5
- **UI Components**: PrimeNG, PrimeIcons
- **Animations**: AOS, Typed.js, Particles.js
- **Charts**: Chart.js for skills visualization
- **Carousel**: Swiper.js for project showcases
- **Icons**: FontAwesome, PrimeIcons

### 📱 Sections

#### 🏠 **Hero Section**
- Interactive particle background
- Typing animation with multiple roles
- Professional profile image with glow effects
- Call-to-action buttons for resume download and project viewing

#### 👨‍💻 **About Me**
- Professional introduction and career overview
- Technical expertise showcase
- Development approach and career goals
- Statistics cards with achievements
- Skills highlights

#### 🎯 **Skills & Expertise**
- Interactive skills distribution chart (Chart.js) with theme-aware text labels and enhanced colors
- Categorized skill cards with progress indicators
- Filterable by technology categories
- Color-coded skill icons
- Professional skill levels
- Dynamic chart updates when switching between light/dark themes
- Muted text color in light mode, regular text color in dark mode

#### 🎓 **Education**
- Clean grid layout for educational background
- NIT Rourkela B.Tech in Computer Science
- Academic achievements and CGPA
- Certificate links for verification

#### 💼 **Work Experience**
- Professional experience at Satisfic (Junior Software Developer)
- Detailed achievement descriptions
- Technology stack used
- Impact-focused descriptions
- Rising Star Award 2023 recognition

#### 🚀 **Projects**
- Interactive project showcase with Swiper carousel
- Live demo and GitHub links for each project
- Technology stack tags
- Project categories (Frontend, Full Stack)
- Featured projects highlighting
- **6 Unique Projects**: QuickChat (Full Stack), Sportify, Weatherhub, Music Search, Weather Search, eDairy

#### 📜 **Certifications**
- **10 HackerRank Certificates**: Problem Solving, Python, SQL, JavaScript, Angular, Node.js, Frontend Developer
- **LeetCode Achievements**: 50-day, 100-day, 365-day, and 500-day streak badges
- **Programming Hub**: C, C++, Python, Java, SQL, HTML, CSS, JavaScript certifications
- Direct links to HackerRank certificates (iframe embedding disabled due to security restrictions)
- Filterable by categories (Frontend, Backend, Algorithms, Database)
- Professional certificate cards with level and type badges

#### 📞 **Contact**
- Professional contact form with validation
- Contact information display
- Social media links
- Responsive form design

#### 🔗 **Footer**
- Comprehensive navigation links
- Social media integration
- Professional branding
- Copyright information

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Angular CLI (v18 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/rama7993/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   ng serve
   ```

4. **Open your browser**
   Navigate to `http://localhost:4200/`

### Build for Production

```bash
ng build --configuration production
```

## 🎨 Customization

### Theme Colors
The portfolio uses a custom color scheme defined in `src/styles/_variables.scss`:
- **Primary Color**: `#9b51e0` (Purple)
- **Secondary Colors**: Various shades and gradients
- **Theme Variables**: CSS custom properties for light/dark themes

### Adding New Projects
1. Update `src/app/components/projects/projects.component.ts`
2. Add project images to `src/assets/images/projects/`
3. Include project details, tech stack, and links
4. **Current Projects**: QuickChat (Full Stack), Sportify, Weatherhub, Music Search, Weather Search, eDairy

### Modifying Skills
1. Update `src/app/components/skills/skills.component.ts`
2. Add skill icons to `src/assets/skills/`
3. Adjust skill levels and categories

## 📦 Dependencies

### Core Dependencies
- `@angular/core`: Angular framework
- `@angular/common`: Angular common utilities
- `@angular/router`: Angular routing
- `@angular/forms`: Angular forms
- `@angular/animations`: Angular animations

### UI Libraries
- `primeng`: PrimeNG component library
- `primeicons`: PrimeNG icons
- `bootstrap`: Bootstrap CSS framework
- `fontawesome`: FontAwesome icons

### Animation & Effects
- `aos`: Animate On Scroll library
- `typed.js`: Typing animation
- `particles.js`: Particle background effects
- `chart.js`: Chart visualization
- `swiper`: Touch slider/carousel

## 🎯 Key Features Implemented

### 🌓 Theme System
- **Light/Dark Mode**: Toggle between themes with persistent storage
- **Theme-aware Components**: All components adapt to theme changes
- **Custom Scrollbar**: Theme-colored scrollbar matching the design
- **SCSS Variables**: Comprehensive variable system with meaningful names
- **CSS Custom Properties**: Dynamic theme switching with CSS variables

### 📱 Responsive Design
- **Mobile-first Approach**: Optimized for all screen sizes
- **Flexible Grid System**: Bootstrap grid with custom breakpoints
- **Touch-friendly Interface**: Optimized for mobile interactions

### ⚡ Performance Optimizations
- **Lazy Loading**: Components loaded on demand
- **Image Optimization**: Compressed and optimized images
- **Bundle Optimization**: Tree-shaking and code splitting
- **Smooth Animations**: Hardware-accelerated CSS animations
- **Budget Configuration**: Optimized bundle sizes with custom Angular budgets

### 🔒 Security Features
- **Form Validation**: Client-side validation with Angular forms
- **XSS Protection**: Sanitized user inputs
- **Secure Links**: HTTPS links and secure external connections

## 🛠️ Development

### Project Structure
```
src/
├── app/
│   ├── components/          # Feature components
│   │   ├── about/           # About section
│   │   ├── contact/         # Contact form
│   │   ├── education/       # Education timeline
│   │   ├── experience/      # Work experience
│   │   ├── footer/          # Footer component
│   │   ├── header/          # Navigation header
│   │   ├── intro/           # Hero section
│   │   ├── loading/         # Loading animation
│   │   ├── projects/        # Projects showcase
│   │   ├── skills/           # Skills section
│   │   └── certifications/  # Certifications
│   ├── animations/          # Animation definitions
│   └── app.component.*      # Root component
├── assets/                  # Static assets
│   ├── images/             # Images and screenshots
│   └── skills/             # Skill icons
└── styles/                 # Global styles
    ├── _variables.scss     # SCSS variables
    └── styles.scss         # Main stylesheet
```

### Code Quality
- **TypeScript**: Strong typing throughout the application
- **SCSS**: Modular and maintainable stylesheets with meaningful variable names
- **Component Architecture**: Reusable and maintainable components
- **Best Practices**: Following Angular best practices and conventions
- **Refactored Code**: Eliminated hardcoded values, using CSS variables throughout
- **Valid PrimeIcons**: All icons validated against official PrimeNG icon list

## 🔄 Recent Updates

### ✨ Latest Improvements (2024)
- **SCSS Refactoring**: Complete refactor of SCSS variables with meaningful names
- **CSS Variables**: Implemented comprehensive CSS custom properties system
- **Project Updates**: Added latest projects (Sportify, Weatherhub) with modern descriptions
- **Certification Enhancement**: Added 10 HackerRank certificates with embedded previews
- **Icon Validation**: Replaced invalid PrimeIcons with official ones from PrimeNG
- **Duplicate Removal**: Cleaned up duplicate projects for better organization
- **Grammar Fixes**: Improved content quality across all sections
- **Performance**: Optimized bundle sizes and build configuration

### 🎨 Design Enhancements
- **Modern UI**: Enhanced glassmorphism effects and animations
- **Responsive**: Improved mobile experience and touch interactions
- **Accessibility**: Better contrast ratios and keyboard navigation
- **Theme System**: Enhanced light/dark mode with smooth transitions

## 🚀 Deployment

### GitHub Pages
The portfolio is deployed on GitHub Pages and automatically updates on push to the main branch.

### Vercel (Alternative)
```bash
npm install -g vercel
vercel --prod
```

### Netlify (Alternative)
```bash
npm run build
# Upload dist/ folder to Netlify
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Contact

**Rama Koti Reddy Yerram**
- 📧 Email: rama7993@gmail.com
- 💼 LinkedIn: [linkedin.com/in/rama-koti-reddy-yerram](https://linkedin.com/in/rama-koti-reddy-yerram)
- 🐙 GitHub: [github.com/rama7993](https://github.com/rama7993)
- 🌐 Portfolio: [rama7993.github.io/portfolio](https://rama7993.github.io/portfolio)

## 📊 Portfolio Statistics

### 🎯 Project Metrics
- **Total Projects**: 6 unique projects
- **Featured Projects**: 3 (QuickChat, Sportify, Weatherhub)
- **Frontend Projects**: 5
- **Full Stack Projects**: 1
- **Live Demos**: All projects have working live demos

### 🏆 Certification Metrics
- **HackerRank Certificates**: 10 certificates
- **LeetCode Streaks**: Multiple achievement badges
- **Programming Languages**: 8+ language certifications
- **Total Certifications**: 12+ verified certificates

### 💼 Professional Experience
- **Current Role**: Junior Software Developer at Satisfic
- **Experience**: 2+ years in software development
- **Awards**: Rising Star Award 2023
- **Technologies**: 16+ core technologies mastered

## 🙏 Acknowledgments

- **Angular Team** for the amazing framework
- **PrimeNG** for the beautiful UI components
- **Bootstrap** for the responsive grid system
- **AOS** for the smooth scroll animations
- **Chart.js** for the interactive charts
- **Swiper** for the carousel functionality

---

⭐ **Star this repository if you found it helpful!**

Built with ❤️ using Angular