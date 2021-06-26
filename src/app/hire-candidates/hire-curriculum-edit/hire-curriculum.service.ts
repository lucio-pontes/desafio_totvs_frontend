import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PoTableColumn } from '@po-ui/ng-components';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HireCurriculumPostingModel } from '../../models/hire-curriculum-posting';

const routeName: string = 'hirecurriculums';

@Injectable({
  providedIn: 'root'
})
export class HireCurriculumService {

  constructor(private httpClient: HttpClient) { }

  postOrPutCurriculum (hireCurriculum: HireCurriculumPostingModel) : Observable<any> {
    if (hireCurriculum?.id) {
      return this.putCurriculum(hireCurriculum);
    } else {
      return this.postCurriculum(hireCurriculum);
    }
  }

  postCurriculum (hireCurriculum: HireCurriculumPostingModel) : Observable<any> {
    return this.httpClient.post( environment.url +  routeName, hireCurriculum)
      .pipe(
        map((resposta: any) => {
          return resposta;
        }),
        catchError (error => {
          return throwError({error});
        })
      )
  }

  putCurriculum (hireCurriculum: HireCurriculumPostingModel) : Observable<any> {
    return this.httpClient.put( environment.url + routeName +"/" + hireCurriculum.id, hireCurriculum)
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
        { property: 'id', label: 'Id', type: 'string', width: '5%' },
        { property: 'name', label: 'Nome', type: 'string' }
      ];
    };

}
