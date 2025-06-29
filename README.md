# GetWritingDone

## Introduction
**GetWritingDone** is a web-based platform designed to connect students needing academic writing assistance with student writers eager to earn through their skills. The platform provides features like assignment posting, application management, secure communication, and automated notifications, making academic writing collaborations seamless and efficient.

---

## Features
- **Assignment Management**: Post assignments with details like name, pages, budget, and contact information.
- **Search and Discovery**: Find assignments by college, subject, or budget with filters and sorting options.
- **Application System**: Writers can apply for assignments, and assignment owners receive notifications.
- **Secure Communication**: Facilitates secure communication between assignment owners and writers.
- **Automated Notifications**: Email notifications for assignment updates, application confirmations, and deadlines.

---

## Technology Stack
### Backend
- **Django**: Robust web framework for backend development.
- **Django REST Framework**: API handling and server-side processing.
- **PostgreSQL**: Structured and reliable data storage.

### Frontend
- **React.js**: Dynamic and responsive user interface.
- **CSS & Tailwind CSS**: Modern styling for a clean design.

---

## Installation
### Backend
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/GetWritingDone.git
   cd GetWritingDone/backend
   ```
2. Create a virtual environment and install dependencies:
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   pip install -r requirements.txt
   ```
3. Set up the database:
   ```bash
   python manage.py migrate
   ```
4. Run the development server:
   ```bash
   python manage.py runserver
   ```

### Frontend
1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
   
---

## Future Scope
- **Mobile Application**: Develop a cross-platform mobile app for on-the-go access.
- **AI-Powered Matching**: Match assignments with suitable writers using machine learning.
- **Payment Integration**: Add secure payment gateways for transactions.
- **Gamification Features**: Introduce badges, ratings, and leaderboards.
