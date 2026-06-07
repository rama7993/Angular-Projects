import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit {
  searchQuery: string = '';
  private searchSubject = new Subject<string>();

  suggestions: string[] = [];
  isLoading: boolean = false;
  showDropdown: boolean = false;

  private fruits: string[] = [
    'Apple',
    'Apricot',
    'Avocado',
    'Banana',
    'Blackberry',
    'Blueberry',
    'Cherry',
    'Coconut',
    'Cranberry',
    'Date',
    'Dragonfruit',
    'Elderberry',
    'Fig',
    'Grape',
    'Grapefruit',
    'Guava',
    'Kiwi',
    'Lemon',
    'Lime',
    'Mango',
    'Melon',
    'Nectarine',
    'Orange',
    'Papaya',
    'Passionfruit',
    'Peach',
    'Pear',
    'Pineapple',
    'Plum',
    'Pomegranate',
    'Raspberry',
    'Strawberry',
    'Watermelon',
  ];

  ngOnInit() {
    this.searchSubject
      .pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        this.fetchSuggestions(query);
      });
  }

  onSearchChange(event: any) {
    const query = event.target.value;
    this.searchQuery = query;
    this.isLoading = true;
    this.showDropdown = true;
    this.searchSubject.next(query);
  }

  selectSuggestion(suggestion: string) {
    this.searchQuery = suggestion;
    this.showDropdown = false;
  }

  private fetchSuggestions(query: string) {
    if (!query.trim()) {
      this.suggestions = [];
      this.isLoading = false;
      this.showDropdown = false;
      return;
    }

    setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      this.suggestions = this.fruits.filter((fruit) =>
        fruit.toLowerCase().includes(lowerQuery),
      );
      this.isLoading = false;
    }, 500);
  }

  hideDropdown() {
    setTimeout(() => {
      this.showDropdown = false;
    }, 200);
  }
}
