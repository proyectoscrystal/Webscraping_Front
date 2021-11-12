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
        { value: 'mjunior', text: 'JUNIOR' },
        { value: 'mniños', text: 'NIÑAS' },
        { value: 'muniversitarios', text: 'UNIVERSITARIAS' },
      ],
    },
    {
      label: 'UNISEX',
      options: [
        { value: 'unisex', text: 'UNISEX' }
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
      text: 'Rojo',
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
    { value: 'Mango', text: 'Mango' }
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
    { value: 'polos', text: 'Polos' },
    { value: 'jeans', text: 'Jeans' },
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
      color: '',
      composicion: '',
      fechaInicio: '',
      fechaFin: ''
    }
  ]

  private colores: any[] = [
    { value: 'amarillo', text: 'Amarillo', hexa: '#FFFF00' },
    { value: 'beige', text: 'Beige', hexa: '#F5F5DC' },
    { value: 'azul', text: 'Azul', hexa: '#290C96' },
    { value: 'blanco', text: 'Blanco', hexa: '#FFFFFE' },
    { value: 'vinotinto', text: 'Vinotinto', hexa: '#820000' },
    { value: 'café', text: 'Café', hexa: '#815140' },
    { value: 'cobre', text: 'Cobre', hexa: '#CB6D51' },
    { value: 'negro', text: 'Negro', hexa: '#000000' },
    { value: 'verde', text: 'Verde', hexa: '#56A435' },
    { value: 'rosado', text: 'Rosado', hexa: '#FF0080' },
    { value: 'gris', text: 'Gris', hexa: '#9B9B9B' },
    { value: 'morado', text: 'Morado', hexa: '#7E0C96' },
    { value: 'naranja', text: 'Naranja', hexa: '#FFA500' },
    { value: 'piel', text: 'Piel', hexa: '#FDDDCA' },
    { value: 'ocre', text: 'Ocre', hexa: '#B9935A' },
    { value: 'oro', text: 'Oro', hexa: '#FFD700' },
    { value: 'rojo', text: 'Rojo', hexa: '#FF0000' },
    { value: 'plata', text: 'Plata', hexa: '#BEBEBE' },
    { value: 'acero', text: 'Acero', hexa: '#231A24 ' },
    { value: 'transparente', text: 'Transparente', hexa: '#00FFFFFF' },
    { value: 'dorado', text: 'Dorado', hexa: '#EFB810' },
    { value: 'plomo', text: 'Plomo', hexa: '#9B9B9B' },
    { value: 'multicolor', text: 'Multicolor', hexa: '#C29043' },
    { value: 'otros', text: 'Otros', hexa: '#48D1CC' }
  ];

  private composicion: any[] = [
    { value: 'lana', text: 'Lana' },
    { value: 'poliéster', text: 'Poliéster' },
    { value: 'acrílico', text: 'Acrílico' },
    { value: 'viscosa', text: 'Viscosa' },
    { value: 'algodón', text: 'Algodón' },
    { value: 'poliamida', text: 'Poliamida' },
    { value: 'poliuretano', text: 'Poliuretano' },
    { value: 'piel ovino', text: 'Piel ovino' },
    { value: 'elastano', text: 'Elastano' },
    { value: 'lino', text: 'Lino' },
    { value: 'cachemira', text: 'Cachemira' },
    { value: 'lyocell', text: 'Lyocell' },
    { value: 'algodón orgánico', text: 'Algodón orgánico' },
    { value: 'algodón reciclado', text: 'Algodón reciclado' },
    { value: 'modal', text: 'Modal' },
    { value: 'alpaca', text: 'Alpaca' },
    { value: 'polyester coat', text: 'Polyester coat' },
    { value: 'tereftalato de polietileno', text: 'Tereftalato de polietileno' },
    { value: 'seda de mora', text: 'Seda de mora' },
    { value: 'acetato', text: 'Acetato' },
    { value: 'zinc', text: 'Zinc' },
    { value: 'piel bovino', text: 'Piel bovino' },
    { value: 'cobre', text: 'Cobre' },
    { value: 'latón', text: 'Latón' },
    { value: 'cristal', text: 'Cristal' },
    { value: 'nailon', text: 'Nailon' },
    { value: 'piel', text: 'Piel' },
    { value: 'SECUNDARIO', text: 'Secundario' },
    { value: 'PRINCIPAL', text: 'Principal' },
    { value: 'BASE', text: 'Base' },
    { value: 'seda', text: 'Seda' },
    { value: 'liocel', text: 'Liocel' },
    { value: 'triacetato', text: 'Triacetato' },
    { value: 'fibra', text: 'Fibra' },
    { value: 'cañamo', text: 'Cañamo' },
    { value: 'SUPERIOR', text: 'Superior' },
    { value: 'Pelo', text: 'Pelo' },
    { value: 'camello', text: 'Camello' },
    { value: 'elastano', text: 'Elastano' },
    { value: 'ramio', text: 'Ramio' },
    { value: 'cupro', text: 'Cupro' },
    { value: 'elastomultiester', text: 'Elastomultiester' },
    { value: 'aluminio', text: 'Aluminio' },
    { value: 'caucho', text: 'Caucho' },
    { value: 'nylon', text: 'Nylon' },
    { value: 'rafia', text: 'Rafia' },
    { value: 'zamac', text: 'Zamac' },
    { value: 'papel', text: 'Papel' },
    { value: 'vidrio', text: 'Vidrio' },
    { value: 'acero', text: 'Acero' },
    { value: 'piedra', text: 'Piedra' },
    { value: 'hierro', text: 'Hierro' },
    { value: 'plástico', text: 'Plástico' },
    { value: 'plástico-acrílico', text: 'Plástico acrílico' },
    { value: 'perla', text: 'Perla' },
    { value: 'elastodieno', text: 'Elastodieno' },
    { value: 'TRASERA', text: 'Trasera' },
    { value: 'vidrio-cristal', text: 'Vidrio cristal' },
    { value: 'resina', text: 'Resina' },
    { value: 'CIRCONITA', text: 'Circonita' },
    { value: 'titanio', text: 'Titanio' },
    { value: 'arcilla', text: 'Arcilla' },
    { value: 'agata', text: 'Agata' },
    { value: 'pasta', text: 'Pasta' },
    { value: 'silicona', text: 'Silicona' },
    { value: 'madera', text: 'Madera' },
    { value: 'cerámica', text: 'Cerámica' },
    { value: 'INTERNA', text: 'Interna' },
    { value: 'otras', text: 'Otras' }    
  ];

  //Datos para los filtros de productos
  private skus: any[] = [
    { value: 'sku', text: 'Sku' },
  ];

  private discounts: any[] = [
    { value: 'discount', text: 'Descuento' },
  ];

  private news: any[] = [
    { value: 'new', text: 'Nuevos' },
  ];

  constructor() { }
}
