# Admin CMS — Setup Guide

## Required Environment Variables

Add these to `.env.local`:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

## Firebase Setup

1. Create a Firebase project at [console.firebase.google.com](https://console.firebase.google.com)
2. Enable **Authentication** → Sign-in method → **Email/Password**
3. Enable **Cloud Firestore** (start in test mode, then deploy rules)
4. Enable **Storage** (start in test mode, then deploy rules)
5. Go to Project Settings → General → Your apps → Add a **Web app**
6. Copy the config values into `.env.local`

## Creating an Admin User

1. Go to Firebase Console → Authentication → Add User
2. Create a user with email + password
3. Copy the user's **UID** from the Users list
4. Go to Firestore → Create collection `admins`
5. Add a document with **Document ID = the user's UID**
6. Add any field (e.g. `email: "admin@example.com"`) — the document just needs to exist

To remove admin access, delete that document from the `admins` collection.

## Deploying Security Rules

Copy the rules from `firebase/firestore.rules` and `firebase/storage.rules` into the Firebase Console, or use the Firebase CLI:

```bash
firebase deploy --only firestore:rules,storage
```

## Running Locally

```bash
npm install
npm run dev
```

Visit `http://localhost:3000/admin` to access the admin panel.

## Admin Routes

| Route | Purpose |
|---|---|
| `/admin` | Dashboard |
| `/admin/hero` | Edit homepage hero |
| `/admin/tours` | Manage tours |
| `/admin/races` | Manage races |
| `/admin/lodges` | Manage arctic lodges |
| `/admin/activities` | Manage activities |
| `/admin/about` | Edit about page |
| `/admin/contact` | Edit contact info |

## Data Model (Firestore)

- `content/hero` — Single doc for hero section
- `content/about` — Single doc for about page
- `content/contact` — Single doc for contact page
- `tours/` — Collection of tour items
- `races/` — Collection of race items
- `lodges/` — Collection of lodge items
- `activities/` — Collection of activity items
- `admins/` — Collection of admin user UIDs (document ID = Firebase Auth UID)

## Image Storage

All uploaded images are stored in Firebase Storage under folders matching their content type (`tours/`, `hero/`, `about/`, etc.). Image metadata (URL + storage path) is saved in the Firestore document.
