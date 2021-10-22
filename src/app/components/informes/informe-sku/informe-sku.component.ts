import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  Chart,
  ChartConfiguration,
  registerables,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
} from 'chart.js';

import { BlackboxService } from '../../../services/blackbox.service';

// Angular DataTable
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

//Filtro modal
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Datos } from '../../../utils/index';
import { DataTableDirective } from 'angular-datatables';

interface valueFilter {
  checked: boolean;
  clase: string;
  item: string;
}

@Component({
  selector: 'app-informe-sku',
  templateUrl: './informe-sku.component.html',
  styleUrls: ['./informe-sku.component.css'],
})
export class InformeSKUComponent implements OnDestroy, OnInit {

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
  total: any;
  label1: any;
  label2: any;

  origin: any = '';
  categoria: any = '';
  subCategoria: any = '';
  tipoPrenda: any = '';
  color: any = '';
  months: any;
  averageSKU1: number[] = [];
  averageSKU2: number[] = [];

  origin2: any = '';
  categoria2: any = '';
  subCategoria2: any = '';
  tipoPrenda2: any = '';
  color2: any = '';

  datos: any;
  originData: any;
  categoryData: any;
  subCategoryData: any;
  tipoPrendaData: any;
  colorData: any;
  tableAvgSKU: any;
  tableDifference: any;

  selectedFilter = [];
  selectedFilter2 = [];

  constructor(
    private blackboxService: BlackboxService,
    private modalService: BsModalService,
    private modalService2: BsModalService
  ) {
    Chart.register(...registerables);
    this.datos = new Datos();
  }

  ngOnInit(): void {
    this.getInfotableSKU()
    this.getInfoSKU();
    this.showDataModal();
    this.onlyOne();

    this.dtOptions = {
      destroy: true,
      pagingType: 'full_numbers',
      pageLength: 15,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json',
      },
    };
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  // peticion para la tabla
  getInfotableSKU() {
    let params = {
      origin: this.origin2,
      categoria: this.categoria2,
      subCategoria: this.subCategoria2,
      tipoPrenda: this.tipoPrenda2,
      color: this.color2,
    };

    this.blackboxService.getTableSKUInfo(params).subscribe(
      (res) => {
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
    this.photos = res.obj.arr;
    this.tableAvgSKU = res.obj.SKU;
    this.tableDifference = res.obj.differences;
  }

  // peticion para el chart
  getInfoSKU() {
    let params = {
      origin: this.origin,
      categoria: this.categoria,
      subCategoria: this.subCategoria,
      tipoPrenda: this.tipoPrenda,
      color: this.color,
    };

    this.blackboxService.getInfoSKU(params).subscribe(
      (res) => {
        this.setInfoSKU(res);
        this.ng();
      },
      (err) => {
        console.log(err);
      }
    );
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

    //Filtro chart
    if (value.checked && value.clase === 'marca check') {
      this.origin = item;
      this.selectedFilter.push(value);
      console.log(item);
    } else if (value.clase == 'marca check' && !value.checked) {
      this.origin = '';
      console.log(this.origin);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
    }

    if (value.checked && value.clase === 'categoria check2') {
      this.categoria = item;
      this.selectedFilter.push(value);
      console.log(item);
    } else if (value.clase == 'categoria check2' && !value.checked) {
      this.categoria = '';
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
    }

    if (value.checked && value.clase === 'subCategoria check3') {
      this.subCategoria = item;
      this.selectedFilter.push(value);
      console.log(item);
    } else if (value.clase == 'subCategoria check3' && !value.checked) {
      this.subCategoria = '';
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
    }

    if (value.checked && value.clase === 'tipoPrenda check4') {
      this.tipoPrenda = item;
      this.selectedFilter.push(value);
      console.log(item);
    } else if (value.clase == 'tipoPrenda check4' && !value.checked) {
      this.tipoPrenda = '';
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
    }

    if (value.checked && value.clase === 'color check5') {
      this.color = item;
      this.selectedFilter.push(value);
      console.log(item);
    } else if (value.clase == 'color check5' && !value.checked) {
      this.color = '';
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
    }

    //Filtro tabla
    if (value.checked && value.clase === 'marca2 check') {
      this.origin2 = item;
      this.selectedFilter2.push(value);
      console.log(item);
    } else if (value.clase == 'marca2 check' && !value.checked) {
      this.origin2 = '';
      console.log(this.origin2);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
    }

    if (value.checked && value.clase === 'categoria2 check2') {
      this.categoria2 = item;
      this.selectedFilter2.push(value);
      console.log(item);
    } else if (value.clase == 'categoria2 check2' && !value.checked) {
      this.categoria2 = '';
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
    }

    if (value.checked && value.clase === 'subCategoria2 check3') {
      this.subCategoria2 = item;
      this.selectedFilter2.push(value);
      console.log(item);
    } else if (value.clase == 'subCategoria2 check3' && !value.checked) {
      this.subCategoria2 = '';
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
    }

    if (value.checked && value.clase === 'tipoPrenda2 check4') {
      this.tipoPrenda2 = item;
      this.selectedFilter2.push(value);
      console.log(item);
    } else if (value.clase == 'tipoPrenda2 check4' && !value.checked) {
      this.tipoPrenda2 = '';
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
    }

    if (value.checked && value.clase === 'color2 check5') {
      this.color2 = item;
      this.selectedFilter2.push(value);
      console.log(item);
    } else if (value.clase == 'color2 check5' && !value.checked) {
      this.color2 = '';
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
    }
  }

  applyFilter() {
    this.modalRef.hide();

    this.getInfoSKU();
  }

  applyFilter2() {
    this.modalRef2.hide();

    this.getInfotableSKU();
    this.rerender();
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

  openModal2(template2: TemplateRef<any>) {
    this.origin2 = '';
    this.categoria2 = '';
    this.subCategoria2 = '';
    this.tipoPrenda2 = '';
    this.color2 = '';

    this.selectedFilter2.splice(0, this.selectedFilter2.length);

    this.modalRef2 = this.modalService2.show(template2, this.config);
  }

  closeModal() {
    this.modalRef.hide();

    this.selectedFilter.splice(0, this.selectedFilter.length);
  }

  closeModal2() {
    this.modalRef2.hide();

    this.selectedFilter2.splice(0, this.selectedFilter2.length);
  }

  // funcion para poner estilo a la tabla
  diferencia() {
    if (this.tableDifference[0] === 0) {
      return 'diferencia2';
    }
    return 'diferencia';
  }

  onlyOne() {
    $(document).on('change', '.check', function () {
      var $allCheckboxes = $('.check');
      $allCheckboxes.prop('disabled', false);
      this.checked && $allCheckboxes.not(this).prop('disabled', true);
    });

    $(document).on('change', '.check2', function () {
      var $allCheckboxes = $('.check2');
      $allCheckboxes.prop('disabled', false);
      this.checked && $allCheckboxes.not(this).prop('disabled', true);
    });

    $(document).on('change', '.check3', function () {
      var $allCheckboxes = $('.check3');
      $allCheckboxes.prop('disabled', false);
      this.checked && $allCheckboxes.not(this).prop('disabled', true);
    });

    $(document).on('change', '.check4', function () {
      var $allCheckboxes = $('.check4');
      $allCheckboxes.prop('disabled', false);
      this.checked && $allCheckboxes.not(this).prop('disabled', true);
    });

    $(document).on('change', '.check5', function () {
      var $allCheckboxes = $('.check5');
      $allCheckboxes.prop('disabled', false);
      this.checked && $allCheckboxes.not(this).prop('disabled', true);
    });
  }

  //===============FIN FILTROS MODAL===============

  setInfoSKU(res) {
    let date = new Date();
    let year = date.getFullYear();
    if (res.obj.origin === 'general') {
      this.label1 = 'Zara';
      this.label2 = 'Mango';
      this.months = res.obj.months;
      console.log(res);
      for (let index = 0; index < res.obj.values.length; index++) {
        if (index <= 11) {
          this.averageSKU1[index] = res.obj.values[index];
        } else if (index >= 24 && index <= 35) {
          this.averageSKU2[index - 24] = res.obj.values[index];
        }
      }
    } else if (res.obj.origin === 'Mango') {
      this.label1 = `${res.obj.origin} ${year}`;
      this.label2 = `${res.obj.origin} ${year - 1}`;
      this.months = res.obj.months;
      for (let index = 0; index < res.obj.values.length; index++) {
        if (index <= 11) {
          this.averageSKU1[index] = res.obj.values[index];
        } else if (index >= 12 && index <= 23) {
          this.averageSKU2[index - 12] = res.obj.values[index];
        }
      }
    } else if (res.obj.origin === 'Zara') {
      this.label1 = `${res.obj.origin} ${year}`;
      this.label2 = `${res.obj.origin} ${year - 1}`;
      this.months = res.obj.months;
      for (let index = 0; index < res.obj.values.length; index++) {
        if (index <= 11) {
          this.averageSKU1[index] = res.obj.values[index];
        } else if (index >= 12 && index <= 23) {
          this.averageSKU2[index - 12] = res.obj.values[index];
        }
      }
    }
  }

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
      pageLength: 15,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json',
      },
    };
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
            data: this.averageSKU1,
            borderColor: '#007ee7',
            fill: true,
          },
          {
            label: this.label2,
            data: this.averageSKU2,
            borderColor: '#bd0e0e',
            fill: true,
          },
        ],
        labels: this.months,
      },
    }); // fin chart 1
  };
}
