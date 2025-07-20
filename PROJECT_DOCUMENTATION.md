<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LVA.studio™ Portal - Project Documentation</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            line-height: 1.6;
            color: #333;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            min-height: 100vh;
        }
        
        .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
            background: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            border-radius: 10px;
            margin-top: 20px;
            margin-bottom: 20px;
        }
        
        h1 {
            color: #2c3e50;
            text-align: center;
            margin-bottom: 30px;
            font-size: 2.5em;
            border-bottom: 3px solid #3498db;
            padding-bottom: 10px;
        }
        
        h2 {
            color: #34495e;
            margin-top: 30px;
            margin-bottom: 15px;
            font-size: 1.8em;
            border-left: 4px solid #3498db;
            padding-left: 15px;
        }
        
        h3 {
            color: #2c3e50;
            margin-top: 25px;
            margin-bottom: 10px;
            font-size: 1.4em;
        }
        
        h4 {
            color: #34495e;
            margin-top: 20px;
            margin-bottom: 8px;
            font-size: 1.2em;
        }
        
        p {
            margin-bottom: 15px;
            text-align: justify;
        }
        
        .highlight {
            background: linear-gradient(45deg, #f39c12, #e74c3c);
            color: white;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: center;
            font-weight: bold;
            font-size: 1.1em;
        }
        
        .success {
            background: linear-gradient(45deg, #27ae60, #2ecc71);
            color: white;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
            border-left: 5px solid #27ae60;
        }
        
        .warning {
            background: linear-gradient(45deg, #f39c12, #e67e22);
            color: white;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
            border-left: 5px solid #f39c12;
        }
        
        .error {
            background: linear-gradient(45deg, #e74c3c, #c0392b);
            color: white;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
            border-left: 5px solid #e74c3c;
        }
        
        .info {
            background: linear-gradient(45deg, #3498db, #2980b9);
            color: white;
            padding: 15px;
            border-radius: 8px;
            margin: 15px 0;
            border-left: 5px solid #3498db;
        }
        
        pre {
            background: #2c3e50;
            color: #ecf0f1;
            padding: 15px;
            border-radius: 8px;
            overflow-x: auto;
            margin: 15px 0;
            font-family: 'Courier New', monospace;
        }
        
        code {
            background: #f8f9fa;
            color: #e74c3c;
            padding: 2px 6px;
            border-radius: 4px;
            font-family: 'Courier New', monospace;
        }
        
        .file-structure {
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 20px;
            margin: 15px 0;
            font-family: 'Courier New', monospace;
        }
        
        .file-structure .folder {
            color: #3498db;
            font-weight: bold;
        }
        
        .file-structure .file {
            color: #2c3e50;
            margin-left: 20px;
        }
        
        .file-structure .comment {
            color: #7f8c8d;
            font-style: italic;
        }
        
        .step {
            background: #ecf0f1;
            border-left: 4px solid #3498db;
            padding: 15px;
            margin: 15px 0;
            border-radius: 0 8px 8px 0;
        }
        
        .step-number {
            background: #3498db;
            color: white;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            margin-right: 10px;
            font-weight: bold;
        }
        
        .grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
            margin: 20px 0;
        }
        
        .card {
            background: #f8f9fa;
            border: 1px solid #dee2e6;
            border-radius: 8px;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .card h4 {
            color: #2c3e50;
            margin-bottom: 10px;
        }
        
        .toc {
            background: #ecf0f1;
            border-radius: 8px;
            padding: 20px;
            margin: 20px 0;
        }
        
        .toc ul {
            list-style: none;
        }
        
        .toc li {
            margin: 8px 0;
        }
        
        .toc a {
            color: #3498db;
            text-decoration: none;
            font-weight: 500;
        }
        
        .toc a:hover {
            text-decoration: underline;
        }
        
        .status {
            display: inline-block;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 0.8em;
            font-weight: bold;
            margin-left: 10px;
        }
        
        .status.success {
            background: #27ae60;
            color: white;
        }
        
        .status.warning {
            background: #f39c12;
            color: white;
        }
        
        .status.error {
            background: #e74c3c;
            color: white;
        }
        
        @media (max-width: 768px) {
            .container {
                margin: 10px;
                padding: 15px;
            }
            
            h1 {
                font-size: 2em;
            }
            
            .grid {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>🚀 LVA.studio™ Portal - Project Documentation</h1>
        
        <div class="highlight">
            A modern web portal with integrated Wix Headless authentication system, featuring Google/Facebook OAuth login, user profile management, and comprehensive service platform.
        </div>

        <div class="toc">
            <h3>📋 Table of Contents</h3>
            <ul>
                <li><a href="#overview">🎯 Project Overview</a></li>
                <li><a href="#architecture">🏗️ Architecture</a></li>
                <li><a href="#components">🔧 Key Components</a></li>
                <li><a href="#authentication">🔐 Authentication Flow</a></li>
                <li><a href="#setup">⚙️ Setup Instructions</a></li>
                <li><a href="#features">✨ Key Features</a></li>
                <li><a href="#troubleshooting">🐛 Troubleshooting</a></li>
                <li><a href="#deployment">🚀 Deployment</a></li>
                <li><a href="#workflow">📋 Development Workflow</a></li>
            </ul>
        </div>

        <section id="overview">
            <h2>🎯 Project Overview</h2>
            <p>
                The LVA.studio™ Portal is a comprehensive web application that combines modern frontend design with robust backend authentication. 
                It serves as a multi-service platform offering health insurance, solar services, contracting, and design solutions, all protected 
                by a sophisticated Wix Headless authentication system.
            </p>
            
            <div class="grid">
                <div class="card">
                    <h4>Frontend <span class="status success">Vanilla JS</span></h4>
                    <p>Modern, responsive interface with epic/light themes, service cards, and smooth animations.</p>
                </div>
                <div class="card">
                    <h4>Backend <span class="status success">Node.js/Express</span></h4>
                    <p>Robust server handling OAuth flows, user management, and Wix API integration.</p>
                </div>
                <div class="card">
                    <h4>Authentication <span class="status success">Wix OAuth 2.0</span></h4>
                    <p>Secure Google/Facebook login with token management and session persistence.</p>
                </div>
                <div class="card">
                    <h4>Database <span class="status success">Wix CMS</span></h4>
                    <p>Cloud-based content management with automatic collection creation and user data storage.</p>
                </div>
            </div>
        </section>

        <section id="architecture">
            <h2>🏗️ Architecture</h2>
            
            <h3>Technology Stack</h3>
            <ul>
                <li><strong>Frontend:</strong> Vanilla JavaScript, HTML5, CSS3</li>
                <li><strong>Backend:</strong> Node.js, Express.js</li>
                <li><strong>Authentication:</strong> Wix OAuth 2.0</li>
                <li><strong>Database:</strong> Wix CMS Collections</li>
                <li><strong>Deployment:</strong> GitHub Pages (frontend) + Vercel/Heroku (backend)</li>
            </ul>

            <h3>System Architecture</h3>
            <div class="info">
                <strong>Frontend → Backend → Wix API → Wix CMS</strong><br>
                The system follows a clean separation of concerns with the frontend handling UI, backend managing authentication, 
                and Wix providing the authentication and data storage infrastructure.
            </div>
        </section>

        <section id="components">
            <h2>🔧 Key Components</h2>
            
            <h3>Frontend Structure</h3>
            <div class="file-structure">
                <div class="folder">LVA Template/</div>
                <div class="file">index.html              # Main portal interface</div>
                <div class="folder">css/                    # Styling modules</div>
                <div class="file">├── style.css            # Core styles</div>
                <div class="file">├── epic.css             # Epic theme</div>
                <div class="file">├── light.css            # Light theme</div>
                <div class="file">├── cards.css            # Service cards</div>
                <div class="file">└── auth.css             # Authentication styles</div>
                <div class="folder">js/                     # Core functionality</div>
                <div class="file">├── auth-integration.js  # Wix OAuth frontend</div>
                <div class="file">├── main.js             # App initialization</div>
                <div class="file">├── portal.js           # Portal navigation</div>
                <div class="file">├── cards.js            # Service card system</div>
                <div class="file">├── health-insurance.js # Health services</div>
                <div class="file">├── solar.js            # Solar services</div>
                <div class="file">├── contracting.js      # Contracting services</div>
                <div class="file">└── theme.js            # Theme management</div>
                <div class="folder">media/                 # Assets</div>
                <div class="file">└── background.mp4       # Background video</div>
            </div>

            <h3>Backend Structure</h3>
            <div class="file-structure">
                <div class="folder">wix-headless-auth/</div>
                <div class="file">server.js              # Express server</div>
                <div class="file">package.json           # Dependencies</div>
                <div class="file">vercel.json           # Deployment config</div>
                <div class="folder">src/services/</div>
                <div class="file">├── authService.js     # Wix API integration</div>
                <div class="file">└── profileService.js  # User management</div>
                <div class="folder">src/components/</div>
                <div class="file">├── LoginForm.jsx      # Login component</div>
                <div class="file">├── Dashboard.jsx      # User dashboard</div>
                <div class="file">└── UserProfile.jsx    # Profile management</div>
            </div>
        </section>

        <section id="authentication">
            <h2>🔐 Authentication Flow</h2>
            
            <div class="step">
                <span class="step-number">1</span>
                <strong>User clicks login</strong> → Frontend calls backend for OAuth URL
            </div>
            
            <div class="step">
                <span class="step-number">2</span>
                <strong>OAuth popup opens</strong> → Wix handles Google/Facebook authentication
            </div>
            
            <div class="step">
                <span class="step-number">3</span>
                <strong>Callback processing</strong> → Backend exchanges code for tokens
            </div>
            
            <div class="step">
                <span class="step-number">4</span>
                <strong>User creation</strong> → Backend creates/updates user in Wix CMS
            </div>
            
            <div class="step">
                <span class="step-number">5</span>
                <strong>Session management</strong> → Frontend stores tokens, updates UI
            </div>

            <div class="success">
                <strong>Security Features:</strong> Token-based authentication, secure OAuth flow, 
                automatic session management, and user data persistence in Wix CMS.
            </div>
        </section>

        <section id="setup">
            <h2>⚙️ Setup Instructions</h2>
            
            <h3>Prerequisites</h3>
            <ul>
                <li>Node.js 16+</li>
                <li>Wix Developer Account</li>
                <li>Google/Facebook OAuth apps configured</li>
                <li>Git for version control</li>
            </ul>

            <h3>Environment Setup</h3>
            <pre><code># Clone repository
git clone https://github.com/staylegitlonewolf/LVA.studio-Template.git
cd LVA.studio-Template

# Backend setup
cd wix-headless-auth
npm install
cp env.example .env
# Configure .env with Wix API credentials

# Frontend setup (from root)
npm install</code></pre>

            <h3>Configuration Steps</h3>
            <div class="step">
                <span class="step-number">1</span>
                <strong>Wix OAuth App:</strong> Set redirect URI to <code>http://localhost:3001/auth-callback</code>
            </div>
            
            <div class="step">
                <span class="step-number">2</span>
                <strong>Environment Variables:</strong> Configure Wix API keys in <code>wix-headless-auth/.env</code>
            </div>
            
            <div class="step">
                <span class="step-number">3</span>
                <strong>CMS Collection:</strong> Backend auto-creates "Main" collection if missing
            </div>

            <h3>Running Locally</h3>
            <pre><code># Terminal 1: Backend (OAuth server)
cd wix-headless-auth
npm run server

# Terminal 2: Frontend (local server)
node serve-local.js

# Access: http://localhost:8080</code></pre>
        </section>

        <section id="features">
            <h2>✨ Key Features</h2>
            
            <div class="grid">
                <div class="card">
                    <h4>🔐 Authentication System</h4>
                    <ul>
                        <li>✅ Wix OAuth 2.0 integration</li>
                        <li>✅ Google/Facebook login providers</li>
                        <li>✅ User profile management</li>
                        <li>✅ Session persistence</li>
                        <li>✅ Secure token handling</li>
                    </ul>
                </div>
                
                <div class="card">
                    <h4>🎨 Portal Interface</h4>
                    <ul>
                        <li>✅ Modern responsive design</li>
                        <li>✅ Epic/light theme switching</li>
                        <li>✅ Service card navigation</li>
                        <li>✅ Loading animations</li>
                        <li>✅ Mobile-friendly layout</li>
                    </ul>
                </div>
                
                <div class="card">
                    <h4>🛠️ Service Modules</h4>
                    <ul>
                        <li>✅ Health Insurance portal</li>
                        <li>✅ Solar services</li>
                        <li>✅ Contracting services</li>
                        <li>✅ 3D model viewer</li>
                        <li>✅ Wix integration</li>
                        <li>✅ Partner services</li>
                    </ul>
                </div>
                
                <div class="card">
                    <h4>🔧 Development Tools</h4>
                    <ul>
                        <li>✅ Debug OAuth pages</li>
                        <li>✅ Local development servers</li>
                        <li>✅ Comprehensive error handling</li>
                        <li>✅ Fallback authentication</li>
                        <li>✅ Detailed logging</li>
                    </ul>
                </div>
            </div>
        </section>

        <section id="troubleshooting">
            <h2>🐛 Common Issues & Solutions</h2>
            
            <h3>OAuth Errors</h3>
            <div class="error">
                <strong>400 Bad Request:</strong> Check redirect URI matches Wix OAuth app settings
            </div>
            <div class="warning">
                <strong>CORS errors:</strong> Ensure backend CORS allows frontend origin
            </div>
            <div class="info">
                <strong>Ad blocker interference:</strong> Disable ad blockers for OAuth testing
            </div>

            <h3>Backend Issues</h3>
            <div class="error">
                <strong>Port 3001 in use:</strong> Kill existing process or change port
            </div>
            <div class="warning">
                <strong>Wix API errors:</strong> Verify API credentials and collection permissions
            </div>
            <div class="info">
                <strong>Module import errors:</strong> Ensure all dependencies installed
            </div>

            <h3>Frontend Issues</h3>
            <div class="error">
                <strong>Import statements:</strong> Use regular script tags, not ES6 modules
            </div>
            <div class="warning">
                <strong>404 errors:</strong> Check file paths and server configuration
            </div>
            <div class="info">
                <strong>Authentication popup:</strong> Ensure both servers running
            </div>

            <h3>Debug Tools</h3>
            <ul>
                <li><code>debug-oauth.html</code>: OAuth URL testing</li>
                <li><code>test-oauth.html</code>: Backend connectivity testing</li>
                <li><code>simple-auth.html</code>: Demo authentication fallback</li>
                <li>Browser console logging for detailed error tracking</li>
            </ul>
        </section>

        <section id="deployment">
            <h2>🚀 Deployment</h2>
            
            <h3>Backend Deployment</h3>
            <pre><code># Vercel (recommended)
cd wix-headless-auth
vercel --prod

# Update frontend backend URL to production URL</code></pre>

            <h3>Frontend Deployment</h3>
            <div class="success">
                <strong>GitHub Pages:</strong> Push to GitHub main branch - auto-deploys from 
                <code>https://staylegitlonewolf.github.io/LVA.studio-Template/</code>
            </div>

            <h3>Production Checklist</h3>
            <ul>
                <li>✅ Backend deployed and accessible</li>
                <li>✅ Frontend backend URL updated to production</li>
                <li>✅ Wix OAuth app redirect URIs updated</li>
                <li>✅ Environment variables configured</li>
                <li>✅ SSL certificates installed</li>
                <li>✅ CORS settings updated for production domains</li>
            </ul>
        </section>

        <section id="workflow">
            <h2>📋 Development Workflow</h2>
            
            <div class="step">
                <span class="step-number">1</span>
                <strong>Local development:</strong> Use local servers for testing
            </div>
            
            <div class="step">
                <span class="step-number">2</span>
                <strong>OAuth testing:</strong> Test with Wix OAuth app in development mode
            </div>
            
            <div class="step">
                <span class="step-number">3</span>
                <strong>Production deployment:</strong> Deploy backend first, then update frontend URLs
            </div>
            
            <div class="step">
                <span class="step-number">4</span>
                <strong>Error handling:</strong> Comprehensive error messages and fallback systems
            </div>

            <h3>Project Goals</h3>
            <ul>
                <li>🎯 Seamless user authentication experience</li>
                <li>🏗️ Scalable service portal architecture</li>
                <li>🎨 Modern, responsive design</li>
                <li>🔒 Secure OAuth implementation</li>
                <li>🚀 Easy deployment and maintenance</li>
            </ul>

            <h3>Support Resources</h3>
            <ul>
                <li>📖 <code>DEPLOYMENT.md</code> - Detailed setup instructions</li>
                <li>🔧 <code>OAUTH_SETUP.md</code> - Wix configuration guide</li>
                <li>🐛 Debug pages for troubleshooting</li>
                <li>📱 Browser console for detailed error messages</li>
            </ul>
        </section>

        <div class="highlight">
            <strong>🎉 This project demonstrates a complete OAuth integration with Wix Headless, 
            providing a solid foundation for building authenticated web applications with modern authentication flows.</strong>
        </div>

        <div class="info">
            <strong>📞 Need Help?</strong><br>
            Check the documentation files, use the debug tools, and monitor browser console for detailed error messages. 
            The project includes comprehensive error handling and fallback systems for a smooth development experience.
        </div>
    </div>
</body>
</html> 