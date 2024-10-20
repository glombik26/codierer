import {Component, ElementRef, ViewChild} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {MatCardModule} from '@angular/material/card';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AsyncPipe} from '@angular/common';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

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
    MatButtonModule
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'codierer';
  
  @ViewChild('input') input?: ElementRef<HTMLInputElement>;
  @ViewChild('input2') input2?: ElementRef<HTMLInputElement>;
  @ViewChild('input3') input3?: ElementRef<HTMLInputElement>;
  @ViewChild('input4') input4?: ElementRef<HTMLInputElement>;
  myControl = new FormControl('');
  myControl2 = new FormControl('');
  myControl3 = new FormControl('');
  myControl4 = new FormControl('');
  options: string[] = [
    '101 Rohr',
    '111 Rohr mit MW-Matten auf Draht',
    '121 Rohr mit MW-Schalen'
  ];  
  options2: string[] = [
    '04 Mantelumfang bis 0,40', 
    '05 Mantelumfang bis 0,50', 
    '06 Mantelumfang bis 0,60', 
    '07 Mantelumfang bis 0,70',
    '08 Mantelumfang bis 0,80',
    '09 Mantelumfang bis 0,90',
    '10 Mantelumfang bis 1,00',
    '11 Mantelumfang bis 1,10',
    '12 Mantelumfang bis 1,20',
    '13 Mantelumfang bis 1,30',
    '14 Mantelumfang bis 1,40',
    '15 Mantelumfang bis 1,50',
    '99 Mantelumfang über 1,50'
  ];
  options3_101: string[] = [
    '11 AZ-Blech an',
    '12 AZ-Blech herst. + an',
    '13 AZ-Blech ab',
    '14 AZ-Blech ab +',
  ];
  options3_111_121: string[] = [
    '01 Dämmstoff an',
    '02 Dämmstoff herst. + an',
    '03 Dämmstoff ab',
    '04 Dämmstoff ab +',
    '11 AZ-Blech an',
    '12 AZ-Blech herst. + an',
    '13 AZ-Blech ab',
    '14 AZ-Blech ab +',
    '57 Alu-Kasch. herst. + an',
    '58 Alu-Kasch. ab'
  ];
  options4_101: string[] = [
    '00 keine Dämmstofflieferung'
  ];  
  options4_111_121: string[] = [
    '00 keine Dämmstofflieferung',
    '90 Dämmdicke bis 009 mm',
    '91 Dämmdicke bis 013 mm',
    '92 Dämmdicke bis 019 mm',
    '93 Dämmdicke bis 030 mm',
    '94 Dämmdicke bis 040 mm',
    '95 Dämmdicke bis 050 mm',
    '96 Dämmdicke bis 060 mm',
    '97 Dämmdicke bis 080 mm',
    '98 Dämmdicke bis 100 mm',
  ]
  filteredOptions: string[];
  filteredOptions2: string[];
  filteredOptions3: string[];
  filteredOptions4: string[];
  showResult: boolean = false;

  constructor() {
    this.filteredOptions = this.options.slice();
    this.filteredOptions2 = this.options2.slice();
    this.filteredOptions3 = this.options3_101.slice();
    this.filteredOptions4 = this.options4_101.slice();
  }

  filter(): void {
    this.filteredOptions2 = this.options2;
  }
  filter2(): void {
    const filterValue = this.input?.nativeElement.value.toLowerCase();
    switch (filterValue) {
      case '101 Rohr':
        this.filteredOptions3 = this.options3_101;
        break;
      default:
        this.filteredOptions3 = this.options3_111_121;
        break;
    }
  }
  filter3(): void {
    const filterValue = this.input?.nativeElement.value.toLowerCase();
    switch (filterValue) {
      case '101 Rohr':
        this.filteredOptions4 = this.options4_101;
        break;
      default:
        this.filteredOptions4 = this.options4_111_121;
        break;
    }
  }
  handleAdd(): void {
    this.showResult = true;
  }
}
