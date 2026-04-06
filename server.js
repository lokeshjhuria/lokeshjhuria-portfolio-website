const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
            scriptSrc: ["'self'"],
            connectSrc: ["'self'"],
            frameSrc: ["'none'"],
        },
    },
}));

app.use(cors({
    origin: process.env.NODE_ENV === 'production' 
        ? ['https://yourdomain.com'] 
        : ['http://localhost:3000', 'http://127.0.0.1:3000'],
    credentials: true
}));

app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: { error: 'Too many requests from this IP, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Contact form rate limiting (stricter)
const contactLimiter = rateLimit({
    windowMs: 60 * 60 * 1000, // 1 hour
    max: 5, // limit each IP to 5 contact requests per hour
    message: { error: 'Too many contact form submissions, please try again later.' },
    standardHeaders: true,
    legacyHeaders: false,
});

// Apply rate limiting to API routes
app.use('/api/', limiter);

// Serve static files
app.use(express.static(path.join(__dirname)));

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// API Routes
app.get('/api/health', (req, res) => {
    try {
        res.json({ 
            status: 'OK', 
            timestamp: new Date().toISOString(),
            message: 'Portfolio API is running',
            uptime: process.uptime(),
            environment: process.env.NODE_ENV || 'development'
        });
    } catch (error) {
        console.error('Health check error:', error);
        res.status(500).json({ error: 'Health check failed' });
    }
});

// Get portfolio data
app.get('/api/portfolio', (req, res) => {
    try {
        const portfolioData = {
            name: "Lokesh Jhuria",
            title: "Frontend Developer",
            description: "Frontend Developer Intern with hands-on experience in building responsive and user-friendly web interfaces using HTML5, CSS3, and JavaScript.",
            skills: {
                technical: [
                    { name: "Frontend: HTML5, CSS3, JavaScript", level: 90 },
                    { name: "Responsive Web Design", level: 85 },
                    { name: "DOM Manipulation", level: 80 },
                    { name: "Styling: Flexbox, CSS Grid", level: 88 },
                    { name: "Tools: Git, GitHub, VS Code", level: 92 },
                    { name: "Languages: C, C++, Java", level: 75 }
                ],
                soft: [
                    { name: "Leadership", level: 95 },
                    { name: "Communication", level: 90 },
                    { name: "Problem Solving", level: 88 }
                ]
            },
            contact: {
                email: "lokeshjhuria7@gmail.com",
                phone: "+91 9257944985",
                linkedin: "https://www.linkedin.com/in/lokesh-jhuria-7256b0384/",
                instagram: "https://www.instagram.com/lokesh_j11?igsh=eWtoZG94ZHY2c2Vh"
            },
            social: {
                github: "https://github.com/lokeshjhuria",
                linkedin: "https://www.linkedin.com/in/lokesh-jhuria-7256b0384/",
                instagram: "https://www.instagram.com/lokesh_j11?igsh=eWtoZG94ZHY2c2Vh"
            },
            education: {
                institution: "International Institute of Information Technology, Pune",
                degree: "B.Tech in Information Technology",
                dates: "2025 - 2029",
                description: "Currently pursuing B.Tech in Information Technology"
            }
        };
        
        res.json(portfolioData);
    } catch (error) {
        console.error('Portfolio data error:', error);
        res.status(500).json({ error: 'Failed to fetch portfolio data' });
    }
});

// Contact form submission
app.post('/api/contact', contactLimiter, async (req, res) => {
    try {
        const { name, email, message } = req.body;
        
        // Validation
        if (!name || !email || !message) {
            return res.status(400).json({ 
                success: false, 
                error: 'All fields are required' 
            });
        }
        
        if (!isValidEmail(email)) {
            return res.status(400).json({ 
                success: false, 
                error: 'Invalid email address' 
            });
        }
        
        if (message.length < 10) {
            return res.status(400).json({ 
                success: false, 
                error: 'Message must be at least 10 characters long' 
            });
        }
        
        if (name.length < 2 || name.length > 50) {
            return res.status(400).json({ 
                success: false, 
                error: 'Name must be between 2 and 50 characters' 
            });
        }
        
        // Log the contact form submission
        console.log('Contact form submission:', {
            name,
            email,
            message: message.substring(0, 100) + '...', // Log truncated message
            timestamp: new Date().toISOString(),
            ip: req.ip
        });
        
        // In a real application, you would:
        // 1. Save to database
        // 2. Send email notification
        // 3. Send confirmation email to user
        
        // For now, we'll just return success
        res.json({ 
            success: true, 
            message: 'Message sent successfully! I\'ll get back to you soon.' 
        });
        
    } catch (error) {
        console.error('Contact form error:', error);
        res.status(500).json({ 
            success: false, 
            error: 'Server error. Please try again later.' 
        });
    }
});

// Email validation helper
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    res.status(500).json({ 
        error: 'Something went wrong!' 
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ 
        error: 'Route not found' 
    });
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
        process.exit(0);
    });
});

process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    server.close(() => {
        console.log('Process terminated');
        process.exit(0);
    });
});

// Start server
const server = app.listen(PORT, () => {
    console.log(`🚀 Portfolio server running on port ${PORT}`);
    console.log(`📱 Visit: http://localhost:${PORT}`);
    console.log(`📊 API Health: http://localhost:${PORT}/api/health`);
    console.log(`📬 Contact API: http://localhost:${PORT}/api/contact`);
    console.log(`📋 Portfolio Data: http://localhost:${PORT}/api/portfolio`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
});

module.exports = app;
