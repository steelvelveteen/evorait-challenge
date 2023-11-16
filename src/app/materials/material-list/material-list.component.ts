import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
  inject,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { DataService } from '../../services/http/data.service';
import { MaterialModel } from '../../domain/material.interface';
import { Subscription, debounceTime, distinctUntilChanged, filter, fromEvent, map } from 'rxjs';

@Component({
  selector: 'app-material-list',
  standalone: true,
  templateUrl: './material-list.component.html',
  styleUrl: './material-list.component.scss',
  imports: [CommonModule],
})
export class MaterialListComponent implements AfterViewInit {
  private dataService = inject(DataService);
  materials = this.dataService.materials;
  filter$!: Subscription;

  @Output() materialItemSelected: EventEmitter<MaterialModel> = new EventEmitter<MaterialModel>();
  @ViewChild('filterInputRef') filterInputRef: ElementRef | undefined;

  ngAfterViewInit(): void {
    this.filter$ = fromEvent(this.filterInputRef?.nativeElement, 'keyup')
      .pipe(
        map((event: any) => {
          return event.target.value.trim();
        }),
        filter((searchTerm: string) => {
          return searchTerm.length >= 2;
        }),
        debounceTime(150),
        distinctUntilChanged()
      )
      .subscribe(data => {
        console.log(data);
      });
  }

  selectedMaterial(materialItem: MaterialModel): void {
    this.materialItemSelected.emit(materialItem);
  }

  bookItem(event: Event, material: MaterialModel): void {
    event.stopPropagation();
    console.log('clicking on booking item');
    console.log(material.DescTxt);
  }

  filter(terms: string): void {
    console.log(terms);
  }
}
