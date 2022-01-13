import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Chart, ChartConfiguration, registerables, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js'

import { BlackboxService } from '../../../services/blackbox.service';

// Angular DataTable
import { OnDestroy } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

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
  selector: 'app-informe-descontinuados',
  templateUrl: './informe-descontinuados.component.html',
  styleUrls: ['./informe-descontinuados.component.css']
})
export class InformeDescontinuadosComponent implements OnDestroy, OnInit {

  //Config modal filtros
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
  };

  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  dataSubscription: Subscription;
  seleccion: string = '';

  photos: any;

  //Datos index.ts
  datos: any;
  originData: any;
  categoryData: any;
  subCategoryData: any;
  tipoPrendaData: any;
  colorData: any;
  composicionData: any;

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

  selectedFilter2 = [];
  originSelected2 = [];
  categoriaSelected2 = [];
  subCategoriaSelected2 = [];
  tipoPrendaSelected2 = [];
  colorSelected2 = [];
  composicionSelected2 = [];

  selectedFilter = [];
  originSelected = [];
  categoriaSelected = [];
  subCategoriaSelected = [];
  tipoPrendaSelected = [];
  colorSelected = [];
  composicionSelected = [];

  // responses from backend
  averageDiscountinued1: number[] = [];
  averageDiscountinued2: number[] = [];
  tableAvgDescontinuados: any = 0;
  tableDifference: any;

  constructor(private blackboxService: BlackboxService, private modalService: BsModalService, private modalService2: BsModalService, private servicioEnvioData: ServicioEnvioDataService) {
    Chart.register(...registerables);
    this.datos = new Datos();
  }

  ngOnInit(): void {

    let data = this.servicioEnvioData.enviarObservable.subscribe(data => {
      this.setWeekOrMonth(data);
      this.seleccion = data;
    })
    
    this.dataSubscription = data;

    this.getInfotableDiscountinued();
    this.showDataModal();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json'
      },
      destroy: true,
    };
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
    this.dataSubscription.unsubscribe();
  }

  // peticion para el chart
  getInfoDiscountinued() {
    let params = {
      origin: this.originSelected,
      categoria: this.categoriaSelected,
      subCategoria: this.subCategoriaSelected,
      tipoPrenda: this.tipoPrendaSelected,
      color: this.colorSelected,
      composicion: this.composicionSelected
    };

    this.blackboxService.getInfoDiscountinued(params).subscribe(
      (res) => {
        this.setInfoDiscountinued(res);
        // console.log(res);
        this.ng();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  setInfoDiscountinued(res) {
    this.months = res.obj.months;

    let date = new Date();
    let year = date.getFullYear();
    if (res.obj.origin === 'general') {
      this.label1 = 'Zara';
      this.label2 = 'Mango';
      for (let index = 0; index < res.obj.values.length; index++) {
        if (index <= 11) {
          this.averageDiscountinued1[index] = res.obj.values[index];
        } else if (index >= 24 && index <= 35) {
          this.averageDiscountinued2[index - 24] = res.obj.values[index];
        }
      }

    } else if (res.obj.origin === 'Mango') {
      this.label1 = `${res.obj.origin} ${year}`;
      this.label2 = `${res.obj.origin} ${year - 1}`;
      for (let index = 0; index < res.obj.values.length; index++) {
        if (index <= 11) {
          this.averageDiscountinued1[index] = res.obj.values[index];
        } else if (index >= 12 && index <= 23) {
          this.averageDiscountinued2[index - 12] = res.obj.values[index];
        }
      }

    } else if (res.obj.origin === 'Zara') {
      this.label1 = `${res.obj.origin} ${year}`;
      this.label2 = `${res.obj.origin} ${year - 1}`;
      for (let index = 0; index < res.obj.values.length; index++) {
        if (index <= 11) {
          this.averageDiscountinued1[index] = res.obj.values[index];
        } else if (index >= 12 && index <= 23) {
          this.averageDiscountinued2[index - 12] = res.obj.values[index];
        }
      }

    }

  }




  // peticion para la tabla
  getInfotableDiscountinued() {
    let params = {
      origin: this.originSelected2,
      categoria: this.categoriaSelected2,
      subCategoria: this.subCategoriaSelected2,
      tipoPrenda: this.tipoPrendaSelected2,
      color: this.colorSelected2,
      composicion: this.composicionSelected2
    };

    this.blackboxService.getTableDiscountinuedInfo(params).subscribe(
      (res) => {
        // console.log(res);
        this.setInfoTable(res);
        this.dtTrigger.next();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // set info table
  setInfoTable(res) {
    
    res.obj.arr2 = res.obj.arr2.map(element => {
      if(element.descontinuados !== null) element.descontinuados = new Intl.NumberFormat('es-CO').format(element.descontinuados);
      
      return element;
    });

    this.photos = res.obj.arr2;
    // this.tableAvgDescontinuados = new Intl.NumberFormat('es-CO').format(res.obj.descontinuados);
    this.tableDifference = res.obj.differences;
  }

   // peticion para el chart por semana
   getInfoDiscontinuedWeek() {
    let params = {
      origin: this.originSelected,
      categoria: this.categoriaSelected,
      subCategoria: this.subCategoriaSelected,
      tipoPrenda: this.tipoPrendaSelected,
      color: this.colorSelected,
      composicion: this.composicionSelected
    };

    this.blackboxService.getInfoDiscontinuedWeek(params).subscribe(
      (res) => {
        this.setInfoDiscontinuedWeek(res);
        console.log(res);
        this.ng();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  setInfoDiscontinuedWeek(res) {
    let date = new Date();
    let year = date.getFullYear();
    if (res.obj.origin === 'general') {
      this.label1 = 'Zara';
      this.label2 = 'Mango';
      this.months = [];
      this.months = res.obj.weeks;
      this.averageDiscountinued1 = res.obj.values.weeksZaraActual;
      this.averageDiscountinued2 = res.obj.values.weeksMangoActual;
    } else if (res.obj.origin === 'Mango') {
      this.label1 = `${res.obj.origin} ${year}`;
      this.label2 = `${res.obj.origin} ${year - 1}`;
      this.months = [];
      this.months = res.obj.weeks;
      this.averageDiscountinued1 = res.obj.values.weeksActualYear;
      this.averageDiscountinued2 = res.obj.values.weeksLastYear;
    } else if (res.obj.origin === 'Zara') {
      this.label1 = `${res.obj.origin} ${year}`;
      this.label2 = `${res.obj.origin} ${year - 1}`;
      this.months = [];
      this.months = res.obj.weeks;
      this.averageDiscountinued1 = res.obj.values.weeksActualYear;
      this.averageDiscountinued2 = res.obj.values.weeksLastYear;
    }
  }


  // funcion que elige semana o mes
  setWeekOrMonth(data) {
    if (data === 'Semana') {
      this.getInfoDiscontinuedWeek();        
    } else if (data === 'Mes') {  
      this.getInfoDiscountinued();     
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

  //Función para validar checked del filtro
  validateCheckFilter(checked, item, className) {
    let data = {
      checked,
      clase: className,
      item: item.value || '',
    };

    this.filterItemsData(data);
  }

  //Función para validar checked del filtro
  validateCheckFilter2(checked, item, className) {
    let data = {
      checked,
      clase: className,
      item: item.value || '',
    };

    this.filterItemsData2(data);
  }

  //Recibe los datos seleccionados en el filtro
  filterItemsData(value) {
    const { item } = value;

    //Filtro chart
    if (value.checked && value.clase === 'marca') {
      this.originSelected.push(item);
      this.selectedFilter.push(value);
      this.origin = this.originSelected;
      console.log(this.origin);
      if(this.seleccion === "Mes") {
        this.getInfoDiscountinued();
      } else if (this.seleccion === "Semana") {
        this.getInfoDiscontinuedWeek();
      }
    } else if (value.clase == 'marca' && !value.checked) {
      this.origin = [];
      this.originSelected.splice(this.originSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.originSelected);
      if(this.seleccion === "Mes") {
        this.getInfoDiscountinued();
      } else if (this.seleccion === "Semana") {
        this.getInfoDiscontinuedWeek();
      }
    }

    if (value.checked && value.clase === 'categoria') {
      this.categoriaSelected.push(item);
      this.selectedFilter.push(value);
      this.categoria = this.categoriaSelected;
      console.log(this.categoria);
      if(this.seleccion === "Mes") {
        this.getInfoDiscountinued();
      } else if (this.seleccion === "Semana") {
        this.getInfoDiscontinuedWeek();
      }
    } else if (value.clase == 'categoria' && !value.checked) {
      this.categoria = [];
      this.categoriaSelected.splice(this.categoriaSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.categoriaSelected);
      if(this.seleccion === "Mes") {
        this.getInfoDiscountinued();
      } else if (this.seleccion === "Semana") {
        this.getInfoDiscontinuedWeek();
      }
    }

    if (value.checked && value.clase === 'subCategoria') {
      this.subCategoriaSelected.push(item);
      this.selectedFilter.push(value);
      this.subCategoria = this.subCategoriaSelected;
      console.log(this.subCategoria);
      if(this.seleccion === "Mes") {
        this.getInfoDiscountinued();
      } else if (this.seleccion === "Semana") {
        this.getInfoDiscontinuedWeek();
      }
    } else if (value.clase == 'subCategoria' && !value.checked) {
      this.subCategoria = []
      this.subCategoriaSelected.splice(this.subCategoriaSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.subCategoriaSelected);
      if(this.seleccion === "Mes") {
        this.getInfoDiscountinued();
      } else if (this.seleccion === "Semana") {
        this.getInfoDiscontinuedWeek();
      }
    }

    if (value.checked && value.clase === 'tipoPrenda') {
      this.tipoPrendaSelected.push(item);
      this.selectedFilter.push(value);
      this.tipoPrenda = this.tipoPrendaSelected;
      console.log(this.tipoPrenda);
      if(this.seleccion === "Mes") {
        this.getInfoDiscountinued();
      } else if (this.seleccion === "Semana") {
        this.getInfoDiscontinuedWeek();
      }
    } else if (value.clase == 'tipoPrenda' && !value.checked) {
      this.tipoPrenda = [];
      this.tipoPrendaSelected.splice(this.tipoPrendaSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.tipoPrendaSelected);
      if(this.seleccion === "Mes") {
        this.getInfoDiscountinued();
      } else if (this.seleccion === "Semana") {
        this.getInfoDiscontinuedWeek();
      }
    }

    if (value.checked && value.clase === 'color colorStyles') {
      this.colorSelected.push(item);
      this.selectedFilter.push(value);
      this.color = this.colorSelected;
      console.log(this.color);
      if(this.seleccion === "Mes") {
        this.getInfoDiscountinued();
      } else if (this.seleccion === "Semana") {
        this.getInfoDiscontinuedWeek();
      }
    } else if (value.clase == 'color colorStyles' && !value.checked) {
      this.color = [];
      this.colorSelected.splice(this.colorSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.colorSelected);
      if(this.seleccion === "Mes") {
        this.getInfoDiscountinued();
      } else if (this.seleccion === "Semana") {
        this.getInfoDiscontinuedWeek();
      }
    }

    if (value.checked && value.clase === 'composicion') {
      this.composicionSelected.push(item);
      this.selectedFilter.push(value);
      this.composicion = this.composicionSelected;
      console.log(this.composicion);
      if(this.seleccion === "Mes") {
        this.getInfoDiscountinued();
      } else if (this.seleccion === "Semana") {
        this.getInfoDiscontinuedWeek();
      }
    } else if (value.clase == 'composicion' && !value.checked) {
      this.composicion = [];
      this.composicionSelected.splice(this.composicionSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.composicionSelected);
      if(this.seleccion === "Mes") {
        this.getInfoDiscountinued();
      } else if (this.seleccion === "Semana") {
        this.getInfoDiscontinuedWeek();
      }
    }
  }

  filterItemsData2(value) {
    const { item } = value;
    //Filtro tabla
    if (value.checked && value.clase === 'marca2') {
      this.originSelected2.push(item);
      this.selectedFilter2.push(value);
      this.origin2 = this.originSelected2;
      this.getInfotableDiscountinued();
      this.rerender();
    } else if (value.clase == 'marca2' && !value.checked) {
      this.origin2 = [];
      this.originSelected2.splice(this.originSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      this.getInfotableDiscountinued();
      this.rerender();
    }

    if (value.checked && value.clase === 'categoria2') {
      this.categoriaSelected2.push(item);
      this.selectedFilter2.push(value);
      this.categoria2 = this.categoriaSelected2;
      this.getInfotableDiscountinued();
      this.rerender();
    } else if (value.clase == 'categoria2' && !value.checked) {
      this.categoria2 = [];
      this.categoriaSelected2.splice(this.categoriaSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      this.getInfotableDiscountinued();
      this.rerender();
    }

    if (value.checked && value.clase === 'subCategoria2') {
      this.subCategoriaSelected2.push(item);
      this.selectedFilter2.push(value);
      this.subCategoria2 = this.subCategoriaSelected2;
      this.getInfotableDiscountinued();
      this.rerender();
    } else if (value.clase == 'subCategoria2' && !value.checked) {
      this.subCategoria2 = []
      this.subCategoriaSelected2.splice(this.subCategoriaSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      this.getInfotableDiscountinued();
      this.rerender();
    }

    if (value.checked && value.clase === 'tipoPrenda2') {
      this.tipoPrendaSelected2.push(item);
      this.selectedFilter2.push(value);
      this.tipoPrenda2 = this.tipoPrendaSelected2;
      this.getInfotableDiscountinued();
      this.rerender();
    } else if (value.clase == 'tipoPrenda2' && !value.checked) {
      this.tipoPrenda2 = [];
      this.tipoPrendaSelected2.splice(this.tipoPrendaSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      this.getInfotableDiscountinued();
      this.rerender();
    }

    if (value.checked && value.clase === 'color2 colorStyles') {
      this.colorSelected2.push(item);
      this.selectedFilter2.push(value);
      this.color2 = this.colorSelected2;
      this.getInfotableDiscountinued();
      this.rerender();
    } else if (value.clase == 'color2 colorStyles' && !value.checked) {
      this.color2 = [];
      this.colorSelected2.splice(this.colorSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      this.getInfotableDiscountinued();
      this.rerender();
    }

    if (value.checked && value.clase === 'composicion2') {
      this.composicionSelected2.push(item);
      this.selectedFilter2.push(value);
      this.composicion2 = this.composicionSelected2;
      console.log(this.composicion2);
      this.getInfotableDiscountinued();
      this.rerender();
    } else if (value.clase == 'composicion2' && !value.checked) {
      this.composicion2 = [];
      this.composicionSelected2.splice(this.composicionSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      console.log(this.composicionSelected2);
      this.getInfotableDiscountinued();
      this.rerender();
    }
  }



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

    if(this.seleccion === "Mes") {
      this.getInfoDiscountinued();
    } else if (this.seleccion === "Semana") {
      this.getInfoDiscontinuedWeek();
    }
  }

  closeModal() {
    this.modalRef.hide();
  }


  // modal table
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

    this.getInfotableDiscountinued();
    this.rerender();
  }

  closeModal2() {
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
  }

  validateCheckCategory(value: any, categoriaCheck: any) {
    let validarCategoria = false;
    validarCategoria = this.categoriaSelected.some(element => element === value)
    if (validarCategoria) {
      let chequearCategoria = document.getElementById(`categoria${categoriaCheck}`);
      chequearCategoria.setAttribute('checked', 'checked');
    }
  }

  validateCheckSubCategory(value: any, subCategoriaCheck: any) {
    let validarSubCategoria = false;
    validarSubCategoria = this.subCategoriaSelected.some(element => element === value)
    if (validarSubCategoria) {
      let chequearSubCategoria = document.getElementById(`subcategoria${subCategoriaCheck}`);
      chequearSubCategoria.setAttribute('checked', 'checked');
    }
  }

  validateCheckTipoPrenda(value: any, tipoPrendaCheck: any) {
    let validarTipoPrenda = false;
    validarTipoPrenda = this.tipoPrendaSelected.some(element => element === value)
    if (validarTipoPrenda) {
      let chequearTipoPrenda = document.getElementById(`tipoprenda${tipoPrendaCheck}`);
      chequearTipoPrenda.setAttribute('checked', 'checked');
    }
  }

  validateCheckColor(value: any, colorCheck: any) {
    let validarColor = false;
    validarColor = this.colorSelected.some(element => element === value)
    if (validarColor) {
      let chequearColor = document.getElementById(`color${colorCheck}`);
      chequearColor.setAttribute('checked', 'checked');
    }
  }

  validateCheckComposicion(value: any, composicionCheck: any) {
    let validarComposicion = false;
    validarComposicion = this.composicionSelected.some(element => element === value)
    if (validarComposicion) {
      let chequearComposicion = document.getElementById(`composicion${composicionCheck}`);
      chequearComposicion.setAttribute('checked', 'checked');
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
  }

  validateCheckCategory2(value: any, categoriaCheck2: any) {
    let validarCategoria2 = false;
    validarCategoria2 = this.categoriaSelected2.some(element => element === value)
    if (validarCategoria2) {
      let chequearCategoria2 = document.getElementById(`categoria2${categoriaCheck2}`);
      chequearCategoria2.setAttribute('checked', 'checked');
    }
  }

  validateCheckSubCategory2(value: any, subCategoriaCheck2: any) {
    let validarSubCategoria2 = false;
    validarSubCategoria2 = this.subCategoriaSelected2.some(element => element === value)
    if (validarSubCategoria2) {
      let chequearSubCategoria2 = document.getElementById(`subcategoria2${subCategoriaCheck2}`);
      chequearSubCategoria2.setAttribute('checked', 'checked');
    }
  }

  validateCheckTipoPrenda2(value: any, tipoPrendaCheck2: any) {
    let validarTipoPrenda2 = false;
    validarTipoPrenda2 = this.tipoPrendaSelected2.some(element => element === value)
    if (validarTipoPrenda2) {
      let chequearTipoPrenda2 = document.getElementById(`tipoprenda2${tipoPrendaCheck2}`);
      chequearTipoPrenda2.setAttribute('checked', 'checked');
    }
  }

  validateCheckColor2(value: any, colorCheck2: any) {
    let validarColor2 = false;
    validarColor2 = this.colorSelected2.some(element => element === value)
    if (validarColor2) {
      let chequearColor2 = document.getElementById(`color2${colorCheck2}`);
      chequearColor2.setAttribute('checked', 'checked');
    }
  }

  validateCheckComposicion2(value: any, composicionCheck2: any) {
    let validarComposicion2 = false;
    validarComposicion2 = this.composicionSelected2.some(element => element === value)
    if (validarComposicion2) {
      let chequearComposicion2 = document.getElementById(`composicion2${composicionCheck2}`);
      chequearComposicion2.setAttribute('checked', 'checked');
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

  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      // Destroy the table first
      dtInstance.destroy();
    });
    this.dtOptionsReload();
  }

  dtOptionsReload() {
    this.dtOptions = {
      destroy: true,
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json',
      },
    };
  }

  canvas: any;
  ctx: any;
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
            data: this.averageDiscountinued1,
            borderColor: '#c95b10',
            fill: true,
          },
          {
            label: this.label2,
            data: this.averageDiscountinued2,
            borderColor: '#e5a67c',
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
