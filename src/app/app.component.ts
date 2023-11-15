import { Component, OnInit, computed, inject, effect } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MaterialModule } from './material.module';
import { DataService } from './services/http/data.service';
import { DataSet, MaterialModel } from './domain/material.interface';
import { StorageService } from './services/storage/storage.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MaterialModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataService],
})
export class AppComponent implements OnInit {
  title = 'EvoraIT';

  private router = inject(Router);
  private dataService = inject(DataService);
  private storageService = inject(StorageService);

  materials: MaterialModel[] = [];

  ngOnInit(): void {
    /**
     * Upon app initialization get the materials
     * from the json file and store the data in
     * localStorage
     */
    this.dataService.loadMaterials$.subscribe(response => {
      this.materials = response;
      this.storageService.saveToLocalStorage(this.materials);
    });
  }

  goToMaterials = (): void => {
    console.log('Take me there!');
    this.router.navigate(['materials']);
  };
}
