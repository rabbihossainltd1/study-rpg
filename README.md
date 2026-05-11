# Study RPG — Android APK Build Guide

Gamified learning platform for Bangladeshi SSC, HSC & university students.

---

## 🚀 GitHub Actions Auto-Build (Recommended)

Push this repo to GitHub → Actions auto-builds the APK on every push to `main`/`master`.

### Step 1: Set GitHub Secrets

Go to **GitHub repo → Settings → Secrets and variables → Actions → New repository secret**

Add these secrets:

| Secret Name | Where to find |
|---|---|
| `FIREBASE_API_KEY` | Firebase Console → Project Settings → Your Apps → Web App |
| `FIREBASE_AUTH_DOMAIN` | Same location |
| `FIREBASE_PROJECT_ID` | Same location |
| `FIREBASE_STORAGE_BUCKET` | Same location |
| `FIREBASE_MESSAGING_SENDER_ID` | Same location |
| `FIREBASE_APP_ID` | Same location |
| `GOOGLE_SERVICES_JSON` | See Step 2 below |
| `NEXT_PUBLIC_API_URL` | Your backend URL (optional) |

### Step 2: Add google-services.json Secret

1. Go to [Firebase Console](https://console.firebase.google.com) → Your Project
2. Project Settings → Your Apps → **Add app** → Android
3. Register package name: `com.rabbi.studyrpg.app`
4. Download `google-services.json`
5. Copy the **entire JSON content** as the value of `GOOGLE_SERVICES_JSON` secret

### Step 3: Add SHA-1 and SHA-256 for Google Sign-In

```bash
# Get your keystore SHA fingerprints (debug keystore):
keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android -keypass android

# For GitHub Actions debug builds, use this SHA-1:
# keytool -list -v -keystore ~/.android/debug.keystore -alias androiddebugkey -storepass android
```

Add both SHA-1 and SHA-256 in:
**Firebase Console → Project Settings → Your App → Add fingerprint**

### Step 4: Push and Download APK

```bash
git add .
git commit -m "Initial commit"
git push origin main
```

Go to **GitHub → Actions → Build Debug APK → Artifacts → study-rpg-debug-apk**

---

## 🛠️ Local Development

### Prerequisites
- Node.js 20+
- Java 17+ (JDK)
- Android Studio with Android SDK 34
- `ANDROID_HOME` environment variable set

### Setup

```bash
# 1. Install dependencies
cd frontend
npm install

# 2. Create .env.local
cp .env.example .env.local
# Fill in your Firebase values

# 3. Build web app
npm run build

# 4. First time: add Android platform
npm run cap:add:android

# 5. Sync web build to Android
npm run cap:sync

# 6. Build debug APK
npm run android:build
# APK output: android/app/build/outputs/apk/debug/app-debug.apk

# Or run all in one command:
npm run apk:debug
```

### Open in Android Studio

```bash
cd frontend
npx cap open android
```

---

## 🔥 Firebase Setup

### Web App (already configured)
Firebase Auth, Firestore, and Storage work via the web SDK loaded in the WebView.

### Android Native Firebase
Required for Google Sign-In on Android:
1. Add `google-services.json` to `android/app/`
2. Add SHA fingerprints in Firebase Console (see Step 3 above)

### Firestore Rules
Deploy the included rules:
```bash
firebase deploy --only firestore:rules
```

### Authentication Methods to Enable
In Firebase Console → Authentication → Sign-in method:
- ✅ Email/Password
- ✅ Google
- ✅ Anonymous

---

## 📁 Project Structure

```
study-rpg/
├── frontend/                    # Next.js app
│   ├── src/
│   │   ├── app/                 # Next.js App Router pages
│   │   ├── components/          # UI components
│   │   ├── lib/                 # Firebase, utilities
│   │   ├── store/               # Zustand state
│   │   └── types/               # TypeScript types
│   ├── capacitor.config.ts      # Capacitor configuration
│   ├── next.config.js           # Static export config
│   └── package.json             # Scripts + dependencies
├── android/                     # Android native project
│   ├── app/
│   │   ├── src/main/
│   │   │   ├── java/com/rabbi/studyrpg/app/MainActivity.kt
│   │   │   ├── res/             # Android resources
│   │   │   └── AndroidManifest.xml
│   │   ├── build.gradle
│   │   └── google-services.json # ← Add your own
│   ├── build.gradle
│   └── settings.gradle
├── backend/                     # Express.js API server
├── .github/workflows/
│   └── build-apk.yml            # GitHub Actions CI
└── firestore.rules
```

---

## 🏗️ Build Scripts Reference

| Script | Command | Description |
|---|---|---|
| Dev server | `cd frontend && npm run dev` | Local Next.js dev |
| Web build | `cd frontend && npm run build` | Static export to `out/` |
| Add Android | `cd frontend && npm run cap:add:android` | First-time Android setup |
| Sync assets | `cd frontend && npm run cap:sync` | Sync web → Android |
| Build APK | `cd frontend && npm run android:build` | Gradle assembleDebug |
| All-in-one | `cd frontend && npm run apk:debug` | Build + sync + APK |

---

## ⚠️ Important Notes

- **Google Sign-In popup** is automatically replaced with **redirect** on Android WebView
- Firebase Auth, Firestore, and Storage all work in the WebView via the JS SDK
- `google-services.json` must be in `android/app/` for native Firebase features
- Never commit `google-services.json` or `.env.local` — add them as GitHub Secrets

---

## App Details

- **App Name:** Study RPG
- **Package ID:** com.rabbi.studyrpg.app
- **Version:** 1.0.0
- **Min SDK:** 23 (Android 6.0)
- **Target SDK:** 34 (Android 14)
