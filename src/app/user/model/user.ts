export class User{
  userId: number;
  personId: number;
  companyId: number;
  username: String;
  password: String;
  salt: number;
  token: number;


  constructor(userId: number, personId: number, companyId: number, username: String, password: String, salt: number, token: number) {
    this.userId = userId;
    this.personId = personId;
    this.companyId = companyId;
    this.username = username;
    this.password = password;
    this.salt = salt;
    this.token = token;
  }
}
