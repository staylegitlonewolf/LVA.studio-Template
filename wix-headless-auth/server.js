import express from 'express';
import cors from 'cors';
import { authService } from './src/services/authService.js';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({
  origin: [
    'https://staylegitlonewolf.github.io', 
    'http://localhost:3000',
    'http://localhost:8080',
    'http://127.0.0.1:8080',
    'http://127.0.0.1:5500',
    'http://localhost:5500'
  ],
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

// Get Wix OAuth URL endpoint
app.get('/api/auth/wix-oauth-url', async (req, res) => {
  try {
    const redirectUri = `${req.protocol}://${req.get('host')}/auth-callback`;
    
    // Use a more standard OAuth flow
    const authUrl = new URL('https://www.wixapis.com/oauth2/authorize');
    authUrl.searchParams.set('client_id', 'a4452af2-5a36-41b8-80c3-446da4824e27');
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('scope', 'offline_access');
    authUrl.searchParams.set('response_type', 'code');
    authUrl.searchParams.set('state', Date.now().toString());
    
    console.log('🔗 Generated OAuth URL:', authUrl.toString());
    console.log('📍 Redirect URI:', redirectUri);
    
    res.json({ authUrl: authUrl.toString() });
  } catch (error) {
    console.error('Error generating OAuth URL:', error);
    res.status(500).json({ error: 'Failed to generate OAuth URL' });
  }
});

// Handle OAuth callback and token exchange
app.post('/api/auth/oauth-callback', async (req, res) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'Authorization code is required' });
    }

    // Exchange authorization code for access token
    const tokenResponse = await fetch('https://www.wixapis.com/oauth2/access', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'IST.eyJraWQiOiJQb3pIX2FDMiIsImFsZyI6IlJTMjU2In0.eyJkYXRhIjoie1wiaWRcIjpcIjhhNzc0MjEyLTkzMzMtNGMyYS1iNmZlLWNhM2I5ZTQyMzNkZFwiLFwiaWRlbnRpdHlcIjp7XCJ0eXBlXCI6XCJhcHBsaWNhdGlvblwiLFwiaWRcIjpcIjgzYTExMzAwLTBkODAtNDYzZi04ZWYwLTE2NGU1ZmFlZGI3OFwifSxcInRlbmFudFwiOntcInR5cGVcIjpcImFjY291bnRcIixcImlkXCI6XCJiMmY3NGI5ZC0xNjk0LTRiNWItODdmMS1kNjhlMThkOGJkMjFcIn19IiwiaWF0IjoxNzUyOTAyODgyfQ.WFUFtf8vCy08V8m4BVEidOtwy_dFjWEoUdht9CTOK5KhqFQaEflyKP55oU-HhkWXjPv2JRW8RijXRGs6gs5JfYe2Y5JkG3s3hBue4OaUhQlFHgs44-f9NBq-WgIbeVQ2EyijFVZ1Ij_0FcsAqLHtIxEvDyoTnw4ZLHGhRFniFiq-lGXq4WO5rHEMQvcD_3m06_Q-cdWG3DRcabjBTSS6NPl8xCMKso5gAoNQrHJ5bBZgvkKGIc3xL_kzG2KynUI-kRy1yGL5PztebaGKLuoFdNy7nbSLm0Kh6Z3HjIDiuzynu4C7UZD5QC_jrPnEYDxk-rJ9g86dbVsd9IxEQjZ-RQ'
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: 'a4452af2-5a36-41b8-80c3-446da4824e27',
        code: code,
        redirect_uri: `${req.protocol}://${req.get('host')}/auth-callback`
      })
    });

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text();
      console.error('Token exchange failed:', errorText);
      return res.status(400).json({ error: 'Token exchange failed' });
    }

    const tokenData = await tokenResponse.json();
    
    // Get user info using the access token
    const userResponse = await fetch('https://www.wixapis.com/members/v1/members/current', {
      headers: {
        'Authorization': `Bearer ${tokenData.access_token}`,
        'wix-site-id': '3cb2316f-a2b6-4ece-9af1-b457cb62671a'
      }
    });

    if (!userResponse.ok) {
      return res.status(400).json({ error: 'Failed to get user info' });
    }

    const userData = await userResponse.json();
    
    // Store tokens and user data
    const user = {
      id: userData.member.id,
      loginEmail: userData.member.loginEmail,
      profile: {
        firstName: userData.member.profile?.firstName || 'User',
        lastName: userData.member.profile?.lastName || 'Account'
      },
      accessToken: tokenData.access_token,
      refreshToken: tokenData.refresh_token
    };

    res.json({ 
      success: true, 
      user,
      message: 'OAuth authentication successful'
    });
    
  } catch (error) {
    console.error('OAuth callback error:', error);
    res.status(500).json({ error: 'OAuth processing failed' });
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

// Handle OAuth callback
app.get('/auth-callback', (req, res) => {
  res.sendFile('simple-auth.html', { root: '.' });
});

// Catch-all handler for React routing (must be last)
app.get('*', (req, res) => {
  res.sendFile('dist/index.html', { root: '.' });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Auth server running on port ${PORT}`);
  console.log(`🌐 Frontend URL: https://staylegitlonewolf.github.io/LVA.studio-Template/`);
  console.log(`🔗 Backend URL: https://staylegit.wixstudio.com/lvastudiot1`);
}); 