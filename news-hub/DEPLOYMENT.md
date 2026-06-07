# GitHub Pages Deployment Guide

## 🚀 Deploy NewsHub to GitHub Pages

### **CORS Solution: Chrome Extension**

Since GNews API has CORS restrictions, users need to install a Chrome extension for production.

## 📋 Deployment Steps:

### 1. **Build for Production:**

```bash
ng build --configuration production
```

### 2. **Deploy to GitHub Pages:**

```bash
npx angular-cli-ghpages --dir=dist/newshub
```

### 3. **For Users - Install CORS Extension:**

**Option A - Chrome Extension:**

1. Go to Chrome Web Store
2. Search for "CORS Unblock" or "CORS"
3. Install any CORS extension
4. Enable it for your GitHub Pages site
5. Refresh the page

**Option B - Firefox:**

1. Open Firefox
2. Type `about:config` in address bar
3. Search for `security.fileuri.strict_origin_policy`
4. Set it to `false`
5. Restart Firefox

## 🔧 Configuration:

- **Base href**: `/newshub/` (configured)
- **API**: Direct GNews API calls
- **CORS**: Handled by browser extension

## 📱 Live Site:

- **URL**: `https://rama7993.github.io/newshub/`
- **Note**: Users need CORS extension to use the app

## ⚠️ Important:

- **Development**: Works without extensions
- **Production**: Requires CORS extension
- **Alternative**: Deploy to server with CORS proxy

---

**Simple Solution**: Tell users to install a CORS Chrome extension!
