import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, registerables, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js'

import { BlackboxService } from '../../../services/blackbox.service';

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
  averagePriceZara1: any = 0;
  averagePriceZara2: any = 0;
  averagePriceZara3: any = 0;
  averagePriceZara4: any = 0;
  averagePriceZara5: any = 0;
  averagePriceZara6: any = 0;
  averagePriceZara7: any = 0;
  averagePriceZara8: any = 0;
  averagePriceZara9: any = 0;
  averagePriceZara10: any = 0;
  averagePriceZara11: any = 0;
  averagePriceZara12: any = 0;
  averagePriceMango1: any = 0;
  averagePriceMango2: any  = 0;
  averagePriceMango3: any  = 0;
  averagePriceMango4: any  = 0;
  averagePriceMango5: any  = 0;
  averagePriceMango6: any  = 0;
  averagePriceMango7: any  = 0;
  averagePriceMango8: any  = 0;
  averagePriceMango9: any  = 0;
  averagePriceMango10: any  = 0;
  averagePriceMango11: any  = 0;
  averagePriceMango12: any  = 0;
  // chartnumber: any = 1000000


  constructor(private blackboxService: BlackboxService) {
    Chart.register(...registerables);    
  }

  ngOnInit(): void {
    this.getPhotoList();
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  getPhotoList() {
    this.blackboxService.getPhotos().subscribe(
      (res) => {
        this.photos = res;
        this.setAveragePriceZara(res);
        this.setAveragePriceMango(res);
        this.ng();
        return (this.photos = res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
  

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

   // logica para los precios promedios en los charts
   
 
   setAveragePriceZara(photos: any){
     let eneZ: any[] = [];
     let febZ: any[] = [];
     let marZ: any[] = [];
     let abrZ: any[] = [];
     let mayZ: any[] = [];
     let junZ: any[] = [];
     let julZ: any[] = [];
     let agosZ: any[] = [];
     let sepZ: any[] = [];
     let octZ: any[] = [];
     let novZ: any[] = [];
     let dicZ: any[] = [];
 
     
      photos.forEach(element => {
       let date = new Date();
       let currentYear = date.getFullYear();
       let currentMonth = date.getMonth();
       let fecha = element.createdAt.split('T').slice(0,1)[0];  // funcion para obtener la fecha 
       let mes = parseInt(fecha.split('-')[1]); // funcion para obtener el mes como numero
       let year = parseInt(fecha.split('-')[0]);
 
       if(element.origin === 'Zara' && year === currentYear ) { 
 
         if(mes === 1 && element.descuento === null) {      // estructura interna del if
           eneZ.push(element.precio);
           
 
         } 
         if(mes === 2 && element.descuento === null) {      // estructura interna del if
           febZ.push(element.precio);
 
         } 
         if(mes === 3 && element.descuento === null) {      // estructura interna del if
           marZ.push(element.precio);
 
         } 
         if(mes === 4 && element.descuento === null) {      // estructura interna del if
           abrZ.push(element.precio);
           
 
         } 
         if(mes === 5 && element.descuento === null) {      // estructura interna del if
           mayZ.push(element.precio);
           
 
         } 
         if(mes === 6 && element.descuento === null) {      // estructura interna del if
           junZ.push(element.precio);
 
         } 
         if(mes === 7 && element.descuento === null) {      // estructura interna del if
           julZ.push(element.precio);
 
         } 
         if(mes === 8 && element.descuento === null) {      // estructura interna del if
           agosZ.push(element.precio);
 
         } 
 
         if(mes === 9 && element.descuento === null) {      // estructura interna del if
           sepZ.push(element.precio);
 
         } 
         
         if(mes === 10 && element.descuento === null) {      // estructura interna del if
           octZ.push(element.precio);
 
         } 
         
         if(mes === 11 && element.descuento === null) {      // estructura interna del if
           novZ.push(element.precio);          
 
         } 
         
         if(mes === 12 && element.descuento === null) {      // estructura interna del if
           dicZ.push(element.precio);
         }         
 
 
       } 
       
       if (element.origin === 'Zara' && year === currentYear ) {
 
         if(mes === 1 && element.descuento !== null) {      // estructura interna del if
           eneZ.push(element.descuento);
           
 
         } 
         if(mes === 2 && element.descuento !== null) {      // estructura interna del if
           febZ.push(element.descuento);
 
         } 
         if(mes === 3 && element.descuento !== null) {      // estructura interna del if
           marZ.push(element.descuento);
 
         } 
         if(mes === 4 && element.descuento !== null) {      // estructura interna del if
           abrZ.push(element.descuento);
           
 
         } 
         if(mes === 5 && element.descuento !== null) {      // estructura interna del if
           mayZ.push(element.descuento);
           
 
         } 
         if(mes === 6 && element.descuento !== null) {      // estructura interna del if
           junZ.push(element.descuento);
 
         } 
         if(mes === 7 && element.descuento !== null) {      // estructura interna del if
           julZ.push(element.descuento);
 
         } 
         if(mes === 8 && element.descuento !== null) {      // estructura interna del if
           agosZ.push(element.descuento);
 
         } 
 
         if(mes === 9 && element.descuento !== null) {      // estructura interna del if
           sepZ.push(element.descuento);
 
         } 
         
         if(mes === 10 && element.descuento !== null) {      // estructura interna del if
           octZ.push(element.descuento);
 
         } 
         
         if(mes === 11 && element.descuento !== null) {      // estructura interna del if
           novZ.push(element.descuento);          
 
         } 
         
         if(mes === 12 && element.descuento !== null) {      // estructura interna del if
           dicZ.push(element.descuento);
         } 
 
       }
       
     }); // fin del ciclo que guarda los precios de cada mes 
 
     // ciclos para sacar el precio promedio zara
     this.setAveragePrice8Zara(agosZ);
     this.setAveragePrice9Zara(sepZ);
     this.setAveragePrice10Zara(octZ);
 
   }
 
   setAveragePrice8Zara(agos) {
    if(agos.length === 0){
      return this.averagePriceZara8 = 0;
    }
     agos.forEach(element => {
       this.averagePriceZara8 += element;
     });
 
     this.averagePriceZara8 = parseFloat((this.averagePriceZara8/agos.length).toFixed(2));
   }
 
   setAveragePrice9Zara(sepZ9) {
    if(sepZ9.length === 0){
      return this.averagePriceZara9 = 0;
    }
     sepZ9.forEach(element => {
       this.averagePriceZara9 += element;
     });
 
     this.averagePriceZara9 = parseFloat((this.averagePriceZara9/sepZ9.length).toFixed(2));
   }
 
   setAveragePrice10Zara(octZ) {
    if(octZ.length === 0){
      return this.averagePriceZara10 = 0;
    }
     octZ.forEach(element => {
       this.averagePriceZara10 += element;
     });
 
     this.averagePriceZara10 = parseFloat((this.averagePriceZara10/octZ.length).toFixed(2));
   }



   // logica para el precio promedio de mango

   setAveragePriceMango(photos: any){
    let eneZ: any[] = [];
    let febZ: any[] = [];
    let marZ: any[] = [];
    let abrZ: any[] = [];
    let mayZ: any[] = [];
    let junZ: any[] = [];
    let julZ: any[] = [];
    let agosZ: any[] = [];
    let sepZ: any[] = [];
    let octZ: any[] = [];
    let novZ: any[] = [];
    let dicZ: any[] = [];

    
     photos.forEach(element => {
      let date = new Date();
      let currentYear = date.getFullYear();
      let currentMonth = date.getMonth();
      let fecha = element.createdAt.split('T').slice(0,1)[0];  // funcion para obtener la fecha 
      let mes = parseInt(fecha.split('-')[1]); // funcion para obtener el mes como numero
      let year = parseInt(fecha.split('-')[0]);

      if(element.origin === 'Mango' && year === currentYear ) { 

        if(mes === 1 && element.descuento === null) {      // estructura interna del if
          eneZ.push(element.precio);
        } 
        if(mes === 2 && element.descuento === null) {      // estructura interna del if
          febZ.push(element.precio);
        } 
        if(mes === 3 && element.descuento === null) {      // estructura interna del if
          marZ.push(element.precio);
        } 
        if(mes === 4 && element.descuento === null) {      // estructura interna del if
          abrZ.push(element.precio);
        } 
        if(mes === 5 && element.descuento === null) {      // estructura interna del if
          mayZ.push(element.precio);
        } 
        if(mes === 6 && element.descuento === null) {      // estructura interna del if
          junZ.push(element.precio);
        } 
        if(mes === 7 && element.descuento === null) {      // estructura interna del if
          julZ.push(element.precio);
        } 
        if(mes === 8 && element.descuento === null) {      // estructura interna del if
          agosZ.push(element.precio);
        } 
        if(mes === 9 && element.descuento === null) {      // estructura interna del if
          sepZ.push(element.precio);
        }         
        if(mes === 10 && element.descuento === null) {      // estructura interna del if
          octZ.push(element.precio);
        }         
        if(mes === 11 && element.descuento === null) {      // estructura interna del if
          novZ.push(element.precio);          
        }         
        if(mes === 12 && element.descuento === null) {      // estructura interna del if
          dicZ.push(element.precio);
        }         

      } 
      
      if (element.origin === 'Mango' && year === currentYear ) {

        if(mes === 1 && element.descuento !== null) {      // estructura interna del if
          eneZ.push(element.descuento);
          

        } 
        if(mes === 2 && element.descuento !== null) {      // estructura interna del if
          febZ.push(element.descuento);

        } 
        if(mes === 3 && element.descuento !== null) {      // estructura interna del if
          marZ.push(element.descuento);

        } 
        if(mes === 4 && element.descuento !== null) {      // estructura interna del if
          abrZ.push(element.descuento);
          

        } 
        if(mes === 5 && element.descuento !== null) {      // estructura interna del if
          mayZ.push(element.descuento);
          

        } 
        if(mes === 6 && element.descuento !== null) {      // estructura interna del if
          junZ.push(element.descuento);

        } 
        if(mes === 7 && element.descuento !== null) {      // estructura interna del if
          julZ.push(element.descuento);

        } 
        if(mes === 8 && element.descuento !== null) {      // estructura interna del if
          agosZ.push(element.descuento);

        } 

        if(mes === 9 && element.descuento !== null) {      // estructura interna del if
          sepZ.push(element.descuento);

        } 
        
        if(mes === 10 && element.descuento !== null) {      // estructura interna del if
          octZ.push(element.descuento);

        } 
        
        if(mes === 11 && element.descuento !== null) {      // estructura interna del if
          novZ.push(element.descuento);          

        } 
        
        if(mes === 12 && element.descuento !== null) {      // estructura interna del if
          dicZ.push(element.descuento);
        } 

      }
      
    }); // fin del ciclo que guarda los precios de cada mes 

    // ciclos para sacar el precio promedio
    this.setAveragePrice9Mango(sepZ);
    this.setAveragePrice10Mango(octZ);

  }

  setAveragePrice9Mango(sepZ9) {
    if(sepZ9.length === 0){
      return this.averagePriceMango9 = 0;
    }
    sepZ9.forEach(element => {
      this.averagePriceMango9 += element;
    });

    this.averagePriceMango9 = parseFloat((this.averagePriceMango9/sepZ9.length).toFixed(2));
  }

  setAveragePrice10Mango(sepZ10) {
    if(sepZ10.length === 0){
      return this.averagePriceMango10 = 0;
    }
    sepZ10.forEach(element => {
      this.averagePriceMango10 += element;
    });

    this.averagePriceMango10 = parseFloat((this.averagePriceMango10/sepZ10.length).toFixed(2));
  }



  // fin de la logica del precio promedio mango
  

 


  // desde aca empieza el chart

  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: any;

  ng = function ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.averagePriceZara9);
      Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
      this.canvas = this.mychart.nativeElement; 
      this.ctx = this.canvas.getContext('2d');

      new Chart(this.ctx, {
        type: 'line',
        data: {
            datasets: [{
                label: 'Mango',
                data: [this.averagePriceMango1, this.averagePriceMango2, this.averagePriceMango3, this.averagePriceMango4, this.averagePriceMango5, this.averagePriceMango6, this.averagePriceMango7, this.averagePriceMango8, this.averagePriceMango9, this.averagePriceMango10, this.averagePriceMango11, this.averagePriceMango12],
                borderColor: "#007ee7",
                fill: true,
            },
            {
              label: 'Zara',
              data: [this.averagePriceZara1, this.averagePriceZara2, this.averagePriceZara3, this.averagePriceZara4, this.averagePriceZara5, this.averagePriceZara6, this.averagePriceZara7, this.averagePriceZara8, this.averagePriceZara9, this.averagePriceZara10, this.averagePriceZara11, this.averagePriceZara12 ],
              borderColor: "#bd0e0e",
              fill: true,
          }],
            labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Deciembre']
        },
        
    }); // fin chart 1

  }

}

//Datatables
export interface PrendasArray {
  categoria: string;
  subcategoria: string;
  tipoprenda: string;
  preciopromedio: string;
  diferencia: string;
}
