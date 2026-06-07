# 📞 SoftPhone Pro - Modern WebRTC SoftPhone

A comprehensive, modern softphone application built with Angular 17, featuring SIP protocol support, WebRTC integration, call management, contact management, and advanced calling features.

## ✨ Features

### 🎯 Core Functionality
- **SIP Protocol Support**: Full SIP.js integration for professional VoIP calling
- **WebRTC Integration**: High-quality audio and video calling
- **Call Management**: Make, receive, hold, mute, and end calls
- **Call Recording**: Record calls with download functionality
- **Contact Management**: Add, edit, delete, and search contacts
- **Call History**: Complete call logs with filtering and statistics
- **Modern UI**: Responsive design with glassmorphism effects

### 🚀 Advanced Features
- **Real-time Call Status**: Live connection and call state monitoring
- **Call Statistics**: Detailed analytics and reporting
- **Responsive Design**: Mobile-first approach with touch-friendly controls
- **Audio Controls**: Mute, hold, and audio management
- **Video Calling**: Local and remote video streams
- **Call Transfer**: Advanced call management features
- **Export Functionality**: Data export and backup capabilities

### 🛠️ Technical Features
- **Angular 17**: Latest Angular with standalone components
- **TypeScript**: Strong typing and modern JavaScript features
- **RxJS**: Reactive programming with observables
- **Bootstrap 5**: Responsive UI framework
- **SCSS**: Advanced styling with variables and mixins
- **Service Workers**: Offline functionality support

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ 
- npm or yarn
- Modern web browser with WebRTC support

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd softPhone
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure SIP Settings**
   - Update `src/app/services/sip.service.ts` with your SIP server details
   - Configure your SIP credentials and server information

4. **Start development server**
   ```bash
   ng serve
   ```

5. **Open in browser**
   Navigate to `http://localhost:4200`

## 📦 Package Dependencies

### Core Dependencies
- **Angular 17.3.0**: Modern Angular framework
- **SIP.js 0.21.2**: SIP protocol implementation
- **WebRTC Adapter 8.2.3**: WebRTC compatibility layer
- **RecordRTC 5.6.2**: Call recording functionality
- **Bootstrap 5.3.3**: UI framework
- **RxJS 7.8.0**: Reactive programming

### UI & UX
- **ng-bootstrap 16.0.0**: Bootstrap components for Angular
- **ngx-toastr 18.0.0**: Toast notifications
- **ngx-spinner 16.0.2**: Loading indicators
- **Font Awesome**: Icon library
- **Chart.js 4.4.1**: Data visualization

### Utilities
- **UUID 9.0.1**: Unique identifier generation
- **Moment.js 2.29.4**: Date/time manipulation
- **Lodash 4.17.21**: Utility functions
- **Socket.io 4.7.4**: Real-time communication

## 🏗️ Project Structure

```
src/
├── app/
│   ├── components/
│   │   ├── call-interface/     # Main calling interface
│   │   ├── contacts/           # Contact management
│   │   └── call-history/       # Call logs and statistics
│   ├── services/
│   │   ├── sip.service.ts      # SIP protocol service
│   │   └── call-recording.service.ts  # Recording functionality
│   ├── jitsi/                  # Jitsi Meet integration
│   ├── lin-phone/              # LinPhone integration
│   └── app.module.ts           # Main application module
├── styles.scss                 # Global styles
└── index.html                  # Main HTML file
```

## 🔧 Configuration

### SIP Server Configuration

Update the SIP service with your server details:

```typescript
await this.sipService.initializeSip({
  server: 'your-sip-server.com',
  username: 'your-username',
  password: 'your-password',
  displayName: 'Your Display Name'
});
```

### Environment Variables

Create environment files for different configurations:

```typescript
// environment.ts
export const environment = {
  production: false,
  sip: {
    server: 'your-sip-server.com',
    port: 5060,
    secure: true
  }
};
```

## 🎨 UI Components

### Call Interface
- **Dialer**: Number input with keypad
- **Call Controls**: Answer, reject, hold, mute, end
- **Video Display**: Local and remote video streams
- **Recording Controls**: Start, stop, download recordings
- **Status Indicators**: Connection and call status

### Contacts Management
- **Contact List**: Searchable contact directory
- **Add/Edit Forms**: Contact creation and editing
- **Quick Actions**: Call, edit, delete contacts
- **Import/Export**: Contact data management

### Call History
- **Call Logs**: Complete call history with details
- **Filtering**: Filter by type, date, duration
- **Statistics**: Call analytics and reporting
- **Export**: Download call records

## 🚀 Deployment

### Build for Production
```bash
ng build --configuration production
```

### Deploy to Web Server
1. Build the application
2. Upload `dist/` contents to your web server
3. Configure HTTPS (required for WebRTC)
4. Update SIP server configuration

### Docker Deployment
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 80
CMD ["npm", "start"]
```

## 🔒 Security Considerations

- **HTTPS Required**: WebRTC requires secure connections
- **SIP Credentials**: Store securely, never in client code
- **CORS Configuration**: Proper CORS setup for SIP servers
- **Input Validation**: Sanitize all user inputs
- **Recording Privacy**: Comply with local recording laws

## 🐛 Troubleshooting

### Common Issues

1. **WebRTC Not Working**
   - Ensure HTTPS is enabled
   - Check browser WebRTC support
   - Verify microphone/camera permissions

2. **SIP Connection Failed**
   - Verify server credentials
   - Check network connectivity
   - Ensure CORS is properly configured

3. **Audio Issues**
   - Check microphone permissions
   - Verify audio device selection
   - Test with different browsers

### Debug Mode
Enable debug logging in the SIP service:
```typescript
const options: UserAgentOptions = {
  // ... other options
  logLevel: 'debug'
};
```

## 📱 Browser Support

- **Chrome 80+**: Full support
- **Firefox 75+**: Full support
- **Safari 13+**: Full support
- **Edge 80+**: Full support

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [SIP.js](https://sipjs.com/) for SIP protocol implementation
- [WebRTC](https://webrtc.org/) for real-time communication
- [Angular](https://angular.io/) for the amazing framework
- [Bootstrap](https://getbootstrap.com/) for the UI components

## 📞 Support

For support and questions:
- Create an issue on GitHub
- Check the documentation
- Review the troubleshooting guide

---

**Made with ❤️ and Angular**
