export class Sale{
    saleId: Number;
    companyId: Number;
    card: Number;
    expirationDate: Date;
    securityCode: Number;

    name: String;
    direction: String;
    phone: String;
    total: Number;

    constructor(saleId:number ,companyId: Number, card:Number, expirationDate:Date, securityCode:Number,  name: String, direction: String, phone: String, total: Number){
        this.saleId = saleId;
        this.companyId = companyId;
        this.card = card;
        this.expirationDate = expirationDate;
        this.securityCode = securityCode;

        this.name = name;
        this.direction = direction;
        this.phone = phone;
        this.total = total;
    }


}