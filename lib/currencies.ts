export const Currencies = [
  { value: "BRL", Label: "R$ Real", locale: "pt-BR" },
  { value: "USD", Label: "$ Dollar", locale: "en-US" },
  { value: "EUR", Label: "€ Euro", locale: "de-DE" },
];

export type Currency = (typeof Currencies)[0];
