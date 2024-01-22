import { effect, inject, Injectable, signal, WritableSignal } from '@angular/core';
import { CreditCard } from "../models/credit-card";
import { LOCAL_STORAGE } from "@ng-web-apis/common";
import { moveItemInArray } from "@angular/cdk/drag-drop";


@Injectable({
  providedIn: 'root'
})
export class CardStoreService {
  storage = inject(LOCAL_STORAGE);
  cards = signal(JSON.parse(this.storage.getItem('cards') || '[]') as CreditCard[]);

  constructor() {
    effect(() => {
      this.storage.setItem('cards', JSON.stringify(this.cards()));
    });
  }

  addNewCard(newCard: CreditCard) {
    this.cards.set([...this.cards(), newCard])
  }

  getById(id: string): CreditCard | undefined {
    return this.cards().find(card => card.id === id);
  }

  saveCard(changedCard: CreditCard) {
    this.cards.set(this.cards().map(card => {
      return card.id === changedCard.id ? changedCard : card
    }))
  }

  reorderItems(startIndex: number, endIndex: number) {
    const items = this.cards().slice();
    moveItemInArray(items, startIndex, endIndex);
    this.cards.set(items);
  }

  deleteById(id: string) {
    this.cards.set(this.cards().filter(card => card.id !== id))
  }
}
