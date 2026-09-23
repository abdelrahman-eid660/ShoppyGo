import { ApplicationConfig, provideBrowserGlobalErrorListeners, isDevMode, provideAppInitializer, inject } from '@angular/core';
import { provideRouter , withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideTransloco } from '@jsverse/transloco';
import { TranslocoHttpLoader } from './core/i18n/transloco-loader';
import { LanguageService } from './core/service/language.service';
import { ThemeService } from './core/service/theme.service';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { APIInterceptor } from './core/interceptor/api.interceptor';
import { SocialAuthServiceConfig , SOCIAL_AUTH_CONFIG , GoogleLoginProvider } from '@abacritt/angularx-social-login';
import { environment } from './shared/environments/environment';
import { MessageService } from 'primeng/api';
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes , withInMemoryScrolling({
      scrollPositionRestoration : 'enabled',
      anchorScrolling : 'enabled'
    })),
    provideHttpClient(withInterceptors([
      APIInterceptor
    ])),
    provideTransloco({
      config: {
        availableLangs: ['ar', 'en'],
        defaultLang: 'ar',
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: !isDevMode(),
      },
      loader: TranslocoHttpLoader,
    }),
    provideAppInitializer(()=>{
      const languageService = inject(LanguageService)
      const themeService = inject(ThemeService)
      themeService.initialize()
      return languageService.initLanguage()
    }),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
      license: 'eyJpZCI6IjEyNDM0MGVhLTUwNDQtNDlmYS05MDhkLWJkOWEzZmFlZDQwNiIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3ODc3NTU5NDgsImV4cCI6MTgxOTI5MTk0OH0.ULFJVV2fuNJF9MVQS8adX8200y2bJrG1OuhzQ_jXvcv-zdS3r3WhvcNl6XUyIpfiwBvrIsK4_FY8hr9zbe55CA'
    }),
    {
      provide : SOCIAL_AUTH_CONFIG,
      useValue : {
        autoLogin : false,
        providers : [
          {
            id : GoogleLoginProvider.PROVIDER_ID,
            provider : new GoogleLoginProvider(environment.googleClientId || '')
          }
        ],
        onError: (err : Error)=> console.error(err)
      } as SocialAuthServiceConfig
    },
    MessageService
  ],
};
