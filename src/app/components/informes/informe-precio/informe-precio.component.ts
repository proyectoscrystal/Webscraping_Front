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
  yearMonth: string[] = ['mes','año Zara','año Mango'];
  seleccion: string = '';
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
  label1: any;
  label2: any;
  myChart: Chart;

  constructor(private blackboxService: BlackboxService) {
    Chart.register(...registerables);    
  }

  ngOnInit(): void {
    this.getPhotoList();
    
  }

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  setYearMonth() {
    console.log(this.seleccion);
  }

  getPhotoList() {
    this.blackboxService.getPhotos().subscribe(
      (res) => {
        this.photos = res;
        this.AveragePriceZara(res);
        this.setAveragePriceMango(res); 
        this.ng();  // se presenta el chart con promedio por mes
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
 
   AveragePriceZara(photos: any){
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
     this.label2 = 'Zara';
 
     
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

     // iniciar las variables
      this.averagePriceZara1= 0;
      this.averagePriceZara2= 0;
      this.averagePriceZara3= 0;
      this.averagePriceZara4= 0;
      this.averagePriceZara5= 0;
      this.averagePriceZara6= 0;
      this.averagePriceZara7= 0;
      this.averagePriceZara8= 0;
      this.averagePriceZara9= 0;
      this.averagePriceZara10= 0;
      this.averagePriceZara11= 0;
      this.averagePriceZara12= 0;
 
     // ciclos para sacar el precio promedio zara
     this.setAveragePrice1Zara(eneZ);
     this.setAveragePrice2Zara(febZ);
     this.setAveragePrice3Zara(marZ);
     this.setAveragePrice4Zara(abrZ);
     this.setAveragePrice5Zara(mayZ);
     this.setAveragePrice6Zara(junZ);
     this.setAveragePrice7Zara(julZ);
     this.setAveragePrice8Zara(agosZ);
     this.setAveragePrice9Zara(sepZ);
     this.setAveragePrice10Zara(octZ);
     this.setAveragePrice11Zara(novZ);
     this.setAveragePrice12Zara(dicZ);

     eneZ= [];
     febZ = [];
     marZ = [];
     abrZ = [];
     mayZ = [];
     junZ = [];
     julZ = [];
     agosZ = [];
     sepZ = [];
     octZ = [];
     novZ = [];
     dicZ = [];
 
   }
 
   setAveragePrice1Zara(ene) {
    if(ene.length === 0){
      return this.averagePriceZara1 = 0;
    }
     ene.forEach(element => {
       this.averagePriceZara1 += element;
     }); 
     this.averagePriceZara1 = parseFloat((this.averagePriceZara1/ene.length).toFixed(2));
   }
 
   setAveragePrice2Zara(feb) {
    if(feb.length === 0){
      return this.averagePriceZara2 = 0;
    }
     feb.forEach(element => {
       this.averagePriceZara2 += element;
     }); 
     this.averagePriceZara2 = parseFloat((this.averagePriceZara2/feb.length).toFixed(2));
   }
 
   setAveragePrice3Zara(mar) {
    if(mar.length === 0){
      return this.averagePriceZara3 = 0;
    }
     mar.forEach(element => {
       this.averagePriceZara3 += element;
     }); 
     this.averagePriceZara3 = parseFloat((this.averagePriceZara3/mar.length).toFixed(2));
   }
 
   setAveragePrice4Zara(abr) {
    if(abr.length === 0){
      return this.averagePriceZara4 = 0;
    }
     abr.forEach(element => {
       this.averagePriceZara4 += element;
     }); 
     this.averagePriceZara4 = parseFloat((this.averagePriceZara4/abr.length).toFixed(2));
   }
 
   setAveragePrice5Zara(may) {
    if(may.length === 0){
      return this.averagePriceZara5 = 0;
    }
     may.forEach(element => {
       this.averagePriceZara5 += element;
     }); 
     this.averagePriceZara5 = parseFloat((this.averagePriceZara5/may.length).toFixed(2));
   }
 
   setAveragePrice6Zara(jun) {
    if(jun.length === 0){
      return this.averagePriceZara6 = 0;
    }
     jun.forEach(element => {
       this.averagePriceZara6 += element;
     }); 
     this.averagePriceZara6 = parseFloat((this.averagePriceZara6/jun.length).toFixed(2));
   }
 
   setAveragePrice7Zara(jul) {
    if(jul.length === 0){
      return this.averagePriceZara7 = 0;
    }
     jul.forEach(element => {
       this.averagePriceZara7 += element;
     }); 
     this.averagePriceZara7 = parseFloat((this.averagePriceZara7/jul.length).toFixed(2));
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
 
   setAveragePrice11Zara(nov) {
    if(nov.length === 0){
      return this.averagePriceZara11 = 0;
    }
     nov.forEach(element => {
       this.averagePriceZara11 += element;
     });
 
     this.averagePriceZara11 = parseFloat((this.averagePriceZara11/nov.length).toFixed(2));
   }
 
   setAveragePrice12Zara(dic) {
    if(dic.length === 0){
      return this.averagePriceZara12 = 0;
    }
     dic.forEach(element => {
       this.averagePriceZara12 += element;
     });
 
     this.averagePriceZara12 = parseFloat((this.averagePriceZara12/dic.length).toFixed(2));
   }

   // fin logica precio promedio zara


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
    this.label1 = 'Mango';

    
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

    // iniciar las variables
    this.averagePriceMango1= 0;
    this.averagePriceMango2= 0;
    this.averagePriceMango3= 0;
    this.averagePriceMango4= 0;
    this.averagePriceMango5= 0;
    this.averagePriceMango6= 0;
    this.averagePriceMango7= 0;
    this.averagePriceMango8= 0;
    this.averagePriceMango9= 0;
    this.averagePriceMango10= 0;
    this.averagePriceMango11= 0;
    this.averagePriceMango12= 0;

    // ciclos para sacar el precio promedio
    this.setAveragePrice1Mango(eneZ);
    this.setAveragePrice2Mango(febZ);
    this.setAveragePrice3Mango(marZ);
    this.setAveragePrice4Mango(abrZ);
    this.setAveragePrice5Mango(mayZ);
    this.setAveragePrice6Mango(junZ);
    this.setAveragePrice7Mango(julZ);
    this.setAveragePrice8Mango(agosZ);
    this.setAveragePrice9Mango(sepZ);
    this.setAveragePrice10Mango(octZ);
    this.setAveragePrice11Mango(novZ);
    this.setAveragePrice12Mango(dicZ);

    // se reinician los arrays
    eneZ = [];
    febZ = [];
    marZ = [];
    abrZ = [];
    mayZ = [];
    junZ = [];
    julZ = [];
    agosZ = [];
    sepZ = [];
    octZ = [];
    novZ = [];
    dicZ = [];

  }

  setAveragePrice1Mango(ene) {
    if(ene.length === 0){
      return this.averagePriceMango1 = 0;
    }
    ene.forEach(element => {
      this.averagePriceMango1 += element;
    });
    this.averagePriceMango1 = parseFloat((this.averagePriceMango1/ene.length).toFixed(2));
  }

  setAveragePrice2Mango(feb) {
    if(feb.length === 0){
      return this.averagePriceMango2 = 0;
    }
    feb.forEach(element => {
      this.averagePriceMango2 += element;
    });
    this.averagePriceMango2 = parseFloat((this.averagePriceMango2/feb.length).toFixed(2));
  }

  setAveragePrice3Mango(mar) {
    if(mar.length === 0){
      return this.averagePriceMango3 = 0;
    }
    mar.forEach(element => {
      this.averagePriceMango3 += element;
    });
    this.averagePriceMango3 = parseFloat((this.averagePriceMango3/mar.length).toFixed(2));
  }

  setAveragePrice4Mango(abr) {
    if(abr.length === 0){
      return this.averagePriceMango4 = 0;
    }
    abr.forEach(element => {
      this.averagePriceMango4 += element;
    });
    this.averagePriceMango4 = parseFloat((this.averagePriceMango4/abr.length).toFixed(2));
  }

  setAveragePrice5Mango(may) {
    if(may.length === 0){
      return this.averagePriceMango5 = 0;
    }
    may.forEach(element => {
      this.averagePriceMango5 += element;
    });
    this.averagePriceMango5 = parseFloat((this.averagePriceMango5/may.length).toFixed(2));
  }

  setAveragePrice6Mango(jun) {
    if(jun.length === 0){
      return this.averagePriceMango6 = 0;
    }
    jun.forEach(element => {
      this.averagePriceMango6 += element;
    });
    this.averagePriceMango6 = parseFloat((this.averagePriceMango6/jun.length).toFixed(2));
  }

  setAveragePrice7Mango(jul) {
    if(jul.length === 0){
      return this.averagePriceMango7 = 0;
    }
    jul.forEach(element => {
      this.averagePriceMango7 += element;
    });
    this.averagePriceMango7 = parseFloat((this.averagePriceMango7/jul.length).toFixed(2));
  }

  setAveragePrice8Mango(agos) {
    if(agos.length === 0){
      return this.averagePriceMango8 = 0;
    }
    agos.forEach(element => {
      this.averagePriceMango8 += element;
    });
    this.averagePriceMango8 = parseFloat((this.averagePriceMango8/agos.length).toFixed(2));
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

  setAveragePrice10Mango(oct) {
    if(oct.length === 0){
      return this.averagePriceMango10 = 0;
    }
    oct.forEach(element => {
      this.averagePriceMango10 += element;
    });
    this.averagePriceMango10 = parseFloat((this.averagePriceMango10/oct.length).toFixed(2));
  }

  setAveragePrice11Mango(nov) {
    if(nov.length === 0){
      return this.averagePriceMango11 = 0;
    }
    nov.forEach(element => {
      this.averagePriceMango11 += element;
    });
    this.averagePriceMango11 = parseFloat((this.averagePriceMango11/nov.length).toFixed(2));
  }

  setAveragePrice12Mango(dic) {
    if(dic.length === 0){
      return this.averagePriceMango12 = 0;
    }
    dic.forEach(element => {
      this.averagePriceMango12 += element;
    });
    this.averagePriceMango12 = parseFloat((this.averagePriceMango12/dic.length).toFixed(2));
  }


  // fin set precios promedio mango año en curso

  // jp

  mes() {
    if (this.seleccion === "año Zara") {      
      this.PriceZaraYear(this.photos);
      this.ng();

    } else if(this.seleccion === 'mes'){ 
      this.setAveragePriceMango(this.photos);
      this.AveragePriceZara(this.photos);
      this.ng();
    } else if(this.seleccion === "año Mango"){
      // this.ng();
    }
  }

  // precio promedio zara por año vigente y anterior
  PriceZaraYear(photos: any){
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
    let date: any = new Date();
    this.label2 = date.getFullYear();
    this.label1 = (date.getFullYear() - 1);

    
     photos.forEach(element => {
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
      
    }); // fin del ciclo que guarda los precios de cada mes del año actual
    

    // iniciar las variables nuevamente
    this.averagePriceZara1= 0;
    this.averagePriceZara2= 0;
    this.averagePriceZara3= 0;
    this.averagePriceZara4= 0;
    this.averagePriceZara5= 0;
    this.averagePriceZara6= 0;
    this.averagePriceZara7= 0;
    this.averagePriceZara8= 0;
    this.averagePriceZara9= 0;
    this.averagePriceZara10= 0;
    this.averagePriceZara11= 0;
    this.averagePriceZara12= 0;

    // ciclos para sacar el precio promedio del label 2 del chart, son los de zara

    this.setAveragePrice1Zara(eneZ);
    this.setAveragePrice2Zara(febZ);
    this.setAveragePrice3Zara(marZ);
    this.setAveragePrice4Zara(abrZ);
    this.setAveragePrice5Zara(mayZ);
    this.setAveragePrice6Zara(junZ);
    this.setAveragePrice7Zara(julZ);
    this.setAveragePrice8Zara(agosZ);
    this.setAveragePrice9Zara(sepZ);
    this.setAveragePrice10Zara(octZ);
    this.setAveragePrice11Zara(novZ);
    this.setAveragePrice12Zara(dicZ);
    console.log(eneZ);

    // vaciar arrays
    
  
    eneZ = [];
    febZ = [];
    marZ = [];
    abrZ = [];
    mayZ = [];
    junZ = [];
    julZ = [];
    agosZ = [];
    sepZ = [];
    octZ = [];
    novZ = [];
    dicZ = [];
    

    // implementar precio promedio año anterior

    let ene: any[] = [];
    let feb: any[] = [];
    let mar: any[] = [];
    let abr: any[] = [];
    let may: any[] = [];
    let jun: any[] = [];
    let jul: any[] = [];
    let agos: any[] = [];
    let sep: any[] = [];
    let oct: any[] = [];
    let nov: any[] = [];
    let dic: any[] = [];

    photos.forEach(element => {
      let lastYear = (date.getFullYear() - 1);
      let currentMonth = date.getMonth();
      let fecha = element.createdAt.split('T').slice(0,1)[0];  // funcion para obtener la fecha 
      let mes = parseInt(fecha.split('-')[1]); // funcion para obtener el mes como numero
      let year = parseInt(fecha.split('-')[0]);

      if(element.origin === 'Zara' && year === lastYear ) { 

        if(mes === 1 && element.descuento === null) {      // estructura interna del if
          ene.push(element.precio);
        } 
        if(mes === 2 && element.descuento === null) {      // estructura interna del if
          feb.push(element.precio);
        } 
        if(mes === 3 && element.descuento === null) {      // estructura interna del if
          mar.push(element.precio);
        } 
        if(mes === 4 && element.descuento === null) {      // estructura interna del if
          abr.push(element.precio);
        } 
        if(mes === 5 && element.descuento === null) {      // estructura interna del if
          may.push(element.precio);
        } 
        if(mes === 6 && element.descuento === null) {      // estructura interna del if
          jun.push(element.precio);
        } 
        if(mes === 7 && element.descuento === null) {      // estructura interna del if
          jul.push(element.precio);
        } 
        if(mes === 8 && element.descuento === null) {      // estructura interna del if
          agos.push(element.precio);
        } 

        if(mes === 9 && element.descuento === null) {      // estructura interna del if
          sep.push(element.precio);
        } 
        if(mes === 10 && element.descuento === null) {      // estructura interna del if
          oct.push(element.precio);
        } 
        if(mes === 11 && element.descuento === null) {      // estructura interna del if
          nov.push(element.precio); 
        } 
        if(mes === 12 && element.descuento === null) {      // estructura interna del if
          dic.push(element.precio);
        }
      } 
      
      if (element.origin === 'Zara' && year === lastYear ) {

        if(mes === 1 && element.descuento !== null) {      // estructura interna del if
          ene.push(element.descuento);
        } 
        if(mes === 2 && element.descuento !== null) {      // estructura interna del if
          feb.push(element.descuento);
        } 
        if(mes === 3 && element.descuento !== null) {      // estructura interna del if
          mar.push(element.descuento);
        } 
        if(mes === 4 && element.descuento !== null) {      // estructura interna del if
          abr.push(element.descuento);
        } 
        if(mes === 5 && element.descuento !== null) {      // estructura interna del if
          may.push(element.descuento);

        } 
        if(mes === 6 && element.descuento !== null) {      // estructura interna del if
          jun.push(element.descuento);
        } 
        if(mes === 7 && element.descuento !== null) {      // estructura interna del if
          jul.push(element.descuento);
        } 
        if(mes === 8 && element.descuento !== null) {      // estructura interna del if
          agos.push(element.descuento);
        } 
        if(mes === 9 && element.descuento !== null) {      // estructura interna del if
          sep.push(element.descuento);
        } 
        if(mes === 10 && element.descuento !== null) {      // estructura interna del if
          oct.push(element.descuento);
        }
        if(mes === 11 && element.descuento !== null) {      // estructura interna del if
          nov.push(element.descuento);
        }
        if(mes === 12 && element.descuento !== null) {      // estructura interna del if
          dic.push(element.descuento);
        } 

      }
      
    }); // fin del ciclo que guarda los precios de cada mes del año anterior
    

    // iniciar las variables de mango
    this.averagePriceMango1= 0;
    this.averagePriceMango2= 0;
    this.averagePriceMango3= 0;
    this.averagePriceMango4= 0;
    this.averagePriceMango5= 0;
    this.averagePriceMango6= 0;
    this.averagePriceMango7= 0;
    this.averagePriceMango8= 0;
    this.averagePriceMango9= 0;
    this.averagePriceMango10= 0;
    this.averagePriceMango11= 0;
    this.averagePriceMango12= 0;


    // ciclos para sacar el precio promedio
    this.setAveragePrice1Mango(ene);
    this.setAveragePrice2Mango(feb);
    this.setAveragePrice3Mango(mar);
    this.setAveragePrice4Mango(abr);
    this.setAveragePrice5Mango(may);
    this.setAveragePrice6Mango(jun);
    this.setAveragePrice7Mango(jul);
    this.setAveragePrice8Mango(agos);
    this.setAveragePrice9Mango(sep);
    this.setAveragePrice10Mango(oct);
    this.setAveragePrice11Mango(nov);
    this.setAveragePrice12Mango(dic);

    // vaciar arrays
    ene = [];
    feb = [];
    mar = [];
    abr = [];
    may = [];
    jun = [];
    jul = [];
    agos =  [];
    sep = [];
    oct = [];
    nov = [];
    dic = [];
    

  }

  // precio promedio mango por año vigente y anterior
  PriceMangoYear(photos: any){
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
    this.label1 = 'Mango';

    
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

    // iniciar las variables
    this.averagePriceMango1= 0;
    this.averagePriceMango2= 0;
    this.averagePriceMango3= 0;
    this.averagePriceMango4= 0;
    this.averagePriceMango5= 0;
    this.averagePriceMango6= 0;
    this.averagePriceMango7= 0;
    this.averagePriceMango8= 0;
    this.averagePriceMango9= 0;
    this.averagePriceMango10= 0;
    this.averagePriceMango11= 0;
    this.averagePriceMango12= 0;

    // ciclos para sacar el precio promedio
    this.setAveragePrice1Mango(eneZ);
    this.setAveragePrice2Mango(febZ);
    this.setAveragePrice3Mango(marZ);
    this.setAveragePrice4Mango(abrZ);
    this.setAveragePrice5Mango(mayZ);
    this.setAveragePrice6Mango(junZ);
    this.setAveragePrice7Mango(julZ);
    this.setAveragePrice8Mango(agosZ);
    this.setAveragePrice9Mango(sepZ);
    this.setAveragePrice10Mango(octZ);
    this.setAveragePrice11Mango(novZ);
    this.setAveragePrice12Mango(dicZ);

    // se reinician los arrays
    eneZ = [];
    febZ = [];
    marZ = [];
    abrZ = [];
    mayZ = [];
    junZ = [];
    julZ = [];
    agosZ = [];
    sepZ = [];
    octZ = [];
    novZ = [];
    dicZ = [];

  }
  

 


  // desde aca empieza el chart

  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: any;

  ng = function ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      // console.log(this.averagePriceZara9); 
        
      if(this.myChart){
        this.myChart.clear();
        this.myChart.destroy();
      }
      

      Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
      this.myChart = new Chart("myChart", {
      type: 'line',
      data: {
          datasets: [{
              label: this.label1,
              data: [this.averagePriceMango1, this.averagePriceMango2, this.averagePriceMango3, this.averagePriceMango4, this.averagePriceMango5, this.averagePriceMango6, this.averagePriceMango7, this.averagePriceMango8, this.averagePriceMango9, this.averagePriceMango10, this.averagePriceMango11, this.averagePriceMango12],
              borderColor: "#007ee7",
              fill: true,
          },
          {
            label: this.label2,
            data: [this.averagePriceZara1, this.averagePriceZara2, this.averagePriceZara3, this.averagePriceZara4, this.averagePriceZara5, this.averagePriceZara6, this.averagePriceZara7, this.averagePriceZara8, this.averagePriceZara9, this.averagePriceZara10, this.averagePriceZara11, this.averagePriceZara12 ],
            borderColor: "#bd0e0e",
            fill: true,
        }],
          labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Deciembre']
      },
      
  }); // fin chart 1

  }


  

 


  //juan camilo

}

//Datatables
export interface PrendasArray {
  categoria: string;
  subcategoria: string;
  tipoprenda: string;
  preciopromedio: string;
  diferencia: string;
}
