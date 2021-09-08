import { Injectable } from '@angular/core';

@Injectable()
export class Datos {
  private years: any[] = [
    { value: '2018', text: '2018' },
    { value: '2019', text: '2019' },
    { value: '2020', text: '2020' },
    { value: '2021', text: '2021' },
    { value: '2022', text: '2022' },
  ];

  private featureOptions: any[] = [
    { value: 'Blazer', text: 'BLAZER' },
    { value: 'Bolsillo', text: 'BOLSILLO' },
    { value: 'BolsilloCanguro', text: 'BOLSILLO CANGURO' },
    { value: 'BolsilloConTapa', text: 'BOLSILLO CON TAPA' },
    { value: 'BolsilloCuadrado', text: 'BOLSILLO CUADRADO' },
    { value: 'BolsilloLados', text: 'BOLSILLO LADOS' },
    { value: 'BolsilloNormal', text: 'BOLSILLO NORMAL' },
    { value: 'BolsilloRedondo', text: 'BOLSILLO REDONDO' },
    { value: 'BotonDown', text: 'BOTON DOWN' },
    { value: 'Botones', text: 'BOTONES' },
    { value: 'Buzo', text: 'BUZO' },
    { value: 'Camisa', text: 'CAMISA' },
    { value: 'Camiseta', text: 'CAMISETA' },
    { value: 'Capucha', text: 'CAPUCHA' },
    { value: 'Chaleco', text: 'CHALECO' },
    { value: 'Chaqueta', text: 'CHAQUETA' },
    { value: 'Chompa', text: 'CHOMPA' },
    { value: 'Cierre', text: 'CIERRE' },
    { value: 'Cuello', text: 'CUELLO' },
    { value: 'CuelloEnV', text: 'CUELLO EN V' },
    { value: 'CuelloNeru', text: 'CUELLO NERU' },
    { value: 'CuelloRedondo', text: 'CUELLO REDONDO' },
    { value: 'ElasticoCintura', text: 'ELASTICO CINTURA' },
    { value: 'Estampado', text: 'ESTAMPADO' },
    { value: 'Jaladera', text: 'JALADERA' },
    { value: 'MangaCorta', text: 'MANGA CORTA' },
    { value: 'MangaLarga', text: 'MANGA LARGA' },
    { value: 'MangaSisa', text: 'MANGA SISA' },
    { value: 'PatronCuadros', text: 'PATRÓN CUADROS' },
    { value: 'PatronFloral', text: 'PATRÓN FLORAL' },
    { value: 'Puno', text: 'PUÑO' },
  ];

  private prendasGenerales: any[] = [
    { text: 'BERMUDA', value: 'BERMUDA' },
    { text: 'BODIES', value: 'BODIES' },
    { text: 'BOLSO', value: 'BOLSO' },
    { text: 'BOXER', value: 'BOXER' },
    { text: 'BRASIER', value: 'BRASIER' },
    { text: 'BUZOS', value: 'BUZOS' },
    { text: 'CHAQUETAS', value: 'CHAQUETAS' },
    { text: 'CAMISAS', value: 'CAMISAS' },
    { text: 'CAMISETAS', value: 'CAMISETAS' },
    { text: 'CROP_TOPS', value: 'CROP_TOPS' },
    { text: 'ENTERIZO', value: 'ENTERIZO' },
    { text: 'FALDAS', value: 'FALDAS' },
    { text: 'JEANS', value: 'JEANS' },
    { text: 'LEGINGS', value: 'LEGINGS' },
    { text: 'OVEROLES', value: 'OVEROLES' },
    { text: 'PANOLETAS', value: 'PANOLETAS' },
    { text: 'PANTALONES', value: 'PANTALONES' },
    { text: 'PANTALONETAS', value: 'PANTALONETAS' },
    { text: 'PANTIES', value: 'PANTIES' },
    { text: 'PIJAMAS_CAMISETAS', value: 'PIJAMAS_CAMISETAS' },
    { text: 'PIJAMAS_PANTALON', value: 'PIJAMAS_PANTALON' },
    { text: 'PIJAMAS_VESTIDO', value: 'PIJAMAS_VESTIDO' },
    { text: 'POLOS', value: 'POLOS' },
    { text: 'SHORTS', value: 'SHORTS' },
    { text: 'SUDADERA', value: 'SUDADERA' },
    { text: 'TENIS', value: 'TENIS' },
    { text: 'TOPS', value: 'TOPS' },
    { text: 'VESTIDOS', value: 'VESTIDOS' },
    { text: 'VESTIDO_DE_BANO_BRASIER', value: 'VESTIDO_DE_BANO_BRASIER' },
    { text: 'VESTIDO_DE_BANO_TANGA', value: 'VESTIDO_DE_BANO_TANGA' },
    { text: 'ZAPATOS', value: 'ZAPATOS' }
  ];

  private prendasScrapingMango: any[] = [
    { text: 'Camisas', value: 'Camisas' },
    { text: 'Camisetas', value: 'Camisetas' },
    { text: 'Polos', value: 'Polos' },
    { text: 'Sobrecamisas', value: 'Sobrecamisas' },
    { text: 'Sudaderas', value: 'Sudaderas' },
    { text: 'Cárdigans y jerséis', value: 'Cárdigans y jerséis' },
    { text: 'Americanas', value: 'Americanas' },
    { text: 'Chaquetas', value: 'Chaquetas' },
    { text: 'Piel', value: 'Piel' },
    { text: 'Abrigos', value: 'Abrigos' },
    { text: 'Bermudas', value: 'Bermudas' },
    { text: 'Pantalones', value: 'Pantalones' },
    { text: 'Vaqueros', value: 'Vaqueros' },
    { text: 'Bañadores', value: 'Bañadores' },
    { text: 'Ropa deportiva', value: 'Ropa deportiva' },
    { text: 'Pijamas y ropa interior', value: 'Pijamas y ropa interior' }
  ];  

  private prendasInferiores: any[] = [
    { text: 'ajustado', value: 'ajustado' },
    { text: 'bolsillo_superior', value: 'bolsillo_superior' },
    { text: 'bolsillo_lados', value: 'bolsillo_lados' },
    { text: 'cordon', value: 'cordon' },
    { text: 'corto', value: 'corto' },
    { text: 'largo', value: 'largo' },
    { text: 'no_ajustado', value: 'no_ajustado' },
    { text: 'medio', value: 'medio' },
    { text: 'pretina_enresortada', value: 'pretina_enresortada' },
    { text: 'pretina_lisa', value: 'pretina_lisa' },
    { text: 'item1', value: 'item1' },
    { text: 'item2', value: 'item2' },
    { text: 'item3', value: 'item3' },
    { text: 'item4', value: 'item4' },
  ];

  private coleccionOptions: any[] = [
    { value: 'Q1', text: 'Q1' },
    { value: 'Q2', text: 'Q2' },
    { value: 'Q3', text: 'Q3' },
    { value: 'Q4', text: 'Q4' },
  ];

  private generoHOptions: any[] = [
    { value: 'hjovenes', text: 'JÓVENES' },
    { value: 'hjunior', text: 'JUNIOR' },
    { value: 'hniños', text: 'NIÑOS' },
    { value: 'huniversitarios', text: 'UNIVERSITARIOS' },
  ];

  private generoOptions: any = [
    {
      label: 'HOMBRES',
      options: [
        { value: 'hjovenes', text: 'JÓVENES' },
        { value: 'hjunior', text: 'JUNIOR' },
        { value: 'hniños', text: 'NIÑOS' },
        { value: 'huniversitarios', text: 'UNIVERSITARIOS' },
      ],
    },
    {
      label: 'MUJERES',
      options: [
        { value: 'mjovenes', text: 'JÓVENES' },
        { value: 'mjunior', text: 'JUNIOR'},
        { value: 'mniños', text: 'NIÑAS'},
        { value: 'muniversitarios', text: 'UNIVERSITARIAS'},
      ],
    },
    {
      label: 'UNISEX',
      options: [
        { value: 'unisex', text: 'UNISEX'}
      ]
    }
  ];

  private usoOptions: any[] = [
    { value: 'interior', text: 'INTERIOR' },
    { value: 'exterior', text: 'EXTERIOR' },
    { value: 'deportivo', text: 'DEPORTIVO' },
    { value: 'vitrina', text: 'VITRINA' },
  ];

  private fuenteOptions: any[] = [
    { value: 'bf', text: 'BF' },
    { value: 'gef', text: 'GEF' },
    { value: 'instagram', text: 'INSTAGRAM' },
    { value: 'libros', text: 'LIBROS' },
    { value: 'pinterest', text: 'PINTEREST' },
    { value: 'pb', text: 'PB' },
    { value: 'revistas', text: 'REVISTAS' },
    { value: 'tagwalk', text: 'TAGWALK' },
    { value: 'viajes', text: 'VIAJES' },
    { value: 'web', text: 'WEB' },
    { value: 'wgsn', text: 'WGSN' },
  ];

  private mainColors: any[] = [
    {
      value: 'rojo',
      hexa: '#fd0000',
      rgb: '(253, 0, 0)',
      hsl: '(0, 100%, 50%)',
    },
    {
      value: 'amarillo',
      hexa: '#fdd500',
      rgb: '(253, 213, 0)',
      hsl: '(51, 100%, 50%)',
    },
    {
      value: 'azul',
      hexa: '#290c96',
      rgb: '( 41, 12, 150 )',
      hsl: '(253, 92%, 32%)',
    },
    {
      value: 'morado',
      hexa: '#7e0c96',
      rgb: '(126, 12, 150)',
      hsl: '(290, 92%, 32%)',
    },
    {
      value: 'naranjado',
      hexa: '#ec7335',
      rgb: '(236, 115, 53)',
      hsl: '(20, 78%, 57%)',
    },
    {
      value: 'verde',
      hexa: '#56a435',
      rgb: '(86, 164, 53)',
      hsl: '(102, 68%, 43%)',
    },
    {
      value: 'negro',
      hexa: '#000000',
      rgb: '(0, 0, 0)',
      hsl: '(0, 0%, 0%)',
    },
    {
      value: 'blanco',
      hexa: '#fffffe',
      rgb: '(255, 255, 254)',
      hsl: '(60, 0%, 100%)',
    },
    {
      value: 'gris',
      hexa: '#4b5154',
      rgb: '(75, 81, 84)',
      hsl: '(200, 11%, 31%)',
    },
    {
      value: 'beige',
      hexa: '#feffd4',
      rgb: '(254, 255, 212)',
      hsl: '(61, 17%, 92%)',
    },
    {
      value: 'rosado',
      hexa: '#fed4d4',
      rgb: '(254, 212, 212)',
      hsl: '( 0, 17%, 91% )',
    },
    {
      value: 'cafe',
      hexa: '#815140',
      rgb: '(129, 81, 64)',
      hsl: '(16, 50%, 38%)',
    },
  ];

  constructor() {}
}
