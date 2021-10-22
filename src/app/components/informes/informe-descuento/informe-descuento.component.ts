import {
  Component,
  OnInit,
  TemplateRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
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
import { DataTableDirective } from 'angular-datatables';

//Filtro modal
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Datos } from '../../../utils/index';

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
export class InformeDescuentoComponent
  implements OnDestroy, OnInit, AfterViewInit
{
  
  @ViewChild(DataTableDirective, { static: false })
  datatableElement: DataTableDirective;

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  modalRef: BsModalRef;
  modalRef2: BsModalRef;

  photos: any;
  total: any;
  yearMonth: string[] = ['mes', 'año Zara', 'año Mango'];
  seleccion: string = '';
  averageDiscount1: number[] = [];
  averageDiscount2: number[] = [];
  label1: any;
  label2: any;
  myChart: Chart;
  months: any;
  origin: any = '';
  categoria: any = '';
  subCategoria: any = '';
  tipoPrenda: any = '';
  color: any = '';

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
  subcategorys: any;
  categorys: any;
  imagesNames: any;
  tableAvgDescuento: any;
  tableDifference: any;

  constructor(
    private blackboxService: BlackboxService,
    private modalService: BsModalService,
    private modalService2: BsModalService
  ) {
    Chart.register(...registerables);
    this.datos = new Datos();
  }

  ngOnInit(): void {
    this.getInfoDiscount();
    this.getInfotableDiscount();
    this.showDataModal();
    this.onlyOne();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json',
      },
      destroy: true,
    };
  }

  ngAfterViewInit(): void {
    this.afterView();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  afterView() {
    this.dtTrigger.subscribe(() => {
      this.datatableElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.columns(0).every(function () {
          const that = this;
          $('#selectDropdown', this.footer()).on('keyup change', function () {
            if (that.search() !== this['value']) {
              that.search(this['value']).draw();
            }
          });
          $('#inputSearch', this.footer()).on('keyup change', function () {
            if (that.search() !== this['value']) {
              that.search(this['value']).draw();
            }
          });
          /*
          $('select', this.column(colIdx).footer()).on('keyup change', function() {
            that.column(colIdx).search(this['value']).draw();
          });
          */
        });
      });
    });
  }

  // peticion para la tabla
  getInfotableDiscount() {
    let params = {
      origin: this.origin,
      categoria: this.categoria,
      subCategoria: this.subCategoria,
      tipoPrenda: this.tipoPrenda,
      color: this.color,
    };

    this.blackboxService.getTableDiscountInfo(params).subscribe(
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

  // peticion para el chart
  getInfoDiscount() {
    let params = {
      origin: this.origin,
      categoria: this.categoria,
      subCategoria: this.subCategoria,
      tipoPrenda: this.tipoPrenda,
      color: this.color,
    };

    this.blackboxService.getInfoDiscount(params).subscribe(
      (res) => {
        this.setInfoDiscount(res);
        // console.log(res);
        this.ng();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // set info table
  setInfoTable(res) {
    this.photos = res.obj.arr;
    this.tableAvgDescuento = res.obj.descuentoPromedio;
    this.tableDifference = res.obj.differences;
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

    if (value.checked && value.clase === 'marca check') {
      this.origin = item;
      console.log(item);
    }
    if (value.checked && value.clase === 'categoria check2') {
      this.categoria = item;
      console.log(item);
    }
    if (value.checked && value.clase === 'subCategoria check3') {
      this.subCategoria = item;
      console.log(item);
    }
    if (value.checked && value.clase === 'tipoPrenda check4') {
      this.tipoPrenda = item;
      console.log(item);
    }
    if (value.checked && value.clase === 'color check5') {
      this.color = item;
      console.log(item);
    }
  }

  applyFilter() {
    this.modalRef.hide();

    this.getInfoDiscount();
  }

  applyFilter2() {
    this.modalRef2.hide();

    this.getInfotableDiscount();
    this.rerender();
  }

  openModal(template: TemplateRef<any>) {
    this.origin = '';
    this.categoria = '';
    this.subCategoria = '';
    this.tipoPrenda = '';
    this.color = '';

    this.modalRef = this.modalService.show(template);
  }

  openModal2(template2: TemplateRef<any>) {
    this.origin2 = '';
    this.categoria2 = '';
    this.subCategoria2 = '';
    this.tipoPrenda2 = '';
    this.color2 = '';

    // temporal
    this.origin = '';
    this.categoria = '';
    this.subCategoria = '';
    this.tipoPrenda = '';
    this.color = '';

    this.modalRef2 = this.modalService2.show(template2);
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

  setInfoDiscount(res) {
    let date = new Date();
    let year = date.getFullYear();
    if (res.obj.origin === 'general') {
      this.label1 = 'Zara';
      this.label2 = 'Mango';
      this.months = res.obj.months;
      for (let index = 0; index < res.obj.values.length; index++) {
        if (index <= 11) {
          this.averageDiscount1[index] = res.obj.values[index];
        } else if (index >= 24 && index <= 35) {
          this.averageDiscount2[index - 24] = res.obj.values[index];
        }
      }
    } else if (res.obj.origin === 'Mango') {
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
    } else if (res.obj.origin === 'Zara') {
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
            borderColor: '#007ee7',
            fill: true,
          },
          {
            label: this.label2,
            data: this.averageDiscount2,
            borderColor: '#bd0e0e',
            fill: true,
          },
        ],
        labels: this.months,
      },
    }); // fin chart 1
  };
}
