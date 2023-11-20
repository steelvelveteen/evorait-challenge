import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MaterialModule } from '../../material.module';

@Component({
  selector: 'app-material-shell',
  standalone: true,
  templateUrl: './material-shell.component.html',
  styleUrl: './material-shell.component.scss',
  imports: [CommonModule, MaterialModule],
})
export class MaterialShellComponent {
  private router = inject(Router);

  goToMaterialsList = (): void => {
    this.router.navigate(['materials']);
  };
}
