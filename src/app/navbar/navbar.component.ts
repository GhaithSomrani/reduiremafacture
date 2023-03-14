import { Component, OnInit ,ViewChild  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { faSearch } from '@fortawesome/free-solid-svg-icons';



interface MenuResponse {
  count: number;
  description: string;
  filter: string;
  items: MenuItem[];
  name: string;
  parent: number;
  slug: string;
  taxonomy: string;
  term_group: number;
  term_id: number;
  term_taxonomy_id: number;
}

interface MenuItem {
  title: string;
  url: string;
}
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  menuItems!: any[];
  searchQuery: string = ''; // add the searchQuery property
  searchResults: any[] = [];

  faSearch = faSearch;

  constructor(private http: HttpClient) { }

  getMenuItems(menuId: number): Observable<any[]> {
    const url = `https://reduiremafacture.fr/wp-json/menus/v1/menus/${menuId}`;

    return this.http.get<any[]>(url);
  }

  ngOnInit() {
    this.http.get<MenuResponse>('https://reduiremafacture.fr/wp-json/menus/v1/menus/top-menu').subscribe(response => {
      this.menuItems = response.items;
      console.log('Number of menu items:', response);
      this.menuItems.forEach(element => {
        console.log(element.child_items)

      });
    });
  }

  menuOpen = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  isOpen = false;



  toggleSubMenu(event: MouseEvent) {
    event.preventDefault();
    const toggle = event.target as HTMLElement;
    const underline = toggle.children[0] as HTMLElement ;
    console.log(underline)
    const submenu = toggle.children[1] as HTMLElement;
    console.log(submenu)



    underline.classList.toggle('isopen');
    submenu.classList.toggle('show');

    this.isOpen = !this.isOpen;
  }
  search() {
    // fetch search results from WordPress API
    this.http.get<any[]>('https://reduiremafacture.fr/wp-json/wp/v2/posts?search=' + this.searchQuery).subscribe(
      (response) => {
        this.searchResults = response;
        console.log(this.searchResults)
      },
      (error) => {
        console.log(error);
      }
    );
  }
}

