import { HttpInterceptorFn } from '@angular/common/http';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('jwt');
  console.log('JWT Token in Interceptor:', token); // Debugging

  if (token && req.url.startsWith('http://localhost:8080/')) {
    req = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
  }

  console.log('Modified Request:', req); // Debugging
  return next(req);
};
