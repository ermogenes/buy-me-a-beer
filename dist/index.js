let beerPrice = 0;
let coffeePrice = 0;

const showMessage = (message = "") => {
  document.querySelectorAll(".message").forEach((e) => {
    e.innerHTML = message;
  });
};

const updateItemsPrice = (prices) => {
  const beerPriceTag = document.querySelector(".price-tag.beer");
  const coffeePriceTag = document.querySelector(".price-tag.coffee");
  const quantityField = document.querySelector("input#qty");

  if (prices) {
    beerPrice = prices?.beer || 0;
    coffeePrice = prices?.coffee || 0;
  }

  const quantity = quantityField.value;

  beerPriceTag.innerHTML = `R\$ ${(quantity * beerPrice).toFixed(2)}`;
  coffeePriceTag.innerHTML = `R\$ ${(quantity * coffeePrice).toFixed(2)}`;
};

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
      if (digitalGoodsService !== null) {
        showMessage("Billing info...");

        const skuDetails = await digitalGoodsService.getDetails([
          "buy_ermogenes_a_beer.beer",
          "buy_ermogenes_a_beer.coffee",
        ]);

        const beerItem = skuDetails.find(
          (item) => item.itemId === "buy_ermogenes_a_beer.beer"
        );
        const coffeeItem = skuDetails.find(
          (item) => item.itemId === "buy_ermogenes_a_beer.coffee"
        );

        updateItemsPrice({
          beer: beerItem?.price?.value || 0,
          coffee: coffeeItem?.price?.value || 0,
        });

        showMessage();
      } else {
        showMessage(
          "Google Play Billing DGSv1 is available but is not supported."
        );
      }
    } catch (error) {
      showMessage(`Google Play Billing DGS error: <p>${error.message}</p>`);
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

    updateItemsPrice();
  });
});
