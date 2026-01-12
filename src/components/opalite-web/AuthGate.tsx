/**
 * Authentication gate component
 * Wraps content that requires iCloud authentication
 */

import { Loader2, Cloud } from 'lucide-react';
import type { CloudKitAuthState } from '../../types/opalite';
import AppleSignInButton from './AppleSignInButton';

interface AuthGateProps {
  authState: CloudKitAuthState;
  onSignIn: () => void;
  onAuthChange: () => void;
  children: React.ReactNode;
}

export default function AuthGate({ authState, onSignIn, children }: AuthGateProps) {
  // Loading state
  if (authState.isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4">
        <Loader2 className="w-10 h-10 text-[#9F95AF] animate-spin mb-4" />
        <p className="text-white/60">Connecting to iCloud...</p>
      </div>
    );
  }

  // Not authenticated
  if (!authState.isAuthenticated) {
    return (
      <div className="flex flex-col items-center justify-center py-24 px-4 text-center">
        <div className="w-20 h-20 rounded-full bg-white/10 flex items-center justify-center mb-6">
          <Cloud className="w-10 h-10 text-[#9F95AF]" />
        </div>
        <h2 className="text-2xl font-bold text-white mb-3">
          Sign in to view your colors
        </h2>
        <p className="text-white/60 max-w-md mb-8">
          Connect with your Apple ID to access your Opalite colors and palettes
          stored in iCloud.
        </p>
        <AppleSignInButton onClick={onSignIn} isLoading={authState.isLoading} />
        {authState.error && (
          <p className="mt-4 text-red-400 text-sm">{authState.error}</p>
        )}
      </div>
    );
  }

  // Authenticated - render children
  return <>{children}</>;
}
