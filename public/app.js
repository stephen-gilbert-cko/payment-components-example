/* global CheckoutWebComponents */
(async () => {
  const response = await fetch("/create-payment-sessions", { method: "POST" }); // Order
  const paymentSession = await response.json();

  const checkoutWebComponents = await CheckoutWebComponents({
    publicKey: "pk_sbox_ssmydcaiyxomdgwnl4butacbgeg",
    environment: "sandbox",
    locale: "en-GB",
    paymentSession,
    onReady: () => {
      console.log("onReady");
    },
    onPaymentCompleted: (component, paymentResponse) => {
      triggerToast('successToast')

      console.log('Your payment id is', paymentResponse.id);
    },
    onChange: (component) => {
      console.log(
        "onChange",
        "isValid: ",
        component.isValid(),
        " for ",
        component.type
      );
    },
    onError: (component, error) => {
      const element = document.getElementById("error-message");

      element.innerHTML = `
          ${component.name} error <br>
          Error occurred: <pre class="error-object">${error}</pre>
        `;
    },
  });

  const payments = checkoutWebComponents.create("payments");

  payments.mount(document.getElementById("payments"));
})();

const urlParams = new URLSearchParams(window.location.search);
const paymentStatus = urlParams.get('status');

function triggerToast(id) {
  var element = document.getElementById(id);
  element.className = "show";
  setTimeout(function(){
    element.className = element.className.replace("show", "");
  }, 3000);
};

console.log('paymentStatus', paymentStatus);

if (paymentStatus === 'succeeded') {
  triggerToast('successToast')
}

if (paymentStatus === 'failed') {
  triggerToast('failedToast')
}
