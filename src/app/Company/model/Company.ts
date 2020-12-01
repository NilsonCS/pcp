export class Company{
    companyId: number;
    name: String;
    direction: String;
    phone: String;
    email: String;

    constructor(companyId: number, name: String, direction: String, phone: String, email: String){
        this.companyId = companyId;
        this.name = name;
        this.direction = direction;
        this.phone = phone;
        this.email = email;
    }


}