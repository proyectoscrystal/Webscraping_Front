import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, registerables, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js'

//DataTables
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-informe-precio',
  templateUrl: './informe-precio.component.html',
  styleUrls: ['./informe-precio.component.css']
})

export class InformePrecioComponent implements OnInit {

  PRENDASX: PrendasArray[] = [
    {categoria: 'Mujeres', subcategoria: 'Ropa', tipoprenda: 'Pantalon', preciopromedio: '$65.772', diferencia: '88.69% ↑'},
    {categoria: 'Mujeres', subcategoria: 'Ropa', tipoprenda: 'Vestido', preciopromedio: '$65.772', diferencia: '66.50% ↑'},
    {categoria: 'Mujeres', subcategoria: 'Ropa', tipoprenda: 'Camisa', preciopromedio: '$65.772', diferencia: '46.94% ↑'},
    {categoria: 'Mujeres', subcategoria: 'Ropa', tipoprenda: 'Sandalias', preciopromedio: '$65.772', diferencia: '67.02% ↑'},
    {categoria: 'Mujeres', subcategoria: 'Calzado', tipoprenda: 'Zapatos', preciopromedio: '$65.772', diferencia: '34.43% ↑'},
    {categoria: 'Mujeres', subcategoria: 'Calzado', tipoprenda: 'Tenis', preciopromedio: '$65.772', diferencia: '34.08% ↑'},
    {categoria: 'Mujeres', subcategoria: 'Calzado', tipoprenda: 'Zapatos', preciopromedio: '$65.772', diferencia: '132.93% ↑'},
    {categoria: 'Mujeres', subcategoria: 'Accesorios', tipoprenda: 'Manilla', preciopromedio: '$65.772', diferencia: '70.58% ↑'},
    {categoria: 'Mujeres', subcategoria: 'Ropa', tipoprenda: 'Top', preciopromedio: '$65.772', diferencia: '59.67% ↑'},
    {categoria: 'Mujeres', subcategoria: 'Calzado', tipoprenda: 'Tenis', preciopromedio: '$65.772', diferencia: '70.80% ↑'},
  ];

  displayedColumns: string[] = ['categoria', 'subcategoria', 'tipoprenda', 'preciopromedio', 'diferencia'];
  dataSource = new MatTableDataSource(this.PRENDASX);

  photos: any;
  total: any;
  averagePriceZara: any;
  averagePriceMango: any;

  constructor() {
    Chart.register(...registerables);
  }

  ngOnInit(): void {
  }
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: any;

  // Recibe los datos del componente informes
  data(value: any) {
    this.photos = value;
    this.total = this.photos.length;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    new Chart(this.ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Mango',
          data: [0, 30, 20, 40, 60, 40, 10, 80, 30, 10, 64, 53],
          borderColor: "#007ee7",
          fill: true,
        },
        {
          label: 'Zara',
          data: [0, 20, 40, 60, 80, 20, 40, 60, 80, 100, 34, 23],
          borderColor: "#bd0e0e",
          fill: true,
        }],
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Deciembre']
      },
    }); // fin chart 1

  }

  setAveragePrice() {


  }

}

// Datatables
export interface PrendasArray {
  categoria: string;
  subcategoria: string;
  tipoprenda: string;
  preciopromedio: string;
  diferencia: string;
}
