import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';

const material = [MatButtonModule, MatProgressSpinnerModule, MatIconModule, MatCheckboxModule];

@NgModule({
  imports: [material],
  exports: [material],
})
export class MaterialModule {}
