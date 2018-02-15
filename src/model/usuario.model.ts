export interface Usuario {
    usuario: string;
    clave: string;
    nombre?: string;
    email?: string;
    direccion?: string;
    ciudad?: string;
    telefono?: number;      /* inclute el (+56..)... */
    tiponro?: string        /* celu o fijo */
    recordarme: boolean;
}
