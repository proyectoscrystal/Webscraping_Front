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
  priceDifference: any[];
  discountDifference: any[];
  newsDifference: any[];
  skuDifference: any[];

  infoCards: any;
  params: any;
  origin: String = '';
  categoria: String = '';
  subCategoria: String = '';
  tipoPrenda: String = '';
  color: String = '';
  precioPromedio: any;

  //Datos index.ts
  datos: any;
  originData: any;
  categoryData: any;
  subCategoryData: any;
  tipoPrendaData: any;
  colorData: any;

  selectedFilter = [];

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
    this.onlyOne();
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
        this.filterDuplicatesSubCategorys();
        this.filterDuplicatesImagesNames();
        this.filterDuplicatesColors();
        this.filterDuplicatesMaterials();
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
      origin: this.origin,
      categoria: this.categoria,
      subCategoria: this.subCategoria,
      tipoPrenda: this.tipoPrenda,
      color: this.color
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

    if (value.checked && value.clase === 'marca check') {
      this.origin = item;
      this.selectedFilter.push(value);
      console.log(item);
    } else if (value.clase == 'marca check' && !value.checked) {
      this.origin = "";
      console.log(this.origin);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
    }

    if (value.checked && value.clase === 'categoria check2') {
      this.categoria = item;
      this.selectedFilter.push(value);
      console.log(item);
    } else if (value.clase == 'categoria check2' && !value.checked) {
      this.categoria = "";
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
    }

    if (value.checked && value.clase === 'subCategoria check3') {
      this.subCategoria = item;
      this.selectedFilter.push(value);
      console.log(item);
    } else if (value.clase == 'subCategoria check3' && !value.checked) {
      this.subCategoria = "";
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
    }

    if (value.checked && value.clase === 'tipoPrenda check4') {
      this.tipoPrenda = item;
      this.selectedFilter.push(value);
      console.log(item);
    } else if (value.clase == 'tipoPrenda check4' && !value.checked) {
      this.tipoPrenda = "";
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
    }

    if (value.checked && value.clase === 'color check5') {
      this.color = item;
      this.selectedFilter.push(value);
      console.log(item);
    } else if (value.clase == 'color check5' && !value.checked) {
      this.color = "";
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
    }

  }

  openModal(template: TemplateRef<any>) {
    this.origin = '';
    this.categoria = '';
    this.subCategoria = '';
    this.tipoPrenda = '';
    this.color = '';

    this.selectedFilter.splice(0, this.selectedFilter.length);

    this.modalRef = this.modalService.show(template, this.config);
  }

  closeModal() {
    this.modalRef.hide();

    this.selectedFilter.splice(0, this.selectedFilter.length);
  }

  applyFilter() {
    this.modalRef.hide();

    this.getInfoCards();
  }

  onlyOne() {
    $(document).on("change", ".check", function () {
      var $allCheckboxes = $(".check");
      $allCheckboxes.prop("disabled", false);
      this.checked && $allCheckboxes.not(this).prop("disabled", true);
    });

    $(document).on("change", ".check2", function () {
      var $allCheckboxes = $(".check2");
      $allCheckboxes.prop("disabled", false);
      this.checked && $allCheckboxes.not(this).prop("disabled", true);
    });

    $(document).on("change", ".check3", function () {
      var $allCheckboxes = $(".check3");
      $allCheckboxes.prop("disabled", false);
      this.checked && $allCheckboxes.not(this).prop("disabled", true);
    });

    $(document).on("change", ".check4", function () {
      var $allCheckboxes = $(".check4");
      $allCheckboxes.prop("disabled", false);
      this.checked && $allCheckboxes.not(this).prop("disabled", true);
    });

    $(document).on("change", ".check5", function () {
      var $allCheckboxes = $(".check5");
      $allCheckboxes.prop("disabled", false);
      this.checked && $allCheckboxes.not(this).prop("disabled", true);
    });
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

  filterDuplicatesSubCategorys() {
    this.subcategorys = this.photos.filter(
      (dupe: { subCategoria: any; }, i: any, arr: any[]) => arr.findIndex(t => t.subCategoria === dupe.subCategoria) === i
    );
  }
  filterDuplicatesImagesNames() {
    this.imagesnames = this.photos.filter(
      (dupe: { imageName: any; }, i: any, arr: any[]) => arr.findIndex(t => t.imageName === dupe.imageName) === i
    );
  }
  filterDuplicatesColors() {
    this.colors = this.photos.filter(
      (dupe: { color: any; }, i: any, arr: any[]) => arr.findIndex(t => t.color === dupe.color) === i
    );
  }
  filterDuplicatesMaterials() {
    this.materials = this.photos.filter(
      (dupe: { materiales: any; }, i: any, arr: any[]) => arr.findIndex(t => t.materiales === dupe.materiales) === i
    );
  }
}
