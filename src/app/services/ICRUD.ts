import { Observable } from "rxjs";

export interface ICRUD<T> {
  url: string;
  save(obj: T): Observable<T> ;
  edit(obj: T, id: number): Observable<T> ;
  delete(id: number): Observable<T> ;
  getId(id: number): Observable<T> ;
  listAll(): Observable<T[]>;

}
