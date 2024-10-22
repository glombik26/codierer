// app.component.ts
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { MatAutocompleteSelectedEvent, MatAutocompleteModule } from '@angular/material/autocomplete';
import { Komponente } from './model/komponente.model';
import {
  OPTIONS_1,
  OPTIONS_2,
  OPTIONS_3_101,
  OPTIONS_3_111_121,
  OPTIONS_4_101,
  OPTIONS_4_111_121
} from './config/component.config';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AsyncPipe, CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatListModule,
    CommonModule,
    NgIf,
    NgFor
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  // FormControls für die vier Eingabefelder mit korrekter Typisierung
  inputOption1 = new FormControl<string | Komponente | null>('');
  userSelectedOption1: Komponente | null = null;

  inputOption2 = new FormControl<string | Komponente | null>('');
  userSelectedOption2: Komponente | null = null;

  inputOption3 = new FormControl<string | Komponente | null>('');
  userSelectedOption3: Komponente | null = null;

  inputOption4 = new FormControl<string | Komponente | null>('');
  userSelectedOption4: Komponente | null = null;

  // Liste der hinzugefügten Komponentengruppen
  komponenteGruppen: string[] = [];

  // Gefilterte Optionen als Observables
  filteredOptions1: Observable<Komponente[]>;
  filteredOptions2: Observable<Komponente[]>;
  filteredOptions3: Observable<Komponente[]>;
  filteredOptions4: Observable<Komponente[]>;

  // ViewChild Deklarationen für die Eingabefelder
  @ViewChild('input1') input1!: ElementRef<HTMLInputElement>;
  @ViewChild('input2') input2!: ElementRef<HTMLInputElement>;
  @ViewChild('input3') input3!: ElementRef<HTMLInputElement>;
  @ViewChild('input4') input4!: ElementRef<HTMLInputElement>;

  constructor() {
    // Initialisieren der gefilterten Optionen mit angepasster Typbehandlung
    this.filteredOptions1 = this.inputOption1.valueChanges.pipe(
      startWith(''),
      map(value => this.filterOptions(value, 1))
    );

    this.filteredOptions2 = this.inputOption2.valueChanges.pipe(
      startWith(''),
      map(value => this.filterOptions(value, 2))
    );

    this.filteredOptions3 = this.inputOption3.valueChanges.pipe(
      startWith(''),
      map(value => this.filterOptions(value, 3))
    );

    this.filteredOptions4 = this.inputOption4.valueChanges.pipe(
      startWith(''),
      map(value => this.filterOptions(value, 4))
    );
  }

  /**
   * Anzeige-Funktion für Autocomplete
   * Zeigt die Beschreibung der ausgewählten Komponente an.
   */
  displayFn(option: Komponente | null): string {
    return option ? option.description : '';
  }

  /**
   * Allgemeine Filterfunktion für die Autocomplete-Optionen.
   * @param value Eingabewert
   * @param index Eingabefeld-Nummer (1-4)
   * @returns Gefilterte Liste der Komponente
   */
  private filterOptions(value: string | Komponente | null, index: number): Komponente[] {
    const filterValue = typeof value === 'string' ? value.toLowerCase() : value?.code.toLowerCase() || '';
    let options: Komponente[] = [];

    switch (index) {
      case 1:
        options = OPTIONS_1;
        break;
      case 2:
        options = OPTIONS_2;
        break;
      case 3:
        if (this.userSelectedOption1?.code.startsWith('101')) {
          options = OPTIONS_3_101;
        } else {
          options = OPTIONS_3_111_121;
        }
        break;
      case 4:
        if (this.userSelectedOption1?.code.startsWith('101')) {
          options = OPTIONS_4_101;
        } else {
          options = OPTIONS_4_111_121;
        }
        break;
      default:
        options = [];
    }

    return options.filter(option =>
      option.code.toLowerCase().includes(filterValue) ||
      option.description.toLowerCase().includes(filterValue)
    );
  }

  /**
   * Event-Handler für die Auswahl einer Option aus dem Autocomplete
   * @param event Selektiertes Ereignis
   * @param inputNumber Eingabefeld-Nummer (1-4)
   */
  onOptionSelected(event: MatAutocompleteSelectedEvent, inputNumber: number): void {
    const selected = event.option.value as Komponente;
    this.setSelectedOption(selected, inputNumber);
  }

  /**
   * Hilfsfunktion, um die ausgewählte Option zu setzen
   * @param option Ausgewählte Komponente
   * @param inputNumber Eingabefeld-Nummer (1-4)
   */
  private setSelectedOption(option: Komponente, inputNumber: number): void {
    switch (inputNumber) {
      case 1:
        this.userSelectedOption1 = option;
        this.inputOption1.setValue(option.code + ' - ' + option.description, { emitEvent: false });
        break;
      case 2:
        this.userSelectedOption2 = option;
        this.inputOption2.setValue(option.code + ' - ' + option.description, { emitEvent: false });
        break;
      case 3:
        this.userSelectedOption3 = option;
        this.inputOption3.setValue(option.code + ' - ' + option.description, { emitEvent: false });
        break;
      case 4:
        this.userSelectedOption4 = option;
        this.inputOption4.setValue(option.code + ' - ' + option.description, { emitEvent: false });
        break;
      default:
        break;
    }
  }

  /**
   * Methode zum Zurücksetzen eines Eingabefeldes
   * @param inputNumber Eingabefeld-Nummer (1-4)
   */
  onReset(inputNumber: number): void {
    switch (inputNumber) {
      case 1:
        this.inputOption1.setValue(null);
        this.userSelectedOption1 = null;
        break;
      case 2:
        this.inputOption2.setValue(null);
        this.userSelectedOption2 = null;
        break;
      case 3:
        this.inputOption3.setValue(null);
        this.userSelectedOption3 = null;
        break;
      case 4:
        this.inputOption4.setValue(null);
        this.userSelectedOption4 = null;
        break;
      default:
        break;
    }
  }

  /**
   * Methode zum Hinzufügen einer Komponentengruppe zur Liste
   */
  addKomponente(): void {
    // Überprüfen, ob alle vier Komponenten ausgewählt sind
    if (
      this.userSelectedOption1 &&
      this.userSelectedOption2 &&
      this.userSelectedOption3 &&
      this.userSelectedOption4
    ) {
      // Hinzufügen der Gruppe zur Liste
      const gruppenCode = `${this.userSelectedOption1.code}.${this.userSelectedOption2.code}.${this.userSelectedOption3.code}.${this.userSelectedOption4.code}`;
      this.komponenteGruppen.push(gruppenCode);

      // Eingabefelder zurücksetzen
      this.onReset(1);
      this.onReset(2);
      this.onReset(3);
      this.onReset(4);
    }
  }

  /**
   * trackBy Funktion für *ngFor bei den Autocomplete-Optionen
   * @param index Index der Option
   * @param option Komponente
   * @returns Eindeutiger Identifikator
   */
  trackByCode(index: number, option: Komponente): string {
    return option.code;
  }

  /**
   * trackBy Funktion für *ngFor bei der Liste der Komponentengruppen
   * @param index Index der Gruppe
   * @param gruppe Gruppencode
   * @returns Index als eindeutiger Identifikator
   */
  trackByIndex(index: number, gruppe: string): number {
    return index;
  }

  /**
   * Methode, um zu überprüfen, ob alle vier Komponenten ausgewählt sind
   * @returns Boolean
   */
  canAddKomponente(): boolean {
    return (
      !!this.userSelectedOption1 &&
      !!this.userSelectedOption2 &&
      !!this.userSelectedOption3 &&
      !!this.userSelectedOption4
    );
  }

  /**
   * Methode zum Entfernen einer Komponentengruppe
   * @param index Index der Gruppe in der Liste
   */
  removeKomponente(index: number): void {
    if (index >= 0 && index < this.komponenteGruppen.length) {
      this.komponenteGruppen.splice(index, 1);
    }
  }

  /**
   * Methode zum Behandeln der Enter-Taste
   * @param event KeyboardEvent
   * @param inputNumber Eingabefeld-Nummer (1-4)
   */
  onKeydown(event: KeyboardEvent, inputNumber: number): void {
    if (event.key === 'Enter') {
      event.preventDefault(); // Verhindert das Standardverhalten (z.B. Formularabsenden)

      // Holen der gefilterten Optionen basierend auf der Eingabennummer
      const filteredOptions = this.getFilteredOptions(inputNumber);

      if (filteredOptions.length > 0) {
        const firstOption = filteredOptions[0];
        this.setSelectedOption(firstOption, inputNumber);

        // Fokus auf das nächste Eingabefeld setzen nach kurzer Verzögerung
        const nextInputNumber = inputNumber + 1;
        if (nextInputNumber <= 4) {
          setTimeout(() => { // Asynchroner Fokuswechsel
            let nextInput: ElementRef<HTMLInputElement> | undefined;

            switch (nextInputNumber) {
              case 2:
                nextInput = this.input2;
                break;
              case 3:
                nextInput = this.input3;
                break;
              case 4:
                nextInput = this.input4;
                break;
              default:
                nextInput = undefined;
            }

            if (nextInput) {
              nextInput.nativeElement.focus();
            } else {
              console.warn(`Eingabefeld ${nextInputNumber} existiert nicht oder ist noch nicht gerendert.`);
            }
          }, 100); // Verzögerung von 100ms
        }
      }
    }
  }

  /**
   * Hilfsfunktion, um die gefilterten Optionen basierend auf der Eingabennummer zu erhalten
   * @param inputNumber Eingabefeld-Nummer (1-4)
   * @returns Gefilterte Liste der Komponente
   */
  private getFilteredOptions(inputNumber: number): Komponente[] {
    let value: string | Komponente | null;
    switch (inputNumber) {
      case 1:
        value = this.inputOption1.value;
        break;
      case 2:
        value = this.inputOption2.value;
        break;
      case 3:
        value = this.inputOption3.value;
        break;
      case 4:
        value = this.inputOption4.value;
        break;
      default:
        value = '';
    }
    return this.filterOptions(value, inputNumber);
  }
}
