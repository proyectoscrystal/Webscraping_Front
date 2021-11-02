import { formatCurrency } from '@angular/common';
import { Component, OnInit, TemplateRef, ViewChild, Inject, LOCALE_ID } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';
import { Chart, ChartConfiguration, registerables, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js'
import { BlackboxService } from '../../services/blackbox.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

import { InformePrecioComponent } from './informe-precio/informe-precio.component';
import { InformeDescuentoComponent } from './informe-descuento/informe-descuento.component';
import { InformeNuevosComponent } from './informe-nuevos/informe-nuevos.component';
import { InformeSKUComponent } from './informe-sku/informe-sku.component';

import { Datos } from '../../utils/index';

interface valueFilter {
  checked: boolean;
  clase: string;
  item: string;
}

@Component({
  selector: 'app-informes',
  templateUrl: './informes.component.html',
  styleUrls: ['./informes.component.css']
})
export class InformesComponent implements OnInit {
  // @ViewChild(InformeDescuentoComponent) informeDescuento: InformeDescuentoComponent;
  // @ViewChild(InformeNuevosComponent) informeNuevo: InformeNuevosComponent;
  // @ViewChild(InformeSKUComponent) informeSKU: InformeSKUComponent;

  //Config modal filtros
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true
  };

  photos: any;
  averagePrice: number;
  totalNew: any;
  totalDescontinuados: any = 0;
  categorys: any;
  subcategorys: any;
  imagesnames: any;
  colors: any;
  materials: any;

  // variables de los cards
  totalsku: any = '';
  totalDiscount: number;
  currency1: any = '';
  priceDifference: any[] = [0,0];
  discountDifference: any[] = [0,0];
  newsDifference: any[] = [0,0];
  skuDifference: any[] = [0,0];

  infoCards: any;
  params: any;
  origin: any = '';
  categoria: any = '';
  subCategoria: any = '';
  tipoPrenda: any = '';
  color: any = '';
  precioPromedio: any;

  //Datos index.ts
  datos: any;
  originData: any;
  categoryData: any;
  subCategoryData: any;
  tipoPrendaData: any;
  colorData: any;

  // filtros seleccionados
  selectedFilter = [];
  originSelected = [];
  categoriaSelected = [];
  subCategoriaSelected = [];
  tipoPrendaSelected = [];
  colorSelected = [];

  inicio = '';
  fin = '';
  origenSeleccionado: any;
  origenCheck: any;

  constructor(private blackboxService: BlackboxService, @Inject(LOCALE_ID) public locale: string, private modalService: BsModalService) {
    Chart.register(...registerables);
    this.datos = new Datos();
    // metodo para obtener todos los documentos de tipo images
  }

  ngOnInit(): void {
    this.getInfoCards();
    this.showDataModal();
    this.getPhotoList();
    this.toggleSidebar();
  }

  // Ocultar/Mostrar sidebar
  toggleSidebar() {
    $('#menu-toggle-sidebar').on('click', function (e) {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
      (<any>$('#wrapper.toggled').find("#sidebar-wrapper").find(".collapse")).collapse('hide');
    });
  }

  getPhotoList() {
    this.blackboxService.getPhotos().subscribe(
      (res) => {
        this.photos = res;
        return (this.photos = res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //===============INICIO FILTROS MODAL===============

  //Setear filtros obtenidos en cards
  getInfoCards() {

    let params = {
      origin: this.originSelected,
      categoria: this.categoriaSelected,
      subCategoria: this.subCategoriaSelected,
      tipoPrenda: this.tipoPrendaSelected,
      color: this.colorSelected,
      fechaInicio: this.inicio,
      fechaFin: this.fin
    };

    this.blackboxService.getInfoCards(params).subscribe(
      (res) => {
        this.setInfoCards(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //Obtener datos desde index.ts para mostrar en el modal
  showDataModal() {
    this.originData = this.datos.origins;
    this.categoryData = this.datos.categorias;
    this.subCategoryData = this.datos.subcategorias;
    this.tipoPrendaData = this.datos.tipoprendas;
    this.colorData = this.datos.colores;
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

  //Recibe los datos seleccionados en el filtro
  filterItemsData(value) {
    const { item } = value;

    if (value.checked && value.clase === 'marca') {
      this.originSelected.push(item);
      this.selectedFilter.push(value);
      this.origin = this.originSelected;
      console.log(this.origin);

      localStorage.setItem("Origen", JSON.stringify(this.originSelected));

      this.getInfoCards();

    } else if (value.clase == 'marca' && !value.checked) {
      this.origin = [];
      this.originSelected.splice(this.originSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.originSelected);

      localStorage.removeItem("Origen");

      this.getInfoCards();
    }

    if (value.checked && value.clase === 'categoria') {
      this.categoriaSelected.push(item);
      this.selectedFilter.push(value);
      this.categoria = this.categoriaSelected;
      console.log(this.categoria);

      this.getInfoCards();
    } else if (value.clase == 'categoria' && !value.checked) {
      this.categoria = [];
      this.categoriaSelected.splice(this.categoriaSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.categoriaSelected);

      this.getInfoCards();
    }

    if (value.checked && value.clase === 'subCategoria') {
      this.subCategoriaSelected.push(item);
      this.selectedFilter.push(value);
      this.subCategoria = this.subCategoriaSelected;
      console.log(this.subCategoria);

      this.getInfoCards();
    } else if (value.clase == 'subCategoria' && !value.checked) {
      this.subCategoria = []
      this.subCategoriaSelected.splice(this.subCategoriaSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.subCategoriaSelected);

      this.getInfoCards();
    }

    if (value.checked && value.clase === 'tipoPrenda') {
      this.tipoPrendaSelected.push(item);
      this.selectedFilter.push(value);
      this.tipoPrenda = this.tipoPrendaSelected;
      console.log(this.tipoPrenda);

      this.getInfoCards();
    } else if (value.clase == 'tipoPrenda' && !value.checked) {
      this.tipoPrenda = [];
      this.tipoPrendaSelected.splice(this.tipoPrendaSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.tipoPrendaSelected);

      this.getInfoCards();
    }

    if (value.checked && value.clase === 'color') {
      this.colorSelected.push(item);
      this.selectedFilter.push(value);
      this.color = this.colorSelected;
      console.log(this.color);

      this.getInfoCards();
    } else if (value.clase == 'color' && !value.checked) {
      this.color = [];
      this.colorSelected.splice(this.colorSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.colorSelected);

      this.getInfoCards();
    }
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  clearFilters () {
    this.inicio = '';
    this.fin = '';
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
    this.selectedFilter.splice(0, this.selectedFilter.length);

    this.getInfoCards();
  }

  closeModal() {
    this.modalRef.hide();
  }
  
  setCheck() {
    this.origenCheck = localStorage.getItem("Origen");
    this.origenCheck = JSON.parse(this.origenCheck);
    console.log("Marca almacenada: " + this.origenCheck);

    if (this.origenCheck !== null) {
      var chequear = document.getElementById("marca");
      chequear.setAttribute('checked', 'checked');
    }
  }

  clearLocalStorage() {
    //localStorage.clear();
  }

  localStorageAlert() {
    this.origenSeleccionado = localStorage.getItem("Origen");
    alert(this.origenSeleccionado);
  }

  //===============FIN FILTROS MODAL===============

  setInfoCards(info: any) {
    this.precioPromedio = info.obj.precioPromedio;
    this.currency1 = formatCurrency(this.precioPromedio, this.locale, '$ ');
    this.currency1 = this.currency1.split(' ').splice(1, 1);
    this.currency1 = this.currency1[0].split('.');
    this.currency1 = this.currency1.splice(0, 1);
    this.currency1 = this.currency1[0];
    this.currency1 = this.currency1.split(',').join('.');

    this.totalDiscount = info.obj.discount;
    this.totalNew = info.obj.nuevos;
    this.totalDescontinuados = info.obj.descontinuados;
    this.totalsku = info.obj.sku

    this.priceDifference = info.obj.differencePrice;
    this.discountDifference = info.obj.differencePorcentage;
    this.skuDifference = info.obj.differenceSKU;
    this.newsDifference = info.obj.differenceNew;
  }

  fechaInicio(){    
    console.log(this.inicio);
    this.getInfoCards();
  }

  fechaFin(){
    // let date = new Date(this.fin);
    console.log(this.fin);
    this.getInfoCards();
  }

  // metodos para setear la clase de las diferencias
  difference1() {
    if (this.priceDifference[0] === 0) {
      return 'porcentaje2';
    }
    return 'porcentaje';
  }

  difference2() {
    if (this.discountDifference[0] === 0) {
      return 'porcentaje2';
    }
    return 'porcentaje';
  }

  difference3() {
    if (this.newsDifference[0] === 0) {
      return 'porcentaje2';
    }
    return 'porcentaje';
  }


  difference5() {
    if (this.skuDifference[0] === 0) {
      return 'porcentaje2';
    }
    return 'porcentaje';
  }



}
