// src/stores/auth.ts
import { writable } from 'svelte/store';

export const isAuthenticated = writable(false);

// Update auth state based on localStorage token
if (typeof window !== 'undefined') {
  const token = window.localStorage.getItem('access_token');
  console.log('token from auth js', token);
  isAuthenticated.set(!!token);  // true if token exists
}
