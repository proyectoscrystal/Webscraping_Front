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

  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();

  //modalRef: BsModalRef;

  photos: any;

  //Datos index.ts
  datos: any;
  originData: any;
  categoryData: any;
  subCategoryData: any;
  tipoPrendaData: any;
  colorData: any;

  constructor(private blackboxService: BlackboxService, /*private modalService: BsModalService*/) {
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
  
      this.getInfoDiscount();
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
