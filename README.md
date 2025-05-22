# DRIVE

A simple MERN-based file upload and user authentication app.

## Features

- User registration and login with hashed passwords
- JWT-based authentication
- File upload UI (frontend only)
- EJS templating with Tailwind CSS and Flowbite

## Project Structure

```
.
├── app.js
├── package.json
├── .env
├── config/
│   └── db.js
├── middlewares/
│   └── auth.js
├── models/
│   └── user.model.js
├── routes/
│   ├── index.routes.js
│   └── user.routes.js
└── views/
    ├── home.ejs
    ├── index.ejs
    ├── login.ejs
    └── register.ejs
```

## Setup

1. **Clone the repository**

2. **Install dependencies**
   ```sh
   npm install
   ```

3. **Create a `.env` file** in the root directory with the following variables:
   ```
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   ```

4. **Start the server**
   ```sh
   npm start
   ```

5. **Open your browser** and go to [http://localhost:3000](http://localhost:3000)

## Scripts

- `npm start` — Starts the server with nodemon

## License

ISC
