# 📞 Real Phone Calling Guide

This guide shows you how to make **real phone calls** using the SoftPhone application with open source SIP solutions.

## 🚀 **Quick Start - Make Real Calls in 5 Minutes**

### Step 1: Get a Free SIP Account

**Option A: FreeSIP.org (Recommended)**
1. Visit [freesip.org](https://freesip.org)
2. Click "Register" and create a free account
3. Note down your:
   - Username
   - Password
   - Server: `freesip.org`

**Option B: SIP.US**
1. Visit [sip.us](https://sip.us)
2. Create a free account
3. Get your SIP credentials

### Step 2: Configure the SoftPhone

1. **Start the application**:
   ```bash
   cd softPhone
   npm start
   ```

2. **Open in browser**: `http://localhost:4200`

3. **Go to SIP Setup** (first page)

4. **Enter your credentials**:
   - Server: `freesip.org`
   - Username: Your FreeSIP username
   - Password: Your FreeSIP password
   - Display Name: Your name

5. **Click "Connect"**

### Step 3: Make Your First Call

1. **Go to Call Interface**
2. **Enter a phone number** (with country code)
3. **Click "Call"**

## 🌍 **Free SIP Providers for Real Calling**

### 1. **FreeSIP.org** ⭐ (Best for Testing)
- **Cost**: Free
- **Features**: 
  - Free SIP account
  - Can call other SIP users
  - Good for testing
- **Setup**: Just register and use
- **Server**: `freesip.org:5060`

### 2. **SIP.US**
- **Cost**: Free
- **Features**:
  - Free US phone numbers
  - Incoming calls only
  - Good for testing
- **Server**: `sip.us:5060`

### 3. **Linphone**
- **Cost**: Free
- **Features**:
  - Free SIP service
  - Mobile app available
  - Good for development
- **Server**: `sip.linphone.org:5060`

### 4. **Asterisk (Self-hosted)**
- **Cost**: Free (requires server)
- **Features**:
  - Full control
  - Can connect to PSTN
  - Best for production
- **Setup**: Install on your server

## 🔧 **Advanced Configuration**

### Using Your Own SIP Server

If you have your own Asterisk or FreeSWITCH server:

```typescript
// In sip-config component
sipConfig = {
  server: 'your-server.com',
  username: 'your-username',
  password: 'your-password',
  displayName: 'Your Name'
};
```

### Connecting to PSTN (Public Switched Telephone Network)

To call real phone numbers, you need:

1. **SIP Trunk Provider** (paid service)
2. **Your own Asterisk/FreeSWITCH server**
3. **PSTN gateway configuration**

Popular SIP Trunk providers:
- **Twilio** - Developer-friendly
- **Vonage** - Business-focused
- **VoIP.ms** - Affordable
- **Flowroute** - Reliable

## 📱 **Making Different Types of Calls**

### 1. **SIP-to-SIP Calls** (Free)
- Call other SIP users
- Use SIP addresses like `sip:username@domain.com`
- No cost involved

### 2. **SIP-to-Phone Calls** (Paid)
- Call real phone numbers
- Requires SIP trunk provider
- Costs per minute

### 3. **Phone-to-SIP Calls** (Incoming)
- Receive calls on your SIP account
- Others can call your SIP address
- May require port forwarding

## 🛠️ **Troubleshooting Real Calls**

### Common Issues

1. **"Not registered to SIP server"**
   - Check your credentials
   - Verify server address
   - Check internet connection

2. **"Call failed"**
   - Check if the number is valid
   - Ensure you have calling credits (for paid services)
   - Verify SIP server allows outbound calls

3. **"No audio"**
   - Check microphone permissions
   - Verify WebRTC is working
   - Test with different browsers

4. **"Connection timeout"**
   - Check firewall settings
   - Verify server is accessible
   - Try different transport (UDP vs WSS)

### Debug Mode

Enable debug logging in the browser console:
```typescript
// In sip.service.ts
const options: UserAgentOptions = {
  // ... other options
  logLevel: 'debug'
};
```

## 🔒 **Security Considerations**

### For Production Use

1. **Use HTTPS**: WebRTC requires secure connections
2. **Secure Credentials**: Never expose SIP passwords in client code
3. **Firewall**: Configure proper firewall rules
4. **Authentication**: Implement proper user authentication
5. **Rate Limiting**: Prevent abuse of your SIP service

### Environment Variables

Store sensitive data in environment variables:

```typescript
// environment.ts
export const environment = {
  production: false,
  sip: {
    server: process.env['SIP_SERVER'] || 'freesip.org',
    username: process.env['SIP_USERNAME'] || '',
    password: process.env['SIP_PASSWORD'] || ''
  }
};
```

## 📊 **Call Quality Optimization**

### Audio Settings

1. **Codec Selection**: Use Opus or G.722 for better quality
2. **Bitrate**: Higher bitrate = better quality
3. **Echo Cancellation**: Enable for better call experience
4. **Noise Suppression**: Reduce background noise

### Network Optimization

1. **STUN Servers**: Use multiple STUN servers
2. **TURN Servers**: For NAT traversal
3. **Bandwidth**: Ensure sufficient bandwidth
4. **Latency**: Keep latency below 150ms

## 🎯 **Testing Your Setup**

### Test Numbers

1. **Echo Test**: Call `*43` (if supported by your provider)
2. **SIP Test Services**: Use online SIP test numbers
3. **Other SIP Users**: Call friends with SIP accounts
4. **Conference Rooms**: Join SIP conference rooms

### Test Scenarios

1. **Local Network**: Test within your network
2. **Internet**: Test from different networks
3. **Mobile**: Test from mobile devices
4. **Different Browsers**: Test compatibility

## 🚀 **Production Deployment**

### Requirements

1. **HTTPS Certificate**: Required for WebRTC
2. **SIP Server**: Your own or reliable provider
3. **Domain Name**: For SIP registration
4. **Monitoring**: Call quality monitoring
5. **Backup**: Redundant SIP servers

### Deployment Steps

1. **Build the application**:
   ```bash
   npm run build --configuration production
   ```

2. **Deploy to web server** with HTTPS

3. **Configure SIP server** with your domain

4. **Set up monitoring** and logging

5. **Test thoroughly** before going live

## 📞 **Example: Complete Setup with FreeSIP**

1. **Register at FreeSIP**:
   - Go to freesip.org
   - Create account: `testuser123`
   - Password: `mypassword123`

2. **Configure SoftPhone**:
   - Server: `freesip.org`
   - Username: `testuser123`
   - Password: `mypassword123`

3. **Make a test call**:
   - Call another FreeSIP user: `sip:otheruser@freesip.org`
   - Or call echo test if available

4. **Verify audio**:
   - Check microphone permissions
   - Test audio quality
   - Verify call recording works

## 🎉 **Success!**

You now have a fully functional softphone that can make real phone calls using open source SIP solutions!

### Next Steps

1. **Add more features**: Call transfer, conferencing, etc.
2. **Integrate with CRM**: Connect to your business systems
3. **Add video calling**: Extend with video capabilities
4. **Mobile app**: Create mobile versions
5. **Analytics**: Add call analytics and reporting

---

**Happy Calling! 📞✨**
