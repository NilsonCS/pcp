export class ProductoReserva{
    //Datos del productoReserva
    prId: number;
    productId: number;
    checkoutId: number;
    cantidad: number;

    //Datos del producto
    productName: string;
    model: string;
    productDescription: string;
    email: string;
    stock: number;
    weight: number;
    unitPrice: number;
    currency: number;
    img: string;

    companyId: number;
    productTypeId: number;
    cityId: number;
    brandId: number;

    //Datos del Checkout Reserva
    date: Date;
    total: number;
    contact: string;
    address: string;

    cartId: number;
    paymentDetailsId: number;


    constructor(prId: number, productId: number, checkoutId: number, cantidad: number, 
        productName: string,
        model: string,
        productDescription: string,
        email: string,
        stock: number,
        weight: number,
        unitPrice: number,
        currency: number,
        img: string,
    
        companyId: number,
        productTypeId: number,
        cityId: number,
        brandId: number,
        
        date: Date,
        total: number,
        contact: string,
        address: string,
    
        cartId: number,
        paymentDetailsId: number)
        {
        //Datos del productoReserva
        this.prId = prId;
        this.productId = productId;
        this.checkoutId = checkoutId;
        this.cantidad = cantidad;
    
        //Datos del producto
        this.productName = productName;
        this.model = model;
        this.productDescription = productDescription;
        this.email = email;
        this.stock = stock;
        this.weight = weight;
        this.unitPrice = unitPrice;
        this.currency = currency;
        this.img = img;

        this.companyId = companyId;
        this.productTypeId = productTypeId;
        this.cityId = cityId;
        this.brandId = brandId;

        //Datos del Checkout Reserva
        this.date = date;
        this.total = total;
        this.contact = contact;
        this.address = address;

        this.cartId = cartId;
        this.paymentDetailsId = paymentDetailsId;

    }


}