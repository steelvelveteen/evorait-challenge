import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MaterialModule } from './material.module';
import { DataService } from './services/http/data.service';
import { DataSet } from './domain/material.interface';
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
  title = 'evorait-challenge';

  private router = inject(Router);
  private dataService = inject(DataService);
  private storageService = inject(StorageService);

  ngOnInit(): void {
    /**
     * Upon app initialization get the data set
     * from the json file and store the data in
     * localStorage
     */
    this.dataService.loadJsonDataSet().subscribe(() => {
      // this.storageService.saveToLocalStorage();
    });
  }

  goToMaterials = (): void => {
    this.router.navigate(['']);
  };
}
