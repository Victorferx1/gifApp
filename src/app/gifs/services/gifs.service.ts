import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Gif, SearchResponse } from '../interfaces/gifs.interfaces';
import { ThisReceiver } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  gifList: Gif[] = [];

  private _tagsHistory: string[] = []
  private apiKey: string = 'zA9gwfQXD8snmwZCVtJPlvfp60oa8TLM';
  private serviceUrl: string = 'https://api.giphy.com/v1/gifs';

  constructor( private http: HttpClient ) { 
    this.loadLocalStorage();
  }

  get tagsHistory() {
    return [...this._tagsHistory];
  }

  organizeHistory( tag: string ) {
    tag = tag.toLowerCase();
    // si existe el tag, quita del listado
    if (this._tagsHistory.includes(tag)) {
      this._tagsHistory = this._tagsHistory.filter( x => x !== tag );
    }
    // inserta el tag al inicio
    this._tagsHistory.unshift( tag );
    // solo se muestra los primeros 10
    this._tagsHistory = this._tagsHistory.splice(0, 10);
    this.saveLocalStorage();
  }

  saveLocalStorage(): void{
    localStorage.setItem('history', JSON.stringify( this._tagsHistory ));
  }

  loadLocalStorage(): void {
    if ( !localStorage.getItem('history') ) return;
    this._tagsHistory = JSON.parse( localStorage.getItem('history')! );
    this.searchTag( this._tagsHistory[0] );
  }

  searchTag( tag: string ): void {
    if (tag.length === 0) return;
    this.organizeHistory( tag );

    const params = new HttpParams()
      .set('api_key', this.apiKey )
      .set('limit', '10' )
      .set('q', tag );

    this.http.get<SearchResponse>(`${this.serviceUrl}/search`, { params })
      .subscribe(resp => {
        this.gifList = resp.data;
        console.log(resp);
      });


  }
}
