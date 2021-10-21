import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, registerables, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js'

import { BlackboxService } from '../../../services/blackbox.service';

// Angular DataTable
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

//Filtro modal
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Datos } from '../../../utils/index';

interface valueFilter {
  checked: boolean;
  clase: string;
  item: string;
}

@Component({
  selector: 'app-informe-nuevos',
  templateUrl: './informe-nuevos.component.html',
  styleUrls: ['./informe-nuevos.component.css']
})

export class InformeNuevosComponent implements OnDestroy, OnInit {

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  modalRef: BsModalRef;

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

  averageNews1: number[] = [];
  averageNews2: number[] = [];

    //Datos index.ts
    datos: any;
    originData: any;
    categoryData: any;
    subCategoryData: any;
    tipoPrendaData: any;
    colorData: any;
  tableAvgnuevos: any;
  tableDifference: any;

  constructor(private blackboxService: BlackboxService, private modalService: BsModalService) {
    Chart.register(...registerables);
    this.datos = new Datos();
  }

  ngOnInit(): void {
    this.getInfoNews();
    this.showDataModal();
    this.onlyOne();

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es_es.json'
      }
    };
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  // peticion para la tabla
  getInfotableNews() {
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
        // this.dtTrigger.next();
      },
      (err) => {
        console.log(err);
      }
    );
  }
  
  // set info table
  setInfoTable(res) {
    this.photos = res.obj.arr;
    this.tableAvgnuevos = res.obj.nuevosPromedio;
    this.tableDifference = res.obj.differences;
  }

  // peticion para el chart
  getInfoNews() {
    let params = {
      origin: this.origin,
      categoria: this.categoria,
      subCategoria: this.subCategoria,
      tipoPrenda: this.tipoPrenda,
      color: this.color
    };

    this.blackboxService.getInfoNews(params).subscribe(
      (res) => {
        this.setInfoNews(res);
        // console.log(res);
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

  //Recibe los datos seleccionados en el filtro
  filterItemsData(value) {
    const { item } = value;
    console.log(value);

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

    this.getInfoNews();
  }

  openModal(template: TemplateRef<any>) {
    this.origin = '';
    this.categoria = '';
    this.subCategoria = '';
    this.tipoPrenda = '';
    this.color = '';

    this.modalRef = this.modalService.show(template);
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

  setInfoNews(res) {
    let date = new Date();
    let year = date.getFullYear();
    if (res.obj.origin === 'general') {
      this.label1 = 'Zara';
      this.label2 = 'Mango';
      this.months = res.obj.months;
      console.log(res);
      for (let index = 0; index < res.obj.values.length; index++) {
        if (index <= 11) {
          this.averageNews1[index] = res.obj.values[index];
        } else if (index >= 24 && index <= 35) {
          this.averageNews2[index - 24] = res.obj.values[index];
        }
      }
    } else if (res.obj.origin === 'Mango') {
      this.label1 = `${res.obj.origin} ${year}`;
      this.label2 = `${res.obj.origin} ${year - 1}`;
      this.months = res.obj.months;
      for (let index = 0; index < res.obj.values.length; index++) {
        if (index <= 11) {
          this.averageNews1[index] = res.obj.values[index];
        } else if (index >= 12 && index <= 23) {
          this.averageNews2[index - 12] = res.obj.values[index];
        }
      }
    } else if (res.obj.origin === 'Zara') {
      this.label1 = `${res.obj.origin} ${year}`;
      this.label2 = `${res.obj.origin} ${year - 1}`;
      this.months = res.obj.months;
      for (let index = 0; index < res.obj.values.length; index++) {
        if (index <= 11) {
          this.averageNews1[index] = res.obj.values[index];
        } else if (index >= 12 && index <= 23) {
          this.averageNews2[index - 12] = res.obj.values[index];
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


    Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
    this.myChart = new Chart("myChart", {
      type: 'line',
      data: {
        datasets: [{
          label: this.label1,
          data: this.averageNews1,
          borderColor: "#007ee7",
          fill: true,
        },
        {
          label: this.label2,
          data: this.averageNews2,
          borderColor: "#bd0e0e",
          fill: true,
        }],
        labels: this.months
      },

    }); // fin chart 1

  }

}
