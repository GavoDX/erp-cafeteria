import { Component, computed, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';

interface OrdenCompra {
  orden: string;
  proveedor: string;
  insumos: string;
  fecha: string;
  total: number;
  estado: 'Pendiente' | 'Recibida' | 'Cancelada';
}

@Component({
  selector: 'app-compras',
  imports: [DecimalPipe],
  templateUrl: './compras.html',
  styleUrl: './compras.css',
})
export class Compras {
  protected readonly ordenes = signal<OrdenCompra[]>([
    { orden: 'OC-1042', proveedor: 'Distribuidora Café Sur', insumos: 'Café en grano, jarabe de vainilla', fecha: '01 Sep 2026', total: 4850, estado: 'Pendiente' },
    { orden: 'OC-1041', proveedor: 'Lácteos del Valle', insumos: 'Leche entera, crema', fecha: '30 Ago 2026', total: 2120, estado: 'Recibida' },
    { orden: 'OC-1040', proveedor: 'Empaques Jalisco', insumos: 'Vasos, servilletas, tapas', fecha: '28 Ago 2026', total: 3340, estado: 'Recibida' },
    { orden: 'OC-1039', proveedor: 'Repostería Fina SA', insumos: 'Harina, chocolate en polvo', fecha: '26 Ago 2026', total: 1760, estado: 'Cancelada' },
    { orden: 'OC-1038', proveedor: 'Distribuidora Café Sur', insumos: 'Café en grano - Blend especial', fecha: '22 Ago 2026', total: 5900, estado: 'Recibida' },
    { orden: 'OC-1037', proveedor: 'Lácteos del Valle', insumos: 'Leche deslactosada', fecha: '20 Ago 2026', total: 1340, estado: 'Pendiente' },
  ]);

  protected readonly proveedores = signal([
    { nombre: 'Distribuidora Café Sur', contacto: 'ventas@cafesur.mx', categoria: 'Café' },
    { nombre: 'Lácteos del Valle', contacto: 'pedidos@lacteosvalle.mx', categoria: 'Lácteos' },
    { nombre: 'Empaques Jalisco', contacto: 'contacto@empaquesjal.mx', categoria: 'Empaque' },
    { nombre: 'Repostería Fina SA', contacto: 'ventas@reposteriafina.mx', categoria: 'Repostería' },
  ]);

  protected readonly vistaProveedores = signal(false);

  protected readonly pendientes = computed(() => this.ordenes().filter((o) => o.estado === 'Pendiente').length);
  protected readonly recibidas = computed(() => this.ordenes().filter((o) => o.estado === 'Recibida').length);
  protected readonly gastoTotal = computed(() =>
    this.ordenes()
      .filter((o) => o.estado !== 'Cancelada')
      .reduce((acc, o) => acc + o.total, 0)
  );

  protected alternarVista(mostrarProveedores: boolean) {
    this.vistaProveedores.set(mostrarProveedores);
  }
}
