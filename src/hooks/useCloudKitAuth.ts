/**
 * CloudKit authentication hook for Opalite Web
 */

import { useState, useEffect, useCallback } from 'react';
import type { CloudKitAuthState } from '../types/opalite';
import { setupAuth, signIn as cloudKitSignIn, signOut as cloudKitSignOut } from '../services/cloudkit';

export function useCloudKitAuth() {
  const [authState, setAuthState] = useState<CloudKitAuthState>({
    isAuthenticated: false,
    isLoading: true,
    user: undefined,
    error: undefined,
  });

  // Check authentication status on mount
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = useCallback(async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: undefined }));

    try {
      const userIdentity = await setupAuth();

      if (userIdentity) {
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          user: {
            userRecordName: userIdentity.userRecordName,
            displayName: userIdentity.nameComponents
              ? `${userIdentity.nameComponents.givenName ?? ''} ${userIdentity.nameComponents.familyName ?? ''}`.trim()
              : undefined,
          },
          error: undefined,
        });
      } else {
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          user: undefined,
          error: undefined,
        });
      }
    } catch (error) {
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: undefined,
        error: error instanceof Error ? error.message : 'Authentication check failed',
      });
    }
  }, []);

  const signIn = useCallback(async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true, error: undefined }));

    try {
      const userIdentity = await cloudKitSignIn();

      if (userIdentity) {
        setAuthState({
          isAuthenticated: true,
          isLoading: false,
          user: {
            userRecordName: userIdentity.userRecordName,
            displayName: userIdentity.nameComponents
              ? `${userIdentity.nameComponents.givenName ?? ''} ${userIdentity.nameComponents.familyName ?? ''}`.trim()
              : undefined,
          },
          error: undefined,
        });
      } else {
        setAuthState({
          isAuthenticated: false,
          isLoading: false,
          user: undefined,
          error: 'Sign in was cancelled or failed',
        });
      }
    } catch (error) {
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: undefined,
        error: error instanceof Error ? error.message : 'Sign in failed',
      });
    }
  }, []);

  const signOut = useCallback(async () => {
    setAuthState((prev) => ({ ...prev, isLoading: true }));

    try {
      await cloudKitSignOut();
      setAuthState({
        isAuthenticated: false,
        isLoading: false,
        user: undefined,
        error: undefined,
      });
    } catch (error) {
      setAuthState((prev) => ({
        ...prev,
        isLoading: false,
        error: error instanceof Error ? error.message : 'Sign out failed',
      }));
    }
  }, []);

  return {
    authState,
    signIn,
    signOut,
    checkAuth: checkAuthStatus,
  };
}
