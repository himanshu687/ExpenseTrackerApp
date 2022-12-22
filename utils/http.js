import axios from "axios";

const ApiClient = axios.create({
  baseURL: "https://expensetrackerapp-2ec8d-default-rtdb.firebaseio.com",
});

export const storeExpense = async (expenseData) => {
  const response = await ApiClient.post("/expenses.json", expenseData);
  console.log("POST Request made");
  const id = response.data.name;
  return id;
};

export const fetchExpenses = async () => {
  const response = await ApiClient.get("/expenses.json");
  console.log("GET Request made");

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }

  return expenses;
};

export const updateExpense = (id, expenseData) => {
  console.log("UPDATE Request made");
  return ApiClient.put(`/expenses/${id}.json`, expenseData);
};

export const deleteExpense = (id) => {
  console.log("DELETE Request made");
  return ApiClient.delete(`/expenses/${id}.json`);
};
