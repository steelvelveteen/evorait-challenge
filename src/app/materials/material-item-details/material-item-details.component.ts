import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModel } from '../../domain/material.interface';

@Component({
  selector: 'app-material-item-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './material-item-details.component.html',
  styleUrl: './material-item-details.component.scss',
})
export class MaterialItemDetailsComponent {
  @Input() material: MaterialModel | null = null;
}
