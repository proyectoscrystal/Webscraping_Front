import { AfterViewInit, Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

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
  styleUrls: ['./informe-categoria.component.css']
})
export class InformeCategoriaComponent implements OnDestroy, OnInit {

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

  photos: any;

  // variables para las cards
  womenNew: number = 0;
  womendiscontinued: number = 0;
  womenPromotion: number = 0;
  womensku: number = 0;

  menNew: number = 0;
  mendiscontinued: number = 0;
  menPromotion: number = 0;
  mensku: number = 0;

  kidsNew: number = 0;
  kidsdiscontinued: number = 0;
  kidsPromotion: number = 0;
  kidssku: number = 0;

  //Cards
  originCards: any = '';
  categoriaCards: any = '';
  subCategoriaCards: any = '';
  tipoPrendaCards: any = '';
  colorCards: any = '';

  //Tabla 1
  origin: any = '';
  categoria: any = '';
  subCategoria: any = '';
  tipoPrenda: any = '';
  color: any = '';

  //Tabla 2
  origin2: any = '';
  categoria2: any = '';
  subCategoria2: any = '';
  tipoPrenda2: any = '';
  color2: any = '';

  //Datos index.ts
  datos: any;
  originData: any;
  categoryData: any;
  subCategoryData: any;
  tipoPrendaData: any;
  colorData: any;

  //Cards
  selectedFilterCards = [];
  originSelectedCards = [];
  categoriaSelectedCards = [];
  subCategoriaSelectedCards = [];
  tipoPrendaSelectedCards = [];
  colorSelectedCards = [];

  //Tabla 1
  selectedFilter = [];
  originSelected = [];
  categoriaSelected = [];
  subCategoriaSelected = [];
  tipoPrendaSelected = [];
  colorSelected = [];

  //Tabla2
  selectedFilter2 = [];
  originSelected2 = [];
  categoriaSelected2 = [];
  subCategoriaSelected2 = [];
  tipoPrendaSelected2 = [];
  colorSelected2 = [];

  constructor(
    private blackboxService: BlackboxService, 
    private modalService: BsModalService,
    private modalService2: BsModalService,
    private modalServiceCards: BsModalService
  ) {
    this.datos = new Datos();
  }

  ngOnInit(): void {
    this.toggleSidebar();
    this.getInfoCards();
    this.getInfoTable();
    this.getInfoTable2();
    this.showDataModal();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json'
      }
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
      (<any>$('#wrapper.toggled').find("#sidebar-wrapper").find(".collapse")).collapse('hide');
    });
  }

  // Peticion infoCards
  getInfoCards() {
    let params = {
      origin: this.originSelectedCards,
      categoria: this.categoriaSelectedCards,
      subCategoria: this.subCategoriaSelectedCards,
      tipoPrenda: this.tipoPrendaSelected2,
      color: this.colorSelectedCards
    };

    this.blackboxService.getPrendasInfoCards(params).subscribe(
      (res) => {
        this.setPrendasInfoCards(res);
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // Peticion a la tabla 1
  getInfoTable() {
    let params = {
      origin: this.originSelected,
      categoria: this.categoriaSelected,
      subCategoria: this.subCategoriaSelected,
      tipoPrenda: this.tipoPrendaSelected,
      color: this.colorSelected,
    };

    //Cambiar la ruta de get
    this.blackboxService.getTableDiscountInfo(params).subscribe(
      (res) => {

        this.setInfoTable(res);
        this.dtTrigger.next();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // Peticion a la tabla 2
  getInfoTable2() {
    let params = {
      origin: this.originSelected2,
      categoria: this.categoriaSelected2,
      subCategoria: this.subCategoriaSelected2,
      tipoPrenda: this.tipoPrendaSelected2,
      color: this.colorSelected2,
    };

    //Cambiar la ruta de get
    this.blackboxService.getTablePriceInfo(params).subscribe(
      (res) => {

        this.setInfoTable2(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  setInfoTable(res) {
    this.photos = res.obj.arr;
  }

  setInfoTable2(res) {
    this.photos = res.obj.arr;
  }

//===============INICIO FILTROS MODAL===============

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

  //Función para validar checked del filtro
  validateCheckFilter2(checked, item, className) {
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

    } else if (value.clase == 'marca' && !value.checked) {
      this.originCards = [];
      this.originSelectedCards.splice(this.originSelectedCards.indexOf(item), 1);
      this.selectedFilterCards.splice(this.selectedFilterCards.indexOf(value), 1);
      console.log(this.originSelectedCards);
    }

    if (value.checked && value.clase === 'categoriaCards') {
      this.categoriaSelectedCards.push(item);
      this.selectedFilterCards.push(value);
      this.categoriaCards = this.categoriaSelected;
      console.log(this.categoriaCards);
    } else if (value.clase == 'categoria' && !value.checked) {
      this.categoriaCards = [];
      this.categoriaSelectedCards.splice(this.categoriaSelectedCards.indexOf(item), 1);
      this.selectedFilterCards.splice(this.selectedFilterCards.indexOf(value), 1);
      console.log(this.categoriaSelectedCards);
    }

    if (value.checked && value.clase === 'subCategoriaCards') {
      this.subCategoriaSelectedCards.push(item);
      this.selectedFilterCards.push(value);
      this.subCategoriaCards = this.subCategoriaSelectedCards;
      console.log(this.subCategoriaCards);
    } else if (value.clase == 'subCategoria' && !value.checked) {
      this.subCategoriaCards = []
      this.subCategoriaSelectedCards.splice(this.subCategoriaSelectedCards.indexOf(item), 1);
      this.selectedFilterCards.splice(this.selectedFilterCards.indexOf(value), 1);
      console.log(this.subCategoriaSelectedCards);
    }

    if (value.checked && value.clase === 'tipoPrendaCards') {
      this.tipoPrendaSelectedCards.push(item);
      this.selectedFilterCards.push(value);
      this.tipoPrendaCards = this.tipoPrendaSelectedCards;
      console.log(this.tipoPrendaCards);
    } else if (value.clase == 'tipoPrenda' && !value.checked) {
      this.tipoPrendaCards = [];
      this.tipoPrendaSelectedCards.splice(this.tipoPrendaSelectedCards.indexOf(item), 1);
      this.selectedFilterCards.splice(this.selectedFilterCards.indexOf(value), 1);
      console.log(this.tipoPrendaSelectedCards);
    }

    if (value.checked && value.clase === 'colorCards') {
      this.colorSelectedCards.push(item);
      this.selectedFilterCards.push(value);
      this.colorCards = this.colorSelectedCards;
      console.log(this.colorCards);
    } else if (value.clase == 'color' && !value.checked) {
      this.colorCards = [];
      this.colorSelectedCards.splice(this.colorSelectedCards.indexOf(item), 1);
      this.selectedFilterCards.splice(this.selectedFilterCards.indexOf(value), 1);
      console.log(this.colorSelectedCards);
    }

    //Filtro tabla
    if (value.checked && value.clase === 'marca') {
      this.originSelected.push(item);
      this.selectedFilter.push(value);
      this.origin = this.originSelected;
      console.log(this.origin);

    } else if (value.clase == 'marca' && !value.checked) {
      this.origin = [];
      this.originSelected.splice(this.originSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.originSelected);
    }

    if (value.checked && value.clase === 'categoria') {
      this.categoriaSelected.push(item);
      this.selectedFilter.push(value);
      this.categoria = this.categoriaSelected;
      console.log(this.categoria);
    } else if (value.clase == 'categoria' && !value.checked) {
      this.categoria = [];
      this.categoriaSelected.splice(this.categoriaSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.categoriaSelected);
    }

    if (value.checked && value.clase === 'subCategoria') {
      this.subCategoriaSelected.push(item);
      this.selectedFilter.push(value);
      this.subCategoria = this.subCategoriaSelected;
      console.log(this.subCategoria);
    } else if (value.clase == 'subCategoria' && !value.checked) {
      this.subCategoria = []
      this.subCategoriaSelected.splice(this.subCategoriaSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.subCategoriaSelected);
    }

    if (value.checked && value.clase === 'tipoPrenda') {
      this.tipoPrendaSelected.push(item);
      this.selectedFilter.push(value);
      this.tipoPrenda = this.tipoPrendaSelected;
      console.log(this.tipoPrenda);
    } else if (value.clase == 'tipoPrenda' && !value.checked) {
      this.tipoPrenda = [];
      this.tipoPrendaSelected.splice(this.tipoPrendaSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.tipoPrendaSelected);
    }

    if (value.checked && value.clase === 'color') {
      this.colorSelected.push(item);
      this.selectedFilter.push(value);
      this.color = this.colorSelected;
      console.log(this.color);
    } else if (value.clase == 'color' && !value.checked) {
      this.color = [];
      this.colorSelected.splice(this.colorSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.colorSelected);
    }

    //Filtro tabla 2
    if (value.checked && value.clase === 'marca2') {
      this.originSelected2.push(item);
      this.selectedFilter2.push(value);
      this.origin2 = this.originSelected2;
      console.log(this.origin2);

    } else if (value.clase == 'marca2' && !value.checked) {
      this.origin2 = [];
      this.originSelected2.splice(this.originSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      console.log(this.originSelected2);
    }

    if (value.checked && value.clase === 'categoria2') {
      this.categoriaSelected2.push(item);
      this.selectedFilter2.push(value);
      this.categoria2 = this.categoriaSelected2;
      console.log(this.categoria);
    } else if (value.clase == 'categoria2' && !value.checked) {
      this.categoria2 = [];
      this.categoriaSelected2.splice(this.categoriaSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      console.log(this.categoriaSelected2);
    }

    if (value.checked && value.clase === 'subCategoria2') {
      this.subCategoriaSelected2.push(item);
      this.selectedFilter2.push(value);
      this.subCategoria2 = this.subCategoriaSelected2;
      console.log(this.subCategoria);
    } else if (value.clase == 'subCategoria2' && !value.checked) {
      this.subCategoria2 = []
      this.subCategoriaSelected2.splice(this.subCategoriaSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      console.log(this.subCategoriaSelected2);
    }

    if (value.checked && value.clase === 'tipoPrenda2') {
      this.tipoPrendaSelected2.push(item);
      this.selectedFilter2.push(value);
      this.tipoPrenda2 = this.tipoPrendaSelected2;
      console.log(this.tipoPrenda2);
    } else if (value.clase == 'tipoPrenda2' && !value.checked) {
      this.tipoPrenda2 = [];
      this.tipoPrendaSelected2.splice(this.tipoPrendaSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      console.log(this.tipoPrendaSelected2);
    }

    if (value.checked && value.clase === 'color2') {
      this.colorSelected2.push(item);
      this.selectedFilter2.push(value);
      this.color2 = this.colorSelected2;
      console.log(this.color2);
    } else if (value.clase == 'color2' && !value.checked) {
      this.color2 = [];
      this.colorSelected2.splice(this.colorSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      console.log(this.colorSelected2);
    }
  }  

  applyFilterCards() {
    this.modalRef.hide();

    this.getInfoCards();
  }

  applyFilter() {
    this.modalRef.hide();

    this.getInfoTable();
    this.rerender();
  }

  applyFilter2() {
    this.modalRef2.hide();

    this.getInfoTable2();
    this.rerender();
  }

  openModalCards(templateCards: TemplateRef<any>) {
    this.originCards = [];
    this.categoriaCards = [];
    this.subCategoriaCards = [];
    this.tipoPrendaCards = [];
    this.colorCards = [];

    this.originSelectedCards.splice(0, this.originSelectedCards.length);
    this.categoriaSelectedCards.splice(0, this.categoriaSelectedCards.length);
    this.subCategoriaSelectedCards.splice(0, this.subCategoriaSelectedCards.length);
    this.tipoPrendaSelectedCards.splice(0, this.tipoPrendaSelectedCards.length);
    this.colorSelectedCards.splice(0, this.colorSelectedCards.length);
    this.selectedFilterCards.splice(0, this.selectedFilterCards.length);

    this.modalRef = this.modalService.show(templateCards, this.config);
  }

  openModal(template: TemplateRef<any>) {
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

    this.modalRef = this.modalService.show(template, this.config);
  }

  openModal2(template2: TemplateRef<any>) {
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
    this.selectedFilter2.splice(0, this.selectedFilter2.length);

    this.modalRef2 = this.modalService2.show(template2, this.config);
  }

  closeModalCards() {
    this.modalRef.hide();

    this.originSelectedCards.splice(0, this.originSelectedCards.length);
    this.categoriaSelectedCards.splice(0, this.categoriaSelectedCards.length);
    this.subCategoriaSelectedCards.splice(0, this.subCategoriaSelectedCards.length);
    this.tipoPrendaSelectedCards.splice(0, this.tipoPrendaSelectedCards.length);
    this.colorSelectedCards.splice(0, this.colorSelectedCards.length);
    this.selectedFilterCards.splice(0, this.selectedFilterCards.length);
  }

  closeModal() {
    this.modalRef.hide();

    this.originSelected.splice(0, this.originSelected.length);
    this.categoriaSelected.splice(0, this.categoriaSelected.length);
    this.subCategoriaSelected.splice(0, this.subCategoriaSelected.length);
    this.tipoPrendaSelected.splice(0, this.tipoPrendaSelected.length);
    this.colorSelected.splice(0, this.colorSelected.length);
    this.selectedFilter.splice(0, this.selectedFilter.length);
  }

  closeModal2() {
    this.modalRef2.hide();

    this.originSelected2.splice(0, this.originSelected2.length);
    this.categoriaSelected2.splice(0, this.categoriaSelected2.length);
    this.subCategoriaSelected2.splice(0, this.subCategoriaSelected2.length);
    this.tipoPrendaSelected2.splice(0, this.tipoPrendaSelected2.length);
    this.colorSelected2.splice(0, this.colorSelected2.length);
    this.selectedFilter2.splice(0, this.selectedFilter2.length);
  }  

  rerender(): void {
    this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
    });
    this.dtOptionsReload();
  }

  dtOptionsReload() {
    this.dtOptions = {
      destroy: true,
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json',
      },
    };
  }

  setPrendasInfoCards(res) {
    this.womenNew = res.obj.newWomen;
    this.womendiscontinued = res.obj.discontinuedWomen;
    this.womenPromotion = res.obj.promotionWomen;
    this.womensku = res.obj.totalskuWomen;

    this.menNew = res.obj.newMen;
    this.mendiscontinued = res.obj.discontinuedMen;
    this.menPromotion = res.obj.promotionMen;
    this.mensku = res.obj.totalskuMen;

    this.kidsNew = res.obj.newKids;
    this.kidsdiscontinued = res.obj.discontinuedKids;
    this.kidsPromotion = res.obj.promotionKids;
    this.kidssku = res.obj.totalskuKids;
  }
}
