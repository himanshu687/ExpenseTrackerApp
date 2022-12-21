import { createContext, useReducer } from "react";

export const DUMMY_EXPENSES = [
  {
    id: "e1",
    description: "A pair of shoes",
    amount: 899,
    date: new Date("2021-12-19"),
  },
  {
    id: "e2",
    description: "A pair of trousers",
    amount: 1599,
    date: new Date("2022-01-05"),
  },
  {
    id: "e3",
    description: "Some Bananas",
    amount: 50,
    date: new Date("2021-12-01"),
  },
  {
    id: "e4",
    description: "A Book",
    amount: 1240,
    date: new Date("2022-02-19"),
  },
  {
    id: "e5",
    description: "Chinese food",
    amount: 240,
    date: new Date("2022-02-18"),
  },
  {
    id: "e6",
    description: "A pair of shoes",
    amount: 899,
    date: new Date("2022-12-19"),
  },
  {
    id: "e7",
    description: "A pair of trousers",
    amount: 1599,
    date: new Date("2022-12-20"),
  },
  {
    id: "e8",
    description: "Some Bananas",
    amount: 50,
    date: new Date("2022-12-15"),
  },
  {
    id: "e9",
    description: "A Book",
    amount: 1240,
    date: new Date("2022-02-19"),
  },
  {
    id: "e10",
    description: "Chinese food",
    amount: 240,
    date: new Date("2022-02-18"),
  },
  {
    id: "e11",
    description: "Traveller Bag",
    amount: 1600,
    date: new Date("2022-12-18"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: ({ id }) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

const expensesReducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id }, ...state];

    case "UPDATE":
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );

      const updatableExpense = state[updatableExpenseIndex];
      const updatedItem = { ...updatableExpense, ...action.payload.data };
      const updatedExpenses = [...state];
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;

    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);

    default:
      return state;
  }
};

const ExpenseContextProvider = ({ children }) => {
  const [expensesState, dispatch] = useReducer(expensesReducer, DUMMY_EXPENSES);

  const addExpense = (expenseData) => {
    dispatch({ type: "ADD", payload: expenseData });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "DELETE", payload: id });
  };

  const updateExpense = (id, expenseData) => {
    dispatch({ type: "UPDATE", payload: { id, data: expenseData } });
  };

  const value = {
    expenses: expensesState,
    addExpense,
    deleteExpense,
    updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

export default ExpenseContextProvider;
