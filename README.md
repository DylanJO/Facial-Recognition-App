# Face Detection Web App

## Overview

The Face Detection Web App is a web application that allows users to submit links to images. It uses the ClarifAI API to detect faces in the images and then displays a bounding box around the detected faces. The app is built using React for the frontend, Express.js for the backend, and PostgreSQL for the database. It also features user sign-up and login functionality, and it keeps track of the number of entries submitted by each user.

## Features

- User Sign Up and Login: Users can create accounts and log in to the application to use the face detection features.

- Face Detection: The app utilizes the ClarifAI API to analyze images and identify faces, drawing bounding boxes around them.

- Entry Tracking: The application keeps a record of the number of entries submitted by each user.

## Technologies Used

- **Frontend**: React - built with create-react-app
- **Backend**: Express.js https://github.com/DylanJO/Facial-recognition-API - hosted on server.com
- **Database**: PostgreSQL
- **Face Detection API**: ClarifAI https://docs.clarifai.com/api-guide/api-overview/

## Usage

1. Sign up or log in to the application.

2. Enter the URL of an image that you want to analyze.

3. The app will detect any faces in the image and display bounding boxes around them.

4. The number of entries you've submitted will be tracked and displayed on your user profile.
