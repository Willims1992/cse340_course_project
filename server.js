
import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

// Environment
const NODE_ENV = process.env.NODE_ENV?.toLowerCase() || 'production';
const PORT = process.env.PORT || 3000;

// Fix __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

/**
 * Middleware
 */

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// EJS setup ✅ (VERY IMPORTANT — you were missing this!)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'src/views'));

/**
 * Routes
 */
app.get('/', (req, res) => {
    res.render('home', { title: 'Home' });
});

app.get('/organizations', (req, res) => {
    res.render('organizations', { title: 'Our Partner Organizations' });
});

app.get('/projects', (req, res) => {
    res.render('projects', { title: 'Service Projects' });
});

app.get('/categories', (req, res) => {
    res.render('categories', { title: 'Service Project Categories' });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://127.0.0.1:${PORT}`);
    console.log(`Environment: ${NODE_ENV}`);
});



