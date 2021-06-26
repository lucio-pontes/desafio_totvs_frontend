import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HireJobModel } from '../models/hire-job.model';

const routeName: string = 'hirejobs';

@Injectable({
  providedIn: 'root'
})
export class HireJobsService {

  constructor(private httpClient: HttpClient) { }

  public getJobs () : Observable<any> {
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

  getJob (id: number) : Observable<any> {
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

  postOrPutJob (job: HireJobModel) : Observable<any> {
    if (job?.id) {
      return this.putJob(job);
    } else {
      return this.postJob(job);
    }
  }

  postJob (job: HireJobModel) : Observable<any> {
    return this.httpClient.post( environment.url + routeName, job)
      .pipe(
        map((resposta: any) => {
          return resposta;
        }),
        catchError (error => {
          return throwError({error});
        })
      )
  }

  putJob (job: HireJobModel) : Observable<any> {
    return this.httpClient.put( environment.url + routeName + '/' + job.id, job)
      .pipe(
        map((resposta: any) => {
          return resposta;
        }),
        catchError (error => {
          return throwError({error});
        })
      )
  }

  getProcess (hireJobId: number) : Observable<any> {
    return this.httpClient.get( environment.url + 'hirejobs/' + hireJobId + '/hireprocess' )
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
        { property: 'description', label: 'Descrição da Vaga', type: 'string' },
        { property: 'status', label: 'Situação', type: 'string', width: '10%' }
      ];
    };
}
