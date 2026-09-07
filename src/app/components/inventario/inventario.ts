import { Component, computed, signal } from '@angular/core';
import { DecimalPipe } from '@angular/common';

interface Insumo {
  nombre: string;
  categoria: string;
  stockActual: number;
  stockMinimo: number;
  unidad: string;
  valorUnitario: number;
}

@Component({
  selector: 'app-inventario',
  imports: [DecimalPipe],
  templateUrl: './inventario.html',
  styleUrl: './inventario.css',
})
export class Inventario {
  protected readonly insumos = signal<Insumo[]>([
    { nombre: 'Leche entera', categoria: 'Lácteos', stockActual: 8.5, stockMinimo: 5, unidad: 'L', valorUnitario: 22 },
    { nombre: 'Café en grano - Blend', categoria: 'Café', stockActual: 3.2, stockMinimo: 5, unidad: 'kg', valorUnitario: 320 },
    { nombre: 'Vasos desechables 16oz', categoria: 'Empaque', stockActual: 620, stockMinimo: 300, unidad: 'pz', valorUnitario: 1.5 },
    { nombre: 'Jarabe de vainilla', categoria: 'Insumos', stockActual: 1.1, stockMinimo: 2, unidad: 'L', valorUnitario: 180 },
    { nombre: 'Harina de trigo', categoria: 'Repostería', stockActual: 9, stockMinimo: 6, unidad: 'kg', valorUnitario: 24 },
    { nombre: 'Chocolate en polvo', categoria: 'Insumos', stockActual: 2.4, stockMinimo: 3, unidad: 'kg', valorUnitario: 145 },
    { nombre: 'Servilletas', categoria: 'Empaque', stockActual: 1500, stockMinimo: 500, unidad: 'pz', valorUnitario: 0.3 },
  ]);

  protected nivel(insumo: Insumo): number {
    const porcentaje = (insumo.stockActual / (insumo.stockMinimo * 2)) * 100;
    return Math.min(porcentaje, 100);
  }

  protected estado(insumo: Insumo): 'OK' | 'Bajo' {
    return insumo.stockActual < insumo.stockMinimo ? 'Bajo' : 'OK';
  }

  protected readonly stockBajo = computed(() => this.insumos().filter((i) => this.estado(i) === 'Bajo').length);
  protected readonly valorInventario = computed(() =>
    this.insumos().reduce((acc, i) => acc + i.stockActual * i.valorUnitario, 0)
  );
}
