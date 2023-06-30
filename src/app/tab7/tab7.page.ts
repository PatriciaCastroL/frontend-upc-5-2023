import { Component } from '@angular/core';
import { CitaService } from '../servicios-backend/cita/cita.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-tab7',
  templateUrl: './tab7.page.html',
  styleUrls: ['./tab7.page.scss'],
})
export class Tab7Page {

  public listCita = [];
  public idCita = ""
  public motivo = ""
  public fechahora = ""
  public idPaciente = ""
  public swGuardarCambios = false

  constructor(private citaService: CitaService) {
    this.GetCita();//Se carga el listado cada vez que se abra la pag.
  }

  public GetCita(){
    this.citaService.GetCita().subscribe({
        next: (response: HttpResponse<any>) => {
            this.listCita = response.body;
            //console.log(this.listCita)
        },
        error: (error: any) => {
            console.log(error);
        },
        complete: () => {
            console.log('complete - this.GetCita()');
        },
    });
  }

  public addCita(){
      if (this.motivo.length > 0 && this.idPaciente.length > 0) {
          var entidad = {
            motivo : this.motivo,
            fechahora: this.fechahora,
            idPaciente: this.idPaciente
          }
          console.log(entidad)
          this.citaService.AddCita(entidad).subscribe({
              next: (response: HttpResponse<any>) => {
                  console.log(response.body)//1
                  if(response.body == 1){
                      alert("Se agrego la Cita con éxito :)");
                      this.GetCita();//Se actualize el listado
                      this.motivo = "";
                      this.fechahora = "";
                      this.idPaciente = "";
                  }else{
                      alert("Al agregar la Cita fallo éxito :(");
                  }
              },
              error: (error: any) => {
                  console.log(error);
              },
              complete: () => {
                  console.log('complete - this.addCita()');
              },
          });
      }
  }

  public guardarCambios(){
    this.swGuardarCambios = false;
    if (this.motivo.length > 0) {
        var entidad = {
            id: this.idCita,
            motivo : this.motivo,
            fechahora: this.fechahora,
            idPaciente: this.idPaciente
        }
        console.log(entidad)
        this.citaService.UpdateCita(entidad).subscribe({
            next: (response: HttpResponse<any>) => {
                console.log(response.body)//1
                if(response.body == 1){
                    alert("Se modifico la Cita con exito :)");
                    this.GetCita();//Se actualize el listado
                    this.idCita = "";
                    this.motivo = "";
                    this.fechahora = "";
                    this.idPaciente = "";
                }else{
                    alert("Al modificar la Cita fallo exito :(");
                }
            },
            error: (error: any) => {
                console.log(error);
            },
            complete: () => {
                console.log('complete - this.guardarCambios()');
            },
        });
    }
}

  public updateCita(item){
    console.log(item)
    this.idCita = item.id //oculto
    this.motivo = item.motivo //input
    this.fechahora = item.fechaHora
    this.idPaciente = item.idPaciente
    this.swGuardarCambios = true;
  }

  public deleteCita(item){
        console.log(item.id)
        this.citaService.DeleteCita(item).subscribe({
            next: (response: HttpResponse<any>) => {
                console.log(response.body)//1
                if(response.body == 1){
                    alert("Se elimino la Cita con éxito :)");
                    this.GetCita();//Se actualize el listado
                }else{
                    alert("Al eliminar la Cita fallo éxito :(");
                }
            },
            error: (error: any) => {
                console.log(error);
            },
            complete: () => {
                console.log('complete - this.deleteCita()');
            },
        });
  }

}
