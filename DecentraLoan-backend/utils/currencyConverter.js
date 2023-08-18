// utils/currencyConverter.js

exports.convert = (amount, fromCurrency, toCurrency) => {
    // Mocked conversion rates
    const rates = {
        USD: { EUR: 0.85 },
        EUR: { USD: 1.18 }
    };

    const conversionRate = rates[fromCurrency][toCurrency];
    return amount * (conversionRate || 1);  // default to 1 if no rate found
};
