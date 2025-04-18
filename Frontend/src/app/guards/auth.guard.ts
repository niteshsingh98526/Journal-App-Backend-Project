import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const token = localStorage.getItem('jwt');

  if (token) {
    return true; // ✅ User is authenticated, allow access
  }

  router.navigate(['/login']);
  return false;
};
