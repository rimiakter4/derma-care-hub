const express = require('express');
const cors = require('cors');
const fs = require('fs'); // ফাইল সিস্টেম মডিউল
const path = require('path');

const app = express();
app.use(cors());
app.use(express.json());

const DATA_FILE = path.join(__dirname, 'items.json');

// যদি items.json ফাইলটি না থাকে, তবে একটি খালি অ্যারে তৈরি করবে
if (!fs.existsSync(DATA_FILE)) {
    fs.writeFileSync(DATA_FILE, JSON.stringify([]));
}

// ডাটা সেভ করার রুট
app.post('/add-item', (req, res) => {
    try {
        const newItem = req.body;

        // ১. ফাইল থেকে পুরাতন ডাটা পড়া
        const fileData = fs.readFileSync(DATA_FILE, 'utf8');
        const items = JSON.parse(fileData);

        // ২. নতুন আইটেম যোগ করা
        items.push(newItem);

        // ৩. আবার ফাইলে রাইট করা
        fs.writeFileSync(DATA_FILE, JSON.stringify(items, null, 2));

        res.status(201).json({ success: true, message: "Item saved to JSON file!" });
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).json({ success: false, message: "Server Error" });
    }
});

// ডাটা দেখার রুট (ঐচ্ছিক)
app.get('/all-items', (req, res) => {
    const fileData = fs.readFileSync(DATA_FILE, 'utf8');
    res.json(JSON.parse(fileData));
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));