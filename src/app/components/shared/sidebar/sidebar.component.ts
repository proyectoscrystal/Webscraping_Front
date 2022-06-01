import { Component, OnInit, ViewChild, TemplateRef, OnDestroy } from '@angular/core';
import { Datos } from '../../../utils/index';
import { BlackboxService } from '../../../services/blackbox.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Router, ActivatedRoute } from '@angular/router';

import { HomeComponent } from '../../home/home.component';
import { ServicioEnvioDataService } from './service-filter.service';
import { Subscription } from 'rxjs';

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
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit, OnDestroy {
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
  tipoPrendaSelected = [];
  colorSelected = [];
  sendToService = [];
  colorScrapingSelected = [];
  subCategoriaSelected = [];
  categoriaSelected = [];
  orderSelected = [];
  userSelected = [];
  prendasGenerales = [];
  fileName = [];
  payload = [];
  filesBase64 = [];
  files;
  selectedFile = null;
  newImg;
  objFilter: any;
  filterPhoto: any;
  url: any;
  dataSubscription: Subscription;

  /**
   * Variables para la agrupación de colores
   */
  ppalColorModal: any;
  hexaColorModal = [];

  constructor(
    private blackboxService: BlackboxService,
    private modalService: BsModalService,
    private router: Router,
    private route: ActivatedRoute,
    private servicioEnvioData: ServicioEnvioDataService
  ) {
    this.datos = new Datos();
  }

  ngOnInit(): void {

    this.toggleSidebar();
    this.showDataSidebar();
    this.getPhotoList();  
  }

  ngOnDestroy(): void {
    if(this.dataSubscription !== undefined) {
      this.dataSubscription.unsubscribe();
    }
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
      categoria: this.categoriaSelected,
      tipoPrenda: this.tipoPrendaSelected,
      subCategoria: this.subCategoriaSelected,
      color2: this.colorScrapingSelected,
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

  // Filtrar nombres de usuario repetidos
  filterUsername() {
    let dataUsername = new Set(this.arrayUsers);
    this.arrayUsers = [...dataUsername];
  }

  getWithFilter(){
    // obtener los datos del servicio
    let filters: any;
    let data = this.servicioEnvioData.enviarObservable.subscribe(data => {
      // se le asignan los filtros a la variable local filters
      filters = data;
    });
    this.dataSubscription = data;

    // filters.forEach(() => {

    // })

    console.log(filters);
    // chulear los checkbox 
      //$(".categoria2").prop("disabled", false);

      // let {
      // categoria: this.categoriaSelected,
      // tipoPrenda: this.tipoPrendaSelected,
      // subCategoria: this.subCategoriaSelected,
      // color2: this.colorScrapingSelected,
      // year: this.yearSelected,
      // quarter: this.quarterSelected,
      // gender: this.genderSelected,
      // origin: this.originSelected,
      // use: this.useSelected,
      // feature: this.featureSelected,
      // color: this.colorSelected,
      // user: this.userSelected,} = this.arrayEnServicio;

      // finalmente pedimos los productos
      this.getDataFilter();
      // this.getUsers();
      // this.colorsGroup();
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
        let data = {
          year: item.value
        }
        this.sendToService.push(data);
      } else if (className == 'quarter') {
        this.quarterSelected.push(item.value);
        let data = {
          quarter: item.value
        }
        this.sendToService.push(data);
      } else if (className == 'gender') {
        this.genderSelected.push(item.value);
        if (item.value === "hjovenes" || item.value === "huniversitarios") {
          this.categoriaSelected.push("Hombre");
          this.sendToService.push(item.value);
        } else if (item.value === "hniños" || item.value === "hjunior") {
          this.categoriaSelected.push("Niño");
          this.categoriaSelected.push("Niña");
          this.sendToService.push(item.value);
        } else if (item.value === "mjovenes" || item.value === "muniversitarios") {
          this.categoriaSelected.push("Mujer");
          this.sendToService.push(item.value);
        }
      } else if (className == 'use') {
        this.useSelected.push(item.value);
        this.sendToService.push(item.value);
        if (item.value === "exterior") {
          this.subCategoriaSelected.push("ropa exterior");
          this.sendToService.push(item.value);
        } else if (item.value === "interior") {
          this.subCategoriaSelected.push("ropa interior");
          this.sendToService.push(item.value);
        }
      } else if (className == 'origin') {
        this.originSelected.push(item.value);
        this.sendToService.push(item.value);
      } else if (className == 'feature') {
        let featureLower = item.text.toLowerCase();

        this.tipoPrendaSelected.push(featureLower);
        this.featureSelected.push(featureLower);
        this.sendToService.push(featureLower);
      } else if (className == 'color') {

        if(item.value) {
          let colorCapitalize =
            item.value[0].toUpperCase() + item.value.substring(1);
          this.colorSelected.push(colorCapitalize);
          this.colorScrapingSelected.push(colorCapitalize);
          this.sendToService.push(colorCapitalize);
        }
        this.colorSelected.push(item)
        this.colorScrapingSelected.push(item);
        this.sendToService.push(item);
      } else if (className == 'user') {
        this.userSelected.push(item);
        this.sendToService.push(item.value);
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
        this.genderSelected.splice(this.genderSelected.indexOf(item.value), 1);
        this.categoriaSelected.splice(this.categoriaSelected.indexOf(item.value), 1);
      }
      if (className == 'use' && !checked) {
        this.useSelected.splice(this.useSelected.indexOf(item.value), 1);
        this.subCategoriaSelected.splice(this.subCategoriaSelected.indexOf(item.value), 1);
      }
      if (className == 'origin' && !checked) {
        this.originSelected.splice(this.originSelected.indexOf(item.value), 1);
      }
      if (className == 'feature' && !checked) {
        this.featureSelected.splice(
          this.featureSelected.indexOf(item.value),
          1
        );
        this.tipoPrendaSelected.splice(
          this.tipoPrendaSelected.indexOf(item.value),
          1
        );
      }
      if (className == 'color' && !checked) {
        this.colorSelected.splice(this.colorSelected.indexOf(item.value), 1);
        this.colorScrapingSelected.splice(this.colorScrapingSelected.indexOf(item.value), 1);
      }
      if (className == 'user' && !checked) {
        this.userSelected.splice(this.userSelected.indexOf(item), 1);
      }
    }

    //enviar la info en el servicio desde UpdatedcheckedFilter
    // console.log(this.sendToService);
      this.servicioEnvioData.enviarMensaje(this.sendToService);

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
      if(item.colores !== undefined) {
        colores.push(item.colores);
      }
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
    // console.log(this.ppalColorModal.hexa);

    // console.log(this.hexaColorModal);
  }
}
