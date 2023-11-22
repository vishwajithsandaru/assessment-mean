import { NgModule } from '@angular/core';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';
import {MatDividerModule} from '@angular/material/divider';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';

const material = [MatProgressBarModule, MatButtonModule, MatDividerModule, MatCardModule, MatInputModule, MatFormFieldModule, MatIconModule]; 



@NgModule({
  exports: [
    material
  ],
  imports: [
    material
  ]
})
export class MaterialKitModule { }
