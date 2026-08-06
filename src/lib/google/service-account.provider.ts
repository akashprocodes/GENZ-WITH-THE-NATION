import { google, Auth } from 'googleapis';
import { env } from '@/lib/config/env';
import { GOOGLE_CONSTANTS } from '@/lib/config/constants';
import { IAuthProvider } from '@/types/provider.types';
import { logger } from '@/utils/logger';
import { AuthenticationError } from '@/utils/errors';

export class ServiceAccountAuthenticationProvider implements IAuthProvider {
  private authClientInstance: Auth.JWT | null = null;

  public getClient(): Auth.JWT {
    try {
      if (!this.authClientInstance) {
        logger.info('Initializing Google Service Account JWT Client');
        
        if (!env.GOOGLE_CLIENT_EMAIL || !env.GOOGLE_PRIVATE_KEY) {
          throw new Error('Missing Service Account credentials');
        }

        this.authClientInstance = new google.auth.JWT({
          email: env.GOOGLE_CLIENT_EMAIL,
          key: env.GOOGLE_PRIVATE_KEY,
          scopes: GOOGLE_CONSTANTS.SCOPES,
        });
      }
      return this.authClientInstance;
    } catch (error) {
      logger.error('Failed to initialize Service Account Client', error);
      throw new AuthenticationError('Storage provider authentication failed due to configuration errors.');
    }
  }
}
