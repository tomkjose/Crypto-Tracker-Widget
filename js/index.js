const coinOptions = document.getElementById("coinSelect");
const widgetCode = document.getElementById("widgetCode");
const apiUrl = "https://api.coingecko.com/api/v3/coins/";

const fetchCoinList = async () => {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
};

const copyToClipboard = () => {
  console.log(widgetCode);
  widgetCode.select();
  document.execCommand("copy");
};

const createCoinList = async () => {
  const coins = await fetchCoinList();
  for (const coin of coins) {
    const option = document.createElement("option");

    option.setAttribute("value", coin.id);

    option.innerHTML = `<span>${coin.name}</span>`;

    coinOptions.appendChild(option);
  }
};

const handleSelect = () => {
  console.log(coinOptions.value);
};

createCoinList();
