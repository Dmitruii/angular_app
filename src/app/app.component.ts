import {Component, OnInit} from  '@angular/core';
import {IProduct} from "./models/product";

import {products as data} from './data/products'
import {ProductService} from "./services/product.service";
import {catchError, Observable, tap} from "rxjs";
import {ErrorService} from "./services/error.service";
import {ModalService} from "./services/modal.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private titleService: Title) {
  }

  ngOnInit(): void {
    this.titleService.setTitle('Angular App')
  }
}
