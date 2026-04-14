# Blood Donation QR App - Project Guide

A comprehensive web application designed to facilitate blood donation processes, eligibility checking, and emergency information sharing through QR codes.

## 🚀 Quick Start

1.  **Install Dependencies**: `npm install`
2.  **Start Dev Server**: `npm run dev` (This runs with `--host` to allow mobile access)
3.  **Access on Mobile**:
    *   Look for the "Network" URL in your terminal (e.g., `http://192.168.1.5:5173`).
    *   Ensure your mobile device is on the **same WiFi** as your computer.
    *   Open that URL in your mobile browser.

## 🏗️ Architecture

The application solves the problem of sharing emergency info from a desktop to a mobile device via QR code.

### Core Flow
1.  **User enters info** (Name, Blood Type, Emergency Contact) on desktop.
2.  **App generates QR code** containing a URL with the data encoded (Base64).
3.  **Mobile scans QR code** and opens the URL.
4.  **App decodes data** from the URL and displays it.

### Key Components
*   **`src/utils/baseUrl.ts`**: Intelligent utility that detects if the app is running locally or in production and generates the correct QR URL (IP address for local, domain for prod).
*   **`src/pages/EmergencyInfoDisplay.tsx`**: Displays the decoded information.
*   **`src/pages/UserDashboard.tsx`**: Manages user donation history.

### Tech Stack
*   **Frontend**: React 18, TypeScript, Tailwind CSS
*   **Routing**: React Router DOM
*   **Backend**: Firebase (Auth & Firestore)
*   **Build**: Vite

## 🌐 Deployment (Netlify)

### 3-Step Deploy
1.  **Login**: `netlify login`
2.  **Deploy**: `netlify deploy --prod`
3.  **Done**: Your app is live!

### Why Deploy?
*   **Global Access**: The app works from anywhere, not just your local WiFi.
*   **Permanent QR Codes**: Generated QRs will point to the live URL (`https://your-app.netlify.app/...`).

## 🧪 Testing & Verification

### Mobile QR Testing
1.  Start server: `npm run dev`.
2.  Fill out emergency form on laptop.
3.  Generate QR code.
4.  **Scan with mobile (same WiFi)**.
5.  Verify emergency info appears correctly.

### Troubleshooting
*   **"Webpage unavailable"**: Check if phone and laptop are on the same WiFi. Check if firewall is blocking port 5173.
*   **QR shows localhost**: Ensure you are accessing the app via IP address on your laptop before generating QR.

## 📂 Project Structure
*   `src/pages/`: Main application views (Home, Dashboard, Emergency Info).
*   `src/components/`: Reusable UI blocks (Forms, Modals, Navbar).
*   `src/services/`: Database and API interactions.
*   `src/types/`: TypeScript definitions.
*   `docs/`: (Archived) Old documentation files.
