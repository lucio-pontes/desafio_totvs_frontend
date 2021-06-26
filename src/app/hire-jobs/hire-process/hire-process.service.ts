import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HireProcessModel } from 'src/app/models/hire-process.model';
import { environment } from 'src/environments/environment';

const routeName: string = 'hireprocess';

@Injectable({
  providedIn: 'root'
})
export class HireProcessService {

  constructor(private httpClient: HttpClient) { }

  /*
  public getHireProcess () : Observable<any> {
    return this.httpClient.get( environment.url + routeName )
      .pipe(
        map((resposta: any) => {
          return resposta;
        }),
        catchError (error => {
          return throwError({error});
        })
      );
  }*/

  getHireProcess (hireProcessId: number) : Observable<any> {
    return this.httpClient.get( environment.url + routeName + '/' + hireProcessId )
      .pipe(
        map((resposta: any) => {
          return resposta;
        }),
        catchError (error => {
          return throwError({error});
        })
      )
  }

  postOrPutHireProcess (hireProcess: any) : Observable<any> {
    if (hireProcess?.id) {
      return this.putHireProcess(hireProcess);
    } else {
      return this.postHireProcess(hireProcess);
    }
  }

  postHireProcess (hireProcess: any) : Observable<any> {
    return this.httpClient.post( environment.url + routeName, hireProcess)
      .pipe(
        map((resposta: any) => {
          return resposta;
        }),
        catchError (error => {
          return throwError({error});
        })
      )
  }

  putHireProcess (hireProcess: any) : Observable<any> {
    return this.httpClient.put( environment.url + routeName + '/' + hireProcess.id, hireProcess)
      .pipe(
        map((resposta: any) => {
          return resposta;
        }),
        catchError (error => {
          return throwError({error});
        })
      )
  }

  getPoTableColumns(): 
    Array<PoTableColumn> {
      return [
        { property: 'id', label: 'Id', type: 'string', width: '3%' },
        { property: 'name', label: 'Nome do Candidato', type: 'string' },
        { property: 'status', label: 'Situação', type: 'string', width: '10%' }
      ];
    };
}
