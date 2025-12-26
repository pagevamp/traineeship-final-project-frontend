export {};

declare global {
  interface CustomJwtSessionClaims {
    metadata: {
      onboardingComplete?: boolean;
      contactNumber: string;
      primaryLocation?: string;
    };
  }
}
