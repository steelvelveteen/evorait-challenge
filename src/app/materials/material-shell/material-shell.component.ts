import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-material-shell',
  standalone: true,
  templateUrl: './material-shell.component.html',
  styleUrl: './material-shell.component.scss',
  imports: [CommonModule, MatButtonModule],
})
export class MaterialShellComponent {
  private router = inject(Router);

  goToMaterialsList = (): void => {
    this.router.navigate(['materials']);
  };
}
