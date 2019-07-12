import { Injectable, EventEmitter } from '@angular/core';
import { AbstractControl } from '@angular/forms'
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpService } from '../api/http.service';

@Injectable
({
  providedIn: 'root',
})
export class HelperService {

	private _fromReview: number = 0;
	private _quotDetails: any;
	private _name: string;
	private _email: string;
	private _phone: string;
	private remark: string;

	bandhanCustomerAccountNumberList: any = [];

		_isSubmitted = {
			general: false,
			account: false,
			product: false,
			proposer: false,
			address: false,
			member: false,
			nominee: false,
			medical: false,
			lifestyle: false,
			payment: false,
		};

  public imgGender = {
    '1': '/assets/icons/male_adult.png',
    '2': '/assets/icons/female_adult.png',
    '99': '/assets/icons/male_adult.png',
  }
   
	assignTo: EventEmitter<any> = new EventEmitter<any>();

	constructor(
		public jwtHelper: JwtHelperService,
		private http: HttpService,
	) {
	}
 
	set _id(id: string) {
		localStorage.setItem('_id', id);
	}

	get _id() {
		return localStorage.getItem('_id');
	}

	set partnerId(id: string) {
		localStorage.setItem('partnerId', id);
	}

	set leadNumber(lead: string) {
		localStorage.setItem('leadNumber',lead);
	}

	get leadNumber() {
        return localStorage.getItem('leadNumber');
	}

	get partnerId() {
		return localStorage.getItem('partnerId');
	}

	set token(id: string) {
		localStorage.setItem('token', id);
		const fiveMin = 5*60*1000;
		const expTime = this.jwtHelper.getTokenExpirationDate(id);
		const expTimeFromNow = expTime.getTime() - new Date().getTime();
		let beforeFiveMinFromExpire = 0;
		if(expTimeFromNow > fiveMin){
			beforeFiveMinFromExpire =  expTime.getTime() - new Date().getTime() - fiveMin;
		} else {
			beforeFiveMinFromExpire =  expTime.getTime() - new Date().getTime() - 60*1000;
		}
		setTimeout(() => {
			this.http.post('falseLoader/login/resetToken', {"id": this._id}).subscribe(res => {
				if(res.res.token)
					this.token = res.res.token;
			})
		}, beforeFiveMinFromExpire)
	}

	set userDetails(id: string) {
		localStorage.setItem('userDetails',JSON.stringify(id));
	}

	get userDetails() {
		return JSON.parse(localStorage.getItem('userDetails'));
	}

	set allowedRoutes(routesData: any) {
		let allowedRoutes = [];
		console.log(routesData);
		for (let routes in routesData) {
			if (routesData[routes].allowed) {
				allowedRoutes.push(routesData[routes].route);
			}
			if(routesData[routes].hasOwnProperty('componentAllowed')){
				for(let componentAllowed in routesData[routes].componentAllowed){
					allowedRoutes.push(routesData[routes].componentAllowed[componentAllowed].route);
				}
			}
		}
		localStorage.setItem('allowedRoutes',JSON.stringify(allowedRoutes));
	}

	get allowedRoutes() {
		return JSON.parse(localStorage.getItem('allowedRoutes'));
	}

	get token() {
		return localStorage.getItem('token');
	}

	get fromReview() {
		return this._fromReview;
	}

	set fromReview(index: number) {
		this._fromReview = index;
	}

	get quotDetails() {
		return this._quotDetails;
	}

	set quotDetails(details: any) {
		this._quotDetails = details;
	}

	get name() {
		return this._name;
	}
   /*  set PolicyObject(policyObj){
        localStorage.setItem('policyFetch',JSON.stringify(policyObj));
	 }
	 get PolicyObject(){
         return JSON.parse(localStorage.getItem('policyFetch'))
	 } */
	set name(name: string) {
		this._name = name;
	}

	get email() {
		return this._email;
	}

	set email(email: string) {
		this._email = email;
	}

	get phone() {
		return this._phone;
	}

	set phone(phone: string) {
		this._phone = phone;
	}

	set tokenData(data) {
		localStorage.setItem('tokenData',JSON.stringify(data));
	}

	get isSubmitted(): any{
		return this._isSubmitted;
	}

	set isSubmitted(route: any) {
		if(!this._isSubmitted.hasOwnProperty(route)) {
			return;
		}
		for(let element in this._isSubmitted) {
			this._isSubmitted[element] = true;
			if(element === String(route)) {
				this._isSubmitted[element] = true;
				break;
			}
		}
		// console.log(this.isSubmitted);
	}

	setIsSubmittedFalse(route: string) {
		let set = false;
		if(!this._isSubmitted.hasOwnProperty(route) || this.fromReview) {
			return;
		}
		for(let element in this._isSubmitted) {
			if(element === String(route)) {
				set = true;
			} if (set) {
				this._isSubmitted[element] = false;
			}
		}
		// console.log(this.isSubmitted);
	}

	get tokenData() {
		return JSON.parse(localStorage.getItem('tokenData'));
	}

	public isInvalid = (control: AbstractControl) => {
		const invalid = (control.touched || control.dirty) && control.invalid;
		return invalid ? 'form-control-danger' : '';
	}

	compareMasterCode(first: any, second: any): boolean {
	    return first && second ? first.code === second.code : first === second;
	}

	assignEmitter(obj){
		this.assignTo.emit(obj);
	}

	get AmhiAvRemark(){
        return this.remark;   
	}

	set AmhiAvRemark(remark){
		this.remark = remark;
	}

	get OtpVerifyToken(){
		return localStorage.getItem('OtpVerifyToken');		
	}

	set OtpVerifyToken(token){
		localStorage.setItem('OtpVerifyToken',token);
	}

	set channelId(channel){
		localStorage.setItem('channelId',channel);
	}

	get channelId(){
		return localStorage.getItem('channelId');
	}

    set vendorId(id){
		localStorage.setItem('vendorId',id);
	}

	get vendorId(){
		return localStorage.getItem('vendorId');
	}

    get airtelUser(){
		console.log("local storage----> airtel user ",localStorage.getItem('airtelUser'));
        return JSON.parse(localStorage.getItem('airtelUser'));
    }

	set airtelUser(id: object) {

        console.log("------$$$$$$$$$$$$--------",id);
		localStorage.setItem('airtelUser',JSON.stringify(id));
	}
    set otpVerified(id){
		localStorage.setItem('otpVerified',id);
	}

	get otpVerified(){
		return localStorage.getItem('otpVerified');
	}

	set AccountNumberList(id: any) {
		this.bandhanCustomerAccountNumberList = id;
	}

	get AccountNumberList() {
		return this.bandhanCustomerAccountNumberList;
	}

}

export const removeBlank = (body) => {
	let obj = removeEmpty(body);
	Object.keys(obj).forEach(o => {
		if(isEmpty(obj[o]) && Boolean(obj[o]) !== true)
			delete obj[o];
	})
	return obj;
}

const isEmpty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

const removeEmpty = (obj) => {
  Object.keys(obj).forEach(k =>
    (obj[k] && typeof obj[k] === 'object') && removeEmpty(obj[k]) ||
    (!obj[k] && obj[k] !== undefined) && delete obj[k]
  );
  return obj;
};


export const calculateAge = (obj: {
	year: number,
	month: number,
	day: number
}) => {
	const dobdate = new Date(`${obj.month}/${obj.day}/${obj.year}`);
	const ageDiffMillis = Date.now() - (dobdate.getTime());
	const ageDiffDate = new Date(ageDiffMillis);
	console.log(Math.abs(ageDiffDate.getFullYear() - 1970))
	return Math.abs(ageDiffDate.getFullYear() - 1970);
}

export const calculateGST = (amount) =>{
    console.log(amount)
   return 0.18*amount;
}
export const compareValues = (key, order='asc') => {
    return function(a, b) {
      if(!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        // property doesn't exist on either object
        return 0;
      }
  
      const varA = (typeof a[key] === 'string') ?
        Number(a[key]) : a[key];
      const varB = (typeof b[key] === 'string') ?
        Number(b[key]) : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order == 'desc') ? (comparison * -1) : comparison
      );
    };
  }
