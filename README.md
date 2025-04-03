# Heart Disease Prediction

This is a **Heart Disease Prediction** web application built with **Next.js**. It allows users to check if they are at risk of heart disease based on various health parameters.

## Getting Started

To get started with the project, first clone this repository and install the dependencies:

```bash
git clone [https://github.com/dulang1982/heart-disease-prediction.git](https://github.com/dulang1982/heart-disease-prediction.git)
cd heart-disease-prediction
npm install
# or
yarn install
# or
pnpm install
```

## Running the Development Server
Once the dependencies are installed, run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses Next.js with React and integrates MongoDB for user authentication and data storage.

## Folder Structure

- `app/page.js`: The main entry point for the app. You can modify the page content here.
- `components/`: Contains reusable UI components like Navbar, Table, etc.
- `pages/api/`: The backend API routes to interact with the database and handle the app's business logic.

## Features

- **Heart Disease Prediction**: Users can input their health data, and the system predicts the likelihood of heart disease.
- **User Authentication**: Users can sign up and log in to view their prediction history.
- **PDF Generation**: Download a PDF of the user's prediction history.

## Font Optimization

This project uses the `next/font` feature to automatically optimize and load the **Geist** font family from Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - An interactive Next.js tutorial.
- [MongoDB Documentation](https://www.mongodb.com/docs/) - Learn how to work with MongoDB for your backend.