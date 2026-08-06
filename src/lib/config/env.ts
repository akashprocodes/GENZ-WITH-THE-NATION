import { z } from 'zod';

/**
 * Environment Variable Schema
 * Validates all required variables securely at startup.
 */
const baseSchema = z.object({
  GOOGLE_AUTH_PROVIDER: z.enum(['oauth', 'service_account']).default('service_account'),
  
  // Target Resources
  GOOGLE_DRIVE_FOLDER_ID: z.string().min(1, 'Drive Folder ID is required'),
  GOOGLE_SHEET_ID: z.string().min(1, 'Sheet ID is required'),
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  
  // Service Account Auth
  GOOGLE_CLIENT_EMAIL: z.string().email('Invalid Email').optional().or(z.literal('')),
  GOOGLE_PRIVATE_KEY: z.string().optional().or(z.literal('')),
  
  // OAuth 2.0 Auth
  GOOGLE_CLIENT_ID: z.string().optional().or(z.literal('')),
  GOOGLE_CLIENT_SECRET: z.string().optional().or(z.literal('')),
  GOOGLE_REFRESH_TOKEN: z.string().optional().or(z.literal('')),
});

const envSchema = baseSchema.superRefine((data, ctx) => {
  if (data.GOOGLE_AUTH_PROVIDER === 'oauth') {
    if (!data.GOOGLE_CLIENT_ID) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "CLIENT_ID required for oauth", path: ['GOOGLE_CLIENT_ID'] });
    if (!data.GOOGLE_CLIENT_SECRET) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "CLIENT_SECRET required for oauth", path: ['GOOGLE_CLIENT_SECRET'] });
    if (!data.GOOGLE_REFRESH_TOKEN) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "REFRESH_TOKEN required for oauth", path: ['GOOGLE_REFRESH_TOKEN'] });
  } else {
    if (!data.GOOGLE_CLIENT_EMAIL) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "CLIENT_EMAIL required for service_account", path: ['GOOGLE_CLIENT_EMAIL'] });
    if (!data.GOOGLE_PRIVATE_KEY) ctx.addIssue({ code: z.ZodIssueCode.custom, message: "PRIVATE_KEY required for service_account", path: ['GOOGLE_PRIVATE_KEY'] });
  }
});

// Safely parse the environment variables
const _env = envSchema.safeParse({
  GOOGLE_AUTH_PROVIDER: process.env.GOOGLE_AUTH_PROVIDER,
  GOOGLE_CLIENT_EMAIL: process.env.GOOGLE_CLIENT_EMAIL,
  GOOGLE_PRIVATE_KEY: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_REFRESH_TOKEN: process.env.GOOGLE_REFRESH_TOKEN,
  GOOGLE_DRIVE_FOLDER_ID: process.env.GOOGLE_DRIVE_FOLDER_ID,
  GOOGLE_SHEET_ID: process.env.GOOGLE_SHEET_ID,
  NODE_ENV: process.env.NODE_ENV,
});

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.format());
  throw new Error('Invalid environment variables');
}

export const env = _env.data as any; // Cast safely since superRefine guarantees required fields based on discriminator
