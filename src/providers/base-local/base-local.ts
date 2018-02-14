import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import { Usuario } from './../../model/usuario.model';

@Injectable()
export class BaseLocalProvider 
{
    private user:      Usuario;
    private pedido:    Array<{codigo: string, cantidad: number, precio: number}> = [{ codigo:'', cantidad:0, precio:0 }];
    
    constructor ( private storage: Storage ) {}

    guardaUltimoUsuario( usuario ) {
      this.user = usuario;
      this.storage.set('ultimoUsuario',this.user);
    }

    obtenUltimoUsuario() {
    return this.storage.get('ultimoUsuario')
      .then((pUsuario) => { 
          this.user = pUsuario == null ? {} : pUsuario;
          return this.user;
      });
    }

    guardaPedido( pcodigo: string, pcantidad: number, pprecio?: number ) {
      this.pedido.push( { codigo: pcodigo, cantidad: pcantidad, precio: pprecio } );
      this.storage.set('ultimoPedido',this.pedido);
    }

    obtenUltimoPedido() {
          try {
                return this.storage.get('ultimoPedido')
                .then((pPedido) => { 
                    this.pedido = pPedido == null ? {} : pPedido;
                    return this.pedido;
                  });
          } catch( error ) {
            console.log( 'error en obtenUltimoPedido()',error );
            this.pedido = [{ codigo:'', cantidad:0, precio:0 }];
            return this.pedido;
          };
      }
}