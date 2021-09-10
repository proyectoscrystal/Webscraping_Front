import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Datos } from '../../utils/index';
import { BlackboxService } from '../../services/blackbox.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { HomeComponent } from '../home/home.component';

interface photoObject {
  base64: string;
  colors: string[];
  features: string[];
  gender: string;
  imageName: string;
  origin: string;
  quarter: string;
  use: string;
  user: string;
  usuario: any[];
  year: string;
}

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
  @ViewChild(HomeComponent) home: HomeComponent;

  modalRef: BsModalRef;
  mostrar = false;
  total: number;
  photos: any;
  datos: any;
  years: any;
  quarters: any;
  genders: any;
  uses: any;
  origins: any;
  featuresOptions: any;
  colores: any;
  username: string;
  colors = [];
  arrayColors = [];
  arrayUsers = [];
  yearSelected = [];
  quarterSelected = [];
  tipoSelected = [];
  genderSelected = [];
  useSelected = [];
  originSelected = [];
  featureSelected = [];
  colorSelected = [];
  orderSelected = [];
  userSelected = [];
  prendasGenerales = [];
  prendasScrapingMango = [];
  fileName = [];
  payload = [];
  filesBase64 = [];
  files;
  selectedFile = null;
  newImg;
  objFilter: any;
  filterPhoto: any;
  url: any;
  promedio: number;

  /**
   * Variables para la agrupación de colores
   */
  ppalColorModal: any;
  hexaColorModal = [];

  

  constructor(private blackboxService: BlackboxService,
    private modalService: BsModalService) {
      this.datos = new Datos();
     }

  ngOnInit(): void {
    this.toggleSidebar();
    this.showDataSidebar();
    this.getPhotoList();
  }

 /**
   * Muestra todas la imágenes
   */
  getPhotoList() {
    this.blackboxService.getPhotos().subscribe(
      (res) => {
        this.photos = res;
        this.enviarDatos(res);
        this.getUsers();
        this.colorsGroup();
        return (this.photos = res);
      },
      (err) => {
        console.log(err);
      }
      );
  }

  // Enviar datos al componente HomeComponent
  enviarDatos(photos: any) {
    this.home.data(photos);
  }

  sendDataFilter(value: valueFilter) {
    this.home.filterDataItems(value);
  }

  sendDataFilterText(value: any) {
    this.home.filterPhotoText(value);
  }

  // Enviar datos para realizar filtro
  getDataFilter() {
    let params = {
      year: this.yearSelected,
      quarter: this.quarterSelected,
      gender: this.genderSelected,
      origin: this.originSelected,
      use: this.useSelected,
      feature: this.featureSelected,
      color: this.colorSelected,
      user: this.userSelected,
    };

    this.blackboxService.filterImages(params).subscribe(
      (res) => {
        this.enviarDatos(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // Obtener los nombres de los usuarios
  getUsers() {
    this.photos.forEach((user) => {
      this.username = user.usuario[0]?.username;
      this.arrayUsers.push(this.username);
    });

    this.filterUsername();
  }

  // obtener el promedio de precios
  // getAverage() {
  //   let totalEntradas: number = this.photos.length;
  //   let total: number;
  //   this.photos.forEach(precio => {
  //     total += precio.precio;
  //   });
  //   console.log(`${total / totalEntradas}`);
  // }


  // Filtrar nombres de usuario repetidos
  filterUsername() {
    let dataUsername = new Set(this.arrayUsers);
    this.arrayUsers = [...dataUsername];
  }

  // Función para validar checked del filtro
  updateCheckFilter(checked, item, className, elemento) {
    let data = {
      checked,
      clase: className,
      item: item.value || item,
    };

    this.sendDataFilter(data);

    if (checked) {
      if (className == 'year') {
        this.yearSelected.push(item.value);
      } else if (className == 'quarter') {
        this.quarterSelected.push(item.value);
      } else if (className == 'gender') {
        this.genderSelected.push(item.value);
      } else if (className == 'use') {
        this.useSelected.push(item.value);
      } else if (className == 'origin') {
        this.originSelected.push(item.value);
        console.log(this.originSelected);
      } else if (className == 'feature') {
        let featureLower = item.text.toLowerCase();

        this.featureSelected.push(featureLower);
      } else if (className == 'color') {

        if(item.value) {
          let colorCapitalize =
            item.value[0].toUpperCase() + item.value.substring(1);
          this.colorSelected.push(colorCapitalize);
        }
        this.colorSelected.push(item)
      } else if (className == 'user') {
        this.userSelected.push(item);
      }
    } else {
      if (className == 'year' && !checked) {
        this.yearSelected.splice(this.yearSelected.indexOf(item.value), 1);
      }
      if (className == 'quarter' && !checked) {
        this.quarterSelected.splice(
          this.quarterSelected.indexOf(item.value),
          1
        );
      }
      if (className == 'gender' && !checked) {
        this.genderSelected.splice(this.quarterSelected.indexOf(item.value), 1);
      }
      if (className == 'use' && !checked) {
        this.useSelected.splice(this.useSelected.indexOf(item.value), 1);
      }
      if (className == 'origin' && !checked) {
        this.originSelected.splice(this.originSelected.indexOf(item.value), 1);
      }
      if (className == 'feature' && !checked) {
        this.featureSelected.splice(
          this.featureSelected.indexOf(item.value),
          1
        );
      }
      if (className == 'color' && !checked) {
        this.colorSelected.splice(this.colorSelected.indexOf(item.value), 1);
      }
      if (className == 'user' && !checked) {
        this.userSelected.splice(this.userSelected.indexOf(item), 1);
      }
    }

    this.getDataFilter();
  }

  // obtener datos para mostrar en el sidebar
  showDataSidebar() {
    this.years = this.datos.years;
    this.quarters = this.datos.coleccionOptions;
    this.genders = this.datos.generoOptions;
    this.uses = this.datos.usoOptions;
    this.origins = this.datos.fuenteOptions;
    this.featuresOptions = this.datos.featureOptions;
    this.colores = this.datos.mainColors;
    this.prendasGenerales = this.datos.prendasGenerales;
    this.prendasScrapingMango = this.datos.prendasScrapingMango;
  }

  // Ocultar/Mostrar sidebar
  toggleSidebar() {
    $('#menu-toggle').click(function (e) {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
    });
  }

  onPhotoSelected(event) {
    if (event.target.files && event.target.files[0]) {
      var readerPreview = new FileReader();
      readerPreview.onload = (event: any) => {
        this.url = event.target.result;
      };
      readerPreview.readAsDataURL(event.target.files[0]);
    }

    this.mostrar = true;
    this.filesBase64.length = 0;
    this.files = event.target.files;

    for (let i = 0; i < this.files.length; i++) {
      this.selectedFile = this.files[i];

      if (this.selectedFile.type.match(/image\/*/) !== null) {
        this.fileName.push(this.selectedFile.name);

        const reader = new FileReader();
        reader.readAsDataURL(this.selectedFile);
        reader.onload = async (e) => {
          this.filesBase64.push(await reader.result);
        };
      }
    }

    var n;
    var d;

    setTimeout(() => {
      const username = localStorage.getItem('user');
      for (let i = 0; i < this.filesBase64.length; i++) {
        this.newImg = this.filesBase64[i].replace(
          /^data:image\/\w+;base64,/,
          ''
        );
        if (this.fileName[i].indexOf('.jpeg') !== -1) {
          let extensionSlice = this.fileName[i].substring(
            0,
            this.fileName[i].length - 5
          );
          this.fileName[i] = extensionSlice;

          let quitSpaces = this.fileName[i].replace(/ /g, '');
          this.fileName[i] = quitSpaces;

          d = new Date();
          n = d.getTime();

          let newChar = this.fileName[i] + n;
          this.fileName[i] = newChar;

          let convertString = n.toString();
          n = convertString;
        } else if (
          this.fileName[i].indexOf('.jpg') !== -1 ||
          this.fileName[i].indexOf('.png') ||
          this.fileName[i].indexOf('.gif')
        ) {
          let extensionSlice = this.fileName[i].substring(
            0,
            this.fileName[i].length - 4
          );
          this.fileName[i] = extensionSlice;

          let quitSpaces = this.fileName[i].replace(/ /g, '');
          this.fileName[i] = quitSpaces;

          d = new Date();
          n = d.getTime();

          let xx = n.toString();
          n = xx;

          let newChar = this.fileName[i] + n;
          this.fileName[i] = newChar;
        }
      }

      this.objFilter = {
        imageName: n,
        base64: this.newImg,
        user: username,
      };

      this.blackboxService
        .filterImageByPhoto(this.objFilter)
        .subscribe((res) => {
          console.log(res);
          this.filterPhoto = res;
          this.sendFilter();
          this.fileName = [];
        });
    }, 4000);
  }

  /**
   * * recibir respuesta del filtro
   */
  sendFilter() {
    this.blackboxService.sendFilter().subscribe((res) => {
      console.log(res);
      // this.mostrar = false;
      this.photos = res;
      this.sendPhotoFilter(this.photos);
      // this.total = this.photos.length;
    });
  }

  sendPhotoFilter(value: valueFilter) {
    this.home.filterPhotoItems(value);
  }

  /**
   * Filtro por texto
   */
  filterText(value) {
    let textFilter = value.target.value;
    console.log('Filtro por texto', textFilter);

    this.blackboxService.filterimagesBytext(textFilter).subscribe(
      (res) => {
        console.log(res);
        this.sendDataFilterText(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /**
   * Agrupar colores
   */
  colorsGroup() {
    let colores = [];
    let coloresGroup = [];
    this.photos.forEach((item) => {
      colores.push(item.colores);
    });

    for (let i of colores) {
      for (let j of i) {
        coloresGroup.push(j);
      }
    }
    return coloresGroup;
  }

  /**
   * Modal para colores
   */
  async showModalColors(color, template: TemplateRef<any>) {
    this.hexaColorModal = [];
    this.modalRef = this.modalService.show(template);

    let moreColors = this.colorsGroup();
    let filterColors = moreColors.filter((colorItem) => colorItem.ppal === color.value);

    filterColors.forEach((itemHexa) => {
      this.hexaColorModal.push(itemHexa.hexa);
    });

    this.ppalColorModal = color;
    console.log(this.ppalColorModal.hexa);

    console.log(this.hexaColorModal);
  }
}
