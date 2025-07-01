import { HttpClient } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';
import { MeterSummery } from '@model/meter.model';
import { TranslateService } from '@ngx-translate/core';
import { PaymentService } from '@service/payment.service';

@Component({
  selector: 'app-cib-payment',
  templateUrl: './cib-payment.component.html',
  styleUrls: ['./cib-payment.component.scss']
})
export class CibPaymentComponent implements AfterViewInit {
  @Input() currentMeter!:MeterSummery;
  @Input() currentMeterInfo!:any;

  
  sessionId: string = '';
  isLoading = true;
  isLoadingPayment = false;
  isInitPayment = false;
  paymentError = false;
  form: FormGroup = this.fb.group({});
  
   MIN_AMOUNT = 0;
   MAX_AMOUNT =  0;
  constructor(
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private translate: TranslateService,
    private paymentService: PaymentService,
    private http: HttpClient
  ) {
   
  }
  ngAfterViewInit(): void {
   
  }
  get f(): { [key: string]: AbstractControl } {
    return this.form.controls;
  }
  createChargingForm() {
    const currentMeter = this.currentMeter.meterId;
    // this.f['meterId'].setValue(currentMeter);
    this.form = this.fb.group({
      currency: ['EGP',Validators.required],
      amount: [null, [
        Validators.required,
        Validators.min(this.MIN_AMOUNT),
        Validators.max(this.MAX_AMOUNT)
      ]],
      paymentMethod: ['GATEWAY',Validators.required],
      meterId: [currentMeter,Validators.required],
      returnUrl: ['/payment-success',Validators.required],
      cancelUrl: ['/payment-success',Validators.required]
     
    });
    // this.form.
  }
  ngOnInit(): void {
    this.MIN_AMOUNT = this.currentMeterInfo.minChargeLimit || 0;
    this.MAX_AMOUNT = this.currentMeterInfo.maxChargeLimit || 0;
    this.createChargingForm();
  }
  chargeMeter(){
    
   
    // this.f['meterId'].up
    this.initializePayment();
  }
  initializePayment(): void {
    this.isInitPayment= true;

    const originalURl=window.location.origin
    const cleanedUrl =  originalURl.replace('#/', '');
const data = {
  ...this.form.value,
  returnUrl:cleanedUrl + this.f['returnUrl'].value,
  cancelUrl:cleanedUrl + this.f['cancelUrl'].value,
}
    this.paymentService.initPayment(data).subscribe({
      next: (response) => {
        if (response?.data?.success && response.data.data.session?.id) {
          this.sessionId = response.data.data.session.id;
          this.loadCheckoutScript().then(() => this.configureCheckout());
          
        } else {
          console.error('Invalid session response:', response);
          this.paymentError = true;
        }
        this.isLoading = false;
        this.isInitPayment= false;
      },
      error: (err) => {
        console.error('Payment session init error:', err);
        this.paymentError = true;
        this.isLoading = false;
        this.isInitPayment= false;
      }
    });
  }

  loadCheckoutScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      const scriptId = 'checkout-js';
      if (document.getElementById(scriptId)) {
        resolve();
        return;
      }

      const script = document.createElement('script');
      script.src = 'https://cibpaynow.gateway.mastercard.com/static/checkout/checkout.min.js';
      script.id = scriptId;
      script.setAttribute('data-error', 'errorCallback');
      script.setAttribute('data-cancel', 'cancelCallback');
      script.onload = () => resolve();
      script.onerror = () => reject(new Error('Failed to load Mastercard script'));
      document.body.appendChild(script);
    });
  }

  configureCheckout(): void {
    (window as any).errorCallback = (error: any) => {
      console.error('Payment Error:', error);
      this.paymentError = true;
      alert('An error occurred during payment.');
    };

    (window as any).cancelCallback = () => {
      console.warn('Payment cancelled by user');
    };

    (window as any).Checkout.configure({
      session: {
        id: this.sessionId
      }
    });
    this.payEmbedded();
    
  }

  payEmbedded(): void {
    this.isLoadingPayment = true;
    (window as any).Checkout.showEmbeddedPage('#embed-target');
  }

  payHosted(): void {
    this.isLoadingPayment = true;
    (window as any).Checkout.showPaymentPage();
  }
   get amountErrorMessage(): string {
    const control = this.f['amount'];
    if (control.hasError('required')) {
      return this.translate.instant('Amount_Required');
    }
    if (control.hasError('min')) {
      return this.translate.instant('Amount_Min_Error', { min: this.MIN_AMOUNT });
    }
    if (control.hasError('max')) {
      return this.translate.instant('Amount_Max_Error', { max: this.MAX_AMOUNT });
    }
    return '';
  }

}