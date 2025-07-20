import express from 'express';
import cors from 'cors';
import { authService } from './src/services/authService.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: ['https://staylegitlonewolf.github.io', 'http://localhost:3000'],
  credentials: true
}));
app.use(express.json());

// Initialize auth service
let authServiceInitialized = false;

const initializeAuthService = async () => {
  if (!authServiceInitialized) {
    try {
      await authService.initialize();
      authServiceInitialized = true;
      console.log('✅ Auth service initialized');
    } catch (error) {
      console.error('❌ Failed to initialize auth service:', error);
      // Continue anyway - the server will still work for basic functionality
      authServiceInitialized = true;
    }
  }
};

// Initialize on startup
initializeAuthService();

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    authServiceInitialized,
    message: 'LVA Studio Auth Server is running'
  });
});

// Verify token endpoint
app.get('/api/auth/verify', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.substring(7);
    const result = await authService.verifyToken(token);
    
    if (result.success) {
      res.json(result.user);
    } else {
      res.status(401).json({ error: result.error });
    }
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login endpoint
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const result = await authService.loginUser({ email, password });
    
    if (result.success) {
      res.json({
        success: true,
        user: result.user,
        message: 'Login successful'
      });
    } else {
      res.status(401).json({ error: result.error });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Register endpoint
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, firstName, lastName } = req.body;
    
    if (!email || !password || !firstName || !lastName) {
      return res.status(400).json({ 
        error: 'Email, password, firstName, and lastName are required' 
      });
    }

    const result = await authService.registerUser({
      email,
      password,
      firstName,
      lastName
    });
    
    if (result.success) {
      res.json({
        success: true,
        user: result.member,
        message: 'Registration successful'
      });
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Logout endpoint
app.post('/api/auth/logout', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.substring(7);
      await authService.logoutUser(token);
    }
    
    res.json({ success: true, message: 'Logout successful' });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get user profile endpoint
app.get('/api/auth/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const result = await authService.getUserProfile(userId);
    
    if (result.success) {
      res.json(result.profile);
    } else {
      res.status(404).json({ error: result.error });
    }
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update user profile endpoint
app.put('/api/auth/profile/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;
    
    const result = await authService.updateUserProfile(userId, updates);
    
    if (result.success) {
      res.json(result.member);
    } else {
      res.status(400).json({ error: result.error });
    }
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Serve static files
app.use(express.static('dist'));
app.use(express.static('.'));

// Serve simple auth page for /auth route
app.get('/auth', (req, res) => {
  res.sendFile('simple-auth.html', { root: '.' });
});

// Catch-all handler for React routing
app.get('*', (req, res) => {
  res.sendFile('dist/index.html', { root: '.' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Auth server running on port ${PORT}`);
  console.log(`🌐 Frontend URL: https://staylegitlonewolf.github.io/LVA.studio-Template/`);
  console.log(`🔗 Backend URL: https://staylegit.wixstudio.com/lvastudiot1`);
}); 