# Mehndi Management System

## Overview
The Mehndi Management System is a web application designed to facilitate the management of mehndi design bookings, user roles, and a design gallery. The project utilizes Django for the backend, React with TailwindCSS for the frontend, and PostgreSQL as the database.

## Features
- **User Roles**: Different roles including Designer, Customer, and Admin with specific permissions.
- **JWT Authentication**: Secure user authentication using JSON Web Tokens.
- **Design Gallery**: A gallery to showcase various mehndi designs with options to like, dislike, and review.
- **Booking System**: Customers can book designers for their events, selecting date and time.
- **Admin Panel**: An interface for administrators to manage users, bookings, and gallery content.

## Tech Stack
- **Backend**: Django, Django REST Framework, PostgreSQL
- **Frontend**: React, TailwindCSS
- **Containerization**: Docker

## Setup Instructions

### Backend
1. Navigate to the `backend` directory.
2. Create a `.env` file based on `.env.example` and configure your database and secret keys.
3. Install the required packages:
   ```
   pip install -r requirements.txt
   ```
4. Run migrations:
   ```
   python manage.py migrate
   ```
5. Start the Django server:
   ```
   python manage.py runserver
   ```

### Frontend
1. Navigate to the `frontend` directory.
2. Install the necessary dependencies:
   ```
   npm install
   ```
3. Start the React application:
   ```
   npm start
   ```

### Docker
To run the application using Docker, execute the following command in the root directory:
```
docker-compose up
```

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.