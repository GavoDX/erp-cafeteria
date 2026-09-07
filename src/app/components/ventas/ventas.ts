import { Component, computed, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';

interface Producto {
  nombre: string;
  precio: number;
  categoria: string;
}

interface ItemPedido extends Producto {
  cantidad: number;
}

interface Factura {
  folio: string;
  cliente: string;
  fecha: string;
  total: number;
  metodo: string;
}

@Component({
  selector: 'app-ventas',
  imports: [DecimalPipe],
  templateUrl: './ventas.html',
  styleUrl: './ventas.css',
})
export class Ventas {
  protected readonly categorias = ['Todos', 'Bebidas calientes', 'Bebidas frías', 'Alimentos', 'Postres'];
  protected readonly categoriaActiva = signal('Todos');

  protected readonly productos = signal<Producto[]>([
    { nombre: 'Latte Grande', precio: 45, categoria: 'Bebidas calientes' },
    { nombre: 'Cappuccino', precio: 42, categoria: 'Bebidas calientes' },
    { nombre: 'Espresso Doble', precio: 35, categoria: 'Bebidas calientes' },
    { nombre: 'Frappé Moka', precio: 52, categoria: 'Bebidas frías' },
    { nombre: 'Té Chai', precio: 38, categoria: 'Bebidas calientes' },
    { nombre: 'Agua Mineral', precio: 20, categoria: 'Bebidas frías' },
    { nombre: 'Muffin Arándano', precio: 30, categoria: 'Alimentos' },
    { nombre: 'Croissant', precio: 28, categoria: 'Alimentos' },
    { nombre: 'Cheesecake', precio: 48, categoria: 'Postres' },
  ]);

  protected readonly productosFiltrados = computed(() => {
    const cat = this.categoriaActiva();
    return cat === 'Todos' ? this.productos() : this.productos().filter((p) => p.categoria === cat);
  });

  protected readonly pedido = signal<ItemPedido[]>([]);
  protected readonly metodosPago: Array<'Efectivo' | 'Tarjeta' | 'Transferencia'> = [
    'Efectivo',
    'Tarjeta',
    'Transferencia',
  ];
  protected readonly metodoPago = signal<'Efectivo' | 'Tarjeta' | 'Transferencia'>('Tarjeta');

  protected readonly facturas = signal<Factura[]>([
    { folio: 'F-1042', cliente: 'María López', fecha: '01 Sep 2026', total: 139.5, metodo: 'Tarjeta' },
    { folio: 'F-1041', cliente: 'Consumidor final', fecha: '01 Sep 2026', total: 76.0, metodo: 'Efectivo' },
    { folio: 'F-1040', cliente: 'Jorge Hernández', fecha: '31 Ago 2026', total: 205.5, metodo: 'Transferencia' },
  ]);

  protected readonly subtotal = computed(() =>
    this.pedido().reduce((acc, i) => acc + i.precio * i.cantidad, 0)
  );

  protected readonly descuento = computed(() => Math.round(this.subtotal() * 0.1 * 100) / 100);
  protected readonly total = computed(() => this.subtotal() - this.descuento());

  protected filtrarPorCategoria(categoria: string) {
    this.categoriaActiva.set(categoria);
  }

  protected agregarProducto(producto: Producto) {
    this.pedido.update((items) => {
      const existente = items.find((i) => i.nombre === producto.nombre);
      if (existente) {
        return items.map((i) => (i.nombre === producto.nombre ? { ...i, cantidad: i.cantidad + 1 } : i));
      }
      return [...items, { ...producto, cantidad: 1 }];
    });
  }

  protected quitarProducto(nombre: string) {
    this.pedido.update((items) => items.filter((i) => i.nombre !== nombre));
  }

  protected seleccionarMetodo(metodo: 'Efectivo' | 'Tarjeta' | 'Transferencia') {
    this.metodoPago.set(metodo);
  }

  protected cobrar() {
    if (this.pedido().length === 0) {
      return;
    }
    const nuevoFolio = `F-${1043 + this.facturas().length}`;
    this.facturas.update((f) => [
      { folio: nuevoFolio, cliente: 'Consumidor final', fecha: 'Hoy', total: this.total(), metodo: this.metodoPago() },
      ...f,
    ]);
    this.pedido.set([]);
  }
}
