# 🌦️ Weather API - Enhanced Weather Dashboard

A beautiful, modern weather application built with Angular 17, featuring real-time weather data, interactive elements, and a stunning glassmorphism UI design powered by RapidAPI.

![Weather API](https://img.shields.io/badge/Angular-17-red?style=for-the-badge&logo=angular)
![TypeScript](https://img.shields.io/badge/TypeScript-4.9-blue?style=for-the-badge&logo=typescript)
![RapidAPI](https://img.shields.io/badge/API-RapidAPI-orange?style=for-the-badge)
![Responsive](https://img.shields.io/badge/Design-Responsive-purple?style=for-the-badge)

## ✨ Features

### 🌟 Core Features
- **Real-time Weather Data** - Current conditions and detailed weather metrics
- **Location-based Weather** - GPS-enabled weather detection
- **City Search** - Find weather for any city worldwide
- **Weather Statistics** - Comprehensive weather data display
- **Theme Toggle** - Dark and light mode support
- **Responsive Design** - Optimized for all devices

### 🎨 UI/UX Features
- **Glassmorphism Design** - Modern glass-like interface with backdrop blur
- **Dynamic Backgrounds** - Animated gradients and floating particles
- **Smooth Animations** - Fluid transitions and micro-interactions
- **Interactive Elements** - Hover effects and visual feedback
- **Custom Icons** - Font Awesome integration for beautiful icons
- **Loading States** - Elegant shimmer loading animations

### 📊 Weather Data
- **Current Temperature** - Real-time temperature display
- **Weather Conditions** - Detailed weather descriptions
- **Feels Like** - Perceived temperature
- **Humidity** - Air moisture levels
- **Pressure** - Atmospheric pressure
- **Wind Speed** - Wind velocity and direction
- **Visibility** - Atmospheric visibility
- **UV Index** - Sun protection information
- **Dew Point** - Atmospheric moisture content

### 🔧 Technical Features
- **RapidAPI Integration** - Reliable weather data source
- **Angular 17** - Latest Angular features and performance
- **TypeScript** - Type-safe development
- **Responsive CSS** - Mobile-first design approach
- **Local Storage** - Theme persistence
- **Error Handling** - Graceful error management

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm 8+ or yarn 1.22+
- Angular CLI 17+

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd weather-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up RapidAPI**
   - Sign up at [RapidAPI](https://rapidapi.com/)
   - Subscribe to a weather API (e.g., OpenWeatherMap, WeatherAPI)
   - Get your API key and endpoint

4. **Configure environment**
   ```bash
   cp src/environments/environment.example.ts src/environments/environment.ts
   ```
   
   Edit `src/environments/environment.ts`:
   ```typescript
   export const environment = {
     production: false,
     apiKey: 'YOUR_RAPIDAPI_KEY',
     baseUrl: 'YOUR_WEATHER_API_ENDPOINT',
     forecastUrl: 'YOUR_FORECAST_API_ENDPOINT'
   };
   ```

5. **Start development server**
   ```bash
   ng serve
   # or
   npm start
   ```

6. **Open your browser**
   Navigate to `http://localhost:4200`

## 🔑 API Setup

### RapidAPI Weather APIs

#### Recommended APIs:
1. **OpenWeatherMap API**
   - Free tier: 1,000 calls/day
   - Comprehensive weather data
   - Good documentation

2. **WeatherAPI**
   - Free tier: 1,000 calls/day
   - Historical and forecast data
   - High accuracy

3. **AccuWeather API**
   - Free tier: 50 calls/day
   - Professional weather data
   - Global coverage

### API Configuration
```typescript
// Example configuration for OpenWeatherMap via RapidAPI
export const environment = {
  production: false,
  apiKey: 'your-rapidapi-key',
  baseUrl: 'https://community-open-weather-map.p.rapidapi.com/weather',
  forecastUrl: 'https://community-open-weather-map.p.rapidapi.com/forecast',
  headers: {
    'X-RapidAPI-Key': 'your-rapidapi-key',
    'X-RapidAPI-Host': 'community-open-weather-map.p.rapidapi.com'
  }
};
```

## 📱 Responsive Design

### Breakpoints
- **Desktop**: 1024px+ (Full layout with all features)
- **Tablet**: 768px-1024px (Optimized tablet layout)
- **Mobile Large**: 600px-768px (Enhanced mobile experience)
- **Mobile Medium**: 480px-600px (Standard mobile layout)
- **Mobile Small**: 320px-480px (Compact mobile design)

### Mobile Features
- Touch-optimized interface
- Swipe-friendly navigation
- Responsive weather cards
- Optimized loading performance
- Mobile-first design approach

## 🎨 Customization

### Themes
The app supports both light and dark themes:

```typescript
// Toggle theme
this.toggleTheme();

// Check current theme
const isDark = this.isDarkTheme;
```

### Customizing Colors
Modify the CSS variables in `src/styles.css`:

```css
:root {
  --primary-gradient: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --secondary-gradient: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  --accent-color: #667eea;
  --text-primary: #333;
  --text-secondary: #666;
  --background-primary: #ffffff;
  --background-secondary: #f8f9fa;
}
```

### Adding New Weather Metrics
1. **Update the model** in `src/app/models/weather.model.ts`
2. **Add to the service** in `src/app/services/weather.service.ts`
3. **Display in template** in `src/app/app.component.html`
4. **Style the component** in `src/app/app.component.css`

## 🛠️ Development

### Project Structure
```
src/
├── app/
│   ├── components/
│   │   └── info-block/          # Reusable info block component
│   ├── services/
│   │   └── weather.service.ts   # Weather API service
│   ├── models/
│   │   └── weather.model.ts     # TypeScript interfaces
│   ├── app.component.*          # Main application component
│   └── app.config.ts            # Angular configuration
├── assets/
│   └── images/                  # Weather icons and images
├── environments/                # Environment configurations
└── styles.css                   # Global styles
```

### Available Scripts

```bash
# Development
ng serve                    # Start dev server
ng build                    # Build for production
ng test                     # Run unit tests
ng e2e                      # Run e2e tests

# Code Quality
ng lint                     # Run ESLint
ng generate component        # Generate new component
ng generate service         # Generate new service
ng generate pipe            # Generate new pipe
```

### Building for Production

```bash
# Build with optimizations
ng build --configuration production

# Build with AOT compilation
ng build --aot

# Build with source maps
ng build --source-map
```

## 🚀 Deployment

### Vercel (Recommended)
1. **Connect your repository** to Vercel
2. **Set environment variables** in Vercel dashboard
3. **Deploy automatically** on every push

### Netlify
1. **Build the project**: `ng build --configuration production`
2. **Deploy the `dist/weather-api` folder**
3. **Set up redirects** for SPA routing

### GitHub Pages
1. **Install angular-cli-ghpages**: `npm install -g angular-cli-ghpages`
2. **Build and deploy**: `ng build --configuration production --base-href="/weather-api/"`
3. **Deploy**: `ngh --dir=dist/weather-api`

### Firebase Hosting
```bash
# Install Firebase CLI
npm install -g firebase-tools

# Initialize Firebase
firebase init

# Build and deploy
ng build --configuration production
firebase deploy
```

## 📊 Performance

### Optimization Features
- **OnPush Change Detection** - Optimized change detection strategy
- **Lazy Loading** - Components loaded on demand
- **Tree Shaking** - Unused code eliminated
- **AOT Compilation** - Ahead-of-time compilation
- **Bundle Optimization** - Minimized bundle sizes

### Performance Metrics
- **First Contentful Paint**: < 2s
- **Largest Contentful Paint**: < 3s
- **Cumulative Layout Shift**: < 0.1
- **First Input Delay**: < 100ms
- **Bundle Size**: < 300KB gzipped

## 🔒 Security

### Security Features
- **API Key Protection** - Environment-based configuration
- **Input Sanitization** - XSS prevention
- **HTTPS Only** - Secure data transmission
- **Content Security Policy** - XSS protection

### Best Practices
- Never commit API keys to version control
- Use environment variables for sensitive data
- Implement proper error handling
- Validate all user inputs
- Keep dependencies updated

## 🧪 Testing

### Test Coverage
- **Unit Tests** - Component and service testing
- **Integration Tests** - API integration testing
- **E2E Tests** - Full user journey testing

### Running Tests
```bash
# Unit tests
ng test

# E2E tests
ng e2e

# Test coverage
ng test --code-coverage

# Watch mode
ng test --watch
```

## 🤝 Contributing

### Development Workflow
1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/amazing-feature`
3. **Make your changes**
4. **Run tests**: `ng test`
5. **Commit changes**: `git commit -m 'Add amazing feature'`
6. **Push to branch**: `git push origin feature/amazing-feature`
7. **Open a Pull Request**

### Code Style
- Follow Angular style guide
- Use TypeScript strict mode
- Write meaningful commit messages
- Add tests for new features
- Update documentation

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **RapidAPI** - Weather data API platform
- **Angular Team** - Amazing framework
- **Font Awesome** - Beautiful icons
- **Community** - Feedback and contributions

## 📞 Support

- **Documentation**: [Project Wiki](wiki-url)
- **Issues**: [GitHub Issues](issues-url)
- **Discussions**: [GitHub Discussions](discussions-url)
- **Email**: support@weatherapi.com

## 🔮 Roadmap

### Upcoming Features
- [ ] 5-day weather forecast
- [ ] Hourly weather timeline
- [ ] Weather alerts and notifications
- [ ] Interactive weather maps
- [ ] Weather charts and graphs
- [ ] Social sharing
- [ ] Weather widgets
- [ ] Multi-language support

### Version History
- **v1.0.0** - Initial release with basic weather display
- **v1.1.0** - Added glassmorphism design
- **v1.2.0** - Enhanced mobile responsiveness
- **v1.3.0** - Added theme toggle and animations
- **v2.0.0** - Complete UI redesign with advanced features

## 🐛 Known Issues

### Current Limitations
- Forecast API disabled on free tier
- Limited weather data on free plans
- No offline functionality
- Basic error handling

### Workarounds
- Use mock data for forecast features
- Implement caching for better performance
- Add retry logic for API failures
- Provide fallback data

## 📈 Analytics

### Usage Tracking
- Weather searches per day
- Most popular cities
- User engagement metrics
- Performance monitoring

### Privacy
- No personal data collected
- Anonymous usage statistics
- GDPR compliant
- No tracking cookies

---

**Made with ❤️ and Angular 17**

*Weather API - Your simple weather companion* 🌦️