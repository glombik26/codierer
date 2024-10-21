import {Component, computed, effect, ElementRef, signal, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {FormControl, FormsModule, ReactiveFormsModule, ValueChangeEvent} from '@angular/forms';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { Komponente } from './model/komponente.model';
import { OPTION1_101_ROHR, OPTIONS_1, OPTIONS_2, OPTIONS_3_101, OPTIONS_3_111_121, OPTIONS_4_101, OPTIONS_4_111_121 } from './config/component.config';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet, 
    MatCardModule, 
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    AsyncPipe,
    MatIconModule,
    MatButtonModule,
    MatListModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  // Signale für die vier Eingabefelder
  inputOption1 = signal<string>('');
  userSelectedOption1 = signal<Komponente | null>(null);

  inputOption2 = signal<string>('');
  userSelectedOption2 = signal<Komponente | null>(null);

  inputOption3 = signal<string>('');
  userSelectedOption3 = signal<Komponente | null>(null);

  inputOption4 = signal<string>('');
  userSelectedOption4 = signal<Komponente | null>(null);

  // Liste der hinzugefügten Komponentengruppen
  komponenteGruppen = signal<string[]>([]);

  // Flag zur Verhinderung von unerwünschten Automatischen Updates
  isResetting = signal<boolean>(false);

  // Computed Signale für die gefilterten Optionen
  filteredOptions1 = computed(() => this.filterOptions(this.inputOption1(), 1));
  filteredOptions2 = computed(() => this.filterOptions(this.inputOption2(), 2));
  filteredOptions3 = computed(() => this.filterOptions(this.inputOption3(), 3));
  filteredOptions4 = computed(() => this.filterOptions(this.inputOption4(), 4));

  // Anzeige-Funktion für Autocomplete
  displayFn = (option: Komponente | null): string => {
    return option ? option.description : '';
  };

  // Allgemeine Filterfunktion
  private filterOptions(value: string, index: number): Komponente[] {
    const filterValue = value.toLowerCase();
    let options: Komponente[] = [];
    switch (index) {
      case 1:
        options = OPTIONS_1;
        break;
      case 2:
        options = OPTIONS_2;
        break;
      case 3:
        if (this.inputOption1().startsWith('101')) {
          options = OPTIONS_3_101;
        } else {
          options = OPTIONS_3_111_121;
        }
        break;
      case 4:
        if (this.inputOption1().startsWith('101')) {
          options = OPTIONS_4_101;
        } else {
          options = OPTIONS_4_111_121;
        }
        break;
    }
    return options.filter(option =>
      option.code.toLowerCase().includes(filterValue)
    );
  }

  // Event-Handler für Eingabeänderungen
  onInputChange(event: Event, inputNumber: number): void {
    const target = event.target as HTMLInputElement;
    switch (inputNumber) {
      case 1:
        this.inputOption1.set(target.value);
        this.userSelectedOption1.set(null);
        break;
      case 2:
        this.inputOption2.set(target.value);
        this.userSelectedOption2.set(null);
        break;
      case 3:
        this.inputOption3.set(target.value);
        this.userSelectedOption3.set(null);
        break;
      case 4:
        this.inputOption4.set(target.value);
        this.userSelectedOption4.set(null);
        break;
      default:
        break;
    }
  }

  // Event-Handler für das Verlassen des Eingabefeldes
  onInputBlur(inputNumber: number): void {
    if (this.isResetting()) {
      return;
    }

    let selectedOption: Komponente | null = null;

    switch (inputNumber) {
      case 1:
        selectedOption = this.userSelectedOption1();
        break;
      case 2:
        selectedOption = this.userSelectedOption2();
        break;
      case 3:
        selectedOption = this.userSelectedOption3();
        break;
      case 4:
        selectedOption = this.userSelectedOption4();
        break;
      default:
        break;
    }

    const filteredOptions = this.getFilteredOptions(inputNumber);

    if (!selectedOption && filteredOptions.length > 0) {
      const firstOption = filteredOptions[0];
      this.setSelectedOption(firstOption, inputNumber);
    }
  }

  // Hilfsfunktion, um die gefilterten Optionen basierend auf der Eingabennummer zu erhalten
  private getFilteredOptions(inputNumber: number): Komponente[] {
    switch (inputNumber) {
      case 1:
        return this.filteredOptions1();
      case 2:
        return this.filteredOptions2();
      case 3:
        return this.filteredOptions3();
      case 4:
        return this.filteredOptions4();
      default:
        return [];
    }
  }

  // Hilfsfunktion, um die ausgewählte Option zu setzen
  private setSelectedOption(option: Komponente, inputNumber: number): void {
    switch (inputNumber) {
      case 1:
        this.userSelectedOption1.set(option);
        this.inputOption1.set(option.code + ' - ' + option.description);
        break;
      case 2:
        this.userSelectedOption2.set(option);
        this.inputOption2.set(option.code + ' - ' + option.description);
        break;
      case 3:
        this.userSelectedOption3.set(option);
        this.inputOption3.set(option.code + ' - ' + option.description);
        break;
      case 4:
        this.userSelectedOption4.set(option);
        this.inputOption4.set(option.code + ' - ' + option.description);
        break;
      default:
        break;
    }
  }

  // Event-Handler für die Auswahl einer Option aus dem Autocomplete
  onOptionSelected(event: { option: { value: Komponente } }, inputNumber: number): void {
    const selected = event.option.value;
    this.setSelectedOption(selected, inputNumber);
  }

  // Methode zum Zurücksetzen eines Eingabefeldes
  onReset(inputNumber: number): void {
    this.isResetting.set(true);
    switch (inputNumber) {
      case 1:
        this.inputOption1.set('');
        this.userSelectedOption1.set(null);
        break;
      case 2:
        this.inputOption2.set('');
        this.userSelectedOption2.set(null);
        break;
      case 3:
        this.inputOption3.set('');
        this.userSelectedOption3.set(null);
        break;
      case 4:
        this.inputOption4.set('');
        this.userSelectedOption4.set(null);
        break;
      default:
        break;
    }

    // Flag zurücksetzen nach dem aktuellen Call Stack
    setTimeout(() => {
      this.isResetting.set(false);
    }, 0);
  }

  // Methode zum Hinzufügen einer Komponentengruppe zur Liste
  addKomponente(): void {
    // Überprüfen, ob alle vier Komponenten ausgewählt sind
    if (
      this.userSelectedOption1() &&
      this.userSelectedOption2() &&
      this.userSelectedOption3() &&
      this.userSelectedOption4()
    ) {

      // Hinzufügen der Gruppe zur Liste mit `update`
      this.komponenteGruppen.update(gruppen => [...gruppen, this.userSelectedOption1()?.code + '.' + this.userSelectedOption2()?.code + '.' + this.userSelectedOption3()?.code + '.' + this.userSelectedOption4()?.code]);

      // Eingabefelder zurücksetzen
      this.inputOption1.set('');
      this.userSelectedOption1.set(null);
      this.inputOption2.set('');
      this.userSelectedOption2.set(null);
      this.inputOption3.set('');
      this.userSelectedOption3.set(null);
      this.inputOption4.set('');
      this.userSelectedOption4.set(null);
    }
  }

  // trackBy Funktion für *ngFor bei den Autocomplete-Optionen
  trackByCode(index: number, option: Komponente): string {
    return option.code;
  }

  // trackBy Funktion für *ngFor bei der Liste der Komponentengruppen
  trackByIndex(index: number, gruppe: string): number {
    return index;
  }

  // Methode, um zu überprüfen, ob alle vier Komponenten ausgewählt sind
  canAddKomponente(): boolean {
    return (
      !!this.userSelectedOption1() &&
      !!this.userSelectedOption2() &&
      !!this.userSelectedOption3() &&
      !!this.userSelectedOption4()
    );
  }

  // Methode zum Entfernen einer Komponentengruppe
  removeKomponente(index: number): void {
    this.komponenteGruppen.update(gruppen => gruppen.filter((_, i) => i !== index));
  }
}
