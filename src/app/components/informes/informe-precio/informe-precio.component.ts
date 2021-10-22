import {
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
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
  selector: 'app-informe-precio',
  templateUrl: './informe-precio.component.html',
  styleUrls: ['./informe-precio.component.css'],
})
export class InformePrecioComponent implements OnDestroy, OnInit {

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
  tableAvgPrice: any;
  tableDifference: any;
  total: any;
  yearMonth: string[] = ['mes', 'año Zara', 'año Mango'];
  seleccion: string = '';
  averagePrice1: number[] = [];
  averagePrice2: number[] = [];
  months: [];
  label1: any;
  label2: any;
  myChart: Chart;
  categorys: any;
  subcategorys: any;
  imagesNames: any;

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
    this.getInfoPrice();
    this.getInfoTable();

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

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  // peticion para el chart
  getInfoPrice() {
    let params = {
      origin: this.origin,
      categoria: this.categoria,
      subCategoria: this.subCategoria,
      tipoPrenda: this.tipoPrenda,
      color: this.color,
    };

    this.blackboxService.getInfoPrice(params).subscribe(
      (res) => {
        this.setInfoPrice(res);
        this.ng();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // peticion a la tabla
  getInfoTable() {
    let params = {
      origin: this.origin2,
      categoria: this.categoria2,
      subCategoria: this.subCategoria2,
      tipoPrenda: this.tipoPrenda2,
      color: this.color2,
    };

    this.blackboxService.getTablePriceInfo(params).subscribe(
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

  setInfoTable(res) {
    this.photos = res.obj.arr;
    this.tableAvgPrice = res.obj.precioPromedio;
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

    this.getInfoPrice();
  }

  applyFilter2() {
    this.modalRef2.hide();

    this.getInfoTable();
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

  setInfoPrice(res) {
    let date = new Date();
    let year = date.getFullYear();
    if (res.obj.origin === 'general') {
      this.label1 = 'Zara';
      this.label2 = 'Mango';
      this.months = res.obj.months;
      for (let index = 0; index < res.obj.values.length; index++) {
        if (index <= 11) {
          this.averagePrice1[index] = res.obj.values[index];
        } else if (index >= 24 && index <= 35) {
          this.averagePrice2[index - 24] = res.obj.values[index];
        }
      }
    } else if (res.obj.origin === 'Mango') {
      this.label1 = `${res.obj.origin} ${year}`;
      this.label2 = `${res.obj.origin} ${year - 1}`;
      this.months = res.obj.months;
      for (let index = 0; index < res.obj.values.length; index++) {
        if (index <= 11) {
          this.averagePrice1[index] = res.obj.values[index];
        } else if (index >= 12 && index <= 23) {
          this.averagePrice2[index - 12] = res.obj.values[index];
        }
      }
    } else if (res.obj.origin === 'Zara') {
      this.label1 = `${res.obj.origin} ${year}`;
      this.label2 = `${res.obj.origin} ${year - 1}`;
      this.months = res.obj.months;
      for (let index = 0; index < res.obj.values.length; index++) {
        if (index <= 11) {
          this.averagePrice1[index] = res.obj.values[index];
        } else if (index >= 12 && index <= 23) {
          this.averagePrice2[index - 12] = res.obj.values[index];
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

  //Desde aca empieza el chart
  @ViewChild('mychart') mychart: any;

  ng = function ngAfterViewInit() {
    // console.log(this.averagePriceZara9);
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
            data: this.averagePrice1,
            borderColor: '#007ee7',
            fill: true,
          },
          {
            label: this.label2,
            data: this.averagePrice2,
            borderColor: '#bd0e0e',
            fill: true,
          },
        ],
        labels: this.months,
      },
    }); // fin chart 1
  };
}
