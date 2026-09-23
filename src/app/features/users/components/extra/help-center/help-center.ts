import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-help-center',
  imports: [TranslocoPipe , RouterLink],
  templateUrl: './help-center.html',
  styleUrl: './help-center.css',
})
export class HelpCenter {}
