export class User {
  public username: string;
  public firstname: string;
  public lastname: string;
  public email: string;
  public telephone: string;
  public dob: string;
  public gender: string;
  public group: string;
  public token: string;
  public image: string;
  public password: string;
  public skills: Array<string>;
      
  constructor(){     
  }
  
  getUsername(prop: string) {
    return this.username;
  }
  
  getFirstname(prop: string) {
    return this.firstname;
  }
  
  getLastname(prop: string) {
    return this.lastname;
  }  
  
  getEmail(prop: string) {
    return this.email;
  }  
  
  getTelephone(prop: string) {
    return this.telephone;
  }  
  
  getDob(prop: string) {
    return this.dob;
  }
  
  getGender(prop: string) {
      if (prop === undefined) { return this.gender; }
      return JSON.parse(localStorage.getItem('genders')).filter(item => item.id === prop)[0].name;
  }
  
  getGroup(prop: string) {
      if (prop === undefined) { return this.group; }
      return JSON.parse(localStorage.getItem('groups')).filter(item => item.id === prop)[0].name;
  }
  
  getImage(prop: string) {
      if (prop === undefined) { return this.image; }
      return JSON.parse(localStorage.getItem('currentUser')).image;
  }
  
  getSkills(prop: string) {
      if (prop === undefined) { return this.skills; }
      return JSON.parse(localStorage.getItem('skills'))
          .filter( item => prop.includes(item.id) )
          .map(val => val.itemName );
  }
  
  getPropertyValue(field: string, value: string) {
      if ('token' === field) { return false; }
      let functionName = 'get' + field.charAt(0).toUpperCase() + field.slice(1);
      return this[functionName](value);
  }
}