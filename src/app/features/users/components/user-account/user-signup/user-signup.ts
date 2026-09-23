import { Component, computed, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { validateDTO } from '../../../../../shared/validators/class-validator';
import { SignupDTO } from '../../../../../shared/dtos/auth.dto';
import { RadioButtonModule } from 'primeng/radiobutton';
import { AuthService } from '../../../../../core/service/auth.service';
import { SelectModule } from 'primeng/select';
import { cities, countries, Icity, ICountry } from '../../../../../shared/models/global.model';
import { GoogleSigninButtonModule , SocialAuthService } from '@abacritt/angularx-social-login';
import { MessageService } from 'primeng/api';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-user-signup',
  imports: [ReactiveFormsModule , GoogleSigninButtonModule, RouterLink, TranslocoPipe, SelectModule, RadioButtonModule],
  templateUrl: './user-signup.html',
  styleUrl: './user-signup.css',
})
export class UserSignup implements OnInit {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);
  private readonly socialAuthService = inject(SocialAuthService);
  private readonly messageService = inject(MessageService);
  private readonly destroyRef = inject(DestroyRef);

  protected readonly countries = signal<ICountry[]>(countries);
  protected readonly cities = signal<Icity[]>(cities);
  protected readonly selectedCountry = signal<ICountry | null>(null);

  protected readonly filteredCities = computed(() => {
    const selected = this.selectedCountry();
    if (!selected) return [];
    const matchedCountry = this.cities().find((c: Icity) => c.country === (selected as unknown as string));
    return matchedCountry ? matchedCountry.value : [];
  });

  showPassword = signal<boolean>(false);
  showConfirmPassword = signal<boolean>(false);
  isLoading = signal<boolean>(false);

  registerForm: FormGroup = this.fb.group(
    {
      firstName: [''],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      phone: [''],
      address: this.fb.group({
        country: [''],
        governorate: [''],
        zone: [''],
        street: [''],
        postalCode: [''],
      }),
      DOB: [''],
      gender: [''],
      acceptTerms: [false, [Validators.requiredTrue]],
    },
    { validators: [validateDTO(SignupDTO)] },
  );

  ngOnInit():void {
    this.socialAuthService.authState.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next : (user)=>{
        if (user?.idToken) {
          this.isLoading.set(true)
          this.authService.post({path : 'signup-with-gmail' , body : {idToken : user.idToken}}).subscribe({
            next : ()=>{
              this.isLoading.set(false)
              this.router.navigateByUrl('/user/user-account')
            },
            error : (err)=> {
              this.isLoading.set(false)
              console.error('Signu Error:' , err)
              this.messageService.add({severity : 'error' , summary : 'Something went wrong' , detail : err.message})
            }
          })
        }
      },
      error : (err)=> {
        console.error('Google Auth Error:' , err)
        this.messageService.add({severity : 'error' , summary : 'Something went wrong' , detail : err.message})
      }
    })
  }

  togglePasswordVisibility(): void {
    this.showPassword.update((prev) => !prev);
  }

  toggleConfirmPasswordVisibility(): void {
    this.showConfirmPassword.update((prev) => !prev);
  }

  isFieldInvalid(controlPath: string): boolean {
    const control = this.registerForm.get(controlPath);
    return !!(control && control.invalid && (control.dirty || control.touched));
  }

  hasError(controlPath: string, errorName: string): boolean {
    const control = this.registerForm.get(controlPath);
    return !!(control?.hasError(errorName) && (control.dirty || control.touched));
  }

  onSubmit(): void {
    // if (this.registerForm.invalid) {
    //   this.registerForm.markAllAsTouched();
    //   return;
    // }
            this.messageService.add({ severity: 'success', summary: 'Saved successfully', detail: 'Your changes have been saved.' });

    this.isLoading.set(true);
    // API submission logic here
  }

  signUpWithGoogle(): void {

    console.log('Initiating Google OAuth Sign-Up...');
  }
}
