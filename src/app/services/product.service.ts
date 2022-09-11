import {HttpClient, HttpErrorResponse, HttpParams} from "@angular/common/http";
import {catchError, delay, Observable, retry, tap, throwError} from "rxjs";
import {IProduct} from "../models/product";
import {Injectable} from "@angular/core";
import {ErrorService} from "./error.service";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(
    private http: HttpClient,
    private errorServices: ErrorService) {
  }

  products: IProduct[] = []

  getAll(): Observable<Array<IProduct>> {
    return this.http.get<Array<IProduct>>('https://fakestoreapi.com/products', {
      params: new HttpParams({
        fromString: 'limit=5'
      })
    }).pipe(
      delay(2000),
      retry(2),
      tap(products => this.products = products),
      catchError(this.errorHandler.bind(this))
    )
  }

  getOne(id: number): Observable<IProduct> {
    return this.http.get<IProduct>(`https://fakestoreapi.com/products/${id}`)
  }

  create(product: IProduct): Observable<IProduct> {
    return this.http.post<IProduct>('https://fakestoreapi.com/products', product)
      .pipe(tap(product => this.products.push(product)))
  }

  private errorHandler(error: HttpErrorResponse) {
    this.errorServices.handle(error.message)
    return throwError(() => error.message)
  }

}
