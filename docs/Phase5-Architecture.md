# Phase 5: Advanced Service Expansion & Internal Automation
## Enterprise Data & Legacy Transformation Architecture

### 1. Data Analytics & Trend Engine (Microservice Design)

To support secure ingestion of large Excel files and time-based trend analysis, we will decouple the heavy data processing from our Next.js App Router into a dedicated Python/FastAPI microservice. This ensures our main Next.js edge functions do not hit timeout limits (typically 10s on Vercel) during intensive pandas/NumPy compute tasks.

#### Architecture Flow:
1.  **Upload (Next.js Frontend):** The client uploads an Excel (`.xlsx`) file in the React dashboard. The frontend requests a pre-signed URL from the Next.js API.
2.  **Storage (S3/R2):** The file is uploaded directly to a secure bucket (AWS S3 or Cloudflare R2) to bypass Next.js API payload limits.
3.  **Trigger (EventBridge/SQS):** S3 triggers an event to a message queue (SQS), alerting the Python Microservice.
4.  **Processing (Python/FastAPI & Pandas):** 
    *   The Python worker pulls the file from S3.
    *   `pandas` is used to clean the data (drop NaN, normalize dates, map headers) and execute moving-average/time-based portfolio trend analysis.
    *   The results are persisted to PostgreSQL (via Prisma Python client or SQLAlchemy) in a normalized `AnalyticsData` table.
5.  **Visualization (Next.js):** The React frontend fetches the normalized JSON data and renders it using a WebGL-accelerated charting library (e.g., ECharts or vis.gl/deck.gl) to effortlessly handle millions of data points without blocking the main thread or dropping our Lighthouse score.

### 2. Legacy-to-Mobile Transformation Strategy (React Native)

Transforming a legacy HTML order management system into a Native Android App requires a hybrid approach to phase out the old UI without halting business operations.

#### Architecture Flow:
1.  **Strangler Fig Pattern:** We will not rebuild the entire ERP at once. The React Native app will act as a wrapper, slowly replacing HTML views with Native components.
2.  **Webview Bridge (react-native-webview):** 
    *   Initially, complex legacy HTML forms are loaded inside a secure WebView.
    *   We inject JavaScript via `injectedJavaScript` to intercept form submissions and API calls from the legacy HTML.
    *   The WebView posts these messages back to React Native (`window.ReactNativeWebView.postMessage`).
3.  **Native State Management:** React Native listens to these messages, extracts the data payloads, and handles the actual network requests securely via the Native network stack, updating the global native state (Zustand).
4.  **Component Replacement:** Phase by phase, we replace specific HTML routes (e.g., "Order History") with purely Native Android components (FlatList, Reanimated), relying entirely on the new Phase 4 Public APIs rather than the legacy HTML endpoints.
5.  **Design System Mapping:** We utilize `NativeWind` to ensure all new native components perfectly match the Nordic `--surface-base` and frosted glass visual identity, masking the transition from the legacy UI.
