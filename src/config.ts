// Environment-specific configurations
const env = process.env.NODE_ENV || 'development';

interface Config {
  env: string;
  port: number;
  apiUrl: string;
  databaseUrl: string;
  jwtSecret: string;
  googleAnalytics: {
    clientEmail: string;
    privateKey: string;
    viewId: string;
  };
  linkedin: {
    clientId: string;
    clientSecret: string;
    accessToken: string;
  };
  facebook: {
    accessToken: string;
    pageId: string;
  };
  instagram: {
    accessToken: string;
    businessAccountId: string;
  };
  twitter: {
    bearerToken: string;
    userId: string;
  };
}

const config: Config = {
  env,
  port: Number(process.env.PORT) || 3001,
  apiUrl: process.env.API_URL || 'http://localhost:3001',
  databaseUrl: process.env.DATABASE_URL || 'postgresql://user:password@localhost:5432/galileo',
  jwtSecret: process.env.JWT_SECRET || 'your-secret-key',
  googleAnalytics: {
    clientEmail: process.env.GOOGLE_CLIENT_EMAIL || '',
    privateKey: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n') || '',
    viewId: process.env.GA_VIEW_ID || '',
  },
  linkedin: {
    clientId: process.env.LINKEDIN_CLIENT_ID || '',
    clientSecret: process.env.LINKEDIN_CLIENT_SECRET || '',
    accessToken: process.env.LINKEDIN_ACCESS_TOKEN || '',
  },
  facebook: {
    accessToken: process.env.FACEBOOK_ACCESS_TOKEN || '',
    pageId: process.env.FACEBOOK_PAGE_ID || '',
  },
  instagram: {
    accessToken: process.env.INSTAGRAM_ACCESS_TOKEN || '',
    businessAccountId: process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID || '',
  },
  twitter: {
    bearerToken: process.env.TWITTER_BEARER_TOKEN || '',
    userId: process.env.TWITTER_USER_ID || '',
  },
};

console.log('Loaded environment variables:');
console.log('Facebook Access Token:', config.facebook.accessToken ? 'Set' : 'Not set');
console.log('Twitter Bearer Token:', config.twitter.bearerToken ? 'Set' : 'Not set');
console.log('LinkedIn Access Token:', config.linkedin.accessToken ? 'Set' : 'Not set');
console.log('Instagram Access Token:', config.instagram.accessToken ? 'Set' : 'Not set');
console.log('Google Analytics Client Email:', config.googleAnalytics.clientEmail ? 'Set' : 'Not set');

export default config;
