const currencyWidget = document.querySelector(".currency-widget");

const coinId = currencyWidget.dataset.coin;
console.log("coinId", coinId);
const fetchCoinDetails = async (coinId) => {
  console.log("coinId", coinId);
  const response = await fetch(
    `https://api.coingecko.com/api/v3/coins/${coinId}`
  );
  const data = await response.json();
  return data;
};

const currencyFormat = (number) => {
  if (number >= 1000000) {
    const trillion = number / 1000000000000;
    if (trillion >= 1) {
      return `$${trillion.toFixed(2)} T`;
    }

    const billion = number / 1000000000;
    if (billion >= 1) {
      return `$${billion.toFixed(2)} B`;
    }

    const million = number / 1000000;
    if (million >= 1) {
      return `$${million.toFixed(2)} M`;
    }
  } else {
    const formattedValue = number.toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    return formattedValue;
  }
};

const precentageFormat = (number) => {
  // console.log("number", typeof number);
  var formattedValue = Number(number / 100).toLocaleString(undefined, {
    style: "percent",
    minimumFractionDigits: 2,
  });
  return formattedValue;
};

const numberFormat = (number) => {
  if (number < 1000) {
    return number.toString();
  } else if (number < 1000000) {
    return (number / 1000).toFixed(2) + "K";
  } else if (number < 1000000000) {
    return (number / 1000000).toFixed(2) + "M";
  } else {
    return (number / 1000000000).toFixed(2) + "B";
  }
};

const displayWidget = async (coinId) => {
  const coinData = await fetchCoinDetails(coinId);
  const cardDiv = document.createElement("div");
  cardDiv.innerHTML = `<div style="display:flex;flex-direction:column;width:100%;border:0.1rem solid #e1e5ea;border-radius:0.4rem;font-family: 'Inter', sans-serif;"><div style="display:flex;justify-content: space-evenly; border-bottom: 0.1rem solid  #e1e5ea"><img src="${
    coinData.image.small
  }" alt=${
    coinData.id
  } style="padding:0.5rem" /><div style="display:flex;flex-direction:column;padding:0.5rem"><div><span style="color:#3861FB;font-size:1.2rem;font-weight:600">${
    coinData.name
  }</span><span style="color:#3861FB;font-size:1.2rem;font-weight:600"> (${coinData.symbol.toUpperCase()})</span></div>
  <div><span style="font-weight:700;font-size:1.2rem;padding-top:1rem"> ${currencyFormat(
    coinData.market_data.current_price.usd
  )} <span style="font-size:0.8rem;font-weight:7500">USD</span></span><span style=color:${
    coinData.market_data.price_change_percentage_24h_in_currency.usd > 0
      ? "green"
      : "red"
  }> ( ${precentageFormat(
    coinData.market_data.price_change_percentage_24h_in_currency.usd
  )})</span></div></div>
  </div><div  style="display:flex;justify-content:space-evenly;padding-top:0.6rem;padding-bottom:0.6rem;"><div style="display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;width:100%"><div>RANK</div><div style="padding-top:1rem;font-size:1.2rem">${
    coinData.market_cap_rank
  }</div></div><div  style="display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;border-left: 0.1rem solid  #e1e5ea;border-right: 0.1rem solid  #e1e5ea;width:100%"><div>MARKET CAP</div><div style="padding-top:1rem;font-size:1.2rem">${currencyFormat(
    coinData.market_data.market_cap.usd
  )} <span style="font-size:0.8rem">USD</span></div></div><div  style="display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;width:100%"><div>VOLUME</div> <div style="padding-top:1rem;font-size:1.2rem">${currencyFormat(
    coinData.market_data.total_volume.usd
  )} <span style="font-size:0.8rem">USD</span></div></div></div>
  <div  style="display:flex;justify-content:space-evenly;padding-top:0.6rem;padding-bottom:0.6rem;border-top: 0.1rem solid  #e1e5ea; "><div style="display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;width:100%"><div>TWITTER</div><div style="padding-top:1rem;font-size:1.2rem">${numberFormat(
    coinData.community_data.twitter_followers
  )}</div></div><div  style="display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;border-left: 0.1rem solid  #e1e5ea;border-right: 0.1rem solid  #e1e5ea;width:100%"><div>ALGORITHM</div><div style="padding-top:1rem;font-size:1.2rem">${
    coinData.hashing_algorithm === null ? "Unknown" : coinData.hashing_algorithm
  } </div></div><div  style="display:flex;flex-direction:column;justify-content:space-evenly;align-items:center;width:100%"><div>TOTAL SUPPLY</div> <div style="padding-top:1rem;font-size:1.2rem">${numberFormat(
    coinData.market_data.total_supply
  )}<span> ${coinData.symbol.toUpperCase()}</span> </div></div></div><div style="text-align:center;padding:1rem;border-top:0.1rem solid #e1e5ea"><em style="color:#3861FB;font-size:0.6rem;">powered by Plena Finance</em></div></div></div>`;
  currencyWidget.innerHTML = "";
  currencyWidget.appendChild(cardDiv);
};
displayWidget(coinId);
