export const handlePercentDiscount = (products) => {
  if(!products.length) return <></>
  const newList = products.map((product) => {
    const percentDiscount = 100 - Math.round((product.salePrice * 100) / product.price);
    return { ...product, percentDiscount: percentDiscount };
  });
  return newList;
};

export const formatPrice = (price) => {
  // const formatter = new Intl.NumberFormat("vi");
  // return formatter.format(price);
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return formatter.format(price);
};

export const formatCurrency = (amount) => {
  const formatter = new Intl.NumberFormat("vi-VN", {
    style: "currency",
    currency: "VND",
  });

  return formatter.format(amount);
};

export const getFirstCharacterUser = (name) => {
  const arrCharacter = name.split("")[0];
  return arrCharacter;
};

export const formatDateOrderPaypal = (timestamp) => {
  const d = new Date(timestamp);
  const date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();
  return date;
};
