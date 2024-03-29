import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { BlackboxService } from '../../services/blackbox.service';

// Angular DataTable
import { OnDestroy } from '@angular/core';
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
  styleUrls: ['./informe-categoria.component.css'],
})
export class InformeCategoriaComponent implements OnDestroy, OnInit {
  //Config modal filtros
  modalRef: BsModalRef;
  modalRefCards: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
  };

  photos: any;

  // variables para las cards
  womenNew: any = 0;
  womendiscontinued: any = 0;
  womenPromotion: any = 0;
  womensku: any = 0;

  menNew: any = 0;
  mendiscontinued: any = 0;
  menPromotion: any = 0;
  mensku: any = 0;

  kidsNew: any = 0;
  kidsdiscontinued: any = 0;
  kidsPromotion: any = 0;
  kidssku: any = 0;

  //Cards
  originCards: any = '';
  categoriaCards: any = '';
  subCategoriaCards: any = '';
  tipoPrendaCards: any = '';
  colorCards: any = '';
  composicionCards: any = "";

  //Tabla 1
  origin: any = '';
  categoria: any = '';
  subCategoria: any = '';
  tipoPrenda: any = '';
  color: any = '';
  composicion: any = "";


  //Datos index.ts
  datos: any;
  originData: any;
  categoryData: any;
  subCategoryData: any;
  tipoPrendaData: any;
  colorData: any;
  composicionData: any;

  //Cards
  selectedFilterCards = [];
  originSelectedCards = [];
  categoriaSelectedCards = [];
  subCategoriaSelectedCards = [];
  tipoPrendaSelectedCards = [];
  colorSelectedCards = [];
  composicionSelectedCards = [];

  //Tabla 1
  selectedFilter = [];
  originSelected = [];
  categoriaSelected = [];
  subCategoriaSelected = [];
  tipoPrendaSelected = [];
  colorSelected = [];
  composicionSelected = [];

  averagePrice: any;
  averageNews2: any;
  averageDiscount2: any;
  tasaFrescura: any;
  tableAvgSKU: any;
  tableDifference: any;
  inicio: any = '';
  fin: any = '';

  //Checked All
  isCheckedOrigin2 = false;
  isCheckedCategory2 = false;
  isCheckedSubCategory2 = false;
  isCheckedTipoPrenda2 = false;
  isCheckedColor2 = false;
  isCheckedComposicion2 = false;
  spinnerTable = false;

  //Checked All
  isCheckedOrigin = false;
  isCheckedCategory = false;
  isCheckedSubCategory = false;
  isCheckedTipoPrenda = false;
  isCheckedColor = false;
  isCheckedComposicion = false;

  
  constructor(
    private blackboxService: BlackboxService, private modalServiceCards: BsModalService, private modalService: BsModalService
  ) {
    this.datos = new Datos();
  }

  ngOnInit(): void {
    this.toggleSidebar();
    this.getInfoCards();
    this.getInfoTable();
    this.showDataModal();

  }

  ngOnDestroy(): void {
  }

  // Ocultar/Mostrar sidebar
  toggleSidebar() {
    $('#menu-toggle-sidebar2').on('click', function (e) {
      e.preventDefault();
      $('#wrapper').toggleClass('toggled');
      (<any>(
        $('#wrapper.toggled').find('#sidebar-wrapper').find('.collapse')
      )).collapse('hide');
    });
  }

  getSpinnerClass() {
    if (this.spinnerTable) {
      return 'modalHidden';
    } else {
      return 'modalShow';
    }
  }

  // Peticion infoCards
  getInfoCards() {
    let params = {
      origin: this.originSelectedCards,
      categoria: this.categoriaSelectedCards,
      subCategoria: this.subCategoriaSelectedCards,
      tipoPrenda: this.tipoPrendaSelectedCards,
      color: this.colorSelectedCards,
      fechaInicio: this.inicio,
      fechaFin: this.fin
      
    };

    this.spinnerTable = true;

    this.blackboxService.getPrendasInfoCards(params).subscribe(
      (res) => {
        this.setPrendasInfoCards(res);
        // console.log(res);
        this.spinnerTable = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // setteo de datos en las cards
  setPrendasInfoCards(res) {
    this.womenNew = new Intl.NumberFormat('es-CO').format(res.obj.newWomen);
    this.womendiscontinued = new Intl.NumberFormat('es-CO').format(res.obj.discontinuedWomen);
    this.womenPromotion = new Intl.NumberFormat('es-CO').format(res.obj.promotionWomen);
    this.womensku = new Intl.NumberFormat('es-CO').format(res.obj.totalskuWomen);

    this.menNew = new Intl.NumberFormat('es-CO').format(res.obj.newMen);
    this.mendiscontinued = new Intl.NumberFormat('es-CO').format(res.obj.discontinuedMen);
    this.menPromotion = new Intl.NumberFormat('es-CO').format(res.obj.promotionMen);
    this.mensku = new Intl.NumberFormat('es-CO').format(res.obj.totalskuMen);

    this.kidsNew = new Intl.NumberFormat('es-CO').format(res.obj.newKids);
    this.kidsdiscontinued = new Intl.NumberFormat('es-CO').format(res.obj.discontinuedKids);
    this.kidsPromotion = new Intl.NumberFormat('es-CO').format(res.obj.promotionKids);
    this.kidssku = new Intl.NumberFormat('es-CO').format(res.obj.totalskuKids);
  }

  // Peticion a la tabla 1
  getInfoTable() {
    let params = {
      origin: this.originSelected,
      categoria: this.categoriaSelected,
      subCategoria: this.subCategoriaSelected,
      tipoPrenda: this.tipoPrendaSelected,
      color: this.colorSelected,
      composicion: this.composicionSelected,
      fechaInicio: this.inicio,
      fechaFin: this.fin,


      allCategory: this.isCheckedCategory2,
      allSubCategory: this.isCheckedSubCategory2,
      allTipoPrenda: this.isCheckedTipoPrenda2
    };

    this.spinnerTable = true;

    //Cambiar la ruta de get
    this.blackboxService.getTablePrendasInfo2(params).subscribe(
      (res) => {
        // console.log(res);
        this.setInfoTable(res);
        this.spinnerTable = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // set info table
  setInfoTable(res) {
    res.obj.arr2 = res.obj.arr2.map(element => {
      if(element.precioPromedio !== null) {
        element.precioPromedio = new Intl.NumberFormat('es-CO').format(element.precioPromedio);
        element.nuevos = new Intl.NumberFormat('es-CO').format(element.nuevos);
        element.SKU = new Intl.NumberFormat('es-CO').format(element.SKU);

      }

      return element
    });
    this.photos = res.obj.arr2;

  }

  //===============INICIO FILTROS MODAL===============

  //Obtener datos desde index.ts para mostrar en el modal
  showDataModal() {
    this.originData = this.datos.origins;
    this.categoryData = this.datos.categorias;
    this.subCategoryData = this.datos.subcategorias;
    this.tipoPrendaData = this.datos.tipoprendas;
    this.colorData = this.datos.colores;
    this.composicionData = this.datos.composicion;
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

    //Filtro cards
    if (value.checked && value.clase === 'marcaCards') {
      this.originSelectedCards.push(item);
      this.selectedFilterCards.push(value);
      this.originCards = this.originSelectedCards;
      console.log(this.originCards);
      this.getInfoCards();
    } else if (value.clase == 'marcaCards' && !value.checked) {
      this.originCards = [];
      this.originSelectedCards.splice(this.originSelectedCards.indexOf(item), 1);
      this.selectedFilterCards.splice(this.selectedFilterCards.indexOf(value), 1);
      console.log(this.originSelectedCards);
      this.getInfoCards();
    }

    if (value.checked && value.clase === 'categoriaCards') {
      this.categoriaSelectedCards.push(item);
      this.selectedFilterCards.push(value);
      this.categoriaCards = this.categoriaSelected;
      console.log(this.categoriaCards);
      this.getInfoCards();
    } else if (value.clase == 'categoriaCards' && !value.checked) {
      this.categoriaCards = [];
      this.categoriaSelectedCards.splice(this.categoriaSelectedCards.indexOf(item), 1);
      this.selectedFilterCards.splice(this.selectedFilterCards.indexOf(value), 1);
      console.log(this.categoriaSelectedCards);
      this.getInfoCards();
    }

    if (value.checked && value.clase === 'subCategoriaCards') {
      this.subCategoriaSelectedCards.push(item);
      this.selectedFilterCards.push(value);
      this.subCategoriaCards = this.subCategoriaSelectedCards;
      console.log(this.subCategoriaCards);
      this.getInfoCards();
    } else if (value.clase == 'subCategoriaCards' && !value.checked) {
      this.subCategoriaCards = [];
      this.subCategoriaSelectedCards.splice(this.subCategoriaSelectedCards.indexOf(item), 1);
      this.selectedFilterCards.splice(this.selectedFilterCards.indexOf(value), 1);
      console.log(this.subCategoriaSelectedCards);
      this.getInfoCards();
    }

    if (value.checked && value.clase === 'tipoPrendaCards') {
      this.tipoPrendaSelectedCards.push(item);
      this.selectedFilterCards.push(value);
      this.tipoPrendaCards = this.tipoPrendaSelectedCards;
      console.log(this.tipoPrendaCards);
      this.getInfoCards();
    } else if (value.clase == 'tipoPrendaCards' && !value.checked) {
      this.tipoPrendaCards = [];
      this.tipoPrendaSelectedCards.splice(this.tipoPrendaSelectedCards.indexOf(item), 1);
      this.selectedFilterCards.splice(this.selectedFilterCards.indexOf(value), 1);
      console.log(this.tipoPrendaSelectedCards);
      this.getInfoCards();
    }

    if (value.checked && value.clase === 'colorCards colorStyles') {
      this.colorSelectedCards.push(item);
      this.selectedFilterCards.push(value);
      this.colorCards = this.colorSelectedCards;
      console.log(this.colorCards);
      this.getInfoCards();
    } else if (value.clase == 'colorCards colorStyles' && !value.checked) {
      this.colorCards = [];
      this.colorSelectedCards.splice(this.colorSelectedCards.indexOf(item), 1);
      this.selectedFilterCards.splice(this.selectedFilterCards.indexOf(value), 1);
      console.log(this.colorSelectedCards);
      this.getInfoCards();
    }

    if (value.checked && value.clase === 'composicionCards') {
      this.composicionSelectedCards.push(item);
      this.selectedFilterCards.push(value);
      this.composicionCards = this.composicionSelectedCards;
      console.log(this.composicionCards);
      this.getInfoCards();
    } else if (value.clase == 'composicionCards' && !value.checked) {
      this.composicionCards = [];
      this.composicionSelectedCards.splice(this.composicionSelectedCards.indexOf(item), 1);
      this.selectedFilterCards.splice(this.selectedFilterCards.indexOf(value), 1);
      console.log(this.composicionSelectedCards);
      this.getInfoCards();
    }       

    //Filtro tabla
    if (value.checked && value.clase === 'marca') {
      this.originSelected.push(item);
      this.selectedFilter.push(value);
      this.origin = this.originSelected;
      console.log(this.origin);
      this.getInfoTable();
    } else if (value.clase == 'marca' && !value.checked) {
      this.origin = [];
      this.originSelected.splice(this.originSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.originSelected);
      this.getInfoTable();
    }

    if (value.checked && value.clase === 'categoria') {
      this.categoriaSelected.push(item);
      this.selectedFilter.push(value);
      this.categoria = this.categoriaSelected;
      console.log(this.categoria);
      this.getInfoTable();
    } else if (value.clase == 'categoria' && !value.checked) {
      this.categoria = [];
      this.categoriaSelected.splice(this.categoriaSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.categoriaSelected);
      this.getInfoTable();
    }

    if (value.checked && value.clase === 'subCategoria') {
      this.subCategoriaSelected.push(item);
      this.selectedFilter.push(value);
      this.subCategoria = this.subCategoriaSelected;
      console.log(this.subCategoria);
      this.getInfoTable();
    } else if (value.clase == 'subCategoria' && !value.checked) {
      this.subCategoria = [];
      this.subCategoriaSelected.splice(
      this.subCategoriaSelected.indexOf(item),1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.subCategoriaSelected);
      this.getInfoTable();
    }

    if (value.checked && value.clase === 'tipoPrenda') {
      this.tipoPrendaSelected.push(item);
      this.selectedFilter.push(value);
      this.tipoPrenda = this.tipoPrendaSelected;
      console.log(this.tipoPrenda);
      this.getInfoTable();
    } else if (value.clase == 'tipoPrenda' && !value.checked) {
      this.tipoPrenda = [];
      this.tipoPrendaSelected.splice(this.tipoPrendaSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.tipoPrendaSelected);
      this.getInfoTable();
    }

    if (value.checked && value.clase === 'color colorStyles') {
      this.colorSelected.push(item);
      this.selectedFilter.push(value);
      this.color = this.colorSelected;
      console.log(this.color);
      this.getInfoTable();
    } else if (value.clase == 'color colorStyles' && !value.checked) {
      this.color = [];
      this.colorSelected.splice(this.colorSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.colorSelected);
      this.getInfoTable();
    }

    if (value.checked && value.clase === 'composicion') {
      this.composicionSelected.push(item);
      this.selectedFilter.push(value);
      this.composicion = this.composicionSelected;
      console.log(this.composicion);
      this.getInfoTable();
    } else if (value.clase == 'composicion' && !value.checked) {
      this.composicion = [];
      this.composicionSelected.splice(this.composicionSelected.indexOf(item), 1);
      this.selectedFilter.splice(this.selectedFilter.indexOf(value), 1);
      console.log(this.composicionSelected);
      this.getInfoTable();
    }            
  }

  //Validación check all filtros
  checkAllOrigin2() {
    if (this.isCheckedOrigin2 == true) {
      $('.marca').prop('checked', false);
      this.isCheckedOrigin2 = false;
      $('.marca').prop('disabled', false);

      this.originData.forEach(element => {
        this.selectedFilter.forEach((e,) => {
          if (e.item === element.value) {
            this.selectedFilter = this.selectedFilter.filter(filtro => {
              return filtro.item !== e.item;
            });
          }
        });

        this.originSelected.splice(element.value);
      });

      this.getInfoTable();
    } else {
      if (this.originSelected.length > 0 && this.selectedFilter.length > 0) {
        this.originSelected = [];

        this.originData.forEach(element => {
          this.selectedFilter.forEach((e,) => {
            if (e.item === element.value) {
              this.selectedFilter = this.selectedFilter.filter(filtro => {
                return filtro.item !== e.item;
              });
            }
          });
  
          this.originSelected.splice(element.value);
        });
      }

      $('.marca').prop('checked', true);
      this.isCheckedOrigin2 = true;
      $('.marca').prop('disabled', true);

      this.originData.forEach(element =>  {
        let value = {
          item: element.value || ''
        }
        this.originSelected.push(element.value);
        this.selectedFilter.push(value);
      });

      this.getInfoTable();
    }
  }

  checkAllCategory2() {
    if (this.isCheckedCategory2 == true) {
      $('.categoria').prop('checked', false);
      this.isCheckedCategory2 = false;
      $('.categoria').prop('disabled', false);

      this.categoryData.forEach(element => {
        this.selectedFilter.forEach((e,) => {
          if (e.item === element.value) {
            this.selectedFilter = this.selectedFilter.filter(filtro => {
              return filtro.item !== e.item;
            });
          }
        }); 

        this.categoriaSelected.splice(element.value);
      });

      this.getInfoTable();
    } else {
      if (this.categoriaSelected.length > 0 && this.selectedFilter.length > 0) {
        this.categoriaSelected = [];

        this.categoryData.forEach(element => {
          this.selectedFilter.forEach((e,) => {
            if (e.item === element.value) {
              this.selectedFilter = this.selectedFilter.filter(filtro => {
                return filtro.item !== e.item;
              });
            }
          });
  
          this.categoriaSelected.splice(element.value);
        });
      }

      $('.categoria').prop('checked', true);
      this.isCheckedCategory2 = true;
      $('.categoria').prop('disabled', true);

      this.categoryData.forEach(element =>  {
        let value = {
          item: element.value || ''
        }
        this.categoriaSelected.push(element.value);
        this.selectedFilter.push(value);
      });

      this.getInfoTable();
    }
  }

  checkAllSubCategory2() {
    if (this.isCheckedSubCategory2 == true) {
      $('.subCategoria').prop('checked', false);
      this.isCheckedSubCategory2 = false;
      $('.subCategoria').prop('disabled', false);

      this.subCategoryData.forEach(element => {
        this.selectedFilter.forEach((e,) => {
          if (e.item === element.value) {
            this.selectedFilter = this.selectedFilter.filter(filtro => {
              return filtro.item !== e.item;
            });
          }
        }); 

        this.subCategoriaSelected.splice(element.value);
      });

      this.getInfoTable();
    } else {
      if (this.subCategoriaSelected.length > 0 && this.selectedFilter.length > 0) {
        this.subCategoriaSelected = [];

        this.subCategoryData.forEach(element => {
          this.selectedFilter.forEach((e,) => {
            if (e.item === element.value) {
              this.selectedFilter = this.selectedFilter.filter(filtro => {
                return filtro.item !== e.item;
              });
            }
          });
  
          this.subCategoriaSelected.splice(element.value);
        });
      }

      $('.subCategoria').prop('checked', true);
      this.isCheckedSubCategory2 = true;
      $('.subCategoria').prop('disabled', true);

      this.subCategoryData.forEach(element =>  {
        let value = {
          item: element.value || ''
        }
        this.subCategoriaSelected.push(element.value);
        this.selectedFilter.push(value);
      });

      this.getInfoTable();
    }
  }

  checkAllTipoPrenda2() {
    if (this.isCheckedTipoPrenda2 == true) {
      $('.tipoPrenda').prop('checked', false);
      this.isCheckedTipoPrenda2 = false;
      $('.tipoPrenda').prop('disabled', false);

      this.tipoPrendaData.forEach(element => {
        this.selectedFilter.forEach((e,) => {
          if (e.item === element.value) {
            this.selectedFilter = this.selectedFilter.filter(filtro => {
              return filtro.item !== e.item;
            });
          }
        }); 

        this.tipoPrendaSelected.splice(element.value);
      });

      this.getInfoTable();
    } else {
      if (this.tipoPrendaSelected.length > 0 && this.selectedFilter.length > 0) {
        this.tipoPrendaSelected = [];

        this.tipoPrendaData.forEach(element => {
          this.selectedFilter.forEach((e,) => {
            if (e.item === element.value) {
              this.selectedFilter = this.selectedFilter.filter(filtro => {
                return filtro.item !== e.item;
              });
            }
          });
  
          this.tipoPrendaSelected.splice(element.value);
        });
      }

      $('.tipoPrenda').prop('checked', true);
      this.isCheckedTipoPrenda2 = true;
      $('.tipoPrenda').prop('disabled', true);

      this.tipoPrendaData.forEach(element =>  {
        let value = {
          item: element.value || ''
        }
        this.tipoPrendaSelected.push(element.value);
        this.selectedFilter.push(value);
      });

      this.getInfoTable();
    }
  }
  
  checkAllColor2() {
    if (this.isCheckedColor2 == true) {
      $('.color').prop('checked', false);
      this.isCheckedColor2 = false;
      $('.color').prop('disabled', false);

      this.colorData.forEach(element => {
        this.selectedFilter.forEach((e,) => {
          if (e.item === element.value) {
            this.selectedFilter = this.selectedFilter.filter(filtro => {
              return filtro.item !== e.item;
            });
          }
        }); 

        this.colorSelected.splice(element.value);
      });

      this.getInfoTable();
    } else {
      if (this.colorSelected.length > 0 && this.selectedFilter.length > 0) {
        this.colorSelected = [];

        this.colorData.forEach(element => {
          this.selectedFilter.forEach((e,) => {
            if (e.item === element.value) {
              this.selectedFilter = this.selectedFilter.filter(filtro => {
                return filtro.item !== e.item;
              });
            }
          });
  
          this.colorSelected.splice(element.value);
        });
      }

      $('.color').prop('checked', true);
      this.isCheckedColor2 = true;
      $('.color').prop('disabled', true);

      this.colorData.forEach(element =>  {
        let value = {
          item: element.value || ''
        }
        this.colorSelected.push(element.value);
        this.selectedFilter.push(value);
      });

      this.getInfoTable();
    }
  }

  checkAllComposicion2() {
    if (this.isCheckedComposicion2 == true) {
      $('.composicion').prop('checked', false);
      this.isCheckedComposicion2 = false;
      $('.composicion').prop('disabled', false);

      this.composicionData.forEach(element => {
        this.selectedFilter.forEach((e,) => {
          if (e.item === element.value) {
            this.selectedFilter = this.selectedFilter.filter(filtro => {
              return filtro.item !== e.item;
            });
          }
        }); 

        this.composicionSelected.splice(element.value);
      });

      this.getInfoTable();
    } else {
      if (this.composicionSelected.length > 0 && this.selectedFilter.length > 0) {
        this.composicionSelected = [];

        this.composicionData.forEach(element => {
          this.selectedFilter.forEach((e,) => {
            if (e.item === element.value) {
              this.selectedFilter = this.selectedFilter.filter(filtro => {
                return filtro.item !== e.item;
              });
            }
          });
  
          this.composicionSelected.splice(element.value);
        });
      }

      $('.composicion').prop('checked', true);
      this.isCheckedComposicion2 = true;
      $('.composicion').prop('disabled', true);

      this.composicionData.forEach(element =>  {
        let value = {
          item: element.value || ''
        }
        this.composicionSelected.push(element.value);
        this.selectedFilter.push(value);
      });

      this.getInfoTable();
    }
  }   
  
  // funcion para validar los checks de cards

  

  // validar check filtros de categoria 
  checkAllOrigin() {
    if (this.isCheckedOrigin == true) {
      $('.marcaCards').prop('checked', false);
      $('.marcaCards').prop('disabled', false);
      this.isCheckedOrigin = false;

      this.originData.forEach(element => {
        this.selectedFilter.forEach((e,) => {
          if (e.item === element.value) {
            this.selectedFilter = this.selectedFilter.filter(filtro => {
              return filtro.item !== e.item;
            });
          }
        });

        this.originSelectedCards.splice(element.value);
      });

      this.getInfoCards();
    } else {
      if (this.originSelectedCards.length > 0 && this.selectedFilter.length > 0) {
        this.originSelectedCards = [];

        this.originData.forEach(element => {
          this.selectedFilter.forEach((e,) => {
            if (e.item === element.value) {
              this.selectedFilter = this.selectedFilter.filter(filtro => {
                return filtro.item !== e.item;
              });
            }
          });
  
          this.originSelectedCards.splice(element.value);
        });
      }

      $('.marcaCards').prop('checked', true);
      this.isCheckedOrigin = true;
      $('.marcaCards').prop('disabled', true);

      this.originData.forEach(element =>  {
        let value = {
          item: element.value || ''
        }
        this.originSelectedCards.push(element.value);
        this.selectedFilter.push(value);
      });

      this.getInfoCards();
    }
  }

  checkAllCategory() {
    if (this.isCheckedCategory == true) {
      $('.categoriaCards').prop('checked', false);
      this.isCheckedCategory = false;
      $('.categoriaCards').prop('disabled', false);

      this.categoryData.forEach(element => {
        this.selectedFilter.forEach((e,) => {
          if (e.item === element.value) {
            this.selectedFilter = this.selectedFilter.filter(filtro => {
              return filtro.item !== e.item;
            });
          }
        }); 

        this.categoriaSelectedCards.splice(element.value);
      });

      this.getInfoCards();
    } else {
      if (this.categoriaSelectedCards.length > 0 && this.selectedFilter.length > 0) {
        this.categoriaSelectedCards = [];

        this.categoryData.forEach(element => {
          this.selectedFilter.forEach((e,) => {
            if (e.item === element.value) {
              this.selectedFilter = this.selectedFilter.filter(filtro => {
                return filtro.item !== e.item;
              });
            }
          });
  
          this.categoriaSelectedCards.splice(element.value);
        });
      }

      $('.categoriaCards').prop('checked', true);
      this.isCheckedCategory = true;
      $('.categoriaCards').prop('disabled', true);

      this.categoryData.forEach(element =>  {
        let value = {
          item: element.value || ''
        }
        this.categoriaSelectedCards.push(element.value);
        this.selectedFilter.push(value);
      });

      this.getInfoCards();
    }
  }

  checkAllSubCategory() {
    if (this.isCheckedSubCategory == true) {
      $('.subCategoriaCards').prop('checked', false);
      this.isCheckedSubCategory = false;
      $('.subCategoriaCards').prop('disabled', false);

      this.subCategoryData.forEach(element => {
        this.selectedFilter.forEach((e,) => {
          if (e.item === element.value) {
            this.selectedFilter = this.selectedFilter.filter(filtro => {
              return filtro.item !== e.item;
            });
          }
        }); 

        this.subCategoriaSelectedCards.splice(element.value);
      });

      this.getInfoCards();
    } else {
      if (this.subCategoriaSelectedCards.length > 0 && this.selectedFilter.length > 0) {
        this.subCategoriaSelectedCards = [];

        this.subCategoryData.forEach(element => {
          this.selectedFilter.forEach((e,) => {
            if (e.item === element.value) {
              this.selectedFilter = this.selectedFilter.filter(filtro => {
                return filtro.item !== e.item;
              });
            }
          });
  
          this.subCategoriaSelectedCards.splice(element.value);
        });
      }

      $('.subCategoriaCards').prop('checked', true);
      this.isCheckedSubCategory = true;
      $('.subCategoriaCards').prop('disabled', true);

      this.subCategoryData.forEach(element =>  {
        let value = {
          item: element.value || ''
        }
        this.subCategoriaSelectedCards.push(element.value);
        this.selectedFilter.push(value);
      });

      this.getInfoCards();
    }
  }

  checkAllTipoPrenda() {
    if (this.isCheckedTipoPrenda == true) {
      $('.tipoPrendaCards').prop('checked', false);
      this.isCheckedTipoPrenda = false;
      $('.tipoPrendaCards').prop('disabled', false);

      this.tipoPrendaData.forEach(element => {
        this.selectedFilter.forEach((e,) => {
          if (e.item === element.value) {
            this.selectedFilter = this.selectedFilter.filter(filtro => {
              return filtro.item !== e.item;
            });
          }
        }); 

        this.tipoPrendaSelectedCards.splice(element.value);
      });

      this.getInfoCards();
    } else {
      if (this.tipoPrendaSelectedCards.length > 0 && this.selectedFilter.length > 0) {
        this.tipoPrendaSelectedCards = [];

        this.tipoPrendaData.forEach(element => {
          this.selectedFilter.forEach((e,) => {
            if (e.item === element.value) {
              this.selectedFilter = this.selectedFilter.filter(filtro => {
                return filtro.item !== e.item;
              });
            }
          });
  
          this.tipoPrendaSelectedCards.splice(element.value);
        });
      }

      $('.tipoPrendaCards').prop('checked', true);
      this.isCheckedTipoPrenda = true;
      $('.tipoPrendaCards').prop('disabled', true);

      this.tipoPrendaData.forEach(element =>  {
        let value = {
          item: element.value || ''
        }
        this.tipoPrendaSelectedCards.push(element.value);
        this.selectedFilter.push(value);
      });

      this.getInfoCards();
    }
  }
  
  checkAllColor() {
    if (this.isCheckedColor == true) {
      $('.colorCards').prop('checked', false);
      this.isCheckedColor = false;
      $('.colorCards').prop('disabled', false);

      this.colorData.forEach(element => {
        this.selectedFilter.forEach((e,) => {
          if (e.item === element.value) {
            this.selectedFilter = this.selectedFilter.filter(filtro => {
              return filtro.item !== e.item;
            });
          }
        }); 

        this.colorSelectedCards.splice(element.value);
      });

      this.getInfoCards();
    } else {
      if (this.colorSelectedCards.length > 0 && this.selectedFilter.length > 0) {
        this.colorSelectedCards = [];

        this.colorData.forEach(element => {
          this.selectedFilter.forEach((e,) => {
            if (e.item === element.value) {
              this.selectedFilter = this.selectedFilter.filter(filtro => {
                return filtro.item !== e.item;
              });
            }
          });
  
          this.colorSelectedCards.splice(element.value);
        });
      }

      $('.colorCards').prop('checked', true);
      this.isCheckedColor = true;
      $('.colorCards').prop('disabled', true);

      this.colorData.forEach(element =>  {
        let value = {
          item: element.value || ''
        }
        this.colorSelectedCards.push(element.value);
        this.selectedFilter.push(value);
      });

      this.getInfoCards();
    }
  }

  checkAllComposicion() {
    if (this.isCheckedComposicion == true) {
      $('.composicionCards').prop('checked', false);
      this.isCheckedComposicion = false;
      $('.composicionCards').prop('disabled', false);

      this.composicionData.forEach(element => {
        this.selectedFilter.forEach((e,) => {
          if (e.item === element.value) {
            this.selectedFilter = this.selectedFilter.filter(filtro => {
              return filtro.item !== e.item;
            });
          }
        }); 

        this.composicionSelectedCards.splice(element.value);
      });

      this.getInfoCards();
    } else {
      if (this.composicionSelectedCards.length > 0 && this.selectedFilter.length > 0) {
        this.composicionSelectedCards = [];

        this.composicionData.forEach(element => {
          this.selectedFilter.forEach((e,) => {
            if (e.item === element.value) {
              this.selectedFilter = this.selectedFilter.filter(filtro => {
                return filtro.item !== e.item;
              });
            }
          });
  
          this.composicionSelectedCards.splice(element.value);
        });
      }

      $('.composicionCards').prop('checked', true);
      this.isCheckedComposicion = true;
      $('.composicionCards').prop('disabled', true);

      this.composicionData.forEach(element =>  {
        let value = {
          item: element.value || ''
        }
        this.composicionSelectedCards.push(element.value);
        this.selectedFilter.push(value);
      });

      this.getInfoCards();
    }
  } 

  // Modal Cards
  openModalCards(templateCards: TemplateRef<any>) {
    this.modalRefCards = this.modalServiceCards.show(templateCards, this.config);
  }

  clearFiltersCards() {
    this.originCards = [];
    this.categoriaCards = [];
    this.subCategoriaCards = [];
    this.tipoPrendaCards = [];
    this.composicionCards = [];

    this.originSelectedCards.splice(0, this.originSelectedCards.length);
    this.categoriaSelectedCards.splice(0, this.categoriaSelectedCards.length);
    this.subCategoriaSelectedCards.splice(0, this.subCategoriaSelectedCards.length);
    this.tipoPrendaSelectedCards.splice(0, this.tipoPrendaSelectedCards.length);
    this.colorSelectedCards.splice(0, this.colorSelectedCards.length);
    this.composicionSelectedCards.splice(0, this.composicionSelectedCards.length);
    this.selectedFilterCards.splice(0, this.selectedFilterCards.length);

    $(".marcaCards").prop("checked", false);
    $(".categoriaCards").prop("checked", false);
    $(".subCategoriaCards").prop("checked", false);
    $(".tipoPrendaCards").prop("checked", false);
    $(".colorCards").prop("checked", false);
    $(".composicionCards").prop("checked", false);

    $(".marcaCards").prop("disabled", false);
    $(".categoriaCards").prop("disabled", false);
    $(".subCategoriaCards").prop("disabled", false);
    $(".tipoPrendaCards").prop("disabled", false);
    $(".colorCards").prop("disabled", false);
    $(".composicionCards").prop("disabled", false);

    $(".marcaAll").prop("checked", false);
    $(".categoriaAll").prop("checked", false);
    $(".subCategoriaAll").prop("checked", false);
    $(".tipoPrendaAll").prop("checked", false);
    $(".colorAll").prop("checked", false);
    $(".composicionAll").prop("checked", false);

    this.isCheckedOrigin = false;
    this.isCheckedCategory = false;
    this.isCheckedSubCategory = false;
    this.isCheckedTipoPrenda = false;
    this.isCheckedColor = false;
    this.isCheckedComposicion = false;

    this.getInfoCards();
  }

  closeModalCards() {
    this.modalRefCards.hide();
  }

  // Modal Tabla 1
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }

  // clear table
  clearFilters() {
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
    this.composicionSelected.splice(0, this.composicionSelected.length);
    this.selectedFilter.splice(0, this.selectedFilter.length);

    $(".marca").prop("checked", false);
    $(".categoria").prop("checked", false);
    $(".subCategoria").prop("checked", false);
    $(".tipoPrenda").prop("checked", false);
    $(".color").prop("checked", false);
    $(".composicion").prop("checked", false);

    $(".marcaAll2").prop("checked", false);
    $(".categoriaAll2").prop("checked", false);
    $(".subCategoriaAll2").prop("checked", false);
    $(".tipoPrendaAll2").prop("checked", false);
    $(".colorAll2").prop("checked", false);
    $(".composicionAll2").prop("checked", false);

    this.isCheckedOrigin2 = false;
    this.isCheckedCategory2 = false;
    this.isCheckedSubCategory2 = false;
    this.isCheckedTipoPrenda2 = false;
    this.isCheckedColor2 = false;
    this.isCheckedComposicion2 = false;

    this.getInfoTable();
  }

  closeModal() {
    this.modalRef.hide();
  }

  //Validar checks filtros al cerrar modal cards
  validateCheckOriginCards(value: any, marcaCheckCards: any) {
    let validarMarcaCards = false;
    validarMarcaCards = this.originSelectedCards.some(element => element === value)
    if (validarMarcaCards) {
      let chequearMarcaCards = document.getElementById(`marca${marcaCheckCards}`);
      chequearMarcaCards.setAttribute('checked', 'checked');
    }
  }

  validateCheckCategoryCards(value: any, categoriaCheckCards: any) {
    let validarCategoriaCards = false;
    validarCategoriaCards = this.categoriaSelectedCards.some(element => element === value)
    if (validarCategoriaCards) {
      let chequearCategoriaCards = document.getElementById(`categoria${categoriaCheckCards}`);
      chequearCategoriaCards.setAttribute('checked', 'checked');
    }
  }

  validateCheckSubCategoryCards(value: any, subCategoriaCheckCards: any) {
    let validarSubCategoriaCards = false;
    validarSubCategoriaCards = this.subCategoriaSelectedCards.some(element => element === value)
    if (validarSubCategoriaCards) {
      let chequearSubCategoriaCards = document.getElementById(`subcategoria${subCategoriaCheckCards}`);
      chequearSubCategoriaCards.setAttribute('checked', 'checked');
    }
  }

  validateCheckTipoPrendaCards(value: any, tipoPrendaCheckCards: any) {
    let validarTipoPrendaCards = false;
    validarTipoPrendaCards = this.tipoPrendaSelectedCards.some(element => element === value)
    if (validarTipoPrendaCards) {
      let chequearTipoPrendaCards = document.getElementById(`tipoprenda${tipoPrendaCheckCards}`);
      chequearTipoPrendaCards.setAttribute('checked', 'checked');
    }
  }

  validateCheckColoCards(value: any, colorCheckCards: any) {
    let validarColorCards = false;
    validarColorCards = this.colorSelectedCards.some(element => element === value)
    if (validarColorCards) {
      let chequearColorCards = document.getElementById(`color${colorCheckCards}`);
      chequearColorCards.setAttribute('checked', 'checked');
    }
  }

  validateCheckComposicionCards(value: any, composicionCheckCards: any) {
    let validarComposicionCards = false;
    validarComposicionCards = this.composicionSelectedCards.some(element => element === value)
    if (validarComposicionCards) {
      let chequearComposicionCards = document.getElementById(`composicion${composicionCheckCards}`);
      chequearComposicionCards.setAttribute('checked', 'checked');
    }
  }   

  //Validar checks filtros al cerrar modal tabla
  validateCheckOrigin(value: any, marcaCheck: any) {
    let validarMarca = false;
    validarMarca = this.originSelected.some(element => element === value)
    if (validarMarca) {
      let chequearMarca = document.getElementById(`marca${marcaCheck}`);
      chequearMarca.setAttribute('checked', 'checked');
    }

    if (this.isCheckedOrigin2 == true) {
      this.isCheckedOrigin2 = false;
      $('.marca').prop('disabled', false);
    } else {
      this.isCheckedOrigin2 = true;
      $('.marca').prop('disabled', true);
    }    
  }

  validateCheckCategory(value: any, categoriaCheck: any) {
    let validarCategoria = false;
    validarCategoria = this.categoriaSelected.some(element => element === value)
    if (validarCategoria) {
      let chequearCategoria = document.getElementById(`categoria${categoriaCheck}`);
      chequearCategoria.setAttribute('checked', 'checked');
    }

    if (this.isCheckedCategory2 == true) {
      this.isCheckedCategory2 = false;
      $('.categoria').prop('disabled', false);
    } else {
      this.isCheckedCategory2 = true;
      $('.categoria').prop('disabled', true);
    }  
  }

  validateCheckSubCategory(value: any, subCategoriaCheck: any) {
    let validarSubCategoria = false;
    validarSubCategoria = this.subCategoriaSelected.some(element => element === value)
    if (validarSubCategoria) {
      let chequearSubCategoria = document.getElementById(`subcategoria${subCategoriaCheck}`);
      chequearSubCategoria.setAttribute('checked', 'checked');
    }

    if (this.isCheckedSubCategory2 == true) {
      this.isCheckedSubCategory2 = false;
      $('.subCategoria').prop('disabled', false);
    } else {
      this.isCheckedSubCategory2 = true;
      $('.subCategoria').prop('disabled', true);
    }
  }

  validateCheckTipoPrenda(value: any, tipoPrendaCheck: any) {
    let validarTipoPrenda = false;
    validarTipoPrenda = this.tipoPrendaSelected.some(element => element === value)
    if (validarTipoPrenda) {
      let chequearTipoPrenda = document.getElementById(`tipoprenda${tipoPrendaCheck}`);
      chequearTipoPrenda.setAttribute('checked', 'checked');
    }

    if (this.isCheckedTipoPrenda2 == true) {
      this.isCheckedTipoPrenda2 = false;
      $('.tipoPrenda').prop('disabled', false);
    } else {
      this.isCheckedTipoPrenda2 = true;
      $('.tipoPrenda').prop('disabled', true);
    }
  }

  validateCheckColor(value: any, colorCheck: any) {
    let validarColor = false;
    validarColor = this.colorSelected.some(element => element === value)
    if (validarColor) {
      let chequearColor = document.getElementById(`color${colorCheck}`);
      chequearColor.setAttribute('checked', 'checked');
    }

    if (this.isCheckedColor2 == true) {
      this.isCheckedColor2 = false;
      $('.color').prop('disabled', false);
    } else {
      this.isCheckedColor2 = true;
      $('.color').prop('disabled', true);
    }
  }

  validateCheckComposicion(value: any, composicionCheck: any) {
    let validarComposicion = false;
    validarComposicion = this.composicionSelected.some(element => element === value)
    if (validarComposicion) {
      let chequearComposicion = document.getElementById(`composicion${composicionCheck}`);
      chequearComposicion.setAttribute('checked', 'checked');
    }

    if (this.isCheckedComposicion2 == true) {
      this.isCheckedComposicion2 = false;
      $('.composicion').prop('disabled', false);
    } else {
      this.isCheckedComposicion2 = true;
      $('.composicion').prop('disabled', true);
    }
  } 

  fechaInicio(){    
    // console.log(this.inicio);
    this.getInfoCards();
  }

  fechaFin(){
    // let date = new Date(this.fin);
    // console.log(this.fin);
    this.getInfoCards();
  }
}
