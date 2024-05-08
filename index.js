const PRODUCTS = [
  {
    id: 1,
    nombre: 'Camiseta básica',
    precio: 15.99,
    categoria: 'Ropa',
    img: 'https://todocofrade.com/wp-content/uploads/2019/11/106-34.png'
  },
  {
    id: 2,
    nombre: 'Pantalón vaquero',
    precio: 29.99,
    categoria: 'Ropa',
    img: 'https://www.motosdakar.es/wp-content/uploads/2021/07/TEJANO-II-LADY-1.png'
  },
  {
    id: 3,
    nombre: 'Zapatillas deportivas',
    precio: 49.99,
    categoria: 'Calzado',
    img: 'https://img.kwcdn.com/product/open/2023-09-07/1694051384919-4ee8734277c141efacfe049000e9bec7-goods.jpeg?imageMogr2/auto-orient%7CimageView2/2/w/800/q/70/format/webp'
  },
  {
    id: 4,
    nombre: 'Teléfono móvil',
    precio: 299.99,
    categoria: 'Tecnología',
    img: 'https://cdn.phonehouse.es/res_static/cmsmaker/D6EE2F8339BEC9E0EFD1B9F4756E2045.jpg'
  },
  {
    id: 5,
    nombre: 'Auriculares inalámbricos',
    precio: 79.99,
    categoria: 'Tecnología',
    img: 'https://shop.jvc.es/wp-content/uploads/2022/09/JVC_HA-A9T-B_Earbud.png'
  },
  {
    id: 6,
    nombre: 'Libro de ficción',
    precio: 12.5,
    categoria: 'Libros',
    img: 'https://aliarediciones.es/wp-content/uploads/2019/07/Camino-entre-realidad-y-ficci%C3%B3n-600x600.png'
  },
  {
    id: 7,
    nombre: 'Reloj de pulsera',
    precio: 99.5,
    categoria: 'Accesorios',
    img: 'https://ae01.alicdn.com/kf/S7af94f9417b948329b224fbb5ea1b2f3x/Reloj-de-pulsera-de-cuarzo-para-hombre-cron-grafo-de-pulsera-de-f-brica-gran-oferta.png'
  },
  {
    id: 8,
    nombre: 'Mochila escolar',
    precio: 24.99,
    categoria: 'Accesorios',
    img: 'https://www.totto.es/dw/image/v2/BFJS_PRD/on/demandware.static/-/Sites-master-catalog-AX/default/dwa273507f/FOTOSALTA/T.221/MA04ECO002-2120N-3CE_1.png?sh=650'
  },
  {
    id: 9,
    nombre: 'Lámpara de escritorio',
    precio: 34.99,
    categoria: 'Hogar',
    img: 'https://www.fluxs.es/wp-content/uploads/2021/11/Lampara-de-escritorio-LED-con-cargador-inalambrico-VELA.png'
  },
  {
    id: 10,
    nombre: 'Set de utensilios de cocina',
    precio: 39.99,
    categoria: 'Hogar',
    img: 'https://www.bastilipo.com/wp-content/uploads/2018/12/Basilea.MAIN_.png.webp'
  }
]
//ADD PRODUCT ARRAY CART
let ADDCART = []
//TOTAL TO PAY
let tot = 0
//COMPROVE LOCALSTORAGE
const storageProducts = JSON.parse(localStorage.getItem('products'))
/* console.log(storageProducts) */
//If exists products SAVE in ADDCART
if (storageProducts) {
  storageProducts.map((val) => {
    ADDCART.push(val)
  })
}

const printProductsContent = (products) => {
  const divContent = document.querySelector('.content')
  divContent.innerHTML = ''

  for (const product of products) {
    const div = document.createElement('div')
    const name = document.createElement('h3')
    const price = document.createElement('p')
    const divImg = document.createElement('div')
    const img = document.createElement('img')
    const cart = document.createElement('img')

    name.textContent = product.nombre
    price.textContent = product.precio
    img.src = product.img
    divImg.classList.add('div-img')
    div.classList.add('product')
    cart.classList.add('cart-img')
    cart.src = 'https://cdn-icons-png.flaticon.com/512/5465/5465858.png'

    div.append(cart)
    div.append(name)
    div.append(divImg)
    div.append(price)
    divImg.append(img)
    divContent.append(div)

    //FUNCTION ADD CART
    cart.addEventListener('click', (e) => {
      //COMPARE OPTIONS
      let cont = 1
      if (ADDCART.some((prop) => prop.product.id === product.id)) {
        ADDCART.map((prop) => {
          prop.product.id === product.id ? prop.cont++ : product
        })
        localStorage.setItem('products', JSON.stringify(ADDCART))
      } else {
        ADDCART.push({ product, cont })
        //Save Product - Local Storage
        localStorage.setItem('products', JSON.stringify(ADDCART))
      }
    })
  }
}

printProductsContent(PRODUCTS)
const ul = document.createElement('ul')
const total = document.createElement('p')
const deleteBtn = document.createElement('button')
const carrito = document.querySelector('.carrito')
const cartDiv = document.querySelector('.cart')
carrito.addEventListener('click', () => {
  cartDiv.classList.toggle('openned')
  ul.innerHTML = ''
  //TOTAL TO PAY
  const totResume = ADDCART.map((value) => value.product.precio * value.cont)
  tot = totResume.reduce((total, value) => value + total, 0).toFixed(2)
  total.classList.add('total')
  //RETURN RESUL CART CONT
  const info = () => {
    if (tot > 0) {
      return `Total a pagar: ${tot}€`
    } else {
      return `No hay productos en su cesta `
    }
  }
  total.textContent = info()

  //REMOVE CART
  deleteBtn.textContent = `Delete`
  deleteBtn.classList.add('deleteBTN')
  deleteBtn.addEventListener('click', () => {
    ADDCART = []
    localStorage.removeItem('products')
    //cartDiv.innerHTML = ``
    total.innerHTML = `No hay productos en su cesta`
    ul.innerHTML = ``
    deleteBtn.remove()
  })
  UPDATECART()
})
const UPDATECART = () => {
  ul.classList.add('ListCart')
  //ADD PRODUCTS ADD CART
  ADDCART.reverse().map((val, index) => {
    const li = document.createElement('li')
    li.classList.add('listCartProducts')
    li.innerHTML = `
      <img src=${val.product.img} />
      <p>(${val.cont})</p>
      <p>${val.product.nombre}</p>
      <p>${val.product.precio}</p>
      <p>Tot:${(val.product.precio * val.cont).toFixed(2)}</p>
    `
    ul.append(li)
  })
  cartDiv.append(ul, total)
  if (tot > 0) cartDiv.append(deleteBtn)
}
