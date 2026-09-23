import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-terms-conditions',
  imports: [TranslocoPipe , RouterLink],
  templateUrl: './terms-conditions.html',
  styleUrl: './terms-conditions.css',
})
export class TermsConditions {}
