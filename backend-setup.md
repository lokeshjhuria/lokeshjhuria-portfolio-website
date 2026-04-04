# Backend Setup Guide

## Prerequisites
1. Install Node.js from https://nodejs.org/ (LTS version recommended)
2. Verify installation: `node --version` and `npm --version`

## Quick Setup

### 1. Install Dependencies
```bash
cd "c:\Users\hp\Downloads\ME website"
npm install
```

### 2. Start the Server
```bash
# Development mode (auto-restart on changes)
npm run dev

# Production mode
npm start
```

### 3. Access the Website
- Frontend: http://localhost:3000
- API Health Check: http://localhost:3000/api/health
- Portfolio Data: http://localhost:3000/api/portfolio

## Backend Features

### ✅ Working Endpoints

#### GET `/api/health`
- Returns server status
- Example response:
```json
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "message": "Portfolio API is running"
}
```

#### GET `/api/portfolio`
- Returns complete portfolio data
- Includes skills, contact info, social links
- Example response:
```json
{
  "name": "Lokesh Jhuria",
  "title": "Frontend Developer",
  "skills": {
    "technical": [...],
    "soft": [...]
  },
  "contact": {...},
  "social": {...}
}
```

#### POST `/api/contact`
- Handles contact form submissions
- Rate limited: 5 requests per hour per IP
- Validates name, email, message
- Returns success/error responses

### ✅ Security Features
- **Helmet.js**: HTTP security headers
- **CORS**: Cross-origin resource sharing
- **Rate Limiting**: Prevent spam and abuse
- **Input Validation**: Sanitize all inputs
- **Error Handling**: Graceful error responses

### ✅ Performance Features
- **Morgan**: Request logging
- **Compression**: Faster response times
- **Static File Serving**: Efficient file delivery
- **Environment Variables**: Secure configuration

## Configuration

### Environment Variables (.env)
```env
PORT=3000
NODE_ENV=development

# Email Configuration (optional)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=lokeshjhuria7@gmail.com
```

## Testing the Backend

### 1. Health Check
```bash
curl http://localhost:3000/api/health
```

### 2. Get Portfolio Data
```bash
curl http://localhost:3000/api/portfolio
```

### 3. Test Contact Form
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com","message":"Hello"}'
```

## Frontend Integration

The frontend is already configured to work with the backend:

- ✅ Contact form submits to `/api/contact`
- ✅ Portfolio data can be fetched from `/api/portfolio`
- ✅ Error handling and user feedback
- ✅ Loading states and validation

## Deployment Options

### Heroku
```bash
# Install Heroku CLI
heroku create
heroku config:set NODE_ENV=production
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
# Build Docker image
docker build -t lokesh-portfolio .
docker run -p 3000:3000 lokesh-portfolio
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   ```bash
   # Kill process on port 3000
   npx kill-port 3000
   # Or use different port
   PORT=3001 npm start
   ```

2. **Module not found**
   ```bash
   # Clear npm cache and reinstall
   npm cache clean --force
   rm -rf node_modules package-lock.json
   npm install
   ```

3. **Permission denied**
   ```bash
   # Run as administrator (Windows)
   # Or use different port
   PORT=8080 npm start
   ```

4. **CORS errors**
   - Ensure frontend is making requests to correct port
   - Check CORS configuration in server.js

### Logs and Debugging

Enable debug logging:
```bash
DEBUG=* npm start
```

Check server logs for errors:
```bash
npm start 2>&1 | tee server.log
```

## Production Considerations

### Security
- Use HTTPS in production
- Set strong environment variables
- Enable CORS only for trusted domains
- Implement rate limiting
- Use input validation

### Performance
- Enable gzip compression
- Use CDN for static assets
- Implement caching
- Monitor server resources

### Monitoring
- Add health check monitoring
- Log errors and metrics
- Set up alerts for downtime
- Monitor API usage

## Support

For issues:
1. Check the server logs
2. Verify Node.js installation
3. Ensure all dependencies are installed
4. Check port availability
5. Review environment configuration

The backend is fully functional and ready to use once Node.js is installed!
