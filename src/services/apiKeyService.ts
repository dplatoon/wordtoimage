// API Key service - simplified for new backend architecture
// Server keys are now handled automatically via Supabase edge functions

export class ApiKeyService {
  static async checkServerKeyAvailability(): Promise<boolean> {
    // With Lovable Cloud, server keys are always available
    // The edge function handles authentication via Supabase
    return true;
  }
}
