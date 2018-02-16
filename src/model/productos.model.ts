export interface Productos {
    codigo: string;
    nombre: string;
    unidad?: string;        /* unidad de medida del producto */
    unidadminima?: number;  /* la cantidad de incremento para comprar ej: 100, 1,  */
    imagen?: string;
    stock?: number;
    stockcritico?: number;
    precio?: number;
    costo?: number;
    duracion?: number;  /* duracion en dias */
    descripcion?: string;
    activo?: boolean
}

/*

-- MSSQL
CREATE TABLE [dbo].[prod_usuario](
	[id_empresa] [int] NOT NULL,
	[usuario] [varchar](50) NOT NULL,
	[producto] [varchar](50) NOT NULL,
	[nivel] [int] NOT NULL,
 CONSTRAINT [PK_prod_usuario] PRIMARY KEY CLUSTERED 
(
	[id_empresa] ASC,
	[usuario] ASC,
	[producto] ASC
)) ON [PRIMARY]
GO
ALTER TABLE [dbo].[prod_usuario] ADD  CONSTRAINT [DF_prod_usuario_id_empresa]  DEFAULT ((1)) FOR [id_empresa]
GO

CREATE TABLE [dbo].[productos](
	[codigo] [varchar](50) NOT NULL,
	[nombre] [varchar](100) NOT NULL,
	[unidad] [varchar](20) NULL,
	[unidadminima] [decimal](18, 0) NULL,
	[imagen] [varchar](100) NULL,
	[stock] [decimal](18, 0) NULL,
	[stockcritico] [decimal](18, 0) NULL,
	[precio] [decimal](18, 0) NULL,
	[costo] [decimal](18, 0) NULL,
	[duracion] [decimal](18, 0) NULL,
	[descripcion] [text] NULL,
	[activo] [bit] NOT NULL,
 CONSTRAINT [PK_productos_1] PRIMARY KEY CLUSTERED 
(
	[codigo] ASC
)) ON [PRIMARY] TEXTIMAGE_ON [PRIMARY]
GO
ALTER TABLE [dbo].[productos] ADD  CONSTRAINT [DF_productos_unidad]			DEFAULT ('')	FOR [unidad]
ALTER TABLE [dbo].[productos] ADD  CONSTRAINT [DF_productos_unidadminima]	DEFAULT ((0))	FOR [unidadminima]
ALTER TABLE [dbo].[productos] ADD  CONSTRAINT [DF_productos_stock]			DEFAULT ((0))	FOR [stock]
ALTER TABLE [dbo].[productos] ADD  CONSTRAINT [DF_productos_stockcritico]	DEFAULT ((0))	FOR [stockcritico]
ALTER TABLE [dbo].[productos] ADD  CONSTRAINT [DF_productos_precio]			DEFAULT ((0))	FOR [precio]
ALTER TABLE [dbo].[productos] ADD  CONSTRAINT [DF_productos_duracion]		DEFAULT ((0))	FOR [duracion]
ALTER TABLE [dbo].[productos] ADD  CONSTRAINT [DF_productos_descripcion]	DEFAULT ('')	FOR [descripcion]
ALTER TABLE [dbo].[productos] ADD  CONSTRAINT [DF_productos_activo]			DEFAULT ((0))	FOR [activo]
GO

CREATE TABLE [dbo].[usuarios](
	[usuario] [varchar](50) NOT NULL,
	[clave] [varchar](50) NOT NULL,
	[nombre] [varchar](50) NOT NULL,
	[email] [varchar](100) NOT NULL,
	[direccion] [varchar](100) NOT NULL,
	[ciudad] [varchar](50) NOT NULL,
	[telefono] [varchar](50) NOT NULL,
	[tiponro] [char](1) NOT NULL,
 CONSTRAINT [PK_usuarios] PRIMARY KEY CLUSTERED 
(
	[usuario] ASC
)) ON [PRIMARY]
GO
ALTER TABLE [dbo].[usuarios] ADD  CONSTRAINT [DF_usuarios_email]		DEFAULT ('')	FOR [email]
ALTER TABLE [dbo].[usuarios] ADD  CONSTRAINT [DF_usuarios_direccion]	DEFAULT ('')	FOR [direccion]
ALTER TABLE [dbo].[usuarios] ADD  CONSTRAINT [DF_usuarios_ciudad]		DEFAULT ('')	FOR [ciudad]
ALTER TABLE [dbo].[usuarios] ADD  CONSTRAINT [DF_usuarios_nrocelu]		DEFAULT ('')	FOR [telefono]
ALTER TABLE [dbo].[usuarios] ADD  CONSTRAINT [DF_usuarios_nrofijo]		DEFAULT ('C')	FOR [tiponro]
GO

-- mysql

create database vegete;

CREATE TABLE prod_usuario (
	id_empresa int NOT NULL default 1,
	usuario varchar(50) NOT NULL,
	producto varchar(50) NOT NULL,
	nivel int NOT NULL);
alter table prod_usuario add primary key (id_empresa,usuario,producto);	

CREATE TABLE productos(
	codigo varchar(50) NOT NULL,
	nombre varchar(100) NOT NULL,
	unidad varchar(20) NULL default '',
	unidadminima decimal(18, 0) NULL default 0,
	imagen varchar(100) NULL,
	stock decimal(18, 0) NULL default 0,
	stockcritico decimal(18, 0) NULL default 0,
	precio decimal(18, 0) NULL default 0,
	costo decimal(18, 0) NULL default 0,
	duracion decimal(18, 0) NULL default 0,
	descripcion text NULL default '',
	activo bit NOT NULL default 0 );
alter table productos add primary key (codigo);
create index productos1 on productos (nombre);

CREATE TABLE usuarios(
	usuario varchar(50) NOT NULL,
	clave varchar(50) NOT NULL,
	nombre varchar(50) NOT NULL,
	email varchar(100) NOT NULL default '',
	direccion varchar(100) NOT NULL default '',
	ciudad varchar(50) NOT NULL default '',
	telefono varchar(50) NOT NULL default '',
	tiponro char(1) NOT NULL default '',
  PRIMARY KEY  (`usuario`));
create index usuarios1 on usuarios (email);

--unsigned not null auto_increment primary key

CREATE TABLE pedidos_enca (
	id_pedido int NOT NULL AUTO_INCREMENT,   
	id_empresa int NOT NULL default 1,
	usuario varchar(50) NOT NULL,
	fechapedido DateTime NOT NULL,
	fechadespachoempresa  Date NULL,
	horadespachoempresa varchar(20) null,
	despachado char(2) not null default 'NO',
	fechadespachousuario  Date NULL,
	horadespachousuario varchar(20) not null default '',
	observaciones varchar(100) null default '',
	rechazado char(2) not null default 'NO',
	fechahorarechazo DateTime NULL,
	montopedido int not null default 0,
	PRIMARY KEY(id_pedido),
	KEY (usuario,id_empresa),
	KEY (fechapedido) );

CREATE TABLE pedidos_deta (
	id_pedidodeta int NOT NULL AUTO_INCREMENT,
	id_pedido int NOT NULL,
	codigo varchar(50) NOT NULL,
	cantidad  decimal(18, 0) NOT NULL,
	entregado decimal(18, 0) NOT NULL,
	cerrado   decimal(18, 0) NOT NULL,
	stock decimal(18, 0) NULL default 0,
	precio decimal(18, 0) NULL default 0,
	valor decimal(18, 0) NULL default 0,
	despachado char(2) not null default 'NO',
	rechazado char(2) not null default 'NO',
	reemplazado char(2) not null default 'NO',
	PRIMARY KEY(id_pedidodeta),
	KEY (id_pedido),
	KEY (codigo) );

*/