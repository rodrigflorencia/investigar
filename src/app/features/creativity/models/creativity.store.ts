import { Injectable, signal } from '@angular/core';
import { Element } from './creativity.models';

@Injectable({
  providedIn: 'root'
})
export class CreativityStore {

  private readonly _selectedElement = signal<Element | null>(null);
  readonly selectedElement = this._selectedElement.asReadonly();

  constructor() {
    // Rehydrate from session storage if needed
    const storedElement = sessionStorage.getItem('creativity-element');
    if (storedElement) {
      this._selectedElement.set(JSON.parse(storedElement));
    }
  }

  setSelectedElement(element: Element) {
    this._selectedElement.set(element);
    // Persist to session storage to survive refreshes
    sessionStorage.setItem('creativity-element', JSON.stringify(element));
  }

  clearState() {
    this._selectedElement.set(null);
    sessionStorage.removeItem('creativity-element');
  }

}
