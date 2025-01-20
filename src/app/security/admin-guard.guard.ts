import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuardGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const roles = JSON.parse(localStorage.getItem('roles') || '[]');

  if (roles.includes('ROLE_ADMIN')) {
    return true;
  }

  return router.createUrlTree(['/dashboard']);
};
