import moment from "moment";

export const validateEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
}

export const getInitials = (name) => {
  if (!name) return "";

  const words = name.split(" ");
  let initials = "";
  for (let i = 0; i < Math.min(words.length, 2); i++) {
    initials += words[i][0]
  }

  return initials.toUpperCase();
}

export const addThousandSeparator = (num) => {
  if (num == null || isNaN(num)) return "";
  const [integerPart, fractionalPart] = num.toString().split(".");
  const formatedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fractionalPart
    ? `${formatedInteger}.${fractionalPart}`
    : formatedInteger;
}

export const prepareExpenseBarChartData = (data) => {

  const chartData = data.map((item) => (
    {
      category: item?.category,
      amount: item?.amount,
      date: new Date(item?.date).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        // year: "numeric"
      })
    }));

  return chartData
}

export const prepareIncomeBarChartData = (data) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.map((item) => ({
    date: moment(item?.date).format('Do MMM'),
    amount: item?.amount,
    source: item?.source,
  }));

  return chartData;
};

export const prepareExpenseLineChartData = (data) => {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const chartData = sortedData.slice(0,6).map((item) => ({
    date: moment(item?.date).format('Do MMM'),
    amount: item?.amount,
    category: item?.category,
  }));

  return chartData;
}