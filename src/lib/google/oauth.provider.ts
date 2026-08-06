import { google, Auth } from 'googleapis';
import { env } from '@/lib/config/env';
import { IAuthProvider } from '@/types/provider.types';
import { logger } from '@/utils/logger';
import { AuthenticationError } from '@/utils/errors';

export class OAuthAuthenticationProvider implements IAuthProvider {
  private authClientInstance: Auth.OAuth2Client | null = null;

  public getClient(): Auth.OAuth2Client {
    try {
      if (!this.authClientInstance) {
        logger.info('Initializing Google OAuth2 Client');
        
        if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET || !env.GOOGLE_REFRESH_TOKEN) {
          throw new Error('Missing OAuth credentials');
        }

        this.authClientInstance = new google.auth.OAuth2(
          env.GOOGLE_CLIENT_ID,
          env.GOOGLE_CLIENT_SECRET
        );
        this.authClientInstance.setCredentials({
          refresh_token: env.GOOGLE_REFRESH_TOKEN
        });
      }
      return this.authClientInstance;
    } catch (error) {
      logger.error('Failed to initialize OAuth Client', error);
      throw new AuthenticationError('Storage provider authentication failed due to OAuth configuration errors.');
    }
  }
}
