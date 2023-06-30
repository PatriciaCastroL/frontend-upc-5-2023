import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CitaService {

  PATH_BACKEND = environment.URL_BACKEND + environment.PORT_BACKEND;

  URL_GET_CITA = this.PATH_BACKEND + "/api/Cita"
  URL_GET_BY_ID = this.PATH_BACKEND + "/api/Cita/GetCitaById"
  URL_ADD_CITA = this.PATH_BACKEND + "/api/Cita/AddCita"
  URL_UPDATE_CITA = this.PATH_BACKEND + "/api/Cita/UpdateCita"
  URL_DELETE_CITA = this.PATH_BACKEND + "/api/Cita/DeleteCita"

  constructor(private http: HttpClient) { }
  public GetCita(): Observable<HttpResponse<any>> {

    return this.http
        .get<any>(this.URL_GET_CITA,
            { observe: 'response' })
        .pipe();
  }

  public AddCita(entidad): Observable<HttpResponse<any>> {

      return this.http
          .post<any>(this.URL_ADD_CITA, entidad,
              { observe: 'response' })
          .pipe();
  }

  public UpdateCita(entidad): Observable<HttpResponse<any>> {

      return this.http
          .post<any>(this.URL_UPDATE_CITA, entidad,
              { observe: 'response' })
          .pipe();
  }

  public DeleteCita(item): Observable<HttpResponse<any>> {
    
    let params = new HttpParams();
    params = params.set('id', item.id);

    return this.http
        .post<any>(this.URL_DELETE_CITA,  "", {params: params, observe: 'response' })
        .pipe();
}


}
