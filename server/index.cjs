const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize SQLite database
const db = new sqlite3.Database('./server/insurance.db', (err) => {
  if (err) {
    console.error('Error opening database:', err);
  } else {
    console.log('Connected to SQLite database');
    // Create tables if they don't exist
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS Customers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        firstName TEXT NOT NULL,
        lastName TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        phone TEXT,
        address TEXT,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
      )`);

      db.run(`CREATE TABLE IF NOT EXISTS Policies (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        customerId INTEGER NOT NULL,
        policyNumber TEXT UNIQUE NOT NULL,
        policyType TEXT NOT NULL,
        startDate TEXT NOT NULL,
        endDate TEXT NOT NULL,
        premium REAL NOT NULL,
        status TEXT NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (customerId) REFERENCES Customers(id)
      )`);
    });
  }
});

// Helper function to promisify db.all
const dbAll = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

// Helper function to promisify db.run
const dbRun = (sql, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(sql, params, function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID });
    });
  });
};

// API Endpoints
app.get('/api/customers', async (req, res) => {
  try {
    const customers = await dbAll('SELECT * FROM Customers');
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/customers', async (req, res) => {
  const { firstName, lastName, email, phone, address } = req.body;
  try {
    const result = await dbRun(
      'INSERT INTO Customers (firstName, lastName, email, phone, address) VALUES (?, ?, ?, ?, ?)',
      [firstName, lastName, email, phone, address]
    );
    res.status(201).json({ id: result.id, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/policies', async (req, res) => {
  try {
    const policies = await dbAll('SELECT * FROM Policies');
    res.json(policies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/policies', async (req, res) => {
  const { customerId, policyNumber, policyType, startDate, endDate, premium, status } = req.body;
  try {
    const result = await dbRun(
      'INSERT INTO Policies (customerId, policyNumber, policyType, startDate, endDate, premium, status) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [customerId, policyNumber, policyType, startDate, endDate, premium, status]
    );
    res.status(201).json({ id: result.id, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}); 