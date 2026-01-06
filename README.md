# Tenjiku

**Travel with confidence, not confusion.**

A comprehensive travel companion web application built with React, TypeScript, and Vite. Tenjiku empowers travelers to plan trips across India, manage group expenses, and access emergency support—all in one beautiful, intuitive platform.

## 🌍 Overview

Tenjiku is an all-in-one travel management platform designed to simplify every aspect of your journey. Whether you're planning a spiritual pilgrimage, heritage tour, adventure trip, organizing expenses for group travel, or facing an emergency situation, Tenjiku has you covered.

### Core Features

- **Smart Trip Planning**: Discover curated destinations, intelligent budget estimation, and detailed itineraries
- **Budget Intelligence**: Category-based destination recommendations with transparent cost breakdowns
- **Expense Splitting**: Flexible expense management with multiple split options for group travel
- **Emergency SOS**: One-tap access to emergency services with location sharing
- **Trip Management**: Archive previous trips and manage complete travel history

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Features in Detail](#features-in-detail)
- [Architecture](#architecture)
- [Usage Guide](#usage-guide)
- [Development](#development)

---

## ✨ Features

### 1. **Interactive Home Dashboard**
- Welcoming splash screen with animated flight path across India map
- Login/authentication flow with smooth transitions
- Quick navigation to Trip Planning, Split Money, and SOS Emergency
- Beautiful glassmorphism UI with gradient backgrounds and dynamic animations
- Tagline: "Explore the Sacred" & "Travel with confidence not confusion"

### 2. **Trip Planning Module**
- **Destination Categories**: 
  - Spiritual India (temples, pilgrimage sites like Shravanabelagola, Udupi)
  - Heritage India (historical landmarks like Bangalore Palace, Mysuru)
  - Adventure India (outdoor activities and nature escapes)
  - And more curated categories...
- **Personalized Planning**:
  - Solo vs. Group trip selection
  - Group size adjustment
  - Starting city input
  - Budget range specification
- **Intelligent Destination Matching**:
  - Recommends destinations within your budget
  - Calculates travel costs based on distance
  - Includes accommodation and food estimates
  - Provides daily cost per person
  - Groups destinations by budget level (low/mid/high)
- **Detailed Trip Results**:
  - Specific destination information with photos
  - Travel duration and distance
  - Rating and reviews
  - Cost breakdown (travel, stay, food, activities)
  - Multi-day itinerary planning

### 3. **Split Money - Expense Management**
A complete expense management system for group travels:

**Core Features:**
- **Trip Management**: Create and manage multiple trips with custom names
- **Participant Management**: Add/remove participants and track individual balances
- **Expense Tracking**: Record who paid for what with flexible splitting:
  - Equal split among all participants
  - Percentage-based custom splits
  - Individual amount-based splits
- **Real-time Balance Tracking**: 
  - Shows who owes money (negative balance)
  - Shows who gets money back (positive balance)
  - Updates instantly as expenses are added
- **Payment Recording**: Log payments between participants with dates and descriptions
- **Settlement Tracking**: Mark payments as settled and maintain settlement history
- **Trip History**: Archive completed trips and access full historical data with restore option

**Dashboard Views:**
- **Split Home**: Overview of current trip with participants, total expenses, and balance summary
- **Participants**: Manage participants, view their current balance and status
- **Expenses**: Add expenses with payer and split details, view complete expense list
- **Payments**: Record settlements between participants, track payment history
- **Settlements**: View all completed settlements with dates and amounts

### 4. **SOS Emergency Module**
Quick access to critical emergency resources:

**Emergency Categories:**
- **Medical** (Red) - Ambulance: 102
- **Disaster** (Amber) - Disaster Management: 108
- **Accident** (Blue) - Police: 100
- **Security** (Red) - Tourist Police: 1363
- **General Help** (Purple) - General assistance

**Features:**
- Color-coded emergency categories for quick identification
- One-tap calling directly to emergency services
- Location sharing capability for emergency responders
- Quick access to all major Indian emergency hotlines
- Dark-themed UI optimized for high-stress situations
- Accessible from any screen via QuickSOS button

### 5. **Persistent Data Storage**
- Local storage integration for all user data
- Automatic trip archival
- Complete transaction history
- Session persistence for seamless experience

---

## � What Makes Tenjiku Different?

**Tenjiku** (天竺 - "Heaven's Land") is not just a travel app. It's your intelligent travel companion that understands the complexities of group travel in India:

- **Deep India Knowledge**: Curated destinations across spiritual, heritage, and adventure categories
- **Confidence in Planning**: Transparent, detailed budget breakdowns remove travel uncertainty
- **Seamless Group Management**: Split expenses without the arguments or confusion
- **Emergency Ready**: Access emergency services instantly when you need them most
- **Completely Local**: Works entirely on your device—no internet dependency for core features

**Tagline**: "Travel with confidence, not confusion"

---

## �🛠 Tech Stack

**Frontend Framework:**
- React 19.2.0
- TypeScript 5.9
- React Router DOM 7.11 (Routing)

**Styling & Animation:**
- Tailwind CSS 4.1 (with Vite integration)
- Framer Motion 12.23 (Advanced animations)
- Custom CSS with responsive design

**3D & Graphics:**
- Three.js 0.182
- React Three Fiber 9.4

**UI Components:**
- React Icons 5.5 (Icon library)
- Custom component library (Accordion, Alert, Dialog, etc.)

**Development Tools:**
- Vite 7.2 (Build tool)
- ESLint 9.39 (Code quality)
- TypeScript ESLint (Type checking)

**Build & Runtime:**
- Node.js
- npm/yarn package management

---

## 📁 Project Structure

```
Tenjiku/
├── src/
│   ├── components/              # Reusable UI components
│   │   ├── Navbar.tsx          # Navigation bar
│   │   ├── Footer.tsx          # Footer component
│   │   ├── Layout.tsx          # Layout wrapper
│   │   ├── Modal.tsx           # Modal dialog component
│   │   ├── Login.tsx           # Login interface
│   │   ├── LoginPage.tsx       # Full login page
│   │   ├── IntroSplash.tsx     # Intro splash screen
│   │   ├── QuickSOS.tsx        # Quick SOS button
│   │   ├── FloatingSOS.tsx     # Floating SOS widget
│   │   ├── Loader.tsx          # Loading spinner
│   │   ├── IndiaMap.tsx        # Interactive map
│   │   ├── fonts.css           # Font definitions
│   │   └── Cursor/             # Custom cursor components
│   │
│   ├── features/               # Feature modules
│   │   ├── planning/           # Trip planning feature
│   │   │   ├── components/
│   │   │   │   ├── DaySelector.tsx       # Select trip duration
│   │   │   │   ├── MapView.tsx          # Map visualization
│   │   │   │   ├── PeopleCounter.tsx    # Group size selector
│   │   │   │   └── StyleSelector.tsx    # Category selector
│   │   │   ├── hooks/
│   │   │   │   └── useBudgetCalc.ts     # Budget calculation hook
│   │   │   ├── lib/
│   │   │   │   └── budgetLogic.ts       # Budget logic & destination data
│   │   │   └── pages/
│   │   │       ├── PlanningHome.tsx     # Planning dashboard
│   │   │       ├── BudgetInput.tsx      # Budget input page
│   │   │       ├── PlanResult.tsx       # Results page
│   │   │       └── TripResultPage.tsx   # Trip details
│   │   │
│   │   ├── sos/                # Emergency SOS feature
│   │   │   ├── components/
│   │   │   │   └── LocationShare.tsx    # Location sharing
│   │   │   ├── lib/
│   │   │   │   └── sosHelpers.ts        # SOS utility functions
│   │   │   └── pages/
│   │   │       └── SOS.tsx              # SOS main page
│   │   │
│   │   └── split/              # Expense splitting feature
│   │       ├── SplitContext.tsx         # Context & state management
│   │       ├── components/
│   │       │   ├── AddExpense.tsx       # Add expense form
│   │       │   ├── BalanceChart.tsx     # Balance visualization
│   │       │   ├── ExpenseList.tsx      # Expenses list
│   │       │   ├── ParticipantForm.tsx  # Participant management
│   │       │   └── ui/                  # UI components (shadcn-style)
│   │       │       ├── accordion.tsx
│   │       │       ├── alert.tsx
│   │       │       ├── button.tsx
│   │       │       ├── dialog.tsx
│   │       │       ├── form.tsx
│   │       │       └── ... (30+ UI components)
│   │       ├── hooks/
│   │       │   └── useExpenses.ts       # Expense management hook
│   │       ├── lib/
│   │       │   ├── balanceCalc.ts       # Balance calculations
│   │       │   └── splitLogic.ts        # Split logic
│   │       └── pages/
│   │           ├── SplitHome.tsx        # Dashboard
│   │           ├── SplitLanding.tsx     # Landing page
│   │           ├── Participants.tsx     # Participant management
│   │           ├── Expenses.tsx         # Expense management
│   │           ├── Payments.tsx         # Payment tracking
│   │           └── Settlements.tsx      # Settlement tracking
│   │
│   ├── pages/                  # Main application pages
│   │   ├── Home.tsx            # Home dashboard
│   │   ├── History.tsx         # Trip history
│   │   └── NotFound.tsx        # 404 page
│   │
│   ├── assets/                 # Static assets
│   ├── App.tsx                 # Root component
│   ├── main.tsx                # Application entry point
│   ├── router.tsx              # Route definitions
│   ├── App.css                 # App styles
│   └── index.css               # Global styles
│
├── public/                     # Public assets
│   ├── exe/                    # Destination images
│   └── bg.jpg                  # Background image
│
├── Configuration Files
│   ├── package.json            # Dependencies & scripts
│   ├── tsconfig.json           # TypeScript configuration
│   ├── tsconfig.app.json       # App-specific TypeScript config
│   ├── tsconfig.node.json      # Node-specific TypeScript config
│   ├── vite.config.ts          # Vite build configuration
│   ├── eslint.config.js        # ESLint rules
│   └── README.md               # This file
```

---

## 🚀 Installation

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Steps

1. **Clone the repository**
```bash
git clone <repository-url>
cd Tenjiku
```

2. **Install dependencies**
```bash
npm install
```

3. **Verify installation**
```bash
npm run lint
```

---

## ▶️ Running the Application

### Development Mode
```bash
npm run dev
```
The application will start at `http://localhost:5173` (default Vite port).

### Build for Production
```bash
npm run build
```
This creates an optimized production build in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```
Previews the production build locally before deployment.

### Lint Code
```bash
npm run lint
```
Runs ESLint to check code quality.

---

## 🎯 Features in Detail

### Trip Planning Engine

The trip planning feature uses intelligent algorithms to recommend destinations across India based on user input:

**Budget Calculation Algorithm:**
- Base daily cost per person per destination (varies by location)
- Travel cost = Distance × ₹5/km (approximate travel rate)
- Total trip cost = (Daily cost per person × Days × Group size) + Travel cost
- Includes pre-calculated accommodation and meal estimates
- Groups destinations by budget level: Budget (₹1-2k), Mid-range (₹2-4k), Premium (₹4k+)

**Destination Database:**
Includes 50+ curated destinations across India:
- **Name & Location**: GPS coordinates for accurate travel calculations
- **Daily Cost Per Person**: Transparent pricing per person per day
- **Budget Level**: Low/Mid/High classification for easy filtering
- **Images & Descriptions**: Beautiful photos and detailed descriptions
- **Ratings**: User ratings (4-5 star scale)
- **Travel Duration**: Estimated travel time from starting city
- **Detailed Cost Breakdown**: Itemized costs (travel, stay, food, activities)

**Example Destinations:**
- Spiritual: ISKCON Temple, Shravanabelagola, Melukkote, Dharmasthala
- Heritage: Bangalore Palace, Tipu Sultan's Palace, Mysuri, Srirangapatna
- Adventure: Various outdoor and nature-based experiences

**Personalization:**
- Filters by budget constraints
- Group size adjustments (affects total but not daily rates)
- Calculates from user's starting city
- Recommends based on trip type (solo vs. group)

### Split Money - Context API State Management

**Architecture:**
Uses React Context API for centralized state management:
- Global trip context accessible from any component
- Automatic state persistence to localStorage
- Real-time updates across all pages
- Session-based data refresh

**Data Structures:**
```typescript
interface Participant {
  name: string;
  amount: number;        // Signed: +ve = gets back, -ve = owes
  status: "owes" | "gets back" | "settled"
  initial: string;
}

interface Expense {
  title: string;
  payer: string;
  date: string;
  timestamp: string;
  amount: number;
  splitType: 'equal' | 'percentage' | 'custom'
}

interface PaymentEntry {
  from: string;
  to: string;
  amount: number;
  date: string;
  timestamp: string;
  description: string;
}
```

**Balance Calculation:**
- Tracks positive balance (gets money back) and negative balance (owes money)
- Updates in real-time as expenses are added
- Supports three split methods:
  1. **Equal**: Divides amount equally among all participants
  2. **Percentage**: Assigns specific percentages to each person
  3. **Custom**: Assigns exact amounts to specific people
- Provides settlement suggestions (who pays whom and how much)

**Data Persistence:**
- All data saved to browser's localStorage
- Keys: `split_trips`, `split_participants`, `split_expenses`, `split_payments`
- Automatic trip archival with restore functionality
- Complete transaction history with timestamps

### Emergency SOS Module

**Quick Access Design:**
- Floating SOS button accessible from all pages
- One-tap launching of full SOS interface
- Color-coded for quick visual identification

**Supported Services:**
- Police: 100 (General emergency)
- Ambulance: 102 (Medical)
- Fire Department: 101 (Fire/rescue)
- Disaster Management: 108 (Natural disasters)
- Tourist Police: 1363 (Traveler-specific assistance)

**Features:**
- Direct calling integration (tel: protocol)
- Location sharing capability for emergency responders
- Dark-themed interface (easier on eyes in emergencies)
- Emergency category visualization with icons
- Accessible from any screen in the app

---

## 🏗 Architecture

### Component Hierarchy
```
App
└── Router
    ├── Home
    │   ├── IntroSplash (conditional)
    │   ├── LoginPage (conditional)
    │   └── Dashboard (after login)
    │       ├── QuickSOS
    │       └── Feature Cards
    │
    ├── PlanningHome
    │   ├── TripType Selection
    │   ├── Destination Selection
    │   ├── Budget Input
    │   └── TripResultPage
    │
    ├── SOS
    │   ├── Emergency Categories
    │   ├── Quick Call Buttons
    │   └── LocationShare
    │
    └── Split (with SplitProvider)
        ├── SplitLanding
        ├── SplitHome (Dashboard)
        ├── Participants
        ├── Expenses
        ├── Payments
        └── Settlements
```

### State Management

**Global State (Context API):**
- Trip data and participants
- Expenses and payments
- Trip history and archives

**Local State (Component State):**
- Form inputs
- UI visibility (modals, dropdowns)
- Animation states

**Persistent State (localStorage):**
- All user data persists across sessions
- Automatic data recovery on page refresh

---

## 📖 Usage Guide

### First Launch

1. **Open the App**: Visit `http://localhost:5173`
2. **Intro Animation**: Watch the animated flight path across India map (first visit only)
3. **Login**: Mock login with any email/password (session-based)
4. **Home Dashboard**: See three main options - Trip Planning, Split Money, SOS Emergency

### Planning a Trip

1. Navigate to **Trip Planning**
2. Choose trip type (Solo or Group)
3. Select destination category (Spiritual, Heritage, Adventure, etc.)
4. Enter budget and starting location
5. View recommended destinations based on your criteria
6. See detailed trip breakdown with costs, travel time, and descriptions

### Splitting Expenses

1. Navigate to **Split Money**
2. Create a new trip with a custom name
3. Add participants (names)
4. Record expenses with:
   - Expense title/description
   - Amount paid
   - Who paid (payer)
   - How to split (equal, percentage, or custom)
5. View real-time balances (who owes/gets back)
6. Record payments between participants
7. Mark payments as settled
8. Archive trip when complete
9. Access trip history and restore previous trips

### Emergency Access

1. Click **SOS Emergency** on home or **QuickSOS** button on any page
2. Select emergency type (Medical, Disaster, Accident, Security, General)
3. See the recommended hotline number
4. Share location with emergency services if needed
5. Tap to call emergency services directly

---

## 👨‍💻 Development

### Code Style & Standards
- **TypeScript**: Strict type checking for safety
- **ESLint**: Enforces code quality and consistency
- **Tailwind CSS**: Utility-first responsive styling
- **Component Architecture**: Feature-based folder structure
- **Naming Conventions**: Clear, descriptive names for components and functions

### Adding New Destinations

Edit `src/features/planning/lib/budgetLogic.ts` and add to the destination array:

```typescript
{
  name: "Destination Name",
  lat: 12.9716,           // Latitude
  lng: 77.5946,           // Longitude
  dailyCostPerPerson: 3500,
  image: "https://image-url.jpg",
  description: "Detailed description of the destination",
  rating: "4.8",
  category: "Spiritual India",
  budgetLevel: 'mid',
  details: "Distance: Xkm | Travel: ₹Y | Stay: ₹Z | Food: ₹A | Total: ₹B-C"
}
```

### Adding New Features

1. **Create feature directory** under `src/features/`
2. **Organize by concern**: 
   - `components/` - React components
   - `pages/` - Full page components
   - `hooks/` - Custom React hooks
   - `lib/` - Utility functions and logic
3. **Use TypeScript interfaces** for type safety
4. **Follow existing patterns** for consistency
5. **Update router.tsx** with new routes

### Working with Components

- **Styling**: Use Tailwind CSS classes + inline styles for dynamic values
- **Animations**: Use Framer Motion for smooth transitions
- **State**: Use Context API for global state, useState for local state
- **Responsive Design**: Test on mobile (320px), tablet (768px), desktop (1024px+)

### Local Storage Keys Reference

```typescript
localStorage.getItem("split_trips")           // Archived trips array
localStorage.getItem("split_current_name")    // Current trip name
localStorage.getItem("split_participants")    // Participant list
localStorage.getItem("split_expenses")        // Expense records
localStorage.getItem("split_payments")        // Payment history
```

### Common Hooks

**`useBudgetCalc`** (Planning):
```typescript
const { calculateTripCost } = useBudgetCalc();
const cost = calculateTripCost(groupSize, days, destination);
```

**`useExpenses`** (Split):
```typescript
const { calculateBalances, splitExpense } = useExpenses();
const balances = calculateBalances(expenses, participants);
```

---

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile** (320px and up)
- **Tablet** (768px and up)
- **Desktop** (1024px and up)

Uses fluid typography and flexible layouts for optimal viewing on all devices.

---

## 🔐 Data Privacy

- All data stored locally in browser
- No server/cloud storage required
- Users have full control over their data
- Clear session management with login system

---

## 🚀 Future Enhancements

Potential features for future versions:
- **Backend Integration**: Real-time sync across devices
- **Cloud Backup**: Secure cloud storage for user data
- **Collaborative Features**: Real-time collaboration for group trips
- **AI Recommendations**: Machine learning-powered destination matching
- **Advanced Analytics**: Budget trends and spending patterns
- **Payment Integration**: UPI, card payments, digital wallets
- **Social Features**: Share trips, invite friends, social sharing
- **Offline Support**: Full functionality without internet
- **Multi-language**: Support for regional Indian languages
- **Maps Integration**: Interactive maps with directions
- **Budget AI**: Personalized budget suggestions based on spending

---

## 🎨 UI/UX Highlights

- **Glassmorphism Design**: Modern frosted glass effect UI
- **Smooth Animations**: Framer Motion for delightful interactions
- **Dark Theme**: Eye-friendly dark interface optimized for travel
- **Responsive Layouts**: Perfect on mobile, tablet, and desktop
- **Accessible Colors**: High contrast, colorblind-friendly palette
- **Intuitive Navigation**: Clear information hierarchy and CTAs
- **Loading States**: Beautiful loaders and transition animations
- **Error Handling**: User-friendly error messages and recovery

---

## 🔐 Data Privacy & Security

- **Local-First Architecture**: All data stored on user's device
- **No Server Storage**: No cloud dependencies or backend servers
- **Complete User Control**: Users own and manage their data
- **Session Management**: Login/logout with session persistence
- **Data Transparency**: Clear breakdown of all calculations
- **No Tracking**: Zero analytics or user tracking

---

## 📊 Trip Planning Algorithm

**Destination Matching Logic:**
```
1. Filter destinations by category (Spiritual, Heritage, etc.)
2. Adjust daily cost for group size (group discount logic)
3. Calculate total cost = (Daily cost × Days × Group size) + Travel cost
4. Filter by user's budget range
5. Sort by best value (lowest cost in budget)
6. Return top 3-5 recommendations
```

**Travel Cost Calculation:**
```
Travel Distance = Google Maps distance (hardcoded for demo)
Travel Cost = Distance × ₹5/km (average Indian travel rate)
Includes: Bus/train/vehicle fare
Excludes: Internal sightseeing within destination
```

---

## 🤝 Contributing Guidelines

While Tenjiku is a personal project, contributions are welcome:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure:
- Code follows TypeScript strict mode
- Components are responsive
- ESLint passes without warnings
- Commit messages are descriptive

---

## 📞 Support & Feedback

For issues, bug reports, feature requests, or feedback:
- Create an issue in the GitHub repository
- Include steps to reproduce bugs
- Suggest features with use cases
- Share your travel experiences with Tenjiku!

---

## 📄 License

This project is proprietary software. All rights reserved. © 2026 Tenjiku.

---

## 🙏 Acknowledgments

- **React Community**: For the amazing ecosystem
- **Framer Motion**: For beautiful animations
- **Tailwind CSS**: For utility-first styling
- **India**: For the inspiring destinations

---

**Tenjiku** - *Where travel meets confidence*

"Explore the Sacred. Travel with confidence, not confusion."

*Happy travels! 🌏✈️*