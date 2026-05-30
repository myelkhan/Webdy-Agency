const fs = require('fs');
const path = require('path');

const dbPath = process.env.NETLIFY || process.env.LAMBDA_TASK_ROOT
  ? '/tmp/fallback_db.json'
  : path.join(__dirname, '../data/fallback_db.json');

const getDb = () => {
  try {
    if (!fs.existsSync(dbPath)) {
      return { users: [], enquiries: [], reviews: [] };
    }
    const raw = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading JSON DB, resetting...', err);
    return { users: [], enquiries: [], reviews: [] };
  }
};

const saveDb = (data) => {
  try {
    fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
  } catch (err) {
    console.error('Error writing to JSON DB', err);
  }
};

const jsonDb = {
  find: (collectionName, query = {}) => {
    const db = getDb();
    const items = db[collectionName] || [];
    return items.filter(item => {
      for (let key in query) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    });
  },

  findOne: (collectionName, query = {}) => {
    const db = getDb();
    const items = db[collectionName] || [];
    return items.find(item => {
      for (let key in query) {
        if (item[key] !== query[key]) return false;
      }
      return true;
    });
  },

  insert: (collectionName, doc) => {
    const db = getDb();
    if (!db[collectionName]) {
      db[collectionName] = [];
    }
    
    // Assign a unique ID
    const newDoc = {
      _id: 'json_' + Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      ...doc
    };
    
    db[collectionName].push(newDoc);
    saveDb(db);
    return newDoc;
  },

  findByIdAndUpdate: (collectionName, id, updates) => {
    const db = getDb();
    const items = db[collectionName] || [];
    const idx = items.findIndex(item => item._id === id);
    if (idx === -1) return null;
    
    items[idx] = {
      ...items[idx],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    saveDb(db);
    return items[idx];
  },

  delete: (collectionName, query = {}) => {
    const db = getDb();
    const items = db[collectionName] || [];
    const filtered = items.filter(item => {
      for (let key in query) {
        if (item[key] === query[key]) return false;
      }
      return true;
    });
    db[collectionName] = filtered;
    saveDb(db);
    return true;
  }
};

module.exports = jsonDb;
