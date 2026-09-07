import { Component, computed, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';

interface Movimiento {
  fecha: string;
  concepto: string;
  categoria: string;
  tipo: 'Ingreso' | 'Egreso';
  monto: number;
}

@Component({
  selector: 'app-contabilidad',
  imports: [DecimalPipe],
  templateUrl: './contabilidad.html',
  styleUrl: './contabilidad.css',
})
export class Contabilidad {
  protected readonly movimientos = signal<Movimiento[]>([
    { fecha: '01 Sep 2026', concepto: 'Venta del día - POS', categoria: 'Ventas', tipo: 'Ingreso', monto: 8420.5 },
    { fecha: '01 Sep 2026', concepto: 'Pago nómina quincenal', categoria: 'Nómina', tipo: 'Egreso', monto: 12500 },
    { fecha: '30 Ago 2026', concepto: 'Compra OC-1041 Lácteos del Valle', categoria: 'Compras', tipo: 'Egreso', monto: 2120 },
    { fecha: '29 Ago 2026', concepto: 'Venta del día - POS', categoria: 'Ventas', tipo: 'Ingreso', monto: 7180 },
    { fecha: '28 Ago 2026', concepto: 'Renta del local', categoria: 'Renta', tipo: 'Egreso', monto: 9000 },
    { fecha: '28 Ago 2026', concepto: 'Compra OC-1040 Empaques Jalisco', categoria: 'Compras', tipo: 'Egreso', monto: 3340 },
    { fecha: '27 Ago 2026', concepto: 'Venta del día - POS', categoria: 'Ventas', tipo: 'Ingreso', monto: 6950.25 },
    { fecha: '26 Ago 2026', concepto: 'Pago servicio eléctrico (CFE)', categoria: 'Servicios', tipo: 'Egreso', monto: 1840 },
  ]);

  protected readonly totalIngresos = computed(() =>
    this.movimientos()
      .filter((m) => m.tipo === 'Ingreso')
      .reduce((acc, m) => acc + m.monto, 0)
  );

  protected readonly totalEgresos = computed(() =>
    this.movimientos()
      .filter((m) => m.tipo === 'Egreso')
      .reduce((acc, m) => acc + m.monto, 0)
  );

  protected readonly utilidadNeta = computed(() => this.totalIngresos() - this.totalEgresos());

  protected readonly cuentasPorPagar = 5460;
}
