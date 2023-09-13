import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators, Form } from '@angular/forms';

@Component({
  selector: 'app-money-transfer',
  templateUrl: './money-transfer.component.html',
  styleUrls: ['./money-transfer.component.css']
})
export class MoneyTransferComponent {

  inputNumber='';
  output='';
  amountInput=1;
  currencyInput='';
  currencyOutput=0;
  isScoreDisplayed = false;
  fees = 0;
  feesBDT = 0;
  currencyName = '';
  getCurrencyValue = 0;
  receiverGets = 0;

  moneyForm = new FormGroup({
    cardNo: new FormControl<string>('', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]),
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    payMethod: new FormControl<string>('', [Validators.required]),
    amount: new FormControl<number>(0, [Validators.required, Validators.max(20000), Validators.min(10)]),
    currency: new FormControl<string>('',[Validators.required]),
    convertedAmount: new FormControl<number>(0, [Validators.required, Validators.max(2500000)])
  })

  get emailErrors(): ValidationErrors | null | undefined {
    return this.moneyForm.get('email')?.errors
  }

  onInput=( event: Event)=>{
    const value=((<HTMLInputElement>event.target).value);
      this.inputNumber=value;
    this.checkDigit()}
  
  onAmountInput=( event: Event)=>{
      const value=parseInt((<HTMLInputElement>event.target).value);
        this.amountInput=value;}

    onSelect=( event: Event)=>{
      const value=((<HTMLInputElement>event.target).value);
        this.currencyInput=value;
      this.ConvertCurrency(this.currencyInput)}

      ConvertCurrency(currencyValue: string){
        if(currencyValue === 'usd'){
          this.currencyOutput = this.amountInput * 112;
        }
        else if(currencyValue === 'eur'){
          this.currencyOutput = this.amountInput * 125;
        }
        else if(currencyValue === 'cad'){
          this.currencyOutput = this.amountInput * 84;
        }
        else{
          this.currencyOutput = 0;
        }
      }
      selectedCurrencyName(Value: string): string{
        if(Value === 'usd'){
          this.getCurrencyValue = 112;
          return 'USD';
        }
        else if(Value === 'eur'){
          this.getCurrencyValue = 125;
          return 'EUR';
        }
        else if(Value === 'cad'){
          this.getCurrencyValue = 84;
          return 'CAD';
        }
        else{
          this.getCurrencyValue = 0;
          return '';
        }
      }


  checkDigit() {
    if (this.inputNumber.length === 16 ) {
      const firstDigit = this.inputNumber.charAt(0);
      switch (firstDigit) {
        case '4':
          this.output = 'Visa';
          break;
        case '5':
          this.output = 'MasterCard';
          break;
        case '6':
          this.output = 'Discover';
          break;
        default:
          this.output = 'none';
      }
    } else {
      this.output = 'Enter Valid Card Number';
    }
  }

  getFees(): number {
    if (this.moneyForm.get('payMethod')?.value === 'Instant'){
      return this.fees = 4.99;
    }
    else if (this.moneyForm.get('payMethod')?.value === 'Regular'){
      return this.fees = 1.99;
    }
    else {
      return 0;
    }
  }

  

  send(): void{
    this.currencyName =  this.selectedCurrencyName(this.currencyInput);
    this.feesBDT = this.getFees() * this.getCurrencyValue;
    this.receiverGets = (this.currencyOutput - this.feesBDT);
    this.isScoreDisplayed = true;
  }


  
}
