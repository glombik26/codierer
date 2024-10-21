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
  title = 'codierer';
  // Liste der hinzugefügten Komponentengruppen
  komponenteGruppen = signal<string[]>([]);

  inputOption1 = signal<string>('');
  userSelectedOption1 = signal<Komponente | null>(null);  
  isResetting1 = signal<boolean>(false); // Neue Signal-Variable
  selectedOption1 = computed(() => {
    return this.userSelectedOption1() || null;
  });
  filteredOptions1 = computed(() => {
    const value = this.inputOption1().toLowerCase();
    return OPTIONS_1.filter(option =>
      option.code.toLowerCase().includes(value)
    );
  });

  inputOption2 = signal<string>('');
  userSelectedOption2 = signal<Komponente | null>(null);
  isResetting2 = signal<boolean>(false); // Neue Signal-Variable
  selectedOption2 = computed(() => {
    return this.userSelectedOption1() || null;
  });
  filteredOptions2 = computed(() => {
    const value = this.inputOption2().toLowerCase();
    return OPTIONS_2.filter(option =>
      option.code.toLowerCase().includes(value)
    );
  });

  inputOption3 = signal<string>('');
  userSelectedOption3 = signal<Komponente | null>(null);
  isResetting3 = signal<boolean>(false); // Neue Signal-Variable
  selectedOption3 = computed(() => {
    return this.userSelectedOption1() || null;
  });
  filteredOptions3 = computed(() => {
    const value = this.inputOption3().toLowerCase();
    if(this.inputOption1().toLowerCase().startsWith('101')) {
      return OPTIONS_3_101.filter(option =>
        option.code.toLowerCase().includes(value)
      );
    }
    return OPTIONS_3_111_121.filter(option =>
      option.code.toLowerCase().includes(value)
    );
  });

  inputOption4 = signal<string>('');
  userSelectedOption4 = signal<Komponente | null>(null);
  isResetting4 = signal<boolean>(false); // Neue Signal-Variable
  selectedOption4 = computed(() => {
    return this.userSelectedOption1() || null;
  });
  filteredOptions4 = computed(() => {
    const value = this.inputOption4().toLowerCase();
    if(this.inputOption1().toLowerCase().startsWith('101')) {
      return OPTIONS_4_101.filter(option =>
        option.code.toLowerCase().includes(value)
      );
    }
    return OPTIONS_4_111_121.filter(option =>
      option.code.toLowerCase().includes(value)
    );
  });

  displayFn = (option: Komponente | null): string => {
    return option && option.description ? option.code + ' - ' + option.description : '';
  };

  onInputChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.inputOption1.set(target.value);
    this.userSelectedOption1.set(null); // Manuelle Auswahl zurücksetzen
  }

  onOptionSelected(event: { option: { value: Komponente } }): void {
    const selected = event.option.value;
    this.userSelectedOption1.set(selected);
    this.inputOption1.set(selected.code + ' - ' + selected.description);
  }

  onInputBlur(): void {
    const options = this.filteredOptions1();
    if (options.length > 0) {
      const firstOption = options[0];
      this.userSelectedOption1.set(firstOption);
      this.inputOption1.set(firstOption.code + ' - ' + firstOption.description);
    } else {
      // Optional: Eingabefeld leeren, wenn keine Optionen verfügbar sind
      this.userSelectedOption1.set(null);
      this.inputOption1.set('');
    }
  }

  onInputClick(): void {
    this.inputOption1.set('');
    this.userSelectedOption1.set(null);
  }

  onReset(): void {
    this.isResetting1.set(true); // Flag setzen
    this.inputOption1.set('');
    this.userSelectedOption1.set(null);

    // Nach einer kurzen Verzögerung das Flag zurücksetzen
    setTimeout(() => {
      this.isResetting1.set(false);
    }, 0); // 0 ms Verzögerung, um nach dem aktuellen Call Stack zu setzen
  }

  onInputChange2(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.inputOption2.set(target.value);
    this.userSelectedOption2.set(null); // Manuelle Auswahl zurücksetzen
  }

  onOptionSelected2(event: { option: { value: Komponente } }): void {
    const selected = event.option.value;
    this.userSelectedOption2.set(selected);
    this.inputOption2.set(selected.code + ' - ' + selected.description);
  }

  onInputBlur2(): void {
    const options = this.filteredOptions2();
    if (options.length > 0) {
      const firstOption = options[0];
      this.userSelectedOption2.set(firstOption);
      this.inputOption2.set(firstOption.code + ' - ' + firstOption.description);
    } else {
      // Optional: Eingabefeld leeren, wenn keine Optionen verfügbar sind
      this.userSelectedOption2.set(null);
      this.inputOption2.set('');
    }
  }

  onInputClick2(): void {
    this.inputOption2.set('');
    this.userSelectedOption2.set(null);
  }

  onReset2(): void {
    this.isResetting2.set(true); // Flag setzen
    this.inputOption2.set('');
    this.userSelectedOption2.set(null);

    // Nach einer kurzen Verzögerung das Flag zurücksetzen
    setTimeout(() => {
      this.isResetting2.set(false);
    }, 0); // 0 ms Verzögerung, um nach dem aktuellen Call Stack zu setzen
  }

  onInputChange3(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.inputOption3.set(target.value);
    this.userSelectedOption3.set(null); // Manuelle Auswahl zurücksetzen
  }

  onOptionSelected3(event: { option: { value: Komponente } }): void {
    const selected = event.option.value;
    this.userSelectedOption3.set(selected);
    this.inputOption3.set(selected.code + ' - ' + selected.description);
  }

  onInputBlur3(): void {
    const options = this.filteredOptions3();
    if (options.length > 0) {
      const firstOption = options[0];
      this.userSelectedOption3.set(firstOption);
      this.inputOption3.set(firstOption.code + ' - ' + firstOption.description);
    } else {
      // Optional: Eingabefeld leeren, wenn keine Optionen verfügbar sind
      this.userSelectedOption3.set(null);
      this.inputOption3.set('');
    }
  }

  onInputClick3(): void {
    this.inputOption3.set('');
    this.userSelectedOption3.set(null);
  }

  onReset3(): void {
    this.isResetting3.set(true); // Flag setzen
    this.inputOption3.set('');
    this.userSelectedOption3.set(null);

    // Nach einer kurzen Verzögerung das Flag zurücksetzen
    setTimeout(() => {
      this.isResetting3.set(false);
    }, 0); // 0 ms Verzögerung, um nach dem aktuellen Call Stack zu setzen
  }

  onInputChange4(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.inputOption4.set(target.value);
    this.userSelectedOption4.set(null); // Manuelle Auswahl zurücksetzen
  }

  onOptionSelected4(event: { option: { value: Komponente } }): void {
    const selected = event.option.value;
    this.userSelectedOption4.set(selected);
    this.inputOption4.set(selected.code + ' - ' + selected.description);
  }

  onInputBlur4(): void {
    const options = this.filteredOptions4();
    if (options.length > 0) {
      const firstOption = options[0];
      this.userSelectedOption4.set(firstOption);
      this.inputOption4.set(firstOption.code + ' - ' + firstOption.description);
    } else {
      // Optional: Eingabefeld leeren, wenn keine Optionen verfügbar sind
      this.userSelectedOption4.set(null);
      this.inputOption4.set('');
    }
  }

  onInputClick4(): void {
    this.inputOption4.set('');
    this.userSelectedOption4.set(null);
  }

  onReset4(): void {
    this.isResetting4.set(true); // Flag setzen
    this.inputOption4.set('');
    this.userSelectedOption4.set(null);

    // Nach einer kurzen Verzögerung das Flag zurücksetzen
    setTimeout(() => {
      this.isResetting4.set(false);
    }, 0); // 0 ms Verzögerung, um nach dem aktuellen Call Stack zu setzen
  }

  addKomponente(): void {    

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
  /*
  options2 = computed(() => { if(this.selectedOption1()) return OPTIONS_2; return undefined;});
  option2 = signal<Komponente | undefined>(undefined);
  options3 = computed(() => {
    if(this.selectedOption1()) {
      if (this.selectedOption1() === OPTION1_101_ROHR) return OPTIONS_3_101;
      return OPTIONS_3_111_121;
    }
    return undefined;
  });
  option3 = signal<Komponente | undefined>(undefined);
  options4 = computed(() => {
    if(this.selectedOption1()) {
      if (this.selectedOption1() === OPTION1_101_ROHR) return OPTIONS_4_101;
      return OPTIONS_4_111_121;
    }
    return undefined;
  });
  option4 = signal<Komponente | undefined>(undefined);
  */
}
