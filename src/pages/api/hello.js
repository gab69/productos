

let products = [
  { 
    name: 'monitor',
    descripcion: '23 pulgadas',
    precio: '430.00',
    foto: 'https://http2.mlstatic.com/D_NQ_NP_2X_861997-MPE51061234221_082022-F.webp' 
  },
  { 
    name: 'teclado',
    descripcion: 'inalambrico',
    precio: '130.00',
    foto: 'https://ripleype.imgix.net/https%3A%2F%2Fdpq25p1ucac70.cloudfront.net%2Fseller-place-files%2Fmrkl-files%2F140%2FMARKETPLACE%20INTERNACIONAL%2F71Uwrto3PpL_194545167340_40.jpeg?w=750&h=555&ch=Width&auto=format&cs=strip&bg=FFFFFF&q=60&trimcolor=FFFFFF&trim=color&fit=fillmax&ixlib=js-1.1.0&s=7c5c9555ffa82dc41c009bccb53e0e8a' 
  },
  { 
    name: 'mouse',
    descripcion: 'inalambrico',
    precio: '100.00',
    foto: 'https://production-tailoy-repo-magento-statics.s3.amazonaws.com/imagenes/872x872/productos/i/m/o/mouse-inalambrico-rexon-msw-2118-gris-20918001-default-1.jpg' 
  }
];

export default function handler(req, res) {
  if (req.method === 'DELETE') {
    const { index } = req.query;
    const parsedIndex = parseInt(index, 10);

    if (isNaN(parsedIndex) || parsedIndex < 0 || parsedIndex >= products.length) {
      return res.status(400).json({ error: 'Índice inválido' });
    }

    products.splice(parsedIndex, 1);
    return res.status(200).json({ message: 'Producto eliminado correctamente' });
  }

  return res.status(200).json(products);
}
