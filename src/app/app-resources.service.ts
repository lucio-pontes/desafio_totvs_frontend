import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoMenuFilter, PoMenuItemFiltered } from '@po-ui/ng-components';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppResourcesService implements PoMenuFilter {
  private url: string = 'https://thf.totvs.com.br/sample/api/menus';

  constructor(private httpClient: HttpClient) {}

  getFilteredData(search: string): Observable<Array<PoMenuItemFiltered>> {
    const params = { search };

    return this.httpClient.get(this.url, { params }).pipe(map((response: any) => response.items));
  }
}
