import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-user-error',
  imports: [TranslocoPipe , RouterLink],
  templateUrl: './user-error.html',
  styleUrl: './user-error.css',
})
export class UserError {
  private location = inject(Location);
  goBack(): void {
    this.location.back();
  }
}
