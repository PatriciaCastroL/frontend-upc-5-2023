import { Component } from '@angular/core';
import { PacienteService } from '../servicios-backend/paciente/paciente.service';
import { HttpResponse } from '@angular/common/http';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page {

  public listPaciente = [];
    public idPaciente = ""
    public nombrecompleto = ""
    public cedulaidentidad = ""
    public celular = ""
    public swGuardarCambios = false

    constructor(public navCtrl: NavController,
        private pacienteServices: PacienteService) {
        this.GetPaciente();
    }

    private GetPaciente() {
      this.pacienteServices.GetPaciente().subscribe({
          next: (response: HttpResponse<any>) => {
              this.listPaciente = response.body;
              //console.log(this.listPaciente)
          },
          error: (error: any) => {
              console.log(error);
          },
          complete: () => {
              console.log('complete - this.GetPaciente()');
          },
      });
  }

  public addPaciente() {
      if (this.nombrecompleto.length > 0) {
          var entidad = {
              nombrecompleto : this.nombrecompleto,
              cedulaidentidad: this.cedulaidentidad,
              celular: this.celular
          }
          console.log(entidad)
          this.pacienteServices.AddPaciente(entidad).subscribe({
              next: (response: HttpResponse<any>) => {
                  console.log(response.body)//1
                  if(response.body == 1){
                      alert("Se agrego el paciente con éxito :)");
                      this.GetPaciente();//Se actualize el listado
                      this.nombrecompleto = "";
                  }else{
                      alert("Al agregar el paciente fallo éxito :(");
                  }
              },
              error: (error: any) => {
                  console.log(error);
              },
              complete: () => {
                  console.log('complete - this.addPaciente()');
              },
          });
      }
  }

  public guardarCambios(){
      this.swGuardarCambios = false;
      if (this.nombrecompleto.length > 0) {
          var entidad = {
              id: this.idPaciente,
              nombrecompleto : this.nombrecompleto,
              cedulaidentidad : this.cedulaidentidad,
              celular : this.celular
          }
          console.log(entidad)
          this.pacienteServices.UpdatePaciente(entidad).subscribe({
              next: (response: HttpResponse<any>) => {
                  console.log(response.body)//1
                  if(response.body == 1){
                      alert("Se modificó el paciente con exito :)");
                      this.GetPaciente();//Se actualize el listado
                      this.idPaciente = "";
                      this.nombrecompleto = "";
                      this.cedulaidentidad = "";
                      this.celular = "";
                  }else{
                      alert("Al modificar el paciente fallo exito :(");
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

  public updatePaciente(item){
      console.log(item)
      this.idPaciente = item.id
      this.nombrecompleto = item.nombreCompleto
      this.cedulaidentidad = item.cedulaIdentidad
      this.celular = item.celular
      this.swGuardarCambios = true;
  }

  public deletePaciente(item){
      console.log(item.id)
      this.pacienteServices.DeletePaciente(item).subscribe({
          next: (response: HttpResponse<any>) => {
              console.log(response.body)//1
              if(response.body == 1){
                  alert("Se elimino el paciente con éxito :)");
                  this.GetPaciente();//Se actualize el listado
              }else{
                  alert("Al eliminar el paciente fallo éxito :(");
              }
          },
          error: (error: any) => {
              console.log(error);
          },
          complete: () => {
              console.log('complete - this.GetPaciente()');
          },
      });
  }

}
