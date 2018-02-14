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