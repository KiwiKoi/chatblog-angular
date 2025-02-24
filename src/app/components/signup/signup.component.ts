import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.component.html',
    styleUrls: ['./signup.component.scss'],
    standalone: false
})
export class SignupComponent implements OnInit {
  signupForm!: FormGroup;
  firebaseErrorMessage!: string;

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {
    this.firebaseErrorMessage = '';
  }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });
  }

  signup() {
    if (this.signupForm.invalid) {
      return;
    }

    this.authService
      .signupUser(this.signupForm.value)
      .then((result) => {
        if (result == null) {
          this.router.navigate(['/signup']);
        } else if (result.isValid == false) {
          this.firebaseErrorMessage = result.message;
        } else {
          this.router.navigate(['/dashboard']);
        }
      })
      .catch(() => {});
  }
}
