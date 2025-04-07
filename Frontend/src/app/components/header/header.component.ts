import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  


  constructor(private router: Router) {}

  // ✅ Check if user is logged in
  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt');
  }

  // ✅ Logout function
  logout() {
    localStorage.removeItem('jwt'); // Remove JWT token
    this.router.navigate(['/login']); // Redirect to login page
  }



}
