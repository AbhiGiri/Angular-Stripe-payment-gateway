import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  paymentHandler: any = null;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.invokeStripe();
  }


makePayment(amount) {
  const paymentHandler = (<any>window).StripeCheckout.configure({
    key: 'pk_test_51IhXbKSALW4gLm0BCN',
    locale: 'auto',
    token: function (stripeToken: any) {
      alert('Stripe Token Generated.');
    }
  });

  paymentHandler.open({
    name: 'Abhishek',
    description: 'Angular Payment Gateway',
    amount: amount * 100
  });
}


invokeStripe() {
  if(!window.document.getElementById('stripe-script')) {
    const script = window.document.createElement("script");
    script.id = "stripe-script";
    script.type = "text/javascript";
    script.src = "https://checkout.stripe.com/checkout.js";
    script.onload = () => {
      this.paymentHandler = (<any>window).StripeCheckout.configure({
        key: 'pk_test_51IhXbKSALW4gLm0BCNsZ',
        locale: 'auto',
        token: function (stripeToken: any) {
          console.log(stripeToken)
          alert('Payment has been successfull!');
        }
      });
    }

    window.document.body.appendChild(script);
  }
}
}

