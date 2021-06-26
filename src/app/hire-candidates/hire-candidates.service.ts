import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HireCandidateModel } from '../models/hire-candidate.model';

const routeName: string = 'hirecandidates';

@Injectable({
  providedIn: 'root'
})
export class HireCandidatesService {

  constructor(private httpClient: HttpClient) { }

  public getCandidates () : Observable<any> {
    return this.httpClient.get( environment.url + routeName )
      .pipe(
        map((resposta: any) => {
          return resposta;
        }),
        catchError (error => {
          return throwError({error});
        })
      );
  }

  getCandidate (id: number) : Observable<any> {
    return this.httpClient.get( environment.url + routeName + '/' + id )
      .pipe(
        map((resposta: any) => {
          return resposta;
        }),
        catchError (error => {
          return throwError({error});
        })
      )
  }

  public getSelectCandidates () : Observable<any> {
    return this.httpClient.get( environment.url + routeName + "/news" )
      .pipe(
        map((resposta: any) => {
          return resposta;
        }),
        catchError (error => {
          return throwError({error});
        })
      );
  }

  postOrPutCandidate (candidate: HireCandidateModel) : Observable<any> {
    if (candidate?.id) {
      return this.putCandidate(candidate);
    } else {
      return this.postCandidate(candidate);
    }
  }

  postCandidate (candidate: HireCandidateModel) : Observable<any> {
    return this.httpClient.post( environment.url + routeName, candidate)
      .pipe(
        map((resposta: any) => {
          return resposta;
        }),
        catchError (error => {
          return throwError({error});
        })
      )
  }

  putCandidate (candidate: HireCandidateModel) : Observable<any> {
    return this.httpClient.put( environment.url + routeName + '/'+candidate.id, candidate)
      .pipe(
        map((resposta: any) => {
          return resposta;
        }),
        catchError (error => {
          return throwError({error});
        })
      )
  }

  deleteCandidate (id: number) : Observable<any> {
    return this.httpClient.delete( environment.url + routeName + '/'+id)
      .pipe(
        map((resposta: any) => {
          return resposta;
        }),
        catchError (error => {
          return throwError({error});
        })
      )
  }

  getCurriculum (id: number) : Observable<any> {
    return this.httpClient.get( environment.url + 'hirecandidates/' + id + '/hirecurriculum' )
      .pipe(
        map((resposta: any) => {
          return resposta;
        }),
        catchError (error => {
          return throwError({error});
        })
      )
  }

  getCandidatesColunas(): 
    Array<PoTableColumn> {
      return [
        { property: 'name', label: 'Nome', type: 'string', width: '40%' },
        { property: 'phone', label: 'Telefone', type: 'string', width: '12%' },
        { property: 'city', label: 'Cidade', type: 'string' },
        { property: 'status', label: 'Situação', type: 'string', width: "8%" }
      ];
    };

}
