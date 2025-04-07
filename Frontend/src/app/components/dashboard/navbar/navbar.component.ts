import { Component } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  isLoggedIn(): boolean {
    // Replace with your authentication logic
    return false;
  }

  logout(): void {
    // Replace with your logout logic
    console.log('Logged out');
  }

}
