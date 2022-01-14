const beerPrice = 20;
const coffeePrice = 10;

const showMessage = (message) => {
  document.querySelectorAll(".message").forEach((e) => {
    e.innerHTML = "In-app payments only available in Android.";
  });
}

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("sw.js");
  });
}

window.addEventListener("load", async () => {
  if (!window["getDigitalGoodsService"]) {
    document.querySelectorAll(".has-payment-only").forEach((e) => {
      e.style.display = "none";
    });

    showMessage("In-app payments only available in Android.");

    document.querySelectorAll(".payment-button").forEach((e) => {
      e.style.cursor = "not-allowed";
    });
  } else {
    try {
      const digitalGoodsService = await window.getDigitalGoodsService(
        "https://play.google.com/billing"
      );
      if (service) {
        showMessage("Google Play Billing DGSv2 available.");
      } else {
        showMessage("Google Play Billing DGSv1 available.");
      }
    } catch (error) {
      showMessage("Google Play Billing DGS error.");
    }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const quantityField = document.querySelector("input#qty");

  const stepperMinus = document.querySelector(".stepper.minus");
  const stepperPlus = document.querySelector(".stepper.plus");

  stepperMinus.addEventListener("click", () => {
    const newValue = Number(quantityField.value) - 1;
    if (newValue < quantityField.min) return false;
    quantityField.value = newValue;
    quantityField.dispatchEvent(new Event("change"));
  });

  stepperPlus.addEventListener("click", () => {
    const newValue = Number(quantityField.value) + 1;
    if (newValue > quantityField.max) return false;
    quantityField.value = newValue;
    quantityField.dispatchEvent(new Event("change"));
  });

  quantityField.addEventListener("change", (evt) => {
    const quantityField = evt.currentTarget;

    let quantity = quantityField.value;

    if (quantity < 0) quantityField.value = quantity = 0;
    if (quantity > 100) quantityField.value = quantity = 100;

    const beerPriceTag = document.querySelector(".price-tag.beer");
    const coffeePriceTag = document.querySelector(".price-tag.coffee");

    beerPriceTag.innerHTML = `R\$ ${quantity * beerPrice},00`;
    coffeePriceTag.innerHTML = `R\$ ${quantity * coffeePrice},00`;
  });
});
