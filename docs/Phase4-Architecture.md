# Phase 4: Enterprise Scale & Ecosystem Expansion
## React Native / Expo Mobile Architecture Plan

### 1. Unified Authentication State (Web <-> Native)
The core challenge in migrating a web platform to native mobile is maintaining a secure, unified authentication flow without duplicating backend logic. Since the web platform uses Next.js with HTTP-only cookies for JWT Refresh Tokens, the mobile app needs a slightly modified transport mechanism while using the same endpoints.

#### Strategy:
*   **Backend API Adjustments:** 
    *   The Next.js backend API (e.g., `/api/auth/login`) will need to inspect the `User-Agent` or accept an `x-client-type` header. 
    *   If `x-client-type: mobile`, the API will return the refresh token securely in the JSON payload (or via encrypted response) rather than attempting to set an `HttpOnly` cookie, because React Native does not natively manage cookies the same way a browser does.
*   **Mobile Secure Storage:**
    *   The React Native app will use `expo-secure-store` to encrypt and store the `refresh_token` persistently on the device's Keychain (iOS) and Keystore (Android).
    *   The short-lived `access_token` (JWT) is kept in memory (e.g., Zustand or React Context) and passed in the `Authorization: Bearer <token>` header for all authenticated requests.
*   **OAuth2 (Google/LinkedIn):**
    *   We will use `expo-auth-session` to trigger the OAuth flow. This opens a secure in-app browser (ASWebAuthenticationSession / Custom Tabs) that redirects to the Next.js API OAuth endpoints.
    *   Upon successful OAuth, the Next.js backend generates the JWTs and redirects back to the mobile app via a Deep Link (e.g., `infinityapp://auth?token=...`).

### 2. Design System Translation (Nordic UI)
*   **Styling Engine:** We will use `NativeWind` (Tailwind CSS for React Native) to share the exact same Tailwind v4 tokens (`--surface-base`, `--accent-primary`) from our web `globals.css`.
*   **Frosted Glass:** The `.glass-panel` web utility will be translated using `expo-blur` (`<BlurView>`) to achieve the signature Nordic frosted glass effect on iOS and Android.
*   **Typography:** The "Inter" or "General Sans" fonts will be bundled natively using `expo-font`.
*   **Animations:** Web Framer Motion micro-interactions will be ported to `react-native-reanimated` for native 60/120fps performance.

### 3. API Communication & Data Fetching
*   **Client:** `TanStack Query (React Query)` will be used identically to the web app for caching, optimistic updates, and invalidation (e.g., when a client sends a message or views an invoice).
*   **Push Notifications:** `expo-notifications` will securely map the device's Push Token to the `User` record in PostgreSQL. The backend `Notification` creation logic will trigger a send to APNs/FCM.
