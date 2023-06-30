import { HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  PATH_BACKEND = environment.URL_BACKEND + environment.PORT_BACKEND;

    URL_GET_PACIENTE = this.PATH_BACKEND + "/api/Paciente"
    URL_GET_BY_ID_PACIENTE = this.PATH_BACKEND + "/api/Paciente/GetPacienteById"
    URL_ADD_PACIENTE = this.PATH_BACKEND + "/api/Paciente/AddPaciente"
    URL_UPDATE_PACIENTE = this.PATH_BACKEND + "/api/Paciente/UpdatePaciente"
    URL_DELETE_PACIENTE = this.PATH_BACKEND + "/api/Paciente/DeletePaciente"

  constructor(private http: HttpClient) { }

  public GetPaciente(): Observable<HttpResponse<any>> {

    return this.http
        .get<any>(this.URL_GET_PACIENTE,
            { observe: 'response' })
        .pipe();
}

public AddPaciente(entidad): Observable<HttpResponse<any>> {

    return this.http
        .post<any>(this.URL_ADD_PACIENTE, entidad,
            { observe: 'response' })
        .pipe();
}

public UpdatePaciente(entidad): Observable<HttpResponse<any>> {

    return this.http
        .post<any>(this.URL_UPDATE_PACIENTE, entidad,
            { observe: 'response' })
        .pipe();
}

public DeletePaciente(item): Observable<HttpResponse<any>> {

    let params = new HttpParams();
    params = params.set('id', item.id);

    return this.http
        .post<any>(this.URL_DELETE_PACIENTE, "", {params: params, observe: 'response' })
        .pipe();
}
}
