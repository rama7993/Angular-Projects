# NewsHub - Simple News Application

A clean, modern Angular news application powered by GNews API.

## 🚀 Features

- **Top Headlines** - Latest news from India
- **Technology News** - Tech updates and innovations
- **Sports News** - Sports coverage and updates
- **Business News** - Business and financial news
- **Health News** - Health and medical news
- **Advanced Search** - Search with filters by category and country
- **Responsive Design** - Works on all devices
- **Modern UI** - Clean, professional interface

## 🛠️ Quick Setup

### 1. Get GNews API Key (Free)

- Visit: https://gnews.io/
- Sign up for free account
- Get your API key (100 free requests/day)

### 2. Configure API Key

Update `src/environments/environment.ts`:

```typescript
export const environment = {
  production: false,
  gnewsApiKey: "YOUR_ACTUAL_GNEWS_API_KEY_HERE", // Replace this
  gnewsBaseUrl: "https://gnews.io/api/v4",
  defaultCountry: "in",
  defaultLanguage: "en",
  pageSize: 20,
};
```

Update `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  gnewsApiKey: "YOUR_ACTUAL_GNEWS_API_KEY_HERE", // Replace this
  gnewsBaseUrl: "https://gnews.io/api/v4",
  defaultCountry: "in",
  defaultLanguage: "en",
  pageSize: 20,
};
```

### 3. Install and Run

```bash
cd "d:\Angular-Practise\news-api"
npm install
ng serve
```

Open: http://localhost:4200

## 🌐 GitHub Pages Deployment

### **CORS Solution for Production:**

Since GNews API has CORS restrictions, you need to use a Chrome extension for production:

1. **Install CORS Extension:**

   - Go to Chrome Web Store
   - Search for "CORS Unblock" or "CORS"
   - Install any CORS extension (like "CORS Unblock" or "Moesif Origin & CORS Changer")

2. **Enable Extension:**

   - Click the extension icon in Chrome toolbar
   - Turn it ON for your GitHub Pages site
   - Refresh the page

3. **Deploy to GitHub Pages:**
   ```bash
   ng build --configuration production
   npx angular-cli-ghpages --dir=dist/newshub
   ```

### **Alternative: Use Different Browser**

- Firefox with CORS disabled
- Or use a browser with CORS extensions

## 📱 Available Routes

- `/` or `/home` - Top Headlines
- `/tech` - Technology News
- `/sports` - Sports News
- `/business` - Business News
- `/health` - Health News
- `/search` - Advanced Search

## 🔧 API Configuration

- **Single API**: GNews API only
- **Development**: Works locally without CORS issues
- **Production**: Requires CORS extension for GitHub Pages
- **Reliable**: Stable API with good uptime

## 🚀 Deployment

```bash
ng build --configuration production
npx angular-cli-ghpages --dir=dist/newshub
```

Deploy the `dist/newshub/` folder to GitHub Pages.

## ⚠️ Important Notes

### **CORS Issue in Production:**

- GNews API blocks direct calls from GitHub Pages
- **Solution**: Use CORS Chrome extension
- **Alternative**: Deploy to a server with CORS proxy

### **For Users:**

- Install CORS extension to use the app on GitHub Pages
- Or use Firefox with CORS disabled
- Local development works without extensions

## ✅ Ready to Use!

The application is now configured with a single, reliable API. For production use on GitHub Pages, users need to install a CORS extension.

## 📊 API Limits

- **Free Tier**: 100 requests/day
- **Paid Plans**: Available for higher limits
- **CORS Issue**: Resolved with browser extensions

## 🎨 Features

- **Modern Card Design**: Hover effects and smooth animations
- **Loading States**: Beautiful shimmer effects
- **Error Handling**: User-friendly error messages
- **Responsive**: Mobile-first design
- **Fast**: Optimized performance
- **Clean Code**: Well-structured TypeScript

---

**Note**: This application uses GNews API. For production use on GitHub Pages, users need to install a CORS browser extension due to API restrictions.
