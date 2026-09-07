import { Component, computed, signal } from '@angular/core';

interface Empleado {
  nombre: string;
  puesto: string;
  turno: string;
  estado: 'Activo' | 'En descanso';
}

@Component({
  selector: 'app-rrhh',
  imports: [],
  templateUrl: './rrhh.html',
  styleUrl: './rrhh.css',
})
export class Rrhh {
  protected readonly dias = ['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'];

  protected readonly empleados = signal<Empleado[]>([
    { nombre: 'Ana Martínez', puesto: 'Cajero', turno: 'Matutino · 07:00–15:00', estado: 'Activo' },
    { nombre: 'Diego Ruiz', puesto: 'Barista', turno: 'Matutino · 07:00–15:00', estado: 'Activo' },
    { nombre: 'Paola Sánchez', puesto: 'Barista', turno: 'Vespertino · 15:00–23:00', estado: 'Activo' },
    { nombre: 'Iván Castro', puesto: 'Cajero', turno: 'Vespertino · 15:00–23:00', estado: 'En descanso' },
    { nombre: 'Renata Ibarra', puesto: 'Administrador', turno: 'Mixto · 09:00–18:00', estado: 'Activo' },
  ]);

  protected readonly activos = computed(() => this.empleados().filter((e) => e.estado === 'Activo').length);

  protected readonly calendario = [
    { turno: 'Matutino', color: 'turno-matutino', dias: [1, 1, 1, 1, 1, 0, 0] },
    { turno: 'Vespertino', color: 'turno-vespertino', dias: [1, 1, 1, 1, 1, 0, 0] },
    { turno: 'Fin de semana', color: 'turno-finde', dias: [0, 0, 0, 0, 0, 1, 1] },
  ];
}
