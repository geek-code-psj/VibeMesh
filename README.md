# 🎓 Campus Connect

A vibrant social platform for college students to connect, collaborate, and share experiences. Built for SATI (Samrat Ashok Technological Institute) with Firebase and React.

![Campus Connect](https://img.shields.io/badge/React-18.3.1-blue) ![Firebase](https://img.shields.io/badge/Firebase-11.1.0-orange) ![Vite](https://img.shields.io/badge/Vite-6.0.7-purple)

## ✨ Features

### 🌟 Vibe Wall
- Share compliments, gratitude, and confessions anonymously
- Interactive sticky-note design with vibrant colors
- Heart reactions and filters (All, Today, Most Loved)
- Real-time updates via Firebase

### 📚 Interest Sections
- 6 curated sections: Hackathons, Startups, Design, Placements, Sports, Events
- Create posts with tags (Looking for Team, Resources, Announcement, etc.)
- React to posts with 👍 🔥 💡
- Rich discussion threads

### 🤝 Collab Board
- Find teammates for projects, hackathons, startups, and study groups
- Filter by type, branch, and year
- Show interest in collaborations
- Track roles needed and deadlines

### 👤 User Profiles
- Onboarding flow with interests and skills selection
- Profile customization
- Activity tracking
- Guest mode for browsing without login

## 🚀 Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Backend**: Firebase (Auth + Firestore + Storage)
- **Routing**: React Router v6
- **UI Notifications**: React Hot Toast

## 📋 Prerequisites

- Node.js 18+ and npm
- Firebase account
- Git

## 🛠️ Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/campus-connect.git
cd campus-connect
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Firebase

1. Create a new Firebase project at [Firebase Console](https://console.firebase.google.com)
2. Enable **Email/Password** authentication
3. Create a Firestore database
4. Copy your Firebase config

### 4. Configure environment variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and add your Firebase credentials:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 5. Deploy Firestore rules and indexes

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase (select your project)
firebase init

# Deploy security rules
firebase deploy --only firestore:rules

# Deploy indexes
firebase deploy --only firestore:indexes
```

### 6. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build for Production

```bash
npm run build
```

The build output will be in the `dist/` directory.

## 🚀 Deploy to Vercel

### Method 1: One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/YOUR_USERNAME/campus-connect)

### Method 2: Manual Deploy

1. Install Vercel CLI:
```bash
npm install -g vercel
```

2. Deploy:
```bash
vercel
```

3. Set environment variables in Vercel dashboard:
   - Go to Settings → Environment Variables
   - Add all `VITE_FIREBASE_*` variables

### Method 3: GitHub Integration

1. Push to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Import your GitHub repository
4. Add environment variables
5. Deploy!

## 📁 Project Structure

```
campus-connect/
├── src/
│   ├── components/        # Reusable UI components
│   │   ├── collab/       # Collab-specific components
│   │   ├── section/      # Section-specific components
│   │   ├── ui/           # Base UI components (Button, Card, Modal)
│   │   └── vibe/         # Vibe Wall components
│   ├── config/           # Firebase configuration
│   ├── pages/            # Route pages
│   ├── services/         # Firebase service functions
│   ├── utils/            # Utility functions
│   ├── App.jsx           # Main app component with routing
│   ├── main.jsx          # Entry point
│   └── index.css         # Global styles + Tailwind
├── public/               # Static assets
├── scripts/              # Utility scripts (seed data)
├── firestore.rules       # Firestore security rules
├── firestore.indexes.json # Firestore indexes
├── .env.example          # Environment variables template
├── .gitignore            # Git ignore rules
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
└── README.md             # You are here!
```

## 🔒 Security

- Firebase credentials are stored in environment variables (not committed)
- Firestore security rules enforce authentication and data access control
- All user input is sanitized by React (XSS protection)
- API keys are restricted to authorized domains only

## 🧪 Testing

### Manual Testing Checklist

- [ ] Sign up with new email
- [ ] Complete onboarding
- [ ] Create a vibe post
- [ ] Browse sections and create posts
- [ ] Create a collaboration
- [ ] Show interest in collabs
- [ ] Test guest mode (browse without login)
- [ ] Log out and log back in

### Sample Data

Run the seed script to populate test data:

```bash
node scripts/seedData.js
```

Or add manually via Firebase Console (see `scripts/README.md`).

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with ❤️ for SATI students
- Firebase for amazing backend infrastructure
- React and Vite communities for excellent tools
- Tailwind CSS for beautiful styling

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/YOUR_USERNAME/campus-connect/issues)
- **Email**: support@campus-connect.com
- **Documentation**: See `docs/` folder

## 🗺️ Roadmap

- [ ] Real-time chat messaging
- [ ] Push notifications
- [ ] Profile editing
- [ ] Image uploads for vibes
- [ ] Advanced content moderation
- [ ] Mobile app (React Native)

---

**Made with 💙 for SATI Campus**
