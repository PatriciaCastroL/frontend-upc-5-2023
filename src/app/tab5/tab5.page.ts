import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { CarritoCompraService } from '../servicios-backend/carrito-compra/carrito-compra.service';

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page {

  public listCarritoCompra = [];
  public IdUsuario = ""
  public swGuardarCambios = false

  constructor(private carritocompraService: CarritoCompraService) { 
    this.GetCarritoCompra();
  }

    public GetCarritoCompra(){
      this.carritocompraService.GetCarritoCompra().subscribe({
          next: (response: HttpResponse<any>) => {
              this.listCarritoCompra = response.body;
              //console.log(this.listCarritoCompra)
          },
          error: (error: any) => {
              console.log(error);
          },
          complete: () => {
              console.log('complete - this.GetCarritoCompra()');
          },
      });
    }
  
    public addCarritoCompra(){
      if (this.IdUsuario.length > 0) {
        var entidad = {
            IdUsuario: this.IdUsuario
        }
        console.log(entidad)
        this.carritocompraService.AddCarritoCompra(entidad).subscribe({
            next: (response: HttpResponse<any>) => {
                console.log(response.body)//1
                if(response.body == 1){
                    alert("Se agrego el HProducto con exito :)");
                    this.GetCarritoCompra();//Se actualize el listado
                    this.IdUsuario = "";
                }else{
                    alert("Al agregar el Carrito Compra fallo exito :(");
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
