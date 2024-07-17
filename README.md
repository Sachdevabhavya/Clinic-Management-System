# Clinic Management System

This software allows clinics to manage there daily operations easily like adding patients and doctors profile to this software. It also allows patients to make appointments online with this software and also allows patients to order medicines directly on this software to the clinic , it also allows the patient and doctor to chat with each other.
The doctors can send prescription to the patients directly thorugh this software.

# Install the project

```git
git clone https://github.com/Sachdevabhavya/Clinic-Management-System.git
```

# Technology Used

1. Node JS
2. Express
3. Mongo DB

# Setup environment

Run the given below command to start the npm environment , and generate package.json file

```bash
npm init
```

# Install the dependencies

Use the below command to install required npm dependencies , for eg if u want to install init , then run npm i init

```bash
npm i "dependency name"
```

# Add Scripts

Add this to the package.json file , to run the server.

```JSON
"dev" : "nodemon app.js"
```

# Run server

```bash
npm run dev
```

# Dependencies Used
Install the following dependencies :

1. bcryptjs
2. dotenv
3. express
4. init
5. mongoose
6. multer
7. nodemon
8. path
9. qrcode

# Project Structure

In this controllers , middlewares , models and routes are seperated and each has its own functionality and use in the project.
Controllers contain about the functionality about what it has to do and what it controls
Middleware contain about the inner funtionality which is used wihtin the controllers
Models are the database model for each function use and requirement
Routes are used for routing to the specific URL

# Connecting the database

.env file used to contain the mongo db url which connects to the database
