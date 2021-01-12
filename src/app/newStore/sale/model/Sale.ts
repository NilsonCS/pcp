export class Sale{
    saleId: Number;
    companyId: Number;
    card: String;
    month: String;
    year: Number;
    securityCode: Number;

    name: String;
    direction: String;
    phone: String;
    total: Number;

    constructor(saleId:number ,companyId: Number, card:String, month:String, year:Number, securityCode:Number,  name: String, direction: String, phone: String, total: Number){
        this.saleId = saleId;
        this.companyId = companyId;
        this.card = card;
        this.month = month;
        this.year = year;
        this.securityCode = securityCode;

        this.name = name;
        this.direction = direction;
        this.phone = phone;
        this.total = total;
    }


}