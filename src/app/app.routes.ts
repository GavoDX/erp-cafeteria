import { Routes } from '@angular/router';
import { Acercade } from './components/acercade/acercade';
import { Inicio } from './components/inicio/inicio';
import { Contabilidad } from './components/contabilidad/contabilidad';
import { Compras } from './components/compras/compras';
import { Ventas } from './components/ventas/ventas';
import { Inventario } from './components/inventario/inventario';
import { Rrhh } from './components/rrhh/rrhh';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'acercade', component: Acercade },
  { path: 'contabilidad', component: Contabilidad },
  { path: 'compras', component: Compras },
  { path: 'ventas', component: Ventas },
  { path: 'inventario', component: Inventario },
  { path: 'rrhh', component: Rrhh },
];
