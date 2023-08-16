import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../../services/gifs.service';

@Component({
  selector: 'gifs-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  @ViewChild('txtTagInput')
  tagInput!: ElementRef<HTMLInputElement>;

  constructor( private gifsService: GifsService) {}

  // searchTag( tag: string ) { ; pero en el html iría: (keyup.enter)="searchTag( txtTagInput.value )"
  searchTag() {
    const newTag = this.tagInput.nativeElement.value;
    this.gifsService.searchTag( newTag );
    this.tagInput.nativeElement.value = '';
  }
}
