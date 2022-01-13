import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { BlackboxService } from '../../services/blackbox.service';

// Angular DataTable
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

//Filtro modal
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Datos } from '../../utils/index';

interface valueFilter {
  checked: boolean;
  clase: string;
  item: string;
}

@Component({
  selector: 'app-informe-categoria',
  templateUrl: './informe-categoria.component.html',
  styleUrls: ['./informe-categoria.component.css'],
})
export class InformeCategoriaComponent implements OnDestroy, OnInit {
  //Config modal filtros
  modalRef: BsModalRef;
  modalRefCards: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
  };

  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  photos: any;

  // variables para las cards
  womenNew: any = 0;
  womendiscontinued: any = 0;
  womenPromotion: any = 0;
  womensku: any = 0;

  menNew: any = 0;
  mendiscontinued: any = 0;
  menPromotion: any = 0;
  mensku: any = 0;

  kidsNew: any = 0;
  kidsdiscontinued: any = 0;
  kidsPromotion: any = 0;
  kidssku: any = 0;

  //Cards
  originCards: any = '';
  categoriaCards: any = '';
  subCategoriaCards: any = '';
  tipoPrendaCards: any = '';
  colorCards: any = '';
  composicionCards: any = "";

  //Tabla 1
  origin: any = '';
  categoria: any = '';
  subCategoria: any = '';
  tipoPrenda: any = '';
  color: any = '';
  composicion: any = "";


  //Datos index.ts
  datos: any;
  originData: any;
  categoryData: any;
  subCategoryData: any;
  tipoPrendaData: any;
  colorData: any;
  composicionData: any;

  //Cards
  selectedFilterCards = [];
  originSelectedCards = [];
  categoriaSelectedCards = [];
  subCategoriaSelectedCards = [];
  tipoPrendaSelectedCards = [];
  colorSelectedCards = [];
  composicionSelectedCards = [];

  //Tabla 1
  selectedFilter = [];
  originSelected = [];
  categoriaSelected = [];
  subCategoriaSelected = [];
  tipoPrendaSelected = [];
  colorSelected = [];
  composicionSelected = [];

  averagePrice: any;
  averageNews2: any;
  averageDiscount2: any;
  tasaFrescura: any;
  tableAvgSKU: any;
  tableDifference: any;
  inicio: any = '';
  fin: any = '';

  
  constructor(
    private blackboxService: BlackboxService, private modalServiceCards: BsModalService, private modalService: BsModalService
  ) {
    this.datos = new Datos();
  }

  ngOnInit(): void {
    this.toggleSidebar();
    this.getInfoCards();
    this.getInfoTable();
    this.showDataModal();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json',
      },
      destroy: true,
    };
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  // Ocultar/Mostrar sidebar
  toggleSidebar() {
    $('#menu-toggle-sidebar2').on('click', function (e) {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
      (<any>(
        $('#wrapper.toggled').find('#sidebar-wrapper').find('.collapse')
      )).collapse('hide');
    });
  }

  // Peticion infoCards
  getInfoCards() {
    let params = {
      origin: this.originSelectedCards,
      categoria: this.categoriaSelectedCards,
      subCategoria: this.subCategoriaSelectedCards,
      tipoPrenda: this.tipoPrendaSelectedCards,
      color: this.colorSelectedCards,
      fechaInicio: this.inicio,
      fechaFin: this.fin
      
    };

    this.blackboxService.getPrendasInfoCards(params).subscribe(
      (res) => {
        this.setPrendasInfoCards(res);
        // console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // setteo de datos en las cards
  setPrendasInfoCards(res) {
    this.womenNew = new Intl.NumberFormat('es-CO').format(res.obj.newWomen);
    this.womendiscontinued = new Intl.NumberFormat('es-CO').format(res.obj.discontinuedWomen);
    this.womenPromotion = new Intl.NumberFormat('es-CO').format(res.obj.promotionWomen);
    this.womensku = new Intl.NumberFormat('es-CO').format(res.obj.totalskuWomen);

    this.menNew = new Intl.NumberFormat('es-CO').format(res.obj.newMen);
    this.mendiscontinued = new Intl.NumberFormat('es-CO').format(res.obj.discontinuedMen);
    this.menPromotion = new Intl.NumberFormat('es-CO').format(res.obj.promotionMen);
    this.mensku = new Intl.NumberFormat('es-CO').format(res.obj.totalskuMen);

    this.kidsNew = new Intl.NumberFormat('es-CO').format(res.obj.newKids);
    this.kidsdiscontinued = new Intl.NumberFormat('es-CO').format(res.obj.discontinuedKids);
    this.kidsPromotion = new Intl.NumberFormat('es-CO').format(res.obj.promotionKids);
    this.kidssku = new Intl.NumberFormat('es-CO').format(res.obj.totalskuKids);
  }

  // Peticion a la tabla 1
  getInfoTable() {
    let params = {
      origin: this.originSelected,
      categoria: this.categoriaSelected,
      subCategoria: this.subCategoriaSelected,
      tipoPrenda: this.tipoPrendaSelected,
      color: this.colorSelected,
      composicion: this.composicionSelected
    };

    //Cambiar la ruta de get
    this.blackboxService.getTableSKUInfo(params).subscribe(
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
      if(element.precioPromedio !== null) {
        element.precioPromedio = new Intl.NumberFormat('es-CO').format(element.precioPromedio);
        element.nuevos = new Intl.NumberFormat('es-CO').format(element.nuevos);
        element.SKU = new Intl.NumberFormat('es-CO').format(element.SKU);

      }

      return element
    });
    this.photos = res.obj.arr2;


    // this.photos = res.obj.arr;
    // this.tableAvgSKU = new Intl.NumberFormat('es-CO').format(res.obj.SKU);
    // this.tableDifference = res.obj.differences;
    // this.averagePrice = new Intl.NumberFormat('es-CO').format(res.obj.precioPromedio);
    // this.averageNews2 = new Intl.NumberFormat('es-CO').format(res.obj.nuevosPromedio);
    // this.averageDiscount2 = res.obj.descuentoPromedio;
    // this.tasaFrescura = res.obj.tasaFrescura;
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

  //Recibe los datos seleccionados en el filtro
  filterItemsData(value) {
    const { item } = value;

    //Filtro cards
    if (value.checked && value.clase === 'marcaCards') {
      this.originSelectedCards.push(item);
      this.selectedFilterCards.push(value);
      this.originCards = this.originSelectedCards;
      console.log(this.originCards);
      this.getInfoCards();
    } else if (value.clase == 'marcaCards' && !value.checked) {
      this.originCards = [];
      this.originSelectedCards.splice(this.originSelectedCards.indexOf(item), 1);
      this.selectedFilterCards.splice(this.selectedFilterCards.indexOf(value), 1);
      console.log(this.originSelectedCards);
      this.getInfoCards();
    }

    if (value.checked && value.clase === 'categoriaCards') {
      this.categoriaSelectedCards.push(item);
      this.selectedFilterCards.push(value);
      this.categoriaCards = this.categoriaSelected;
      console.log(this.categoriaCards);
      this.getInfoCards();
    } else if (value.clase == 'categoriaCards' && !value.checked) {
      this.categoriaCards = [];
      this.categoriaSelectedCards.splice(this.categoriaSelectedCards.indexOf(item), 1);
      this.selectedFilterCards.splice(this.selectedFilterCards.indexOf(value), 1);
      console.log(this.categoriaSelectedCards);
      this.getInfoCards();
    }

    if (value.checked && value.clase === 'subCategoriaCards') {
      this.subCategoriaSelectedCards.push(item);
      this.selectedFilterCards.push(value);
      this.subCategoriaCards = this.subCategoriaSelectedCards;
      console.log(this.subCategoriaCards);
      this.getInfoCards();
    } else if (value.clase == 'subCategoriaCards' && !value.checked) {
      this.subCategoriaCards = [];
      this.subCategoriaSelectedCards.splice(this.subCategoriaSelectedCards.indexOf(item), 1);
      this.selectedFilterCards.splice(this.selectedFilterCards.indexOf(value), 1);
      console.log(this.subCategoriaSelectedCards);
      this.getInfoCards();
    }

    if (value.checked && value.clase === 'tipoPrendaCards') {
      this.tipoPrendaSelectedCards.push(item);
      this.selectedFilterCards.push(value);
      this.tipoPrendaCards = this.tipoPrendaSelectedCards;
      console.log(this.tipoPrendaCards);
      this.getInfoCards();
    } else if (value.clase == 'tipoPrendaCards' && !value.checked) {
      this.tipoPrendaCards = [];
      this.tipoPrendaSelectedCards.splice(this.tipoPrendaSelectedCards.indexOf(item), 1);
      this.selectedFilterCards.splice(this.selectedFilterCards.indexOf(value), 1);
      console.log(this.tipoPrendaSelectedCards);
      this.getInfoCards();
    }

    if (value.checked && value.clase === 'colorCards colorStyles') {
      this.colorSelectedCards.push(item);
      this.selectedFilterCards.push(value);
      this.colorCards = this.colorSelectedCards;
      console.log(this.colorCards);
      this.getInfoCards();
    } else if (value.clase == 'colorCards colorStyles' && !value.checked) {
      this.colorCards = [];
      this.colorSelectedCards.splice(this.colorSelectedCards.indexOf(item), 1);
      this.selectedFilterCards.splice(this.selectedFilterCards.indexOf(value), 1);
      console.log(this.colorSelectedCards);
      this.getInfoCards();
    }

    if (value.checked && value.clase === 'composicionCards') {
      this.composicionSelectedCards.push(item);
      this.selectedFilterCards.push(value);
      this.composicionCards = this.composicionSelectedCards;
      console.log(this.composicionCards);
      this.getInfoCards();
    } else if (value.clase == 'composicionCards' && !value.checked) {
      this.composicionCards = [];
      this.composicionSelectedCards.splice(this.composicionSelectedCards.indexOf(item), 1);
      this.selectedFilterCards.splice(this.selectedFilterCards.indexOf(value), 1);
      console.log(this.composicionSelectedCards);
      this.getInfoCards();
    }     

    //Filtro tabla
    if (value.checked && value.clase === 'marca') {
      this.originSelected.push(item);
      this.selectedFilter.push(value);
      this.origin = this.originSelected;
      console.log(this.origin);
      this.getInfoTable();
      this.rerender();
    } else if (value.clase == 'marca' && !value.checked) {
      this.origin = [];
      this.originSelected.splice(this.originSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.originSelected);
      this.getInfoTable();
      this.rerender();
    }

    if (value.checked && value.clase === 'categoria') {
      this.categoriaSelected.push(item);
      this.selectedFilter.push(value);
      this.categoria = this.categoriaSelected;
      console.log(this.categoria);
      this.getInfoTable();
      this.rerender();
    } else if (value.clase == 'categoria' && !value.checked) {
      this.categoria = [];
      this.categoriaSelected.splice(this.categoriaSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.categoriaSelected);
      this.getInfoTable();
      this.rerender();
    }

    if (value.checked && value.clase === 'subCategoria') {
      this.subCategoriaSelected.push(item);
      this.selectedFilter.push(value);
      this.subCategoria = this.subCategoriaSelected;
      console.log(this.subCategoria);
      this.getInfoTable();
      this.rerender();
    } else if (value.clase == 'subCategoria' && !value.checked) {
      this.subCategoria = [];
      this.subCategoriaSelected.splice(
      this.subCategoriaSelected.indexOf(item),1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.subCategoriaSelected);
      this.getInfoTable();
      this.rerender();
    }

    if (value.checked && value.clase === 'tipoPrenda') {
      this.tipoPrendaSelected.push(item);
      this.selectedFilter.push(value);
      this.tipoPrenda = this.tipoPrendaSelected;
      console.log(this.tipoPrenda);
      this.getInfoTable();
      this.rerender();
    } else if (value.clase == 'tipoPrenda' && !value.checked) {
      this.tipoPrenda = [];
      this.tipoPrendaSelected.splice(this.tipoPrendaSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.tipoPrendaSelected);
      this.getInfoTable();
      this.rerender();
    }

    if (value.checked && value.clase === 'color colorStyles') {
      this.colorSelected.push(item);
      this.selectedFilter.push(value);
      this.color = this.colorSelected;
      console.log(this.color);
      this.getInfoTable();
      this.rerender();
    } else if (value.clase == 'color colorStyles' && !value.checked) {
      this.color = [];
      this.colorSelected.splice(this.colorSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.colorSelected);
      this.getInfoTable();
      this.rerender();
    }

    if (value.checked && value.clase === 'composicion') {
      this.composicionSelected.push(item);
      this.selectedFilter.push(value);
      this.composicion = this.composicionSelected;
      console.log(this.composicion);
      this.getInfoTable();
      this.rerender();
    } else if (value.clase == 'composicion' && !value.checked) {
      this.composicion = [];
      this.composicionSelected.splice(this.composicionSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.composicionSelected);
      this.getInfoTable();
      this.rerender();
    }            
  }

  // Modal Cards
  openModalCards(templateCards: TemplateRef<any>) {
    this.modalRefCards = this.modalServiceCards.show(templateCards, this.config);
  }

  clearFiltersCards() {
    this.originCards = [];
    this.categoriaCards = [];
    this.subCategoriaCards = [];
    this.tipoPrendaCards = [];
    this.composicionCards = [];

    this.originSelectedCards.splice(0, this.originSelectedCards.length);
    this.categoriaSelectedCards.splice(0, this.categoriaSelectedCards.length);
    this.subCategoriaSelectedCards.splice(0, this.subCategoriaSelectedCards.length);
    this.tipoPrendaSelectedCards.splice(0, this.tipoPrendaSelectedCards.length);
    this.colorSelectedCards.splice(0, this.colorSelectedCards.length);
    this.composicionSelectedCards.splice(0, this.composicionSelectedCards.length);
    this.selectedFilterCards.splice(0, this.selectedFilterCards.length);

    $(".marcaCards").prop("checked", false);
    $(".categoriaCards").prop("checked", false);
    $(".subCategoriaCards").prop("checked", false);
    $(".tipoPrendaCards").prop("checked", false);
    $(".colorCards").prop("checked", false);
    $(".composicionCards").prop("checked", false);

    this.getInfoCards();
  }

  closeModalCards() {
    this.modalRefCards.hide();
  }

  // Modal Tabla 1
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

    this.getInfoTable();
    this.rerender();
  }

  closeModal() {
    this.modalRef.hide();
  }

  //Validar checks filtros al cerrar modal cards
  validateCheckOriginCards(value: any, marcaCheckCards: any) {
    let validarMarcaCards = false;
    validarMarcaCards = this.originSelectedCards.some(element => element === value)
    if (validarMarcaCards) {
      let chequearMarcaCards = document.getElementById(`marca${marcaCheckCards}`);
      chequearMarcaCards.setAttribute('checked', 'checked');
    }
  }

  validateCheckCategoryCards(value: any, categoriaCheckCards: any) {
    let validarCategoriaCards = false;
    validarCategoriaCards = this.categoriaSelectedCards.some(element => element === value)
    if (validarCategoriaCards) {
      let chequearCategoriaCards = document.getElementById(`categoria${categoriaCheckCards}`);
      chequearCategoriaCards.setAttribute('checked', 'checked');
    }
  }

  validateCheckSubCategoryCards(value: any, subCategoriaCheckCards: any) {
    let validarSubCategoriaCards = false;
    validarSubCategoriaCards = this.subCategoriaSelectedCards.some(element => element === value)
    if (validarSubCategoriaCards) {
      let chequearSubCategoriaCards = document.getElementById(`subcategoria${subCategoriaCheckCards}`);
      chequearSubCategoriaCards.setAttribute('checked', 'checked');
    }
  }

  validateCheckTipoPrendaCards(value: any, tipoPrendaCheckCards: any) {
    let validarTipoPrendaCards = false;
    validarTipoPrendaCards = this.tipoPrendaSelectedCards.some(element => element === value)
    if (validarTipoPrendaCards) {
      let chequearTipoPrendaCards = document.getElementById(`tipoprenda${tipoPrendaCheckCards}`);
      chequearTipoPrendaCards.setAttribute('checked', 'checked');
    }
  }

  validateCheckColoCards(value: any, colorCheckCards: any) {
    let validarColorCards = false;
    validarColorCards = this.colorSelectedCards.some(element => element === value)
    if (validarColorCards) {
      let chequearColorCards = document.getElementById(`color${colorCheckCards}`);
      chequearColorCards.setAttribute('checked', 'checked');
    }
  }

  validateCheckComposicionCards(value: any, composicionCheckCards: any) {
    let validarComposicionCards = false;
    validarComposicionCards = this.composicionSelectedCards.some(element => element === value)
    if (validarComposicionCards) {
      let chequearComposicionCards = document.getElementById(`composicion${composicionCheckCards}`);
      chequearComposicionCards.setAttribute('checked', 'checked');
    }
  }   

  //Validar checks filtros al cerrar modal tabla
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

  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
    this.dtOptionsReload();
  }

  fechaInicio(){    
    // console.log(this.inicio);
    this.getInfoCards();
  }

  fechaFin(){
    // let date = new Date(this.fin);
    // console.log(this.fin);
    this.getInfoCards();
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
}
