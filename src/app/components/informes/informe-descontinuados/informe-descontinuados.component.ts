import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, registerables, LineController, LineElement, PointElement, LinearScale, Title } from 'chart.js'

import { BlackboxService } from '../../../services/blackbox.service';

// Angular DataTable
import { OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';

//Filtro modal
/*
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { Datos } from '../../../utils/index';

interface valueFilter {
  checked: boolean;
  clase: string;
  item: string;
}
*/

@Component({
  selector: 'app-informe-descontinuados',
  templateUrl: './informe-descontinuados.component.html',
  styleUrls: ['./informe-descontinuados.component.css']
})
export class InformeDescontinuadosComponent implements OnDestroy, OnInit {

  //Config modal filtros
  /*
  modalRef: BsModalRef;
  modalRef2: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
  };
  */

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  photos: any;

  //Datos index.ts
  datos: any;
  originData: any;
  categoryData: any;
  subCategoryData: any;
  tipoPrendaData: any;
  colorData: any;

  constructor(private blackboxService: BlackboxService, /*private modalService: BsModalService, private modalService2: BsModalService*/) {
    Chart.register(...registerables);
    //this.datos = new Datos();
  }

  ngOnInit(): void {
    this.getPhotoList();
    //this.showDataModal();
    //this.onlyOne();

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

  getPhotoList() {
    this.blackboxService.getPhotos().subscribe(
      (res) => {
        this.photos = res;
        this.dtTrigger.next();
        return (this.photos = res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //===============INICIO FILTROS MODAL===============
  /*
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
  */
  //===============FIN FILTROS MODAL===============  

  canvas: any;
  ctx: any;
  @ViewChild('mychart') mychart: any;

  ngAfterViewInit() {
    Chart.register(LineController, LineElement, PointElement, LinearScale, Title);
    this.canvas = this.mychart.nativeElement;
    this.ctx = this.canvas.getContext('2d');

    new Chart(this.ctx, {
      type: 'line',
      data: {
        datasets: [{
          label: 'Mango',
          data: [0, 30, 20, 40, 60, 40, 10, 80, 30, 10, 64, 53],
          borderColor: "#007ee7",
          fill: true,
        },
        {
          label: 'Zara',
          data: [0, 20, 40, 60, 80, 20, 40, 60, 80, 100, 34, 23],
          borderColor: "#bd0e0e",
          fill: true,
        }],
        labels: ['January 2021', 'February 2021', 'March 2021', 'April 2021', 'May 2021', 'June 2021', 'July 2021', 'August 2021', 'September 2021', 'October 2021', 'November 2021', 'December 2021']
      },
    }); // fin chart 1
  }

}
