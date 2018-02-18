export interface Pedidos {
    fcreacion: Date;
    fsolicitud: Date;
    usuario: string;
    codigo: string;
    nombre: string;
    unidad?: string;        /* unidad de medida del producto ej: kilos, cajas, etc */
    unidadminima?: number;  /* la cantidad de incremento para comprar ej: 100, 1,  */
    precio?: number;
    costo?: number;
    activo?: boolean
}

/*

CREATE VIEW vista_pedidos 
AS 
select a.usuario,a.id_pedido,a.fechapedido,a.montopedido,
        ( select distinct count(b.codigo) 
        from pedidos_deta as b 
        where b.id_pedido=a.id_pedido) as itemes,
        ( select sum( b.cantidad ) 
        from pedidos_deta as b 
        where b.id_pedido=a.id_pedido) as piezas,
        ( select sum( b.cantidad*c.pesounidadminima ) 
        from pedidos_deta as b 
        inner join productos as c on c.codigo=b.codigo 
        where b.id_pedido=a.id_pedido) as pesototal
from pedidos_enca a;

*/