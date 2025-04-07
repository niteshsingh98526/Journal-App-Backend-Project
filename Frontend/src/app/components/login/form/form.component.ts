import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IntegrationService } from '../../../services/integration.service';
import { LoginRequest } from '../../../model/login-request';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent {

  constructor(private integration: IntegrationService) {}

  // ✅ FormGroup with Validation
  userForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required]), // Email validation added
    password: new FormControl('', [Validators.required, Validators.minLength(5)]) // Min length validation added
  });

  router = inject(Router);
  request: LoginRequest = new LoginRequest();
  submitted = false;

  getFormControl(controlName: string) {
    return this.userForm.get(controlName);
  }

  yesLogin() {
  this.submitted = true;

  if (this.userForm.invalid) {
    return;
  }

  this.request.userName = this.userForm.value.userName;
  this.request.password = this.userForm.value.password;

  this.integration.doLogin(this.request).subscribe(
    (res) => {
      console.log(res);
      if (res.token != null) {
        alert("✅ User login successful!" + res.token);
        const jwtToken=res.token;
        localStorage.setItem('jwt', jwtToken);
        this.router.navigateByUrl('dashboard')
      } else {
        alert("❌ User credentials are incorrect!");
      }
    },
    (error) => {
      alert("❌ No user credentials are inputed!");
    }
  );
}

navigateToRegister() {
  this.router.navigate(['/register']); // Redirects to Registration Page
}

navigateToAdminLogin() {
  this.router.navigate(['/admin-login']); // Redirects to Admin Login Page
}

}
