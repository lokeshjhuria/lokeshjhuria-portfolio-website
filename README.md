# Lokesh Jhuria Portfolio Website

A modern, animated portfolio website with backend API support built with Node.js and Express.

## Features

### Frontend
- 🎨 Modern animated design with smooth transitions
- 📱 Fully responsive layout for all devices
- ⚡ Interactive animations and effects
- 🎯 Typing animation for professional titles
- 📊 Animated skill progress bars
- 📧 Functional contact form with validation
- 🌟 Particle effects and parallax scrolling

### Backend
- 🚀 Node.js with Express server
- 🛡️ Security features (Helmet, CORS, Rate Limiting)
- 📬 Contact form API endpoint
- 📊 Portfolio data API
- 📝 Request logging with Morgan
- ⚡ Error handling middleware

## API Endpoints

### GET `/api/health`
Returns server health status.

### GET `/api/portfolio`
Returns portfolio data including skills, contact info, and social links.

### POST `/api/contact`
Handles contact form submissions.
- **Rate Limit**: 5 requests per hour per IP
- **Validation**: Name, email, and message required
- **Response**: JSON with success/error status

## Installation

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
```bash
cp .env.example .env
# Edit .env with your configuration
```

3. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

4. Open your browser and visit:
```
http://localhost:3000
```

## Project Structure

```
├── server.js              # Main server file
├── package.json           # Dependencies and scripts
├── .env                   # Environment variables
├── index.html            # Main HTML file
├── styles.css            # CSS with animations
├── script.js             # Frontend JavaScript
├── images/               # Image assets
│   └── profile-medium.jpg
└── README.md             # This file
```

## Technologies Used

### Frontend
- HTML5
- CSS3 (with animations)
- Vanilla JavaScript
- Font Awesome Icons
- Google Fonts

### Backend
- Node.js
- Express.js
- Helmet (security)
- CORS
- Morgan (logging)
- Express Rate Limit
- Nodemailer (email - optional)

## Security Features

- HTTP security headers with Helmet
- CORS protection
- Rate limiting (general: 100 req/15min, contact: 5 req/hour)
- Input validation and sanitization
- Error handling middleware

## Customization

### Update Portfolio Data
Edit the `portfolioData` object in `server.js` to update:
- Personal information
- Skills and proficiency levels
- Contact details
- Social media links

### Add Email Notifications
1. Configure email settings in `.env`
2. Uncomment and update email configuration in `server.js`
3. Add email sending logic to the contact endpoint

## Deployment

### Heroku
```bash
# Install Heroku CLI
heroku create
git add .
git commit -m "Deploy portfolio"
git push heroku main
```

### Vercel
```bash
# Install Vercel CLI
vercel
```

### Docker
```bash
docker build -t lokesh-portfolio .
docker run -p 3000:3000 lokesh-portfolio
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

MIT License - feel free to use this for your own portfolio!

## Support

For issues or questions, please contact:
- Email: lokeshjhuria7@gmail.com
- LinkedIn: https://www.linkedin.com/in/lokesh-jhuria-7256b0384/
- Instagram: https://www.instagram.com/lokesh_j11?igsh=eWtoZG94ZHY2c2Vh
