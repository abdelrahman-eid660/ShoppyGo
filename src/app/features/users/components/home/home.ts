import { Component, inject } from '@angular/core';
import { TranslocoPipe } from '@jsverse/transloco';
import { LanguageService } from '../../../../core/service/language.service';
import { LangEnum } from '../../../../shared/models/global.model';

@Component({
  selector: 'app-home',
  imports: [TranslocoPipe],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {
  readonly languageService = inject(LanguageService);
  async toggleLanguage(): Promise<void> {
    const newLanguage = this.languageService.currentLanguage() === 'ar' ? 'en' : 'ar';
    await this.languageService.setLanguage(newLanguage as LangEnum);
  }
}
