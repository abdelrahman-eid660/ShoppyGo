import { Component } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-terms-of-use',
  imports: [TranslocoPipe],
  templateUrl: './terms-of-use.html',
  styleUrl: './terms-of-use.css',
})
export class TermsOfUse {}
