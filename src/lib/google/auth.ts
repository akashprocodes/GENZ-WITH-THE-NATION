import { IAuthProvider } from '@/types/provider.types';
import { env } from '@/lib/config/env';
import { OAuthAuthenticationProvider } from './oauth.provider';
import { ServiceAccountAuthenticationProvider } from './service-account.provider';

/**
 * AuthProviderFactory
 * Implements the Strategy Pattern for Google Authentication.
 * This guarantees that DriveService and SheetsService remain completely agnostic
 * to the underlying authentication mechanism (OAuth vs Service Account).
 */
class AuthProviderFactory {
  static getProvider(): IAuthProvider {
    if (env.GOOGLE_AUTH_PROVIDER === 'oauth') {
      return new OAuthAuthenticationProvider();
    }
    return new ServiceAccountAuthenticationProvider();
  }
}

/**
 * Export a dynamically resolved instance of the provider.
 * All downstream services simply call `GoogleAuthProvider.getClient()`.
 */
export const GoogleAuthProvider = AuthProviderFactory.getProvider();
