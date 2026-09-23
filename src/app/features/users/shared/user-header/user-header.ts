import { Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { TranslocoPipe } from '@jsverse/transloco';
import { LanguageService } from '../../../../core/service/language.service';
import { ThemeService } from '../../../../core/service/theme.service';
import { FormsModule } from '@angular/forms';
import { SelectModule } from 'primeng/select';
import { AutoCompleteCompleteEvent, AutoCompleteModule } from 'primeng/autocomplete';
import { MegaMenuModule } from 'primeng/megamenu';
interface Command {
  label: string;
  shortcut: string;
}

@Component({
  selector: 'app-user-header',
  imports: [SelectModule, RouterLink, TranslocoPipe, FormsModule, AutoCompleteModule, MegaMenuModule, RouterLinkActive],
  templateUrl: './user-header.html',
  styleUrl: './user-header.css',
})
export class UserHeader {
  readonly translocoService = inject(LanguageService);
  readonly themeService = inject(ThemeService);
  readonly logged = signal<boolean>(false)
  selectedCommand: Command | undefined;
  filteredCommands: Command[] = [];
  commands: Command[] = [
    { label: 'New File', shortcut: '⌘N' },
    { label: 'Open File', shortcut: '⌘O' },
    { label: 'Save', shortcut: '⌘S' },
    { label: 'Save As', shortcut: '⇧⌘S' },
    { label: 'Find', shortcut: '⌘F' },
    { label: 'Replace', shortcut: '⌘H' },
    { label: 'Go to Line', shortcut: '⌘G' },
    { label: 'Toggle Sidebar', shortcut: '⌘B' },
    { label: 'Split Editor', shortcut: '⌘\\' },
    { label: 'Close Tab', shortcut: '⌘W' },
  ];
  isSearchOpen = signal<boolean>(false)
  toggleSearch(){
    this.isSearchOpen.update((s)=> !s)
  }
  search(event: AutoCompleteCompleteEvent) {
    const query = event.query.toLowerCase();
    this.filteredCommands = query
      ? this.commands.filter((cmd) => cmd.label.toLowerCase().includes(query))
      : [...this.commands];
  }
  countries: any[] | undefined;
  selectedCountry: any | undefined;
  ngOnInit() {
    this.countries = [
      { name: 'Australia', code: 'AU' },
      { name: 'Brazil', code: 'BR' },
      { name: 'China', code: 'CN' },
      { name: 'Egypt', code: 'EG' },
      { name: 'France', code: 'FR' },
      { name: 'Germany', code: 'DE' },
      { name: 'India', code: 'IN' },
      { name: 'Japan', code: 'JP' },
      { name: 'Spain', code: 'ES' },
      { name: 'United States', code: 'US' },
    ];

  }
}
