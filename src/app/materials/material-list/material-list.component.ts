import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/http/data.service';

@Component({
  selector: 'app-material-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.scss',
})
export class MaterialListComponent {
  private dataService = inject(DataService);

  materials = this.dataService.materials;
}
