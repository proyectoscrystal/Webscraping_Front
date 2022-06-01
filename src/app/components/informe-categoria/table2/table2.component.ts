import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';

import { BlackboxService } from '../../../services/blackbox.service';

// Angular DataTable
import { OnDestroy } from '@angular/core';
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

  photos: any;

  //Tabla2
  selectedFilter2 = [];
  originSelected2 = [];
  categoriaSelected2 = [];
  subCategoriaSelected2 = [];
  tipoPrendaSelected2 = [];
  colorSelected2 = [];
  composicionSelected2 = [];
  descuentoTable2: any;

  //Tabla 2
  origin2: any = '';
  categoria2: any = '';
  subCategoria2: any = '';
  tipoPrenda2: any = '';
  color2: any = '';
  composicion2: any = "";

  //Datos index.ts
  datos: any;
  originData: any;
  categoryData: any;
  subCategoryData: any;
  tipoPrendaData: any;
  colorData: any;
  composicionData: any;

  //Checked All
  isCheckedOrigin = false;
  isCheckedCategory = false;
  isCheckedSubCategory = false;
  isCheckedTipoPrenda = false;
  isCheckedColor = false;
  isCheckedComposicion = false;
  spinnerTable = false;  


  constructor(private blackboxService: BlackboxService, private modalService2: BsModalService
  ) {
    this.datos = new Datos();
  }

  ngOnInit(): void {
    this.getInfoTable2();
    this.showDataModal();

  }

  ngOnDestroy(): void {
  }

  getSpinnerClass() {
    if (this.spinnerTable) {
      return 'modalHidden';
    } else {
      return 'modalShow';
    }
  }

  // Peticion a la tabla 2
  getInfoTable2() {
    let params = {
      origin: this.originSelected2,
      categoria: this.categoriaSelected2,
      subCategoria: this.subCategoriaSelected2,
      tipoPrenda: this.tipoPrendaSelected2,
      color: this.colorSelected2,
      composicion: this.composicionSelected2
    };

    this.spinnerTable = true;

    this.blackboxService.getTablePrendasInfo(params).subscribe(
      (res) => {
        this.setInfoTable2(res);
        this.spinnerTable = false;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  setInfoTable2(res) {
    this.photos = res.obj.arr;
    // console.log(this.photos);
  }

  setPrice(price) {
    return new Intl.NumberFormat('es-CO').format(price);
  }

  showDataModal() {
    this.originData = this.datos.origins;
    this.categoryData = this.datos.categorias;
    this.subCategoryData = this.datos.subcategorias;
    this.tipoPrendaData = this.datos.tipoprendas;
    this.colorData = this.datos.colores;
    this.composicionData = this.datos.composicion;
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

    //Filtro tabla
    if (value.checked && value.clase === 'marca2') {
      this.originSelected2.push(item);
      this.selectedFilter2.push(value);
      this.origin2 = this.originSelected2;
      console.log(this.origin2);
      this.getInfoTable2();
    } else if (value.clase == 'marca2' && !value.checked) {
      this.origin2 = [];
      this.originSelected2.splice(this.originSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      console.log(this.originSelected2);
      this.getInfoTable2();
    }

    if (value.checked && value.clase === 'categoria2') {
      this.categoriaSelected2.push(item);
      this.selectedFilter2.push(value);
      this.categoria2 = this.categoriaSelected2;
      console.log(this.categoria2);
      this.getInfoTable2();
    } else if (value.clase == 'categoria2' && !value.checked) {
      this.categoria2 = [];
      this.categoriaSelected2.splice(this.categoriaSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      console.log(this.categoriaSelected2);
      this.getInfoTable2();
    }

    if (value.checked && value.clase === 'subCategoria2') {
      this.subCategoriaSelected2.push(item);
      this.selectedFilter2.push(value);
      this.subCategoria2 = this.subCategoriaSelected2;
      console.log(this.subCategoria2);
      this.getInfoTable2();
    } else if (value.clase == 'subCategoria2' && !value.checked) {
      this.subCategoria2 = []
      this.subCategoriaSelected2.splice(this.subCategoriaSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      console.log(this.subCategoriaSelected2);
      this.getInfoTable2();
    }

    if (value.checked && value.clase === 'tipoPrenda2') {
      this.tipoPrendaSelected2.push(item);
      this.selectedFilter2.push(value);
      this.tipoPrenda2 = this.tipoPrendaSelected2;
      console.log(this.tipoPrenda2);
      this.getInfoTable2();
    } else if (value.clase == 'tipoPrenda2' && !value.checked) {
      this.tipoPrenda2 = [];
      this.tipoPrendaSelected2.splice(this.tipoPrendaSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      console.log(this.tipoPrendaSelected2);
      this.getInfoTable2();
    }

    if (value.checked && value.clase === 'color2 colorStyles') {
      this.colorSelected2.push(item);
      this.selectedFilter2.push(value);
      this.color2 = this.colorSelected2;
      console.log(this.color2);
      this.getInfoTable2();
    } else if (value.clase == 'color2 colorStyles' && !value.checked) {
      this.color2 = [];
      this.colorSelected2.splice(this.colorSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      console.log(this.colorSelected2);
      this.getInfoTable2();
    }

    if (value.checked && value.clase === 'composicion2') {
      this.composicionSelected2.push(item);
      this.selectedFilter2.push(value);
      this.composicion2 = this.composicionSelected2;
      console.log(this.composicion2);
      this.getInfoTable2();
    } else if (value.clase == 'composicion2' && !value.checked) {
      this.composicion2 = [];
      this.composicionSelected2.splice(this.composicionSelected2.indexOf(item), 1);
      this.selectedFilter2.splice(this.selectedFilter2.indexOf(value), 1);
      console.log(this.composicionSelected2);
      this.getInfoTable2();
    }     
  }

  //Validación check all filtros
  checkAllOrigin() {
    if (this.isCheckedOrigin == true) {
      $('.marca2').prop('checked', false);
      this.isCheckedOrigin = false;
      $('.marca2').prop('disabled', false);

      this.originData.forEach(element => {
        this.selectedFilter2.forEach((e,) => {
          if (e.item === element.value) {
            this.selectedFilter2 = this.selectedFilter2.filter(filtro => {
              return filtro.item !== e.item;
            });
          }
        });

        this.originSelected2.splice(element.value);
      });

      this.getInfoTable2();
    } else {
      if (this.originSelected2.length > 0 && this.selectedFilter2.length > 0) {
        this.originSelected2 = [];

        this.originData.forEach(element => {
          this.selectedFilter2.forEach((e,) => {
            if (e.item === element.value) {
              this.selectedFilter2 = this.selectedFilter2.filter(filtro => {
                return filtro.item !== e.item;
              });
            }
          });
  
          this.originSelected2.splice(element.value);
        });
      }

      $('.marca2').prop('checked', true);
      this.isCheckedOrigin = true;
      $('.marca2').prop('disabled', true);

      this.originData.forEach(element =>  {
        let value = {
          item: element.value || ''
        }
        this.originSelected2.push(element.value);
        this.selectedFilter2.push(value);
      });

      this.getInfoTable2();
    }
  }

  checkAllCategory() {
    if (this.isCheckedCategory == true) {
      $('.categoria2').prop('checked', false);
      this.isCheckedCategory = false;
      $('.categoria2').prop('disabled', false);

      this.categoryData.forEach(element => {
        this.selectedFilter2.forEach((e,) => {
          if (e.item === element.value) {
            this.selectedFilter2 = this.selectedFilter2.filter(filtro => {
              return filtro.item !== e.item;
            });
          }
        }); 

        this.categoriaSelected2.splice(element.value);
      });

      this.getInfoTable2();
    } else {
      if (this.categoriaSelected2.length > 0 && this.selectedFilter2.length > 0) {
        this.categoriaSelected2 = [];

        this.categoryData.forEach(element => {
          this.selectedFilter2.forEach((e,) => {
            if (e.item === element.value) {
              this.selectedFilter2 = this.selectedFilter2.filter(filtro => {
                return filtro.item !== e.item;
              });
            }
          });
  
          this.categoriaSelected2.splice(element.value);
        });
      }

      $('.categoria2').prop('checked', true);
      this.isCheckedCategory = true;
      $('.categoria2').prop('disabled', true);

      this.categoryData.forEach(element =>  {
        let value = {
          item: element.value || ''
        }
        this.categoriaSelected2.push(element.value);
        this.selectedFilter2.push(value);
      });

      this.getInfoTable2();
    }
  }

  checkAllSubCategory() {
    if (this.isCheckedSubCategory == true) {
      $('.subCategoria2').prop('checked', false);
      this.isCheckedSubCategory = false;
      $('.subCategoria2').prop('disabled', false);

      this.subCategoryData.forEach(element => {
        this.selectedFilter2.forEach((e,) => {
          if (e.item === element.value) {
            this.selectedFilter2 = this.selectedFilter2.filter(filtro => {
              return filtro.item !== e.item;
            });
          }
        }); 

        this.subCategoriaSelected2.splice(element.value);
      });

      this.getInfoTable2();
    } else {
      if (this.subCategoriaSelected2.length > 0 && this.selectedFilter2.length > 0) {
        this.subCategoriaSelected2 = [];

        this.subCategoryData.forEach(element => {
          this.selectedFilter2.forEach((e,) => {
            if (e.item === element.value) {
              this.selectedFilter2 = this.selectedFilter2.filter(filtro => {
                return filtro.item !== e.item;
              });
            }
          });
  
          this.subCategoriaSelected2.splice(element.value);
        });
      }

      $('.subCategoria2').prop('checked', true);
      this.isCheckedSubCategory = true;
      $('.subCategoria2').prop('disabled', true);

      this.subCategoryData.forEach(element =>  {
        let value = {
          item: element.value || ''
        }
        this.subCategoriaSelected2.push(element.value);
        this.selectedFilter2.push(value);
      });

      this.getInfoTable2();
    }
  }

  checkAllTipoPrenda() {
    if (this.isCheckedTipoPrenda == true) {
      $('.tipoPrenda2').prop('checked', false);
      this.isCheckedTipoPrenda = false;
      $('.tipoPrenda2').prop('disabled', false);

      this.tipoPrendaData.forEach(element => {
        this.selectedFilter2.forEach((e,) => {
          if (e.item === element.value) {
            this.selectedFilter2 = this.selectedFilter2.filter(filtro => {
              return filtro.item !== e.item;
            });
          }
        }); 

        this.tipoPrendaSelected2.splice(element.value);
      });

      this.getInfoTable2();
    } else {
      if (this.tipoPrendaSelected2.length > 0 && this.selectedFilter2.length > 0) {
        this.tipoPrendaSelected2 = [];

        this.tipoPrendaData.forEach(element => {
          this.selectedFilter2.forEach((e,) => {
            if (e.item === element.value) {
              this.selectedFilter2 = this.selectedFilter2.filter(filtro => {
                return filtro.item !== e.item;
              });
            }
          });
  
          this.tipoPrendaSelected2.splice(element.value);
        });
      }

      $('.tipoPrenda2').prop('checked', true);
      this.isCheckedTipoPrenda = true;
      $('.tipoPrenda2').prop('disabled', true);

      this.tipoPrendaData.forEach(element =>  {
        let value = {
          item: element.value || ''
        }
        this.tipoPrendaSelected2.push(element.value);
        this.selectedFilter2.push(value);
      });

      this.getInfoTable2();
    }
  }
  
  checkAllColor() {
    if (this.isCheckedColor == true) {
      $('.color2').prop('checked', false);
      this.isCheckedColor = false;
      $('.color2').prop('disabled', false);

      this.colorData.forEach(element => {
        this.selectedFilter2.forEach((e,) => {
          if (e.item === element.value) {
            this.selectedFilter2 = this.selectedFilter2.filter(filtro => {
              return filtro.item !== e.item;
            });
          }
        }); 

        this.colorSelected2.splice(element.value);
      });

      this.getInfoTable2();
    } else {
      if (this.colorSelected2.length > 0 && this.selectedFilter2.length > 0) {
        this.colorSelected2 = [];

        this.colorData.forEach(element => {
          this.selectedFilter2.forEach((e,) => {
            if (e.item === element.value) {
              this.selectedFilter2 = this.selectedFilter2.filter(filtro => {
                return filtro.item !== e.item;
              });
            }
          });
  
          this.colorSelected2.splice(element.value);
        });
      }

      $('.color2').prop('checked', true);
      this.isCheckedColor = true;
      $('.color2').prop('disabled', true);

      this.colorData.forEach(element =>  {
        let value = {
          item: element.value || ''
        }
        this.colorSelected2.push(element.value);
        this.selectedFilter2.push(value);
      });

      this.getInfoTable2();
    }
  }

  checkAllComposicion() {
    if (this.isCheckedComposicion == true) {
      $('.composicion2').prop('checked', false);
      this.isCheckedComposicion = false;
      $('.composicion2').prop('disabled', false);

      this.composicionData.forEach(element => {
        this.selectedFilter2.forEach((e,) => {
          if (e.item === element.value) {
            this.selectedFilter2 = this.selectedFilter2.filter(filtro => {
              return filtro.item !== e.item;
            });
          }
        }); 

        this.composicionSelected2.splice(element.value);
      });

      this.getInfoTable2();
    } else {
      if (this.composicionSelected2.length > 0 && this.selectedFilter2.length > 0) {
        this.composicionSelected2 = [];

        this.composicionData.forEach(element => {
          this.selectedFilter2.forEach((e,) => {
            if (e.item === element.value) {
              this.selectedFilter2 = this.selectedFilter2.filter(filtro => {
                return filtro.item !== e.item;
              });
            }
          });
  
          this.composicionSelected2.splice(element.value);
        });
      }

      $('.composicion2').prop('checked', true);
      this.isCheckedComposicion = true;
      $('.composicion2').prop('disabled', true);

      this.composicionData.forEach(element =>  {
        let value = {
          item: element.value || ''
        }
        this.composicionSelected2.push(element.value);
        this.selectedFilter2.push(value);
      });

      this.getInfoTable2();
    }
  }  

  // Modal Tabla 2
  openModal2(template2: TemplateRef<any>) {
    this.modalRef2 = this.modalService2.show(template2, this.config);
  }

  clearFilters2() {
    this.origin2 = [];
    this.categoria2 = [];
    this.subCategoria2 = [];
    this.tipoPrenda2 = [];
    this.color2 = [];
    this.composicion2 = [];

    this.originSelected2.splice(0, this.originSelected2.length);
    this.categoriaSelected2.splice(0, this.categoriaSelected2.length);
    this.subCategoriaSelected2.splice(0, this.subCategoriaSelected2.length);
    this.tipoPrendaSelected2.splice(0, this.tipoPrendaSelected2.length);
    this.colorSelected2.splice(0, this.colorSelected2.length);
    this.composicionSelected2.splice(0, this.composicionSelected2.length)
    this.selectedFilter2.splice(0, this.selectedFilter2.length);

    $(".marca2").prop("checked", false);
    $(".categoria2").prop("checked", false);
    $(".subCategoria2").prop("checked", false);
    $(".tipoPrenda2").prop("checked", false);
    $(".color2").prop("checked", false);
    $(".composicion2").prop("checked", false);

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

    this.getInfoTable2();
  }

  closeModal2() {
    this.modalRef2.hide();
  }

  //Validar checks filtros al cerrar modal tabla
  validateCheckOrigin2(value: any, marcaCheck2: any) {
    let validarMarca2 = false;
    validarMarca2 = this.originSelected2.some(element => element === value)
    if (validarMarca2) {
      let chequearMarca2 = document.getElementById(`marca2${marcaCheck2}`);
      chequearMarca2.setAttribute('checked', 'checked');
    }
    
    if (this.isCheckedOrigin == true) {
      this.isCheckedOrigin = false;
      $('.marca2').prop('disabled', false);
    } else {
      this.isCheckedOrigin = true;
      $('.marca2').prop('disabled', true);
    }
  }

  validateCheckCategory2(value: any, categoriaCheck2: any) {
    let validarCategoria2 = false;
    validarCategoria2 = this.categoriaSelected2.some(element => element === value)
    if (validarCategoria2) {
      let chequearCategoria2 = document.getElementById(`categoria2${categoriaCheck2}`);
      chequearCategoria2.setAttribute('checked', 'checked');
    }

    if (this.isCheckedCategory == true) {
      this.isCheckedCategory = false;
      $('.categoria2').prop('disabled', false);
    } else {
      this.isCheckedCategory = true;
      $('.categoria2').prop('disabled', true);
    }
  }

  validateCheckSubCategory2(value: any, subCategoriaCheck2: any) {
    let validarSubCategoria2 = false;
    validarSubCategoria2 = this.subCategoriaSelected2.some(element => element === value)
    if (validarSubCategoria2) {
      let chequearSubCategoria2 = document.getElementById(`subcategoria2${subCategoriaCheck2}`);
      chequearSubCategoria2.setAttribute('checked', 'checked');
    }

    if (this.isCheckedSubCategory == true) {
      this.isCheckedSubCategory = false;
      $('.subCategoria2').prop('disabled', false);
    } else {
      this.isCheckedSubCategory = true;
      $('.subCategoria2').prop('disabled', true);
    }
  }

  validateCheckTipoPrenda2(value: any, tipoPrendaCheck2: any) {
    let validarTipoPrenda2 = false;
    validarTipoPrenda2 = this.tipoPrendaSelected2.some(element => element === value)
    if (validarTipoPrenda2) {
      let chequearTipoPrenda2 = document.getElementById(`tipoprenda2${tipoPrendaCheck2}`);
      chequearTipoPrenda2.setAttribute('checked', 'checked');
    }

    if (this.isCheckedTipoPrenda == true) {
      this.isCheckedTipoPrenda = false;
      $('.tipoPrenda2').prop('disabled', false);
    } else {
      this.isCheckedTipoPrenda = true;
      $('.tipoPrenda2').prop('disabled', true);
    }
  }

  validateCheckColor2(value: any, colorCheck2: any) {
    let validarColor2 = false;
    validarColor2 = this.colorSelected2.some(element => element === value)
    if (validarColor2) {
      let chequearColor2 = document.getElementById(`color2${colorCheck2}`);
      chequearColor2.setAttribute('checked', 'checked');
    }
    
    if (this.isCheckedColor == true) {
      this.isCheckedColor = false;
      $('.color2').prop('disabled', false);
    } else {
      this.isCheckedColor = true;
      $('.color2').prop('disabled', true);
    }
  }

  validateCheckComposicion2(value: any, composicionCheck2: any) {
    let validarComposicion2 = false;
    validarComposicion2 = this.composicionSelected2.some(element => element === value)
    if (validarComposicion2) {
      let chequearComposicion2 = document.getElementById(`composicion2${composicionCheck2}`);
      chequearComposicion2.setAttribute('checked', 'checked');
    }

    if (this.isCheckedComposicion == true) {
      this.isCheckedComposicion = false;
      $('.composicion2').prop('disabled', false);
    } else {
      this.isCheckedComposicion = true;
      $('.composicion2').prop('disabled', true);
    }
  } 

}
