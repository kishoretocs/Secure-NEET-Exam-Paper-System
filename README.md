# Secure NEET Exam Paper System 🛡️📄

A decentralized and secure web-based application designed to prevent exam paper leaks in the NEET examination system using encryption and secret sharing techniques.

## 🔐 Project Objective

To ensure secure distribution of exam papers by encrypting the content and splitting the decryption key among authorized parties using Shamir’s Secret Sharing. The system allows decryption only when the required number of shares are combined, making it tamper-resistant and zero-trust compliant.

---

## 🚀 Features

- AES encryption for question security
- Shamir’s Secret Sharing for distributed decryption keys
- Role-based access for question creation and result checking
- Secure key reconstruction only with threshold shares
- Real-time share distribution and result validation
- Lightweight frontend for ease of use
- Fully offline-capable if hosted in secure environments

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Security**:
  - AES (Advanced Encryption Standard)
  - Shamir's Secret Sharing Scheme (SSSS)

---

## 📁 Folder Structure

Secure-NEET-Exam-Paper-System/
│
├── public/ # Static assets (CSS, JS)
├── views/ # HTML files
├── routes/ # Express route handlers
├── controllers/ # Business logic
├── utils/ # AES & secret-sharing utilities
├── models/ # Mongoose models
├── .gitignore
├── README.md
├── package.json
└── server.js # Main application entry point

---

## ⚙️ How to Run Locally

1. **Clone the repository**

   ```bash
   git clone https://github.com/kishoretocs/Secure-NEET-Exam-Paper-System.git
   cd Secure-NEET-Exam-Paper-System

   ```

2. **_Install dependencie_**
   npm install

3. **_Set environment variables (if needed)_**
   Create a .env file:

  MONGO_URI=your_mongo_connection_string
  PORT=5000

4 **_Run the server_**

node server.js

5 **_Open in Browser_**
Visit http://localhost:5000

## ✅ Functional Modules

login.html – Secure login for exam coordinators

index.html – Create and encrypt exam questions

requestquestion.html – Request decryption shares

complete.html – Share combination for decryption

checkresult.html – Result validation

## 📚 Learnings & Concepts Applied

Encryption (AES symmetric key)

Secret sharing (Shamir’s Scheme)

Secure key management

Role-based access control

Backend-frontend integration

REST API security practices

## 📌 Project Status

## ✅ Completed and tested

## 🔒 Designed with academic integrity in mind

## 🎓 Final year mini-project

## 🧑‍💻 Author

Kishore Tocs
GitHub
