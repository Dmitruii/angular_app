import { Component, OnInit } from '@angular/core';
import {ProductService} from "../../services/product.service";
import {ModalService} from "../../services/modal.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styleUrls: ['./product-page.component.css']
})
export class ProductPageComponent implements OnInit {

  title = 'angular app'
  // products: Array<IProduct> = []
  // products$: Observable<IProduct[]>
  isLoading = false
  term = ''

  constructor(
    public productsServices: ProductService,
    public modalService: ModalService,
    private titleService: Title
  ) {}

  ngOnInit(): void {
    this.isLoading = true
    this.titleService.setTitle('Products')
    // this.products$ = this.productsServices.getAll()
    //   .pipe(tap(() => this.isLoading = false))
    this.productsServices.products = []
    this.productsServices.getAll().subscribe(products => {
      this.isLoading = false
    })
  }

}
