import { Component, OnInit } from '@angular/core';
import { HproductoService } from '../servicios-backend/hproducto/hproducto.service';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page {

  public listHProducto = [];

  public cantidad = ""
  public idProducto = ""
  public idCarritoCompra = ""
  public swGuardarCambios = false

  constructor(private hproductoService: HproductoService) { 
    this.GetHProducto();
  }

  public GetHProducto(){
    this.hproductoService.GetHProducto().subscribe({
        next: (response: HttpResponse<any>) => {
            this.listHProducto = response.body;
            //console.log(this.listProducto)
        },
        error: (error: any) => {
            console.log(error);
        },
        complete: () => {
            console.log('complete - this.GetHProducto()');
        },
    });
  }

  public addHProducto(){
    if (this.cantidad.length > 0 && this.idProducto.length > 0 && this.idCarritoCompra.length > 0) {
      var entidad = {
          cantidad : this.cantidad,
          idProducto : this.idProducto,
          idCarritoCompra : this.idCarritoCompra
      }
      console.log(entidad)
      this.hproductoService.AddHProducto(entidad).subscribe({
          next: (response: HttpResponse<any>) => {
              console.log(response.body)//1
              if(response.body == 1){
                  alert("Se agrego el HProducto con exito :)");
                  this.GetHProducto();//Se actualize el listado
                  this.cantidad = "";
                  this.idProducto = "";
                  this.idCarritoCompra = "";

              }else{
                  alert("Al agregar el HProducto fallo exito :(");
              }
          },
          error: (error: any) => {
              console.log(error);
          },
          complete: () => {
              console.log('complete - this.addHProducto()');
          },
      });
  }
}

}
