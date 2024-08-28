# resume-builder
The Resume Builder is a web application built using the MERN stack (MongoDB, Express, React, Node.js). This project allows users to create, customize, and download their resumes. The application provides an easy-to-use interface with various templates and customization options.
## Features

- **User Authentication:** Secure authentication using JWT (JSON Web Tokens) for both job seekers and employers.
- **Profile Management:** Users can manage their personal information, work experience, education, skills, and achievements.
- **Template Selection:** Multiple professionally designed resume templates to choose from.
  **Real-Time Preview:** Users can see a real-time preview of their resume as they edit.
- **Export Options:** Download resumes in PDF format.
- **Responsive Design:** Ensures a seamless experience across all devices.


## Technologies Used

- **Frontend:** React.js, React Router, Bootstrap
- **Backend:** Node.js, Express.js, MongoDB
- **Authentication:** JWT (JSON Web Tokens), Bcrypt (for password hash)
- **Image Upload:** Cloudinary for storing and managing uploaded images
- **Deployment:** Vercel (frontend), Render(backend), MongoDB Atlas (database)

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

- Node.js installed on your machine with latest version or v22.2.0 above
- MongoDB Atlas account (or local MongoDB server)
- Cloudinary account for image storage

### Installation

1. Clone the repo:
   ```sh
   git clone https://github.com/Aakashrawat08/resume-builder
   ```
2. Install NPM packages:
   ```sh
   cd react-job-portal
   cd backend
   npm install
   cd..
   cd frontend
   npm install
   ```
3. Set up environment variables:
   - Create a `config.env` file after creating a `config folder` in the backend directory, containing the following variables:
   ```env
   PORT=
   CLOUDINARY_API_KEY=
   CLOUDINARY_API_SECRET=
   CLOUDINARY_CLOUD_NAME=
   FRONTEND_URL=
   DB_URL=
   JWT_SECRET_KEY=
   JWT_EXPIRE=
   COOKIE_EXPIRE=
   ```

   Replace each value with your specific configuration details.

4. Run the application:
   ```sh
   npm start
   ```
5. Open your browser and navigate to `http://localhost:3000` to view the app.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.


## Contact

Aakash Rawat - [GitHub](https://github.com/Aakashrawat08)

