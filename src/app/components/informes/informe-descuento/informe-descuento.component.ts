import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild
} from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  registerables,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title
} from 'chart.js';
import { BlackboxService } from '../../../services/blackbox.service';

// Angular DataTable
import { OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

//Filtro modal
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Datos } from '../../../utils/index';
import { ServicioEnvioDataService } from '../servicio-envio-data.service';

interface valueFilter {
  checked: boolean;
  clase: string;
  item: string;
}

@Component({
  selector: 'app-informe-descuento',
  templateUrl: './informe-descuento.component.html',
  styleUrls: ['./informe-descuento.component.css'],
})
export class InformeDescuentoComponent implements OnDestroy, OnInit {
  //Config modal filtros
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
  };

  dataSubscription: Subscription;

  photos: any;
  total: any;
  seleccion: string = '';
  averageDiscount1: number[] = [];
  averageDiscount2: number[] = [];
  averageDiscount3: number[] = [];
  averageDiscount4: number[] = [];
  averageDiscount5: number[] = [];
  averageDiscount6: number[] = [];
  label1: any;
  label2: any;
  myChart: Chart;
  months: any;

  origin: any = '';
  categoria: any = '';
  subCategoria: any = '';
  tipoPrenda: any = '';
  color: any = '';
  composicion: any = "";

  origin2: any = '';
  categoria2: any = '';
  subCategoria2: any = '';
  tipoPrenda2: any = '';
  color2: any = '';
  composicion2: any = "";

  //Datos index.ts
  datos: any;
  originData: any;
  categoryData: any;
  subCategoryData: any;
  tipoPrendaData: any;
  colorData: any;
  composicionData: any;

  subcategorys: any;
  categorys: any;
  imagesNames: any;
  tableAvgDescuento: any;
  tableDifference: any;

  selectedFilter = [];
  originSelected = [];
  categoriaSelected = [];
  subCategoriaSelected = [];
  tipoPrendaSelected = [];
  colorSelected = [];
  composicionSelected = [];

  selectedFilter2 = [];
  originSelected2 = [];
  categoriaSelected2 = [];
  subCategoriaSelected2 = [];
  tipoPrendaSelected2 = [];
  colorSelected2 = [];
  composicionSelected2 = [];

  //Checked All
  isCheckedOrigin = false;
  isCheckedCategory = false;
  isCheckedSubCategory = false;
  isCheckedTipoPrenda = false;
  isCheckedColor = false;
  isCheckedComposicion = false;
  spinnerTable: boolean = false;
  label3: string;
  label4: string;
  label5: string;
  label6: string;

  constructor(
    private blackboxService: BlackboxService,
    private modalService: BsModalService,
    private modalService2: BsModalService,
    public servicioEnvioData: ServicioEnvioDataService
  ) {
    Chart.register(...registerables);
    this.datos = new Datos();
  }

  ngOnInit(): void {
    // suscribiendo al servicio de data y llamando la funcion
    let data = this.servicioEnvioData.enviarObservable.subscribe(data => {
      this.setWeekOrMonth(data);
      this.seleccion = data;
    })

    this.dataSubscription = data;
    
    this.getInfotableDiscount();
    this.showDataModal();
    
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  

  // peticion para la tabla
  getInfotableDiscount() {
    let params = {
      origin: this.originSelected2,
      categoria: this.categoriaSelected2,
      subCategoria: this.subCategoriaSelected2,
      tipoPrenda: this.tipoPrendaSelected2,
      color: this.colorSelected2,
      composicion: this.composicionSelected2,

      allCategory: this.isCheckedCategory,
      allSubCategory: this.isCheckedSubCategory,
      allTipoPrenda: this.isCheckedTipoPrenda
    };
    this.spinnerTable = true;

    this.blackboxService.getTableDiscountInfo(params).subscribe(
      (res) => {
        console.log(res);
        this.setInfoTable(res);
        this.spinnerTable = false;
      },
      (err) => {
        console.log(err);
      }
    );
      


  }

  getSpinnerClass() {
    if (this.spinnerTable) {
      return 'modalHidden';
    } else {
      return 'modalShow';
    }
  }

  // set info table
  setInfoTable(res) {
    this.photos = [];
    this.photos = res.obj.arr2;
    // this.tableAvgDescuento = res.obj.descuentoPromedio;
    this.tableDifference = res.obj.differences;
  }

  // peticion para el chart
  getInfoDiscount() {
    let params = {
      origin: this.originSelected,
      categoria: this.categoriaSelected,
      subCategoria: this.subCategoriaSelected,
      tipoPrenda: this.tipoPrendaSelected,
      color: this.colorSelected,
      composicion: this.composicionSelected
    };

    this.spinnerTable = true;

    this.blackboxService.getInfoDiscount(params).subscribe(
      (res) => {
        this.setInfoDiscount(res);
        console.log(res);
        this.ng();
        this.spinnerTable = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

 // peticion para el chart por semana 
 getInfoDiscountWeek() {
  let params = {
    origin: this.originSelected,
    categoria: this.categoriaSelected,
    subCategoria: this.subCategoriaSelected,
    tipoPrenda: this.tipoPrendaSelected,
    color: this.colorSelected,
    composicion: this.composicionSelected
  };

  this.blackboxService.getInfoDiscountWeek(params).subscribe(
    (res) => {
      this.setInfoDiscountWeek(res);
      this.ng();
    },
    (err) => {
      console.log(err);
    }
  );
}

  setInfoDiscountWeek(res) {
    let date = new Date();
    let year = date.getFullYear();
    if (res.obj.origin === 'general') {
      this.label1 = 'Zara';
      this.label2 = 'Mango';
      this.months = [];
      this.months = res.obj.weeks;
      this.averageDiscount1 = res.obj.values.weeksZaraActual;
      this.averageDiscount2 = res.obj.values.weeksMangoActual;
    } else if (res.obj.origin === 'Mango') {
      this.label1 = `${res.obj.origin} ${year}`;
      this.label2 = `${res.obj.origin} ${year - 1}`;
      this.months = [];
      this.months = res.obj.weeks;
      this.averageDiscount1 = res.obj.values.weeksActualYear;
      this.averageDiscount2 = res.obj.values.weeksLastYear;
    } else if (res.obj.origin === 'Zara') {
      this.label1 = `${res.obj.origin} ${year}`;
      this.label2 = `${res.obj.origin} ${year - 1}`;
      this.months = res.obj.weeks;
      this.averageDiscount1 = res.obj.values.weeksActualYear;
      this.averageDiscount2 = res.obj.values.weeksLastYear;
    }
  }


  setWeekOrMonth(data) {
    if (data === 'Semana') {
      this.getInfoDiscountWeek();        
    } else if (data === 'Mes') {  
      this.getInfoDiscount();     
    }
  }
  

  //===============INICIO FILTROS MODAL===============

  //Obtener datos desde index.ts para mostrar en el modal
  showDataModal() {
    this.originData = this.datos.origins;
    this.categoryData = this.datos.categorias;
    this.subCategoryData = this.datos.subcategorias;
    this.tipoPrendaData = this.datos.tipoprendas;
    this.colorData = this.datos.colores;
    this.composicionData = this.datos.composicion;
  }

  //Función para validar checked del filtro chart
  validateCheckFilter(checked, item, className) {
    let data = {
      checked,
      clase: className,
      item: item.value || '',
    };

    this.filterItemsData(data);
  }

  //Función para validar checked del filtro tabla
  validateCheckFilter2(checked, item, className) {
    let data = {
      checked,
      clase: className,
      item: item.value || '',
    };

    this.filterItemsData2(data);
  }

  //Recibe los datos seleccionados en el filtro chart
  filterItemsData(value) {
    const { item } = value;

    //Filtro chart
    if (value.checked && value.clase === 'marca') {
      this.originSelected.push(item);
      this.selectedFilter.push(value);
      this.origin = this.originSelected;

      if(this.seleccion === "Mes") {
        this.getInfoDiscount();
      } else if (this.seleccion === "Semana") {
        this.getInfoDiscountWeek();
      }

    } else if (value.clase == 'marca' && !value.checked) {
      this.origin = [];
      this.originSelected.splice(this.originSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      if(this.seleccion === "Mes") {
        this.getInfoDiscount();
      } else if (this.seleccion === "Semana") {
        this.getInfoDiscountWeek();
      }
    }

    if (value.checked && value.clase === 'categoria') {
      this.categoriaSelected.push(item);
      this.selectedFilter.push(value);
      this.categoria = this.categoriaSelected;
      if(this.seleccion === "Mes") {
        this.getInfoDiscount();
      } else if (this.seleccion === "Semana") {
        this.getInfoDiscountWeek();
      }
    } else if (value.clase == 'categoria' && !value.checked) {
      this.categoria = [];
      this.categoriaSelected.splice(this.categoriaSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      if(this.seleccion === "Mes") {
        this.getInfoDiscount();
      } else if (this.seleccion === "Semana") {
        this.getInfoDiscountWeek();
      }
    }

    if (value.checked && value.clase === 'subCategoria') {
      this.subCategoriaSelected.push(item);
      this.selectedFilter.push(value);
      this.subCategoria = this.subCategoriaSelected;
      if(this.seleccion === "Mes") {
        this.getInfoDiscount();
      } else if (this.seleccion === "Semana") {
        this.getInfoDiscountWeek();
      }
    } else if (value.clase == 'subCategoria' && !value.checked) {
      this.subCategoria = []
      this.subCategoriaSelected.splice(this.subCategoriaSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      if(this.seleccion === "Mes") {
        this.getInfoDiscount();
      } else if (this.seleccion === "Semana") {
        this.getInfoDiscountWeek();
      }
    }

    if (value.checked && value.clase === 'tipoPrenda') {
      this.tipoPrendaSelected.push(item);
      this.selectedFilter.push(value);
      this.tipoPrenda = this.tipoPrendaSelected;
      if(this.seleccion === "Mes") {
        this.getInfoDiscount();
      } else if (this.seleccion === "Semana") {
        this.getInfoDiscountWeek();
      }
    } else if (value.clase == 'tipoPrenda' && !value.checked) {
      this.tipoPrenda = [];
      this.tipoPrendaSelected.splice(this.tipoPrendaSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      if(this.seleccion === "Mes") {
        this.getInfoDiscount();
      } else if (this.seleccion === "Semana") {
        this.getInfoDiscountWeek();
      }
    }

    if (value.checked && value.clase === 'color colorStyles') {
      this.colorSelected.push(item);
      this.selectedFilter.push(value);
      this.color = this.colorSelected;
      if(this.seleccion === "Mes") {
        this.getInfoDiscount();
      } else if (this.seleccion === "Semana") {
        this.getInfoDiscountWeek();
      }
    } else if (value.clase == 'color colorStyles' && !value.checked) {
      this.color = [];
      this.colorSelected.splice(this.colorSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      if(this.seleccion === "Mes") {
        this.getInfoDiscount();
      } else if (this.seleccion === "Semana") {
        this.getInfoDiscountWeek();
      }
    }

    if (value.checked && value.clase === 'composicion') {
      this.composicionSelected.push(item);
      this.selectedFilter.push(value);
      this.composicion = this.composicionSelected;
      console.log(this.composicion);
      if(this.seleccion === "Mes") {
        this.getInfoDiscount();
      } else if (this.seleccion === "Semana") {
        this.getInfoDiscountWeek();
      }
    } else if (value.clase == 'composicion' && !value.checked) {
      this.composicion = [];
      this.composicionSelected.splice(this.composicionSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.composicionSelected);
      if(this.seleccion === "Mes") {
        this.getInfoDiscount();
      } else if (this.seleccion === "Semana") {
        this.getInfoDiscountWeek();
      }
    }      
  }

    //Validación check all filtros
    checkAllOrigin() {
      if (this.isCheckedOrigin == true) {
        $('.marca2').prop('checked', false);
        this.isCheckedOrigin = false;
        $('.marca2').prop('disabled', false);
  
        this.originData.forEach(element => {
          this.selectedFilter2.forEach((e,) => {
            if (e.item === element.value) {
              this.selectedFilter2 = this.selectedFilter2.filter(filtro => {
                return filtro.item !== e.item;
              });
            }
          });
  
          this.originSelected2.splice(element.value);
        });
  
        this.getInfotableDiscount();
      } else {
        if (this.originSelected2.length > 0 && this.selectedFilter2.length > 0) {
          this.originSelected2 = [];
  
          this.originData.forEach(element => {
            this.selectedFilter2.forEach((e,) => {
              if (e.item === element.value) {
                this.selectedFilter2 = this.selectedFilter2.filter(filtro => {
                  return filtro.item !== e.item;
                });
              }
            });
    
            this.originSelected2.splice(element.value);
          });
        }
  
        $('.marca2').prop('checked', true);
        this.isCheckedOrigin = true;
        $('.marca2').prop('disabled', true);
  
        this.originData.forEach(element =>  {
          let value = {
            item: element.value || ''
          }
          this.originSelected2.push(element.value);
          this.selectedFilter2.push(value);
        });
  
        this.getInfotableDiscount();
      }
    }
  
    checkAllCategory() {
      if (this.isCheckedCategory == true) {
        $('.categoria2').prop('checked', false);
        this.isCheckedCategory = false;
        $('.categoria2').prop('disabled', false);
  
        this.categoryData.forEach(element => {
          this.selectedFilter2.forEach((e,) => {
            if (e.item === element.value) {
              this.selectedFilter2 = this.selectedFilter2.filter(filtro => {
                return filtro.item !== e.item;
              });
            }
          }); 
  
          this.categoriaSelected2.splice(element.value);
        });
  
        this.getInfotableDiscount();
      } else {
        if (this.categoriaSelected2.length > 0 && this.selectedFilter2.length > 0) {
          this.categoriaSelected2 = [];
  
          this.categoryData.forEach(element => {
            this.selectedFilter2.forEach((e,) => {
              if (e.item === element.value) {
                this.selectedFilter2 = this.selectedFilter2.filter(filtro => {
                  return filtro.item !== e.item;
                });
              }
            });
    
            this.categoriaSelected2.splice(element.value);
          });
        }
  
        $('.categoria2').prop('checked', true);
        this.isCheckedCategory = true;
        $('.categoria2').prop('disabled', true);
  
        this.categoryData.forEach(element =>  {
          let value = {
            item: element.value || ''
          }
          this.categoriaSelected2.push(element.value);
          this.selectedFilter2.push(value);
        });
  
        this.getInfotableDiscount();
      }
    }
  
    checkAllSubCategory() {
      if (this.isCheckedSubCategory == true) {
        $('.subCategoria2').prop('checked', false);
        this.isCheckedSubCategory = false;
        $('.subCategoria2').prop('disabled', false);
  
        this.subCategoryData.forEach(element => {
          this.selectedFilter2.forEach((e,) => {
            if (e.item === element.value) {
              this.selectedFilter2 = this.selectedFilter2.filter(filtro => {
                return filtro.item !== e.item;
              });
            }
          }); 
  
          this.subCategoriaSelected2.splice(element.value);
        });
  
        this.getInfotableDiscount();
      } else {
        if (this.subCategoriaSelected2.length > 0 && this.selectedFilter2.length > 0) {
          this.subCategoriaSelected2 = [];
  
          this.subCategoryData.forEach(element => {
            this.selectedFilter2.forEach((e,) => {
              if (e.item === element.value) {
                this.selectedFilter2 = this.selectedFilter2.filter(filtro => {
                  return filtro.item !== e.item;
                });
              }
            });
    
            this.subCategoriaSelected2.splice(element.value);
          });
        }
  
        $('.subCategoria2').prop('checked', true);
        this.isCheckedSubCategory = true;
        $('.subCategoria2').prop('disabled', true);
  
        this.subCategoryData.forEach(element =>  {
          let value = {
            item: element.value || ''
          }
          this.subCategoriaSelected2.push(element.value);
          this.selectedFilter2.push(value);
        });
  
        this.getInfotableDiscount();
      }
    }
  
    checkAllTipoPrenda() {
      if (this.isCheckedTipoPrenda == true) {
        $('.tipoPrenda2').prop('checked', false);
        this.isCheckedTipoPrenda = false;
        $('.tipoPrenda2').prop('disabled', false);
  
        this.tipoPrendaData.forEach(element => {
          this.selectedFilter2.forEach((e,) => {
            if (e.item === element.value) {
              this.selectedFilter2 = this.selectedFilter2.filter(filtro => {
                return filtro.item !== e.item;
              });
            }
          }); 
  
          this.tipoPrendaSelected2.splice(element.value);
        });
  
        this.getInfotableDiscount();
      } else {
        if (this.tipoPrendaSelected2.length > 0 && this.selectedFilter2.length > 0) {
          this.tipoPrendaSelected2 = [];
  
          this.tipoPrendaData.forEach(element => {
            this.selectedFilter2.forEach((e,) => {
              if (e.item === element.value) {
                this.selectedFilter2 = this.selectedFilter2.filter(filtro => {
                  return filtro.item !== e.item;
                });
              }
            });
    
            this.tipoPrendaSelected2.splice(element.value);
          });
        }
  
        $('.tipoPrenda2').prop('checked', true);
        this.isCheckedTipoPrenda = true;
        $('.tipoPrenda2').prop('disabled', true);
  
        this.tipoPrendaData.forEach(element =>  {
          let value = {
            item: element.value || ''
          }
          this.tipoPrendaSelected2.push(element.value);
          this.selectedFilter2.push(value);
        });
  
        this.getInfotableDiscount();
      }
    }
    
    checkAllColor() {
      if (this.isCheckedColor == true) {
        $('.color2').prop('checked', false);
        this.isCheckedColor = false;
        $('.color2').prop('disabled', false);
  
        this.colorData.forEach(element => {
          this.selectedFilter2.forEach((e,) => {
            if (e.item === element.value) {
              this.selectedFilter2 = this.selectedFilter2.filter(filtro => {
                return filtro.item !== e.item;
              });
            }
          }); 
  
          this.colorSelected2.splice(element.value);
        });
  
        this.getInfotableDiscount();
      } else {
        if (this.colorSelected2.length > 0 && this.selectedFilter2.length > 0) {
          this.colorSelected2 = [];
  
          this.colorData.forEach(element => {
            this.selectedFilter2.forEach((e,) => {
              if (e.item === element.value) {
                this.selectedFilter2 = this.selectedFilter2.filter(filtro => {
                  return filtro.item !== e.item;
                });
              }
            });
    
            this.colorSelected2.splice(element.value);
          });
        }
  
        $('.color2').prop('checked', true);
        this.isCheckedColor = true;
        $('.color2').prop('disabled', true);
  
        this.colorData.forEach(element =>  {
          let value = {
            item: element.value || ''
          }
          this.colorSelected2.push(element.value);
          this.selectedFilter2.push(value);
        });
  
        this.getInfotableDiscount();
      }
    }
  
    checkAllComposicion() {
      if (this.isCheckedComposicion == true) {
        $('.composicion2').prop('checked', false);
        this.isCheckedComposicion = false;
        $('.composicion2').prop('disabled', false);
  
        this.composicionData.forEach(element => {
          this.selectedFilter2.forEach((e,) => {
            if (e.item === element.value) {
              this.selectedFilter2 = this.selectedFilter2.filter(filtro => {
                return filtro.item !== e.item;
              });
            }
          }); 
  
          this.composicionSelected2.splice(element.value);
        });
  
        this.getInfotableDiscount();
      } else {
        if (this.composicionSelected2.length > 0 && this.selectedFilter2.length > 0) {
          this.composicionSelected2 = [];
  
          this.composicionData.forEach(element => {
            this.selectedFilter2.forEach((e,) => {
              if (e.item === element.value) {
                this.selectedFilter2 = this.selectedFilter2.filter(filtro => {
                  return filtro.item !== e.item;
                });
              }
            });
    
            this.composicionSelected2.splice(element.value);
          });
        }
  
        $('.composicion2').prop('checked', true);
        this.isCheckedComposicion = true;
        $('.composicion2').prop('disabled', true);
  
        this.composicionData.forEach(element =>  {
          let value = {
            item: element.value || ''
          }
          this.composicionSelected2.push(element.value);
          this.selectedFilter2.push(value);
        });
  
        this.getInfotableDiscount();
      }
    }

  //Recibe los datos seleccionados en el filtro tabla
  filterItemsData2(value) {
    const { item } = value;

    //Filtro tabla
    if (value.checked && value.clase === 'marca2') {
      this.originSelected2.push(item);
      this.selectedFilter2.push(value);
      this.origin2 = this.originSelected2;
      this.getInfotableDiscount();
    } else if (value.clase == 'marca2' && !value.checked) {
      this.origin2 = [];
      this.originSelected2.splice(this.originSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      this.getInfotableDiscount();
    }

    if (value.checked && value.clase === 'categoria2') {
      this.categoriaSelected2.push(item);
      this.selectedFilter2.push(value);
      this.categoria2 = this.categoriaSelected2;
      this.getInfotableDiscount();
    } else if (value.clase == 'categoria2' && !value.checked) {
      this.categoria2 = [];
      this.categoriaSelected2.splice(this.categoriaSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      this.getInfotableDiscount();
    }

    if (value.checked && value.clase === 'subCategoria2') {
      this.subCategoriaSelected2.push(item);
      this.selectedFilter2.push(value);
      this.subCategoria2 = this.subCategoriaSelected2;
      this.getInfotableDiscount();
    } else if (value.clase == 'subCategoria2' && !value.checked) {
      this.subCategoria2 = []
      this.subCategoriaSelected2.splice(this.subCategoriaSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      this.getInfotableDiscount();
    }

    if (value.checked && value.clase === 'tipoPrenda2') {
      this.tipoPrendaSelected2.push(item);
      this.selectedFilter2.push(value);
      this.tipoPrenda2 = this.tipoPrendaSelected2;
      this.getInfotableDiscount();
    } else if (value.clase == 'tipoPrenda2' && !value.checked) {
      this.tipoPrenda2 = [];
      this.tipoPrendaSelected2.splice(this.tipoPrendaSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      this.getInfotableDiscount();
    }

    if (value.checked && value.clase === 'color2 colorStyles') {
      this.colorSelected2.push(item);
      this.selectedFilter2.push(value);
      this.color2 = this.colorSelected2;
      this.getInfotableDiscount();
    } else if (value.clase == 'color2 colorStyles' && !value.checked) {
      this.color2 = [];
      this.colorSelected2.splice(this.colorSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      this.getInfotableDiscount();
    }

    if (value.checked && value.clase === 'composicion2') {
      this.composicionSelected2.push(item);
      this.selectedFilter2.push(value);
      this.composicion2 = this.composicionSelected2;
      console.log(this.composicion2);
      this.getInfotableDiscount();
    } else if (value.clase == 'composicion2' && !value.checked) {
      this.composicion2 = [];
      this.composicionSelected2.splice(this.composicionSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      console.log(this.composicionSelected2);
      this.getInfotableDiscount();
    } 
  }

  //Validación check all filtros charts 
  checkAllOrigin2() {
    if (this.isCheckedOrigin == true) {
      $('.marca').prop('checked', false);
      this.isCheckedOrigin = false;
      $('.marca').prop('disabled', false);

      this.originData.forEach(element => {
        this.selectedFilter.forEach((e,) => {
          if (e.item === element.value) {
            this.selectedFilter = this.selectedFilter.filter(filtro => {
              return filtro.item !== e.item;
            });
          }
        });

        this.originSelected.splice(element.value);
      });

      this.getInfoDiscount();
    } else {
      if (this.originSelected.length > 0 && this.selectedFilter.length > 0) {
        this.originSelected = [];

        this.originData.forEach(element => {
          this.selectedFilter.forEach((e,) => {
            if (e.item === element.value) {
              this.selectedFilter = this.selectedFilter.filter(filtro => {
                return filtro.item !== e.item;
              });
            }
          });
  
          this.originSelected.splice(element.value);
        });
      }

      $('.marca').prop('checked', true);
      this.isCheckedOrigin = true;
      $('.marca').prop('disabled', true);

      this.originData.forEach(element =>  {
        let value = {
          item: element.value || ''
        }
        this.originSelected.push(element.value);
        this.selectedFilter.push(value);
      });

      this.getInfoDiscount();
    }
  }

  checkAllCategory2() {
    if (this.isCheckedCategory == true) {
      $('.categoria').prop('checked', false);
      this.isCheckedCategory = false;
      $('.categoria').prop('disabled', false);

      this.categoryData.forEach(element => {
        this.selectedFilter.forEach((e,) => {
          if (e.item === element.value) {
            this.selectedFilter = this.selectedFilter.filter(filtro => {
              return filtro.item !== e.item;
            });
          }
        }); 

        this.categoriaSelected.splice(element.value);
      });

      this.getInfoDiscount();
    } else {
      if (this.categoriaSelected.length > 0 && this.selectedFilter.length > 0) {
        this.categoriaSelected = [];

        this.categoryData.forEach(element => {
          this.selectedFilter.forEach((e,) => {
            if (e.item === element.value) {
              this.selectedFilter = this.selectedFilter.filter(filtro => {
                return filtro.item !== e.item;
              });
            }
          });
  
          this.categoriaSelected.splice(element.value);
        });
      }

      $('.categoria').prop('checked', true);
      this.isCheckedCategory = true;
      $('.categoria').prop('disabled', true);

      this.categoryData.forEach(element =>  {
        let value = {
          item: element.value || ''
        }
        this.categoriaSelected.push(element.value);
        this.selectedFilter.push(value);
      });

      this.getInfoDiscount();
    }
  }

  checkAllSubCategory2() {
    if (this.isCheckedSubCategory == true) {
      $('.subCategoria').prop('checked', false);
      this.isCheckedSubCategory = false;
      $('.subCategoria').prop('disabled', false);

      this.subCategoryData.forEach(element => {
        this.selectedFilter.forEach((e,) => {
          if (e.item === element.value) {
            this.selectedFilter = this.selectedFilter.filter(filtro => {
              return filtro.item !== e.item;
            });
          }
        }); 

        this.subCategoriaSelected.splice(element.value);
      });

      this.getInfoDiscount();
    } else {
      if (this.subCategoriaSelected.length > 0 && this.selectedFilter.length > 0) {
        this.subCategoriaSelected = [];

        this.subCategoryData.forEach(element => {
          this.selectedFilter.forEach((e,) => {
            if (e.item === element.value) {
              this.selectedFilter = this.selectedFilter.filter(filtro => {
                return filtro.item !== e.item;
              });
            }
          });
  
          this.subCategoriaSelected.splice(element.value);
        });
      }

      $('.subCategoria').prop('checked', true);
      this.isCheckedSubCategory = true;
      $('.subCategoria').prop('disabled', true);

      this.subCategoryData.forEach(element =>  {
        let value = {
          item: element.value || ''
        }
        this.subCategoriaSelected.push(element.value);
        this.selectedFilter.push(value);
      });

      this.getInfoDiscount();
    }
  }

  checkAllTipoPrenda2() {
    if (this.isCheckedTipoPrenda == true) {
      $('.tipoPrenda').prop('checked', false);
      this.isCheckedTipoPrenda = false;
      $('.tipoPrenda').prop('disabled', false);

      this.tipoPrendaData.forEach(element => {
        this.selectedFilter.forEach((e,) => {
          if (e.item === element.value) {
            this.selectedFilter = this.selectedFilter.filter(filtro => {
              return filtro.item !== e.item;
            });
          }
        }); 

        this.tipoPrendaSelected.splice(element.value);
      });

      this.getInfoDiscount();
    } else {
      if (this.tipoPrendaSelected.length > 0 && this.selectedFilter.length > 0) {
        this.tipoPrendaSelected = [];

        this.tipoPrendaData.forEach(element => {
          this.selectedFilter.forEach((e,) => {
            if (e.item === element.value) {
              this.selectedFilter = this.selectedFilter.filter(filtro => {
                return filtro.item !== e.item;
              });
            }
          });
  
          this.tipoPrendaSelected.splice(element.value);
        });
      }

      $('.tipoPrenda').prop('checked', true);
      this.isCheckedTipoPrenda = true;
      $('.tipoPrenda').prop('disabled', true);

      this.tipoPrendaData.forEach(element =>  {
        let value = {
          item: element.value || ''
        }
        this.tipoPrendaSelected.push(element.value);
        this.selectedFilter.push(value);
      });

      this.getInfoDiscount();
    }
  }
  
  checkAllColor2() {
    if (this.isCheckedColor == true) {
      $('.color').prop('checked', false);
      this.isCheckedColor = false;
      $('.color').prop('disabled', false);

      this.colorData.forEach(element => {
        this.selectedFilter.forEach((e,) => {
          if (e.item === element.value) {
            this.selectedFilter = this.selectedFilter.filter(filtro => {
              return filtro.item !== e.item;
            });
          }
        }); 

        this.colorSelected.splice(element.value);
      });

      this.getInfoDiscount();
    } else {
      if (this.colorSelected.length > 0 && this.selectedFilter.length > 0) {
        this.colorSelected = [];

        this.colorData.forEach(element => {
          this.selectedFilter.forEach((e,) => {
            if (e.item === element.value) {
              this.selectedFilter = this.selectedFilter.filter(filtro => {
                return filtro.item !== e.item;
              });
            }
          });
  
          this.colorSelected.splice(element.value);
        });
      }

      $('.color').prop('checked', true);
      this.isCheckedColor = true;
      $('.color').prop('disabled', true);

      this.colorData.forEach(element =>  {
        let value = {
          item: element.value || ''
        }
        this.colorSelected.push(element.value);
        this.selectedFilter.push(value);
      });

      this.getInfoDiscount();
    }
  }  

  checkAllComposicion2() {
    if (this.isCheckedComposicion == true) {
      $('.composicion').prop('checked', false);
      this.isCheckedComposicion = false;
      $('.composicion').prop('disabled', false);

      this.composicionData.forEach(element => {
        this.selectedFilter.forEach((e,) => {
          if (e.item === element.value) {
            this.selectedFilter = this.selectedFilter.filter(filtro => {
              return filtro.item !== e.item;
            });
          }
        }); 

        this.composicionSelected.splice(element.value);
      });

      this.getInfoDiscount();
    } else {
      if (this.composicionSelected.length > 0 && this.selectedFilter.length > 0) {
        this.composicionSelected = [];

        this.composicionData.forEach(element => {
          this.selectedFilter.forEach((e,) => {
            if (e.item === element.value) {
              this.selectedFilter = this.selectedFilter.filter(filtro => {
                return filtro.item !== e.item;
              });
            }
          });
  
          this.composicionSelected.splice(element.value);
        });
      }

      $('.composicion').prop('checked', true);
      this.isCheckedComposicion = true;
      $('.composicion').prop('disabled', true);

      this.composicionData.forEach(element =>  {
        let value = {
          item: element.value || ''
        }
        this.composicionSelected.push(element.value);
        this.selectedFilter.push(value);
      });

      this.getInfoDiscount();
    }
  }

  // Modal Charts
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  clearFilters() {
    this.origin = [];
    this.categoria = [];
    this.subCategoria = [];
    this.tipoPrenda = [];
    this.color = [];

    this.originSelected.splice(0, this.originSelected.length);
    this.categoriaSelected.splice(0, this.categoriaSelected.length);
    this.subCategoriaSelected.splice(0, this.subCategoriaSelected.length);
    this.tipoPrendaSelected.splice(0, this.tipoPrendaSelected.length);
    this.colorSelected.splice(0, this.colorSelected.length);
    this.composicionSelected.splice(0, this.composicionSelected.length); 
    this.selectedFilter.splice(0, this.selectedFilter.length);

    $(".marca").prop("checked", false);
    $(".categoria").prop("checked", false);
    $(".subCategoria").prop("checked", false);
    $(".tipoPrenda").prop("checked", false);
    $(".color").prop("checked", false);
    $(".composicion").prop("checked", false);

    $(".marcaAll").prop("checked", false);
    $(".categoriaAll").prop("checked", false);
    $(".subCategoriaAll").prop("checked", false);
    $(".tipoPrendaAll").prop("checked", false);
    $(".colorAll").prop("checked", false);
    $(".composicionAll").prop("checked", false);

    this.isCheckedOrigin = false;
    this.isCheckedCategory = false;
    this.isCheckedSubCategory = false;
    this.isCheckedTipoPrenda = false;
    this.isCheckedColor = false;
    this.isCheckedComposicion = false;

    if(this.seleccion === "Mes") {
      this.getInfoDiscount();
    } else if (this.seleccion === "Semana") {
      this.getInfoDiscountWeek();
    }
  }

  closeModal () {
    this.modalRef.hide();
  }

  // Modal Tabla
  openModal2(template2: TemplateRef<any>) {
    this.modalRef2 = this.modalService2.show(template2, this.config);
  }

  clearFilters2() {
    this.origin2 = [];
    this.categoria2 = [];
    this.subCategoria2 = [];
    this.tipoPrenda2 = [];
    this.color2 = [];

    this.originSelected2.splice(0, this.originSelected2.length);
    this.categoriaSelected2.splice(0, this.categoriaSelected2.length);
    this.subCategoriaSelected2.splice(0, this.subCategoriaSelected2.length);
    this.tipoPrendaSelected2.splice(0, this.tipoPrendaSelected2.length);
    this.colorSelected2.splice(0, this.colorSelected2.length);
    this.composicionSelected2.splice(0, this.composicionSelected2.length); 
    this.selectedFilter2.splice(0, this.selectedFilter2.length);

    $(".marca2").prop("checked", false);
    $(".categoria2").prop("checked", false);
    $(".subCategoria2").prop("checked", false);
    $(".tipoPrenda2").prop("checked", false);
    $(".color2").prop("checked", false);
    $(".composicion2").prop("checked", false);

    $(".marcaAll").prop("checked", false);
    $(".categoriaAll").prop("checked", false);
    $(".subCategoriaAll").prop("checked", false);
    $(".tipoPrendaAll").prop("checked", false);
    $(".colorAll").prop("checked", false);
    $(".composicionAll").prop("checked", false);

    this.isCheckedOrigin = false;
    this.isCheckedCategory = false;
    this.isCheckedSubCategory = false;
    this.isCheckedTipoPrenda = false;
    this.isCheckedColor = false;
    this.isCheckedComposicion = false;

    this.getInfotableDiscount();
  }

  closeModal2 () {
    this.modalRef2.hide();
  }

  //Validar checks filtros al cerrar modal chart
  validateCheckOrigin(value: any, marcaCheck: any) {
    let validarMarca = false;
    validarMarca = this.originSelected.some(element => element === value)
    if (validarMarca) {
      let chequearMarca = document.getElementById(`marca${marcaCheck}`);
      chequearMarca.setAttribute('checked', 'checked');
    }

    if (this.isCheckedOrigin == true) {
      this.isCheckedOrigin = false;
      $('.marca').prop('disabled', false);
    } else {
      this.isCheckedOrigin = true;
      $('.marca').prop('disabled', true);
    }
  }

  validateCheckCategory(value: any, categoriaCheck: any) {
    let validarCategoria = false;
    validarCategoria = this.categoriaSelected.some(element => element === value)
    if (validarCategoria) {
      let chequearCategoria = document.getElementById(`categoria${categoriaCheck}`);
      chequearCategoria.setAttribute('checked', 'checked');
    }

    if (this.isCheckedCategory == true) {
      this.isCheckedCategory = false;
      $('.categoria').prop('disabled', false);
    } else {
      this.isCheckedCategory = true;
      $('.categoria').prop('disabled', true);
    }
    
  }

  validateCheckSubCategory(value: any, subCategoriaCheck: any) {
    let validarSubCategoria = false;
    validarSubCategoria = this.subCategoriaSelected.some(element => element === value)
    if (validarSubCategoria) {
      let chequearSubCategoria = document.getElementById(`subcategoria${subCategoriaCheck}`);
      chequearSubCategoria.setAttribute('checked', 'checked');
    }

    if (this.isCheckedSubCategory == true) {
      this.isCheckedSubCategory = false;
      $('.subCategoria').prop('disabled', false);
    } else {
      this.isCheckedSubCategory = true;
      $('.subCategoria').prop('disabled', true);
    }
  }

  validateCheckTipoPrenda(value: any, tipoPrendaCheck: any) {
    let validarTipoPrenda = false;
    validarTipoPrenda = this.tipoPrendaSelected.some(element => element === value)
    if (validarTipoPrenda) {
      let chequearTipoPrenda = document.getElementById(`tipoprenda${tipoPrendaCheck}`);
      chequearTipoPrenda.setAttribute('checked', 'checked');
    }

    if (this.isCheckedTipoPrenda == true) {
      this.isCheckedTipoPrenda = false;
      $('.tipoPrenda').prop('disabled', false);
    } else {
      this.isCheckedTipoPrenda = true;
      $('.tipoPrenda').prop('disabled', true);
    }
  }

  validateCheckColor(value: any, colorCheck: any) {
    let validarColor = false;
    validarColor = this.colorSelected.some(element => element === value)
    if (validarColor) {
      let chequearColor = document.getElementById(`color${colorCheck}`);
      chequearColor.setAttribute('checked', 'checked');
    }

    if (this.isCheckedColor == true) {
      this.isCheckedColor = false;
      $('.color').prop('disabled', false);
    } else {
      this.isCheckedColor = true;
      $('.color').prop('disabled', true);
    }
  }

  validateCheckComposicion(value: any, composicionCheck: any) {
    let validarComposicion = false;
    validarComposicion = this.composicionSelected.some(element => element === value)
    if (validarComposicion) {
      let chequearComposicion = document.getElementById(`composicion${composicionCheck}`);
      chequearComposicion.setAttribute('checked', 'checked');
    }

    if (this.isCheckedComposicion == true) {
      this.isCheckedComposicion = false;
      $('.composicion').prop('disabled', false);
    } else {
      this.isCheckedComposicion = true;
      $('.composicion').prop('disabled', true);
    }
  }  


  //Validar checks filtros al cerrar modal tabla
  validateCheckOrigin2(value: any, marcaCheck2: any) {
    let validarMarca2 = false;
    validarMarca2 = this.originSelected2.some(element => element === value)
    if (validarMarca2) {
      let chequearMarca2 = document.getElementById(`marca2${marcaCheck2}`);
      chequearMarca2.setAttribute('checked', 'checked');
    }
    
    if (this.isCheckedOrigin == true) {
      this.isCheckedOrigin = false;
      $('.marca2').prop('disabled', false);
    } else {
      this.isCheckedOrigin = true;
      $('.marca2').prop('disabled', true);
    }
  }

  validateCheckCategory2(value: any, categoriaCheck2: any) {
    let validarCategoria2 = false;
    validarCategoria2 = this.categoriaSelected2.some(element => element === value)
    if (validarCategoria2) {
      let chequearCategoria2 = document.getElementById(`categoria2${categoriaCheck2}`);
      chequearCategoria2.setAttribute('checked', 'checked');
    }

    if (this.isCheckedCategory == true) {
      this.isCheckedCategory = false;
      $('.categoria2').prop('disabled', false);
    } else {
      this.isCheckedCategory = true;
      $('.categoria2').prop('disabled', true);
    }
  }

  validateCheckSubCategory2(value: any, subCategoriaCheck2: any) {
    let validarSubCategoria2 = false;
    validarSubCategoria2 = this.subCategoriaSelected2.some(element => element === value)
    if (validarSubCategoria2) {
      let chequearSubCategoria2 = document.getElementById(`subcategoria2${subCategoriaCheck2}`);
      chequearSubCategoria2.setAttribute('checked', 'checked');
    }

    if (this.isCheckedSubCategory == true) {
      this.isCheckedSubCategory = false;
      $('.subCategoria2').prop('disabled', false);
    } else {
      this.isCheckedSubCategory = true;
      $('.subCategoria2').prop('disabled', true);
    }
  }

  validateCheckTipoPrenda2(value: any, tipoPrendaCheck2: any) {
    let validarTipoPrenda2 = false;
    validarTipoPrenda2 = this.tipoPrendaSelected2.some(element => element === value)
    if (validarTipoPrenda2) {
      let chequearTipoPrenda2 = document.getElementById(`tipoprenda2${tipoPrendaCheck2}`);
      chequearTipoPrenda2.setAttribute('checked', 'checked');
    }

    if (this.isCheckedTipoPrenda == true) {
      this.isCheckedTipoPrenda = false;
      $('.tipoPrenda2').prop('disabled', false);
    } else {
      this.isCheckedTipoPrenda = true;
      $('.tipoPrenda2').prop('disabled', true);
    }
  }

  validateCheckColor2(value: any, colorCheck2: any) {
    let validarColor2 = false;
    validarColor2 = this.colorSelected2.some(element => element === value)
    if (validarColor2) {
      let chequearColor2 = document.getElementById(`color2${colorCheck2}`);
      chequearColor2.setAttribute('checked', 'checked');
    }
    
    if (this.isCheckedColor == true) {
      this.isCheckedColor = false;
      $('.color2').prop('disabled', false);
    } else {
      this.isCheckedColor = true;
      $('.color2').prop('disabled', true);
    }
  }

  validateCheckComposicion2(value: any, composicionCheck2: any) {
    let validarComposicion2 = false;
    validarComposicion2 = this.composicionSelected2.some(element => element === value)
    if (validarComposicion2) {
      let chequearComposicion2 = document.getElementById(`composicion2${composicionCheck2}`);
      chequearComposicion2.setAttribute('checked', 'checked');
    }

    if (this.isCheckedComposicion == true) {
      this.isCheckedComposicion = false;
      $('.composicion2').prop('disabled', false);
    } else {
      this.isCheckedComposicion = true;
      $('.composicion2').prop('disabled', true);
    }
  }

  // funcion para poner estilo a la tabla
  diferencia() {
    if (this.tableDifference[0] === 0) {
      return 'diferencia2';
    }
    return 'diferencia';
  }

  //===============FIN FILTROS MODAL===============

  setInfoDiscount(res) {
    let date = new Date();
    let year = date.getFullYear();
    if (res.obj.origin === 'general') {
      this.label1 = 'Zara';
      this.label2 = 'Mango';
      this.label3 = 'Gef';
      this.label4 = 'Punto Blanco';
      this.label5 = 'Baby fresh';
      this.label6 = 'Galax';
      this.months = [];
      this.months = res.obj.months;
      for (let index = 0; index < res.obj.values.length; index++) {
        if (index <= 11) {
          this.averageDiscount1[index] = res.obj.values[index];
        } else if (index >= 24 && index <= 35) {
          this.averageDiscount2[index - 24] = res.obj.values[index];
        } else if (index >= 48 && index <= 59) {
          this.averageDiscount3[index - 48] = res.obj.values[index];
        } else if (index >= 72 && index <= 83) {
          this.averageDiscount4[index - 72] = res.obj.values[index];
        } else if (index >= 96 && index <= 107) {
          this.averageDiscount5[index - 96] = res.obj.values[index];
        } else if (index >= 120 && index <= 131) {
          this.averageDiscount6[index - 120] = res.obj.values[index];
        }
      }
    } else {
      this.label3 = '';
      this.averageDiscount3 = [];
      this.label4 = '';
      this.averageDiscount4 = [];
      this.label5 = '';
      this.averageDiscount5 = [];
      this.label6 = '';
      this.averageDiscount6 = [];
      this.label1 = `${res.obj.origin} ${year}`;
      this.label2 = `${res.obj.origin} ${year - 1}`;
      this.months = res.obj.months;
      for (let index = 0; index < res.obj.values.length; index++) {
        if (index <= 11) {
          this.averageDiscount1[index] = res.obj.values[index];
        } else if (index >= 12 && index <= 23) {
          this.averageDiscount2[index - 12] = res.obj.values[index];
        }
      }
    }
  }

  @ViewChild('mychart') mychart: any;

  ng = function ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

    if (this.myChart) {
      this.myChart.clear();
      this.myChart.destroy();
    }

    Chart.register(
      LineController,
      LineElement,
      PointElement,
      LinearScale,
      Title
    );
    this.myChart = new Chart('myChart', {
      type: 'line',
      data: {
        datasets: [
          {
            label: this.label1,
            data: this.averageDiscount1,
            borderColor: '#c95b10',
            fill: true,
          },
          {
            label: this.label2,
            data: this.averageDiscount2,
            borderColor: '#e5a67c',
            fill: true,
          },
          {
            label: this.label3,
            data: this.averageDiscount3,
            borderColor: '#000000',
            fill: true,
          },
          {
            label: this.label4,
            data: this.averageDiscount4,
            borderColor: '#EBFE04',
            fill: true,
          },
          {
            label: this.label5,
            data: this.averageDiscount5,
            borderColor: '#89b7e8',
            fill: true,
          },
          {
            label: this.label6,
            data: this.averageDiscount6,
            borderColor: '#fa4c06',
            fill: true,
          },
        ],
        labels: this.months,
      },
      options: {
        responsive: true,
        interaction: {
          mode: 'index',
          intersect: false,
        }
      }
    }); // fin chart 1
  };
}
