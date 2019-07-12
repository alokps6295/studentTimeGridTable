import { Injectable } from '@angular/core';
import { FormControl, FormGroup, FormArray } from '@angular/forms';
import { ToastNotificationService } from './toaster.service';
import { calculateAge,HelperService } from './helper.service';
import * as moment from 'moment';  

@Injectable()
export class ProductValidations {

	active_product:string;
	active_partner:string; 
	
	memberBaseRiderValidations_products = ['Optima Restore','iCan'];
	memberBaseRiderValidations_partner = ['HDFC','Airtel','Bandhan','Turtlemint'];
	
	otherMemberValidationsWithProposer_products = ['Optima Restore','iCan'];
	otherMemberValidationsWithProposer_partner = ['HDFC','Airtel','Bandhan','Turtlemint'];
	
	checkMemberValidity_products = ['Optima Restore','iCan'];
	checkMemberValidity_partner = ['HDFC','Airtel','Bandhan','Turtlemint'];

	checkAgeBandChange_products = ['Optima Restore','iCan'];
	checkAgeBandChange_partner = ['HDFC','Airtel','Bandhan','Turtlemint'];
	
	checkMemberRiderValidity_products = ['Optima Restore'];
	checkMemberRiderValidity_partner = ['HDFC'];

	memberBaseRiderValidationsForPremiumCal_products = ['Optima Restore','iCan'];
	memberBaseRiderValidationsForPremiumCal_partner = ['HDFC','Airtel','Bandhan','Turtlemint'];

	otherMemberValidationsWithProposerForPremiumCal_products = ['Optima Restore','iCan'];
	otherMemberValidationsWithProposerForPremiumCal_partner = ['HDFC','Airtel','Bandhan','Turtlemint'];

	MemberValidationsforRelationShipPremiumCal_products = ['Optima Restore'];
	MemberValidationsforRelationShipPremiumCal_partner = ['HDFC','Airtel','Bandhan'];

    MemberValidationsforRelationShipPremiumCal_products_Ican = ['iCan'];
	MemberValidationsforRelationShipPremiumCal_partner_Ican = ['HDFC'];

    checkMemberValidity_products_Ican = ['iCan'];
    checkMemberValidity_partner_Ican = ['HDFC','Airtel','Turtlemint'];
    
    annualIncomeValidation_partner_Ican = ['HDFC','Airtel'];
    annualIncomeValidation_products_Ican = ['iCan','Turtlemint'];

    annualIncomeValidation_partner_Ican_Airtel = ['Airtel'];
    annualIncomeValidation_products_Ican_Airtel = ['iCan','Turtlemint'];
	
	ageBand = {
		individual: {
			ageBand: [
				{lower:'91d', upper:'17',},
				{lower:'18', upper:'35',},
				{lower:'36', upper:'45',},
				{lower:'46', upper:'50',},
				{lower:'51', upper:'55',},
				{lower:'56', upper:'60',},
				{lower:'61', upper:'65',},
				{lower:'66', upper:'70',},
				{lower:'71', upper:'75',},
				{lower:'76', upper:'80',},
				{lower:'80'},
			],
			lowerAgeBand: ['91d',	18,	36,	46,	51,	56,	61,	66,	71,	76,	80],
			upperAgeBand: [17, 35, 45, 50, 55, 60, 65, 70, 75, 80],
		},
		floater: {
			ageBand: [
				{lower:'18', upper:'35',},
				{lower:'36', upper:'45',},
				{lower:'46', upper:'50',},
				{lower:'51', upper:'55',},
				{lower:'56', upper:'60',},
				{lower:'61', upper:'65',},
				{lower:'66', upper:'70',},
				{lower:'71', upper:'75',},
				{lower:'76', upper:'80',},
				{lower:'80'},
			],
			lowerAgeBand: [18,	36,	46,	51,	56,	61,	66,	71,	76,	80],
			upperAgeBand: [35, 45, 50, 55, 60, 65, 70, 75, 80],
		}
	}

	constructor(
		private notify: ToastNotificationService,
		private helper: HelperService,
	) {
		this.active_partner = this.helper.userDetails['partnerName'];
	}

	memberBaseRiderValidations(cntrl: FormGroup, coverType: string, i: number) {
		if(this.memberBaseRiderValidations_products.includes(this.active_product) && this.memberBaseRiderValidations_partner.includes(this.active_partner)) {

			if((coverType == "individual" && i)) { // for individual (not proposer) - second member
				cntrl.get('baseSumInsured').valueChanges.subscribe(val => {
					if(!cntrl.parent.controls[0].get('rider').value) { // if proposer rider is disabled other member can not select rider
						cntrl.get('rider').reset();
						cntrl.get('rider').disable();
					}else if(val && val.value >= 10) { // if val is > 10 and first member rder have value.
						cntrl.get('rider').enable();
					} else { // if value of base SI is less than 10.
						cntrl.get('rider').reset();
						cntrl.get('rider').disable();
					}
				})
			} else if ((coverType == "individual" && !i) || (coverType == "floater" && !i)) { // in case of proposer/ 1st member
				cntrl.get('baseSumInsured').valueChanges.subscribe(val => { //
					if(val && val.value >= 10) {
						cntrl.get('rider').enable();
					} else {
						cntrl.get('rider').reset();
						cntrl.get('rider').disable();
					}
				}) 
			} else if(coverType == "floater" && i){ // floter add members baseSI is zero except proposer
				cntrl.get('baseSumInsured').disable();
			}

			cntrl.get('rider').valueChanges.subscribe(val => {
				if(val) {
					cntrl.get('riderSumInsured').enable();
				} else {
					cntrl.get('riderSumInsured').reset();
					cntrl.get('riderSumInsured').disable();
				}
			})
		}
	}

	// Base SI of other members must be less than Base SI of Proposer
	// Disable other member's rider if proposer's rider is not selected
	otherMemberValidationsWithProposer(members: FormArray, coverType) {
		if(this.otherMemberValidationsWithProposer_products.includes(this.active_product) && this.otherMemberValidationsWithProposer_partner.includes(this.active_partner)) {
			// debugger;
			for (let member in members.controls){

				// Base SI of other members must be less than Base SI of Proposer
				if (Number(member)){
					let control = members.controls[member];
					control.get('baseSumInsured').valueChanges.subscribe(val => {
						if(!val)
							return;
						if(Number(val.value) > Number(members.controls[0].get('baseSumInsured').value.value)){
							this.notify.showToast('Warning', `Base Sum Insured can not be greater than first member's Base Sum Insured`, 'warning');
							control.get('baseSumInsured').reset();
							return true;
						}
					})
					control.get('riderSumInsured').valueChanges.subscribe(val => {
						if(!val || !members.controls[0].get('riderSumInsured').value.value)
							return;
						if(Number(val.value) > Number(members.controls[0].get('riderSumInsured').value.value)){
							this.notify.showToast('Warning', `Rider Sum Insured can not be greater than first member's Rider Sum Insured`, 'warning');
							control.get('riderSumInsured').reset();
							return true;
						}
					})
				}

				// Disable other member's rider if proposer's rider is not selected
				if(!Number(member)) {
					let control = members.controls[member]; // here member is 0 (Proposer)
					control.get('rider').valueChanges.subscribe(val => {
						if(!val) {
							for (let mem in members.controls){
								if(Number(mem)) { //check for member (ignoring proposer as proposer is 0)
									members.controls[mem].get('rider').reset();
									members.controls[mem].get('rider').disable();
								}
							}
						} else {
							for (let mem in members.controls){
								if(Number(mem)) { //check for member (ignoring proposer as proposer is 0)
									members.controls[mem].get('rider').enable();
								}
							}
						}
					})
				}

				// need to check if product type changes from individual to floater
				// check and enable rider for other members
				if(coverType.value == "floater") {
					if(members.controls[0].get('rider').value) {
						for (let mem in members.controls) {
							if(Number(mem)) {
								members.controls[mem].get('rider').enable()
							}
						}
					}
				}

			}
		}
	}

	checkMemberValidity(member: FormGroup, policyDetails: any, covertype: string) {
		if(this.checkMemberRiderValidity_products.includes(this.active_product) && this.checkMemberValidity_partner.includes(this.active_partner)) {
			if(member.invalid)
				return true;
			const selectedP = this.isParentSelected(member);
			const age =  calculateAge(member.get('dateOfBirth').value)
			member.get('age').setValue(age);
			const relationCode = member.get('relationshipWithProposer').value.code

			// Age less than 18 or (18 years – 25 years) and Relationship will define the category Son/Daughter/Child it will come under CD
			if((age < 18) || ((age >= 18 && age <= 25) && (relationCode == 20 || relationCode == 17 || relationCode == 2))) {
				member.get('type').setValue('child')
			} else if (age >= 18 && age <= 65) {
				member.get('type').setValue('adult')
			}

			// if age is less than 18 then relationship must be son, child or daughter.
			if((age < 18) && (!['20', '17', '2'].includes(relationCode))) {
				this.notify.showToast('Warning', 'Only Son, Daughter or Child can be less than 18 years.', 'warning');
				member.get('dateOfBirth').reset();
				member.get('age').reset();
				return true;
			}

			// if relationship is son, child or daughter(age is less than 18) then marital status must be single.
			if(['20', '17', '2'].includes(relationCode) && member.get('maritalStatus').value.code != '2' ) {
				this.notify.showToast('Warning', 'Marital status of Son, Daughter or Child can be single only.', 'warning');
				member.get('maritalStatus').reset();
				return true;
			}

			// Age of chile can not be less than 5 years if either parents are not covered
			if(!selectedP.selfHusbandWife && (member.get('type').value == 'child') && age < 5) {
				this.notify.showToast('Warning', 'Mininum age of child can be 5 years, in case parent is not covered', 'warning');
				member.get('dateOfBirth').reset();
				member.get('age').reset();
				return true;
			}

			if(selectedP.father > 1){
				this.notify.showToast('Warning', 'Can not select more than one Father', 'warning');
				member.get('relationshipWithProposer').reset()
				return true;
			}else if (selectedP.mother > 1){
				this.notify.showToast('Warning', 'Can not select more than one Mother', 'warning');
				member.get('relationshipWithProposer').reset()
				return true;
			}else if (selectedP.fatherInLaw > 1){
				this.notify.showToast('Warning', 'Can not select more than one Father-in-law', 'warning');
				member.get('relationshipWithProposer').reset()
				return true;
			}else if (selectedP.motherInLaw > 1){
				this.notify.showToast('Warning', 'Can not select more than one Mother-in-law', 'warning');
				member.get('relationshipWithProposer').reset()
				return true;
            }
            // else if (selectedP.self > 1){
			// 	this.notify.showToast('Warning', 'Can not select more than one self', 'warning');
			// 	member.get('relationshipWithProposer').reset()
			// 	return true;
            // }
            else if (selectedP.husband > 1){
				this.notify.showToast('Warning', 'Can not select more than one husband', 'warning');
				member.get('relationshipWithProposer').reset()
				return true;
			}else if (selectedP.wife > 1){
				this.notify.showToast('Warning', 'Can not select more than one wife', 'warning');
				member.get('relationshipWithProposer').reset()
				return true;
			}

															// current not father						 // Father-in-law			// Mother-in-law
			if((selectedP.father) && relationCode != 4 && (relationCode == 18 || relationCode == 19)) {
				this.notify.showToast('Warning', 'If father has been selected then Father-in- law and Mother- In- law can’t be selected but Mother can be selected.', 'warning');
				member.get('relationshipWithProposer').reset()
				return true;
			}															// not mother						 // Father-in-law			// Mother-in-law
			else if ((selectedP.mother) && relationCode != 5 && (relationCode == 18 || relationCode == 19)) {
				this.notify.showToast('Warning', 'If mother has been selected then Father-in- law and Mother- In- law can’t be selected but Father can be.', 'warning');
				member.get('relationshipWithProposer').reset()
				return true;
			}																	// not Father-in-law		// mother						 			// father
			else if ((selectedP.fatherInLaw) && relationCode != 18 && (relationCode == 5 || relationCode == 4)) {
				this.notify.showToast('Warning', 'If father-in-law has been selected then Father and Mother can’t be selected but Mother-in-law can be selected.', 'warning');
				member.get('relationshipWithProposer').reset()
				return true;
			}																	// not Mother-in-law		// mother						 // father					
			else if ((selectedP.motherInLaw) && relationCode != 19 && (relationCode == 5 || relationCode == 4)) {
				this.notify.showToast('Warning', 'If mother-in-law has been selected then Father and Mother can’t be selected but Father-in-law can be.', 'warning');
				member.get('relationshipWithProposer').reset()
				return true;
			}

			// max 5 childs or max 4 adults are allowed
			const count = this.adultChildCount(member);
			if(policyDetails.coverType == 'individual'){
				if(count.adultCount > 4) {
					this.notify.showToast('Warning', 'Max 4 adult are allowed', 'warning');
					member.get('dateOfBirth').reset();
					return true;
				}
				if(count.childCount > 5) {
					this.notify.showToast('Warning', 'Max 5 child are allowed', 'warning');
					member.get('dateOfBirth').reset();
					return true;
				}
			} else {
				let allowedCount = {
					adult: policyDetails.totalMemberValue.split('+')[0].split('').map(el => Number(el)).reduce(this.add, 0),
					child: policyDetails.totalMemberValue.split('+')[1].split('').map(el => Number(el)).reduce(this.add, 0)
				}
				if(count.adultCount > allowedCount.adult){
					this.notify.showToast('Warning', `You can only select ${allowedCount.adult} adult/adults for selected product type`, 'warning');
					member.get('dateOfBirth').reset();	
					member.get('type').reset();
					return true;
				}
				if(count.childCount > allowedCount.child){
					this.notify.showToast('Warning', `You can only select ${allowedCount.child} child/children for selected product type`, 'warning');
					member.get('dateOfBirth').reset();	
					member.get('type').reset();
					return true;
				}
			}

			if(member.get('title').value.code === 'MRS' &&	member.get('age').value < 18) {
				this.notify.showToast('Warninig', `Mrs. can not have ${member.get('age').value} age`, 'warning');
				member.get('title').reset();
				return true;
			} else if((member.get('title').value.code === 'MASTER' || member.get('title').value.code === 'BABY') &&	member.get('age').value > 18) {
				this.notify.showToast('Warninig', `${member.get('title').value.title} can not have age ${member.get('age').value}`, 'warning');
				member.get('title').reset();
				return true;
			}

			if(member.get('gender').value.code == 1) {
				if(!['MASTER', 'MR', 'Dr'].includes(member.get('title').value.code)) {
					this.notify.showToast('Warninig', `Title and gender mismatch`, 'warning');
					member.get('title').reset();
					member.get('gender').reset();
					return true;		
				}
			} else if(member.get('gender').value.code == 2) {
				if(!['BABY', 'MRS', 'MISS', 'Dr','MS'].includes(member.get('title').value.code)) {
					this.notify.showToast('Warninig', `Title and gender mismatch`, 'warning');
					member.get('title').reset();
					member.get('gender').reset();
					return true;		
				}
			}

			let code_relation = member.get('relationshipWithProposer').value.code;
			if(covertype == 'individual'){
					// father							// mother - parents base si must be equal
				if(code_relation == 4 || code_relation == 5) {
					// if(selectedP.father + selectedP.mother > 1) { //check if parent or mother is already selected
						for(let control in member.parent.controls){
							let prevControl = member.parent.controls[control];
							if(prevControl.invalid)
								continue;
							let relCode = prevControl.get('relationshipWithProposer').value.code;
							if(relCode == 4 || relCode == 5) {
								const baseSIofPrevParent = prevControl.get('baseSumInsured').value.value;
								if(member.get('baseSumInsured').value.value != baseSIofPrevParent) {
									this.notify.showToast('Warning', 'Sum insured of dependent parents must be same', 'warning');
									member.get('baseSumInsured').reset();
									return true;
								}
							}
						}
					// }
				} else if (code_relation == 17 || code_relation == 20) {
					for(let control in member.parent.controls){
						let prevControl = member.parent.controls[control];
						if(prevControl.invalid)
							continue;
						let relCode = prevControl.get('relationshipWithProposer').value.code;
						if(relCode == 17 || relCode == 20) {
							const baseSIofPrevChild = prevControl.get('baseSumInsured').value.value;
							if(member.get('baseSumInsured').value.value != baseSIofPrevChild) {
								this.notify.showToast('Warning', 'Sum Insured for all the children must be same', 'warning');
								member.get('baseSumInsured').reset();
								return true;
							}
						}
					}
				}else if (code_relation == 18 || code_relation == 19) {
					for(let control in member.parent.controls){
						let prevControl = member.parent.controls[control];
						if(prevControl.invalid)
							continue;
						let relCode = prevControl.get('relationshipWithProposer').value.code;
						if(relCode == 18 || relCode == 19) {
							const baseSIofPrevChild = prevControl.get('baseSumInsured').value.value;
							if(member.get('baseSumInsured').value.value != baseSIofPrevChild) {
								this.notify.showToast('Warning', 'Sum Insured of dependant parents in law must be same', 'warning');
								member.get('baseSumInsured').reset();
								return true;
							}
						}
					}
				}
			}

			if((relationCode == 20 || relationCode == 17) && age > 25) {
				this.notify.showToast('Warning', 'Child dependent can not have age greater than 25 years.', 'warning');
				member.get('dateOfBirth').reset();
				member.get('age').reset();
				return true;
			}

			return true;

		}
	}

    checkMemberValidity_Ican(member: FormGroup, policyDetails: any, covertype: string) {
		if(this.checkMemberValidity_products_Ican.includes(this.active_product) && this.checkMemberValidity_partner_Ican.includes(this.active_partner)) {
			if(member.invalid)
				return true;
			const selectedP = this.isParentSelected(member);
			const age =  calculateAge(member.get('dateOfBirth').value)
			member.get('age').setValue(age);
			const relationCode = member.get('relationshipWithProposer').value.code

			// Age less than 18 or (18 years – 25 years) and Relationship will define the category Son/Daughter/Child it will come under CD
			if((age < 18) || ((relationCode == 20 || relationCode == 17 || relationCode == 2))) {
				member.get('type').setValue('child')
			} else if (age >= 18 && age <= 65) {
				member.get('type').setValue('adult')
			}

			// if age is less than 18 then relationship must be son, child or daughter.
			if((age < 18) && (!['20', '17', '2'].includes(relationCode))) {
				this.notify.showToast('Warning', 'Only Son, Daughter or Child can be less than 18 years.', 'warning');
				member.get('dateOfBirth').reset();
				member.get('age').reset();
				return true;
			}

			// if relationship is son, child or daughter(age is less than 18) then marital status must be single.
			if(['20', '17', '2'].includes(relationCode) && member.get('maritalStatus').value.code != '2' ) {
				this.notify.showToast('Warning', 'Marital status of Son, Daughter or Child can be single only.', 'warning');
				member.get('maritalStatus').reset();
				return true;
			}

			// Age of chile can not be less than 5 years if either parents are not covered
			if(!selectedP.selfHusbandWife && (member.get('type').value == 'child') && age < 5) {
				this.notify.showToast('Warning', 'Mininum age of child can be 5 years, in case parent is not covered', 'warning');
				member.get('dateOfBirth').reset();
				member.get('age').reset();
				return true;
			}

			if(selectedP.father > 1){
				this.notify.showToast('Warning', 'Can not select more than one Father', 'warning');
				member.get('relationshipWithProposer').reset()
				return true;
			}else if (selectedP.mother > 1){
				this.notify.showToast('Warning', 'Can not select more than one Mother', 'warning');
				member.get('relationshipWithProposer').reset()
				return true;
			}else if (selectedP.fatherInLaw > 1){
				this.notify.showToast('Warning', 'Can not select more than one Father-in-law', 'warning');
				member.get('relationshipWithProposer').reset()
				return true;
			}else if (selectedP.motherInLaw > 1){
				this.notify.showToast('Warning', 'Can not select more than one Mother-in-law', 'warning');
				member.get('relationshipWithProposer').reset()
				return true;
            }
            // else if (selectedP.self > 1){
			// 	this.notify.showToast('Warning', 'Can not select more than one self', 'warning');
			// 	member.get('relationshipWithProposer').reset()
			// 	return true;
            // }
            else if (selectedP.husband > 1){
				this.notify.showToast('Warning', 'Can not select more than one husband', 'warning');
				member.get('relationshipWithProposer').reset()
				return true;
			}else if (selectedP.wife > 1){
				this.notify.showToast('Warning', 'Can not select more than one wife', 'warning');
				member.get('relationshipWithProposer').reset()
				return true;
			}

															// current not father						 // Father-in-law			// Mother-in-law
			if((selectedP.father) && relationCode != 4 && (relationCode == 18 || relationCode == 19)) {
				this.notify.showToast('Warning', 'If father has been selected then Father-in- law and Mother- In- law can’t be selected but Mother can be selected.', 'warning');
				member.get('relationshipWithProposer').reset()
				return true;
			}															// not mother						 // Father-in-law			// Mother-in-law
			else if ((selectedP.mother) && relationCode != 5 && (relationCode == 18 || relationCode == 19)) {
				this.notify.showToast('Warning', 'If mother has been selected then Father-in- law and Mother- In- law can’t be selected but Father can be.', 'warning');
				member.get('relationshipWithProposer').reset()
				return true;
			}																	// not Father-in-law		// mother						 			// father
			else if ((selectedP.fatherInLaw) && relationCode != 18 && (relationCode == 5 || relationCode == 4)) {
				this.notify.showToast('Warning', 'If father-in-law has been selected then Father and Mother can’t be selected but Mother-in-law can be selected.', 'warning');
				member.get('relationshipWithProposer').reset()
				return true;
			}																	// not Mother-in-law		// mother						 // father					
			else if ((selectedP.motherInLaw) && relationCode != 19 && (relationCode == 5 || relationCode == 4)) {
				this.notify.showToast('Warning', 'If mother-in-law has been selected then Father and Mother can’t be selected but Father-in-law can be.', 'warning');
				member.get('relationshipWithProposer').reset()
				return true;
			}

			// max 5 childs or max 4 adults are allowed
			const count = this.adultChildCount(member);
			if(policyDetails.coverType == 'individual'){
				if(count.adultCount > 4) {
					this.notify.showToast('Warning', 'Max 4 adult are allowed', 'warning');
					member.get('dateOfBirth').reset();
					return true;
				}
				if(count.childCount > 5) {
					this.notify.showToast('Warning', 'Max 5 child are allowed', 'warning');
					member.get('dateOfBirth').reset();
					return true;
				}
			} else {
				let allowedCount = {
					adult: policyDetails.totalMemberValue.split('+')[0].split('').map(el => Number(el)).reduce(this.add, 0),
					child: policyDetails.totalMemberValue.split('+')[1].split('').map(el => Number(el)).reduce(this.add, 0)
				}
				if(count.adultCount > allowedCount.adult){
					this.notify.showToast('Warning', `You can only select ${allowedCount.adult} adult/adults for selected product type`, 'warning');
					member.get('dateOfBirth').reset();	
					member.get('type').reset();
					return true;
				}
				if(count.childCount > allowedCount.child){
					this.notify.showToast('Warning', `You can only select ${allowedCount.child} child/children for selected product type`, 'warning');
					member.get('dateOfBirth').reset();	
					member.get('type').reset();
					return true;
				}
			}

			if(member.get('title').value.code === 'MRS' &&	member.get('age').value < 18) {
				this.notify.showToast('Warninig', `Mrs. can not have ${member.get('age').value} age`, 'warning');
				member.get('title').reset();
				return true;
			} else if((member.get('title').value.code === 'MASTER' || member.get('title').value.code === 'BABY') &&	member.get('age').value > 18) {
				this.notify.showToast('Warninig', `${member.get('title').value.title} can not have age ${member.get('age').value}`, 'warning');
				member.get('title').reset();
				return true;
			}

			if(member.get('gender').value.code == 1) {
				if(!['MASTER', 'MR', 'Dr'].includes(member.get('title').value.code)) {
					this.notify.showToast('Warninig', `Title and gender mismatch`, 'warning');
					member.get('title').reset();
					member.get('gender').reset();
					return true;		
				}
			} else if(member.get('gender').value.code == 2) {
				if(!['BABY', 'MRS', 'MISS', 'Dr','MS'].includes(member.get('title').value.code)) {
					this.notify.showToast('Warninig', `Title and gender mismatch`, 'warning');
					member.get('title').reset();
					member.get('gender').reset();
					return true;		
				}
			}

			let code_relation = member.get('relationshipWithProposer').value.code;
			if(covertype == 'individual'){
					// father							// mother - parents base si must be equal
				if(code_relation == 4 || code_relation == 5) {
					// if(selectedP.father + selectedP.mother > 1) { //check if parent or mother is already selected
						for(let control in member.parent.controls){
							let prevControl = member.parent.controls[control];
							if(prevControl.invalid)
								continue;
							let relCode = prevControl.get('relationshipWithProposer').value.code;
							if(relCode == 4 || relCode == 5) {
								const baseSIofPrevParent = prevControl.get('baseSumInsured').value.value;
								if(member.get('baseSumInsured').value.value != baseSIofPrevParent) {
									this.notify.showToast('Warning', 'Sum insured of dependent parents must be same', 'warning');
									member.get('baseSumInsured').reset();
									return true;
								}
							}
						}
					// }
				} else if (code_relation == 17 || code_relation == 20) {
					for(let control in member.parent.controls){
						let prevControl = member.parent.controls[control];
						if(prevControl.invalid)
							continue;
						let relCode = prevControl.get('relationshipWithProposer').value.code;
						if(relCode == 17 || relCode == 20) {
							const baseSIofPrevChild = prevControl.get('baseSumInsured').value.value;
							if(member.get('baseSumInsured').value.value != baseSIofPrevChild) {
								this.notify.showToast('Warning', 'Sum Insured for all the children must be same', 'warning');
								member.get('baseSumInsured').reset();
								return true;
							}
						}
					}
				}else if (code_relation == 18 || code_relation == 19) {
					for(let control in member.parent.controls){
						let prevControl = member.parent.controls[control];
						if(prevControl.invalid)
							continue;
						let relCode = prevControl.get('relationshipWithProposer').value.code;
						if(relCode == 18 || relCode == 19) {
							const baseSIofPrevChild = prevControl.get('baseSumInsured').value.value;
							if(member.get('baseSumInsured').value.value != baseSIofPrevChild) {
								this.notify.showToast('Warning', 'Sum Insured of dependant parents in law must be same', 'warning');
								member.get('baseSumInsured').reset();
								return true;
							}
						}
					}
				}
			}

			if((relationCode == 20 || relationCode == 17 || relationCode == 2) && age > 18) {
				this.notify.showToast('Warning', 'Child dependent can not have age greater than 18 years.', 'warning');
				member.get('dateOfBirth').reset();
				member.get('age').reset();
				return true;
			}

			return true;

		}
	}

	checkMemberRiderValidity(member: FormGroup, memberIndex: number) {
		let code_relation = member.get('relationshipWithProposer').value.code;
		if(code_relation == 4 || code_relation == 5) {
			for(let control in member.parent.controls){
				let prevControl = member.parent.controls[control];
				if(prevControl.invalid || memberIndex <= Number(control))
					continue;
				let relCode = prevControl.get('relationshipWithProposer').value.code;
				if(relCode == 4 || relCode == 5) {

					const riderSIofPrevParent = prevControl.get('riderSumInsured').value && prevControl.get('riderSumInsured').value.value;
					if(!prevControl.get('riderSumInsured').value && !member.get('riderSumInsured').value) {
					}
					else if(!member.get('riderSumInsured').value || member.get('riderSumInsured').value.value != riderSIofPrevParent) {
						this.notify.showToast('Warning', 'Rider Sum Insured of dependent parents must be same', 'warning');
						member.get('riderSumInsured').reset();
						return true;
					}
				}
			}
		} else if (code_relation == 17 || code_relation == 20) {
			for(let control in member.parent.controls){
				let prevControl = member.parent.controls[control];
				if(prevControl.invalid || memberIndex <= Number(control))
					continue;
				let relCode = prevControl.get('relationshipWithProposer').value.code;
				if(relCode == 17 || relCode == 20) {

					const roderSIofPrevChild = prevControl.get('riderSumInsured').value && prevControl.get('riderSumInsured').value.value;
					if(!prevControl.get('riderSumInsured').value && !member.get('riderSumInsured').value) {
					}
					else if(!member.get('riderSumInsured').value || member.get('riderSumInsured').value.value != roderSIofPrevChild) {
						this.notify.showToast('Warning', 'Rider Sum Insured for all the children must be same', 'warning');
						member.get('riderSumInsured').reset();
						return true;
					}
				}
			}
		}
	}

	checkAgeBandChange(member: FormGroup, covertype: string) {
		if(this.checkAgeBandChange_products.includes(this.active_product) && this.checkAgeBandChange_partner.includes(this.active_partner)) {
			member.get('isAgeBandChange').setValue('false');
			let upperAgeBandForCoverage = this.ageBand[covertype] && this.ageBand[covertype].upperAgeBand;
			if(!upperAgeBandForCoverage) {
				return;
			}
			if((upperAgeBandForCoverage as Array<number>).includes(member.get('age').value)) {
				let today = new Date();
				let dob = new Date();
				dob.setDate(member.get('dateOfBirth').value.day)
				dob.setMonth(member.get('dateOfBirth').value.month - 1)
				console.log(today.getMonth()+1 , dob.getMonth()+1);
				if(dob.getMonth()+1 < today.getMonth()+1){

					if(((today.getTime() - dob.getTime()) <= 604800000) && ((today.getTime() - dob.getTime()) > 0)) {
						this.notify.showToast('Age Band Change', 'Dear Customer, Age band for the member is about to change, and incase the payment not done today, revised premium will be applicable.', 'info');
						member.get('isAgeBandChange').setValue('true');
					}

				}
				else{
					if(((dob.getTime() - today.getTime()) <= 604800000) && ((dob.getTime() - today.getTime()) > 0) ) {
						this.notify.showToast('Age Band Change', 'Dear Customer, Age band for the member is about to change, and incase the payment not done today, revised premium will be applicable.', 'info');
						member.get('isAgeBandChange').setValue('true');
					}
				}
			}
		}
	}

	add(a, b) {
		if(!isNaN(b))
    	return a + b;
    else return a;
	}

	isParentSelected(member: FormGroup) {
		let selected =  {
			'father': 0,
			'mother': 0,
			'parent': false,
			'motherInLaw': 0,
			'fatherInLaw': 0,
			'selfHusbandWife': false,
            'inLaws': false,
            'self':0,
            'husband':0,
            'wife':0,
		}
		const membersList = member.parent.value;
		console.log(membersList)
		for (let member of membersList) {
			if(member.relationshipWithProposer && member.relationshipWithProposer.code)
				if(member.relationshipWithProposer.code == 4){
					selected.father += 1;
					selected.parent = true;
				} else if (member.relationshipWithProposer.code == 5) {
					selected.mother += 1;
					selected.parent = true;
				} else if (member.relationshipWithProposer.code == 18) {
					selected.fatherInLaw += 1;
					selected.inLaws = true;
				} else if (member.relationshipWithProposer.code == 19) {
					selected.motherInLaw += 1;
					selected.inLaws = true;
				} else if (member.relationshipWithProposer.code == 1 || member.relationshipWithProposer.code == 14 || member.relationshipWithProposer.code == 15) {
                    selected.selfHusbandWife = true;
                    if(member.relationshipWithProposer.code == 1){
                        selected.self +=1; 
                    }
                    else if(member.relationshipWithProposer.code == 14){
                        selected.wife +=1; 
                    }
                    else if(member.relationshipWithProposer.code == 15){
                        selected.husband +=1; 
                    }
				}
		}
		return selected;
	}


	adultChildCount(member: FormGroup) {
		let selected =  {
			'childCount': 0,
			'adultCount': 0,
		}
		const membersList = member.parent.value;
		console.log(membersList)
		for (let member of membersList) {
		if(member.type)
			if((member.type as string).includes('child')){
				selected.childCount += 1;
			} else if ((member.type as string).includes('adult')) {
				selected.adultCount += 1;
			}
		}
		return selected;
	}

	//  min max calender date validations
	calValidation(seq: number, isProposerCovered) {
		
		// return val;
	}


	memberBaseRiderValidationsForPremiumCal(cntrl: FormGroup, coverType: string, i: number) {

		console.log(this.active_product);
		
		if(this.memberBaseRiderValidationsForPremiumCal_products.includes(this.active_product) && this.memberBaseRiderValidationsForPremiumCal_partner.includes(this.active_partner)) {
	
			if((coverType == "individual" && i)) { // for individual (not proposer) - second member
				cntrl.get('baseProductSI').valueChanges.subscribe(val => {
					if(!cntrl.parent.controls[0].get('rider').value) { // if proposer rider is disabled other member can not select rider
						cntrl.get('rider').reset();
						cntrl.get('rider').disable();
					}else if(val && val.value >= 10) { // if val is > 10 and first member rder have value.
						cntrl.get('rider').enable();
					} else { // if value of base SI is less than 10.
						cntrl.get('rider').reset();
						cntrl.get('rider').disable();
					}
				})
			} else if ((coverType == "individual" && !i) || (coverType == "floater" && !i)) { // in case of proposer/ 1st member
				cntrl.get('baseProductSI').valueChanges.subscribe(val => { //
					if(val && val.value >= 10) {
						cntrl.get('rider').enable();
					} else {
						cntrl.get('rider').reset();
						cntrl.get('rider').disable();
					}
				}) 
			} else if(coverType == "floater" && i){ // floter add members baseSI is zero except proposer
				cntrl.get('baseProductSI').disable();
			}
	
			cntrl.get('rider').valueChanges.subscribe(val => {
				if(val) {
					cntrl.get('riderSI').enable();
				} else {
					cntrl.get('riderSI').reset();
					cntrl.get('riderSI').disable();
				}
			})
		}
	}

	otherMemberValidationsWithProposerForPremiumCal(members: FormArray) {
		if(this.otherMemberValidationsWithProposerForPremiumCal_products.includes(this.active_product) && this.otherMemberValidationsWithProposerForPremiumCal_partner.includes(this.active_partner)) {
			// debugger;
			for (let member in members.controls){

				// Base SI of other members must be less than Base SI of Proposer
				if (Number(member)){
					let control = members.controls[member];
					control.get('baseProductSI').valueChanges.subscribe(val => {
						console.log(val);
						if(!val)
							return;
						if(Number(val.value) > Number(members.controls[0].get('baseProductSI').value.value)){
							this.notify.showToast('Warning', `Base Sum Insured can not be greater than first member's Base Sum Insured`, 'warning');
							control.get('baseProductSI').reset();
						}
					})
					control.get('riderSI').valueChanges.subscribe(val => {
						if(!val || !members.controls[0].get('riderSI').value.value)
							return;
						if(Number(val.value) > Number(members.controls[0].get('riderSI').value.value)){
							this.notify.showToast('Warning', `Rider Sum Insured can not be greater than first member's Rider Sum Insured`, 'warning');
							control.get('riderSI').reset();
						}
					})
				}

				// Disable other member's rider if proposer's rider is not selected
				if(!Number(member)) {
					let control = members.controls[member]; // here member is 0 (Proposer)
					control.get('rider').valueChanges.subscribe(val => {
						if(!val) {
							for (let mem in members.controls){
								if(Number(mem)) { //check for member (ignoring proposer as proposer is 0)
									members.controls[mem].get('rider').reset();
									members.controls[mem].get('rider').disable();
								}
							}
						}
						else{
							for (let mem in members.controls){
								if(Number(mem)) { //check for member (ignoring proposer as proposer is 0)
									//members.controls[mem].get('rider').reset();
									members.controls[mem].get('rider').enable();
								}
							}
						} 
					})
				}

			}
		}
	}

	MemberValidationsforRelationShipPremiumCal(members: FormArray){
		  
		if(this.MemberValidationsforRelationShipPremiumCal_products.includes(this.active_product) && this.MemberValidationsforRelationShipPremiumCal_partner.includes(this.active_partner)) {
			// debugger;
			for (let member in members.controls){

				const ctrl = members.controls[member];
				const selectedP = this.isParentSelected(ctrl as FormGroup);
				console.log(members.parent);
				const age =  calculateAge(ctrl.get('dateOfBirth').value);
				const relationCode = ctrl.get('relationshipWithProposer').value.code;

			// Age less than 18 or (18 years – 25 years) and Relationship will define the category Son/Daughter/Child it will come under CD
				if((age < 18) || ((age >= 18 && age <= 25) && (relationCode == 20 || relationCode == 17 || relationCode == 2))) {
                    ctrl.get('type').setValue('child')
                    ctrl.updateValueAndValidity();
				} else if (age >= 18 && age <= 65) {
                    ctrl.get('type').setValue('adult')
                    ctrl.updateValueAndValidity();                    
				}

				if((age < 18) && (!['20', '17', '2'].includes(relationCode))) {
					this.notify.showToast('Warning', 'Only Son, Daughter or Child can be less than 18 years.', 'warning');
					ctrl.get('dateOfBirth').reset();
					// ctrl.get('age').reset();
					return true;
				}

				if((relationCode == 20 || relationCode == 17 || relationCode == 2) && age > 25) {
					this.notify.showToast('Warning', 'Child dependent can not have age greater than 25 years.', 'warning');
					ctrl.get('dateOfBirth').reset();
					// ctrl.get('age').reset();
					return true;
				}

				const count = this.adultChildCount(ctrl as FormGroup);
					if(count.adultCount > 4) {
						this.notify.showToast('Warning', 'Max 4 adult are allowed', 'warning');
						ctrl.get('dateOfBirth').reset();
						return true;
					}
					if(count.childCount > 5) {
						this.notify.showToast('Warning', 'Max 5 child are allowed', 'warning');
						ctrl.get('dateOfBirth').reset();
						return true;
					}

					// Age of chile can not be less than 5 years if either parents are not covered
			if(!selectedP.selfHusbandWife && (ctrl.get('type').value == 'child') && age < 5) {
				console.log(selectedP);
				this.notify.showToast('Warning', 'Mininum age of child can be 5 years, in case parent is not covered', 'warning');
				ctrl.get('dateOfBirth').reset();
				// ctrl.get('age').reset();
				return true;
			}

			if(selectedP.father > 1){
				this.notify.showToast('Warning', 'Can not select more than one Father', 'warning');
				ctrl.get('relationshipWithProposer').reset()
				return true;
			}else if (selectedP.mother > 1){
				this.notify.showToast('Warning', 'Can not select more than one Mother', 'warning');
				ctrl.get('relationshipWithProposer').reset()
				return true;
			}else if (selectedP.fatherInLaw > 1){
				this.notify.showToast('Warning', 'Can not select more than one Father-in-law', 'warning');
				ctrl.get('relationshipWithProposer').reset()
				return true;
			}else if (selectedP.motherInLaw > 1){
				this.notify.showToast('Warning', 'Can not select more than one Mother-in-law', 'warning');
				ctrl.get('relationshipWithProposer').reset()
				return true;
			}else if (selectedP.self > 1){
				this.notify.showToast('Warning', 'Can not select more than one self', 'warning');
				ctrl.get('relationshipWithProposer').reset()
				return true;
			}else if (selectedP.husband > 1){
				this.notify.showToast('Warning', 'Can not select more than one husband', 'warning');
				ctrl.get('relationshipWithProposer').reset()
				return true;
			}else if (selectedP.wife > 1){
				this.notify.showToast('Warning', 'Can not select more than one wife', 'warning');
				ctrl.get('relationshipWithProposer').reset()
				return true;
			}

															// current not father						 // Father-in-law			// Mother-in-law
			if((selectedP.father) && relationCode != 4 && (relationCode == 18 || relationCode == 19)) {
				this.notify.showToast('Warning', 'If father has been selected then Father-in- law and Mother- In- law can’t be selected but Mother can be selected.', 'warning');
				ctrl.get('relationshipWithProposer').reset()
				return true;
			}															// not mother						 // Father-in-law			// Mother-in-law
			else if ((selectedP.mother) && relationCode != 5 && (relationCode == 18 || relationCode == 19)) {
				this.notify.showToast('Warning', 'If mother has been selected then Father-in- law and Mother- In- law can’t be selected but Father can be.', 'warning');
				ctrl.get('relationshipWithProposer').reset()
				return true;
			}																	// not Father-in-law		// mother						 			// father
			else if ((selectedP.fatherInLaw) && relationCode != 18 && (relationCode == 5 || relationCode == 4)) {
				this.notify.showToast('Warning', 'If father-in-law has been selected then Father and Mother can’t be selected but Mother-in-law can be selected.', 'warning');
				ctrl.get('relationshipWithProposer').reset()
				return true;
			}																	// not Mother-in-law		// mother						 // father					
			else if ((selectedP.motherInLaw) && relationCode != 19 && (relationCode == 5 || relationCode == 4)) {
				this.notify.showToast('Warning', 'If mother-in-law has been selected then Father and Mother can’t be selected but Father-in-law can be.', 'warning');
				ctrl.get('relationshipWithProposer').reset()
				return true;
			}

            let code_relation = ctrl.get('relationshipWithProposer').value.code;
					// father							// mother - parents base si must be equal
				if(code_relation == 4 || code_relation == 5) {
					// if(selectedP.father + selectedP.mother > 1) { //check if parent or mother is already selected
				for(let control in members.controls){
					let prevControl = members.controls[control];
							if(prevControl.invalid)
								continue;
							let relCode = prevControl.get('relationshipWithProposer').value.code;
							if(relCode == 4 || relCode == 5) {
								const baseSIofPrevParent = prevControl.get('baseProductSI').value.value;
								if(ctrl.get('baseProductSI').value.value != baseSIofPrevParent) {
									this.notify.showToast('Warning', 'Sum insured of dependent parents must be same', 'warning');
									ctrl.get('baseProductSI').reset();
									return true;
								}
							}
						}
					// }
				} else if (code_relation == 17 || code_relation == 20) {
				for(let control in members.controls){
					let prevControl = members.controls[control];
						if(prevControl.invalid)
							continue;
						let relCode = prevControl.get('relationshipWithProposer').value.code;
						if(relCode == 17 || relCode == 20) {
							const baseSIofPrevChild = prevControl.get('baseProductSI').value.value;
							if(ctrl.get('baseProductSI').value.value != baseSIofPrevChild) {
								this.notify.showToast('Warning', 'Sum Insured for all the children must be same', 'warning');
								ctrl.get('baseProductSI').reset();
								return true;
							}
						}
					}
				}else if (code_relation == 19 || code_relation == 18) {
				for(let control in members.controls){
					let prevControl = members.controls[control];
						if(prevControl.invalid)
							continue;
						let relCode = prevControl.get('relationshipWithProposer').value.code;
						if(relCode == 19 || relCode == 18) {
							const baseSIofPrevChild = prevControl.get('baseProductSI').value.value;
							if(ctrl.get('baseProductSI').value.value != baseSIofPrevChild) {
								this.notify.showToast('Warning', 'Sum Insured of dependent parents in law must be same', 'warning');
								ctrl.get('baseProductSI').reset();
								return true;
							}
						}
					}
				}  
				
			}
	}
}

	MemberValidationsforRelationShipPremiumCalIcan(members: FormArray){
		  
		if(this.MemberValidationsforRelationShipPremiumCal_products_Ican.includes(this.active_product) && this.MemberValidationsforRelationShipPremiumCal_partner_Ican.includes(this.active_partner)) {
			// debugger;
			for (let member in members.controls){

				const ctrl = members.controls[member];
				const selectedP = this.isParentSelected(ctrl as FormGroup);
				console.log(members.parent);
				const age =  calculateAge(ctrl.get('dateOfBirth').value);
				const relationCode = ctrl.get('relationshipWithProposer').value.code;

			// Age less than 18 and Relationship will define the category Son/Daughter/Child it will come under CD
				if((age < 18) || ((relationCode == 20 || relationCode == 17 || relationCode == 2))) {
					ctrl.get('type').setValue('child')
				} else if (age >= 18 && age <= 65) {
					ctrl.get('type').setValue('adult')
				}

				if((age < 18) && (!['20', '17', '2'].includes(relationCode))) {
					this.notify.showToast('Warning', 'Only Son, Daughter or Child can be less than 18 years.', 'warning');
					ctrl.get('dateOfBirth').reset();
					// ctrl.get('age').reset();
					return true;
				}

				if((relationCode == 20 || relationCode == 17 || relationCode == 2) && age >= 18) {
					this.notify.showToast('Warning', 'Child dependent can not have age greater than or equal to 18 years.', 'warning');
					ctrl.get('dateOfBirth').reset();
					// ctrl.get('age').reset();
					return true;
				}

				const count = this.adultChildCount(ctrl as FormGroup);
					if(count.adultCount > 4) {
						this.notify.showToast('Warning', 'Max 4 adult are allowed', 'warning');
						ctrl.get('dateOfBirth').reset();
						return true;
					}
					if(count.childCount > 5) {
						this.notify.showToast('Warning', 'Max 5 child are allowed', 'warning');
						ctrl.get('dateOfBirth').reset();
						return true;
					}

					// Age of chile can not be less than 5 years if either parents are not covered
			if(!selectedP.selfHusbandWife && (ctrl.get('type').value == 'child') && age < 5) {
				console.log(selectedP);
				this.notify.showToast('Warning', 'Mininum age of child can be 5 years, in case parent is not covered', 'warning');
				ctrl.get('dateOfBirth').reset();
				// ctrl.get('age').reset();
				return true;
			}

			if(selectedP.father > 1){
				this.notify.showToast('Warning', 'Can not select more than one Father', 'warning');
				ctrl.get('relationshipWithProposer').reset()
				return true;
			}else if (selectedP.mother > 1){
				this.notify.showToast('Warning', 'Can not select more than one Mother', 'warning');
				ctrl.get('relationshipWithProposer').reset()
				return true;
			}else if (selectedP.fatherInLaw > 1){
				this.notify.showToast('Warning', 'Can not select more than one Father-in-law', 'warning');
				ctrl.get('relationshipWithProposer').reset()
				return true;
			}else if (selectedP.motherInLaw > 1){
				this.notify.showToast('Warning', 'Can not select more than one Mother-in-law', 'warning');
				ctrl.get('relationshipWithProposer').reset()
				return true;
			}else if (selectedP.self > 1){
				this.notify.showToast('Warning', 'Can not select more than one self', 'warning');
				ctrl.get('relationshipWithProposer').reset()
				return true;
			}else if (selectedP.husband > 1){
				this.notify.showToast('Warning', 'Can not select more than one husband', 'warning');
				ctrl.get('relationshipWithProposer').reset()
				return true;
			}else if (selectedP.wife > 1){
				this.notify.showToast('Warning', 'Can not select more than one wife', 'warning');
				ctrl.get('relationshipWithProposer').reset()
				return true;
			}

															// current not father						 // Father-in-law			// Mother-in-law
			if((selectedP.father) && relationCode != 4 && (relationCode == 18 || relationCode == 19)) {
				this.notify.showToast('Warning', 'If father has been selected then Father-in- law and Mother- In- law can’t be selected but Mother can be selected.', 'warning');
				ctrl.get('relationshipWithProposer').reset()
				return true;
			}															// not mother						 // Father-in-law			// Mother-in-law
			else if ((selectedP.mother) && relationCode != 5 && (relationCode == 18 || relationCode == 19)) {
				this.notify.showToast('Warning', 'If mother has been selected then Father-in- law and Mother- In- law can’t be selected but Father can be.', 'warning');
				ctrl.get('relationshipWithProposer').reset()
				return true;
			}																	// not Father-in-law		// mother						 			// father
			else if ((selectedP.fatherInLaw) && relationCode != 18 && (relationCode == 5 || relationCode == 4)) {
				this.notify.showToast('Warning', 'If father-in-law has been selected then Father and Mother can’t be selected but Mother-in-law can be selected.', 'warning');
				ctrl.get('relationshipWithProposer').reset()
				return true;
			}																	// not Mother-in-law		// mother						 // father					
			else if ((selectedP.motherInLaw) && relationCode != 19 && (relationCode == 5 || relationCode == 4)) {
				this.notify.showToast('Warning', 'If mother-in-law has been selected then Father and Mother can’t be selected but Father-in-law can be.', 'warning');
				ctrl.get('relationshipWithProposer').reset()
				return true;
			}

            let code_relation = ctrl.get('relationshipWithProposer').value.code;
					// father							// mother - parents base si must be equal
			if(code_relation == 4 || code_relation == 5) {
					// if(selectedP.father + selectedP.mother > 1) { //check if parent or mother is already selected
				for(let control in members.controls){
					let prevControl = members.controls[control];
	                if(prevControl.invalid)
                		continue;
                	let relCode = prevControl.get('relationshipWithProposer').value.code;
                	if(relCode == 4 || relCode == 5) {
                		const baseSIofPrevParent = prevControl.get('baseProductSI').value.value;
                		if(ctrl.get('baseProductSI').value.value != baseSIofPrevParent) {
                			this.notify.showToast('Warning', 'Sum insured of dependent parents must be same', 'warning');
                			ctrl.get('baseProductSI').reset();
                			return true;
                		}
                	}
                }
				} else if (code_relation == 17 || code_relation == 20) {
				for(let control in members.controls){
					let prevControl = members.controls[control];
						if(prevControl.invalid)
							continue;
						let relCode = prevControl.get('relationshipWithProposer').value.code;
						if(relCode == 17 || relCode == 20) {
							const baseSIofPrevChild = prevControl.get('baseProductSI').value.value;
							if(ctrl.get('baseProductSI').value.value != baseSIofPrevChild) {
								this.notify.showToast('Warning', 'Sum Insured for all the children must be same', 'warning');
								ctrl.get('baseProductSI').reset();
								return true;
							}
						}
					}
				}  else if (code_relation == 19 || code_relation == 18) {
				for(let control in members.controls){
					let prevControl = members.controls[control];
						if(prevControl.invalid)
							continue;
						let relCode = prevControl.get('relationshipWithProposer').value.code;
						if(relCode == 19 || relCode == 18) {
							const baseSIofPrevChild = prevControl.get('baseProductSI').value.value;
							if(ctrl.get('baseProductSI').value.value != baseSIofPrevChild) {
								this.notify.showToast('Warning', 'Sum Insured of dependent parents in law must be same', 'warning');
								ctrl.get('baseProductSI').reset();
								return true;
							}
						}
					}
				}       
            				
			}
	}
}

    calenderValidation(){
        let calender = {};
        const days_91 = moment(new Date()).subtract(90, 'days');
		const year_65 = moment(new Date()).subtract(66,'years');
		// const month_11 = year_65.subtract(11,'months');
		const year_65_11_30 = year_65.add(1,'days');
		const year_18 = moment(new Date()).subtract(18,'years');
        const year_25 = moment(new Date()).subtract(25,'years');
        const year_5 = moment(new Date()).subtract(5,'years');     

        if(this.active_product == 'Optima Restore'){
          calender = {
                minAdult:{
                year: year_65_11_30.year(),
                month: year_65_11_30.month()+1,
                day: year_65_11_30.date(),
                },
                maxAdult:{
                year: year_18.year(),
                month: year_18.month()+1,
                day: year_18.date(),
                },
                maxChild:{
                year: days_91.year(),
                month: days_91.month()+1,
                day: days_91.date(),
                },
                minChild:{
                year: year_25.year(),
                month: year_25.month()+1,
                day: year_25.date(),
                },
            }
        }
       if(this.active_product == 'iCan'){
          calender = {
                minAdult:{
                year: year_65_11_30.year(),
                month: year_65_11_30.month()+1,
                day: year_65_11_30.date(),
                },
                maxAdult:{
                year: year_18.year(),
                month: year_18.month()+1,
                day: year_18.date(),
                },
                maxChild:{
                year: year_5.year(),
                month: year_5.month()+1,
                day: year_5.date(),
                },
                minChild:{
                year: year_25.year(),
                month: year_25.month()+1,
                day: year_25.date(),
                },
            }
         }

         return calender;
   }

   annualIncomeValidation_Ican(member: FormGroup, isProposerCovered) {
    if(this.annualIncomeValidation_products_Ican.includes(this.active_product) && this.annualIncomeValidation_partner_Ican.includes(this.active_partner)) {
        // debugger;
            if(isProposerCovered){
              let control = member;  
              let annualIncomeRange = control.get('annualIncome').value.code;
              let baseSI = control.get('baseSumInsured').value.value;
              let occupation = control.get('occupation').value;
              if(!(annualIncomeRange == '249999' && [5,10,15,20].includes(Number(baseSI)) || annualIncomeRange == '499999' && [5,10,15,20,25].includes(Number(baseSI)) || annualIncomeRange == '500000' && [5,10,15,20,25,50].includes(Number(baseSI)) )){
                this.notify.showToast('Warning', 'Sum Insured of proposer can be max allowed to 10 times of Annual Income', 'warning');  
                control.get('baseSumInsured').reset();              
                return true;
              }
              if([304211,304218,304216,304219,304217,304222,304221,303925].includes(Number(occupation.code)) && [50].includes(Number(baseSI))){
                this.notify.showToast('Warning', `For occupation ${occupation.occupationName} max base sum insured allowed is 25 lacs`, 'warning');
                control.get('baseSumInsured').reset();              
                return true;
              }
        }
    }
}

annualIncomeValidation_Ican_Airtel(member: FormGroup, isProposerCovered) {
    if(this.annualIncomeValidation_products_Ican_Airtel.includes(this.active_product) && this.annualIncomeValidation_partner_Ican_Airtel.includes(this.active_partner)) {
        // debugger;
            if(isProposerCovered){
              let control = member;  
              let annualIncomeRange = control.get('annualIncome').value.code;
              let baseSI = control.get('baseSumInsured').value.value;
              let occupation = control.get('occupation').value;
              if(!(annualIncomeRange == '249999' && [5,10,15,20].includes(Number(baseSI)) || annualIncomeRange == '499999' && [5,10,15,20,25].includes(Number(baseSI)) || annualIncomeRange == '500000' && [5,10,15,20,25,50].includes(Number(baseSI)) )){
                this.notify.showToast('Warning', 'Sum Insured of proposer can be max allowed to 10 times of Annual Income', 'warning');  
                control.get('baseSumInsured').reset();              
                return true;
              }
              if([400005].includes(Number(occupation.code)) && [50].includes(Number(baseSI))){
                this.notify.showToast('Warning', `For occupation ${occupation.occupationName} max base sum insured allowed is 25 lacs`, 'warning');
                control.get('baseSumInsured').reset();              
                return true;
              }
        }
    }
}

}





// Relationship Code	Relationship
// 1	Self
// 2	Child
// 4	Father
// 5	Mother
// 6	Brother
// 7	Sister
// 11	Partner
// 12	Special Concession Adult
// 13	Special Concession Child
// 14	Wife
// 15	Husband
// 16	Employee
// 17	Daughter
// 18	Father-in-law
// 19	Mother-in-law
// 20	Son