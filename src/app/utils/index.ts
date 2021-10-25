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

  //Datos para los filtros de informes
  private origins: any[] = [
    { value: 'Zara', text: 'Zara' },
    { value: 'Mango', text: 'Mango' },
  ];

  private categorias: any[] = [
    { value: 'Hombre', text: 'Hombre' },
    { value: 'Mujer', text: 'Mujer' },
    { value: 'Niño', text: 'Niño' },
    { value: 'Niña', text: 'Niña' }
  ];

  private subcategorias: any[] = [
    { value: 'ropa exterior', text: 'Ropa exterior' },
    { value: 'ropa interior', text: 'Ropa interior' },
    { value: 'calzado', text: 'Calzado' },
    { value: 'accesorios', text: 'Accesorios' }
  ];

  private tipoprendas: any[] = [
    { value: 'camisas', text: 'Camisas' },
    { value: 'camisetas', text: 'Camisetas' },
    { value: 'polos', text: 'polos' },
    { value: 'jeans', text: 'jeans' },
    { value: 'pantalones', text: 'Pantalones' },
    { value: 'joggers', text: 'Joggers' },
    { value: 'shorts', text: 'Shorts' },
    { value: 'bermudas', text: 'Bermudas' },
    { value: 'faldas', text: 'Faldas' },
    { value: 'vestidos', text: 'Vestidos' },
    { value: 'chaquetas', text: 'Chaquetas' },
    { value: 'buzos', text: 'Buzos' },
    { value: 'pijamas', text: 'Pijamas' },
    { value: 'panties', text: 'Panties' },
    { value: 'brassier', text: 'Brassier' },
    { value: 'tops', text: 'Tops' },
    { value: 'medias', text: 'Medias' },
    { value: 'calzado', text: 'Calzado' },
    { value: 'bolsos', text: 'Bolsos' },
    { value: 'bisutería', text: 'Bisutería' },
    { value: 'cuidado personal', text: 'Cuidado personal' },
    { value: 'relojes', text: 'Relojes' },
    { value: 'otros accesorios', text: 'Otros accesorios' },
    { value: 'blazers', text: 'Blazers' },
    { value: 'chalecos', text: 'Chalecos' },
    { value: 'cazadoras', text: 'Cazadoras' },
    { value: 'sobrecamisas', text: 'Sobrecamisas' },
    { value: 'bombers', text: 'Bombers' },
    { value: 'abrigos', text: 'Abrigos' },
    { value: 'trench', text: 'Trench' },
    { value: 'plumiferos', text: 'Plumiferos' },
    { value: 'acolchados', text: 'Acolchados' },
    { value: 'monos', text: 'Monos' },
    { value: 'bluzas', text: 'Bluzas' },
    { value: 'sudaderas', text: 'Sudaderas' },
    { value: 'polo', text: 'Polo' },
    { value: 'pantalones de vestir', text: 'Pantalones de vestir' },
    { value: 'leggings', text: 'Leggings' },
    { value: 'fluidos', text: 'Fluidos' },
    { value: 'zapatos', text: 'Zapatos' },
    { value: 'pet collectionnew', text: 'Pet collectionnew' },
    { value: 'yoga collectionnew', text: 'Yoga collectionnew' },
    { value: 'perfumes', text: 'Perfumes' },
    { value: 'cinturones', text: 'Cinturones' },
    { value: 'gorros | sombreros', text: 'Gorros | Sombreros' },
    { value: 'pañuelos', text: 'Pañuelos' },
    { value: 'gafas de sol', text: 'Gafas de sol' },
    { value: 'calcetines', text: 'Calcetines' },
    { value: 'jerséis', text: 'Jerséis' },
    { value: 'americanas', text: 'Americanas' },
    { value: 'acolchadas', text: 'Acolchadas' },
    { value: 'vaqueras', text: 'Vaqueras' },
    { value: 'piel', text: 'Piel' },
    { value: 'vaqueros', text: 'Vaqueros' },
    { value: 'bodys', text: 'Bodys' },
    { value: 'paraguas', text: 'Paraguas' },
    { value: 'accesosorios para el pelo', text: 'Accesosorios para el pelo' },
    { value: 'gorros', text: 'Gorros' },
    { value: 'mascarillass', text: 'Mascarillas' },
    { value: 'bufandas', text: 'Bufandas' },
    { value: 'marroquinería', text: 'Marroquinería' },
    { value: 'bóxer', text: 'Bóxer' },
    { value: 'pantaloncillos', text: 'Pantaloncillos' },
    { value: 'correas', text: 'Correas' },
    { value: 'gorras', text: 'Gorras' },
    { value: 'gabardinas', text: 'Gabardinas' },
    { value: 'parkas', text: 'Parkas' },
    { value: 'chándal', text: 'Chándal' },
    { value: 'chinos', text: 'Chinos' },
    { value: 'mochilas', text: 'Mochilas' },
    { value: 'gorras y gorros', text: 'Gorras y gorros' },
    { value: 'boxer', text: 'Boxer' },
    { value: 'corbatas y pajaritas', text: 'Corbatas y pajaritas' },
    { value: 'porta teléfonos y accesorios', text: 'Porta teléfonos y accesorios' },
    { value: 'carteras', text: 'Carteras' },
    { value: 'bufandas y foulards', text: 'Bufandas y foulards' },
    { value: 'bisuteria', text: 'Bisuteria' },
    { value: 'jerseis', text: 'Jerseis' },
    { value: 'bañadores', text: 'Bañadores' },
    { value: 'calzoncillos', text: 'Calzoncillos' },
    { value: 'fulares', text: 'Fulares' },
    { value: 'guantes', text: 'Guantes' },
    { value: 'tirantes', text: 'Tirantes' },
    { value: 'corbatas', text: 'Corbatas' },
    { value: 'pajaritas', text: 'Pajaritas' },
    { value: 'pulseras', text: 'Pulseras' },
    { value: 'anillos', text: 'Anillos' },
    { value: 'más accesorios', text: 'Más accesorios' },
    { value: 'jeans', text: 'Jeans' },
    { value: 'leggins', text: 'Leggins' },
    { value: 'chaquetas', text: 'Chaquetas' },
    { value: 'conjuntos', text: 'Conjuntos' },
    { value: 'vestido de baño', text: 'Vestido de baño' },
    { value: 'accesorios', text: 'Accesorios' },
    { value: 'beachwear', text: 'Beachwear' },
    { value: 'trench y parkas', text: 'Trench y parkas' },
  ];

  private params: any[] = [
    {
      origin: '',
      categoria: '',
      subCategoria: '',
      tipoPrenda: '',
      color: ''
    }
  ]

  private colores: any[] = [
    { value: 'amarillo', text: 'Amarillo' },
    { value: 'beige', text: 'Beige' },
    { value: 'azul', text: 'Azul' },
    { value: 'blanco', text: 'Blanco' },
    { value: 'vinotinto', text: 'Vinotinto' },
    { value: 'café', text: 'Café' },
    { value: 'cobre', text: 'Cobre' },
    { value: 'negro', text: 'Negro' },
    { value: 'verde', text: 'Verde' },
    { value: 'rosado', text: 'Rosado' },
    { value: 'gris', text: 'Gris' },
    { value: 'morado', text: 'Morado' },
    { value: 'naranja', text: 'Naranja' },
    { value: 'piel', text: 'Piel' },
    { value: 'ocre', text: 'Ocre' },
    { value: 'oro', text: 'Oro' },
    { value: 'rojo', text: 'Rojo' },
    { value: 'plata', text: 'Plata' },
    { value: 'acero', text: 'Acero' },
    { value: 'transparente', text: 'Transparente' },
    { value: 'dorado', text: 'Dorado' },
    { value: 'otros', text: 'Otros' },
    { value: 'naranja', text: 'Naranja' },
    { value: 'plomo', text: 'Plomo' },
    { value: 'multicolor', text: 'Multicolor' }
  ];

  constructor() {}
}
