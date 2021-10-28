import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { BlackboxService } from '../../../services/blackbox.service';

// Angular DataTable
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

//Filtro modal
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Datos } from '../../../utils/index';

@Component({
  selector: 'app-table2',
  templateUrl: './table2.component.html',
  styleUrls: ['./table2.component.css']
})
export class Table2Component implements OnInit, OnDestroy {
  modalRef2: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
  };

  @ViewChild(DataTableDirective, { static: false })
  datatableElement2: DataTableDirective;

  dtOptions: DataTables.Settings = {};

  dtTrigger2 = new Subject();

  photos: any;

  //Tabla2
  selectedFilter2 = [];
  originSelected2 = [];
  categoriaSelected2 = [];
  subCategoriaSelected2 = [];
  tipoPrendaSelected2 = [];
  colorSelected2 = [];
  descuentoTable2: any;

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


  constructor(private blackboxService: BlackboxService,
              private modalService2: BsModalService
              
    ) { 
      this.datos = new Datos();
    }

  ngOnInit(): void {
    this.getInfoTable2();
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
    this.dtTrigger2.unsubscribe();
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
        this.dtTrigger2.next();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  setInfoTable2(res) {
    this.photos = res.obj.arr;
    this.descuentoTable2 = res.obj.descuentoPromedio;
  }

  showDataModal() {
    this.originData = this.datos.origins;
    this.categoryData = this.datos.categorias;
    this.subCategoryData = this.datos.subcategorias;
    this.tipoPrendaData = this.datos.tipoprendas;
    this.colorData = this.datos.colores;
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
      console.log(this.categoria2);
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
      console.log(this.subCategoria2);
    } else if (value.clase == 'subCategoria2' && !value.checked) {
      this.subCategoria2 = [];
      this.subCategoriaSelected2.splice(
        this.subCategoriaSelected2.indexOf(item),
        1
      );
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
      this.tipoPrendaSelected2.splice(
        this.tipoPrendaSelected2.indexOf(item),
        1
      );
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

  applyFilter2() {
    this.modalRef2.hide();

    this.getInfoTable2();
    this.rerender();
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
    this.datatableElement2.dtInstance.then((dtInstance: DataTables.Api) => {
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









}
