import { useState, useReducer, useRef } from "react";
import ExpenseForm from "./components/ExpenseForm/ExpenseForm";
import ExpenseInfo from "./components/ExpenseInfo/ExpenseInfo";
import ExpenseList from "./components/ExpenseList/ExpenseList";
import "./App.css";

const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case "ADD_EXPENSE": {
      localStorage.setItem("expenses",JSON.stringify([payload.expense, ...state.expenses]))
      return {
        expenses: [payload.expense, ...state.expenses]
        
      };
    }
    case "REMOVE_EXPENSE": {
      localStorage.setItem("expenses",JSON.stringify(state.expenses.filter((expense) => expense.id !== payload.id)))
      return {
        expenses: state.expenses.filter((expense) => expense.id !== payload.id)
      };
    }

    case "UPDATE_EXPENSE":{
      let index = -1
      let array = [...state.expenses]
      array.forEach((item,i)=>{
        if(item.id==payload.editID){
          index = i
        }
      })
      array[index] = payload.expense

      localStorage.setItem("expenses",JSON.stringify(array))
      return {
        expenses: array
      };
    }
    default:
      return state;
  }
};



function App() {

  if(localStorage.getItem("expenses")==null){
    var expenseList = []
    localStorage.setItem("expenses",JSON.stringify(expenseList))
    expenseList = JSON.parse(localStorage.getItem("expenses"))
  }
  else{
    expenseList = JSON.parse(localStorage.getItem("expenses"))
  }


  

  


  const expenseTextInput = useRef()
  const expenseAmountInput = useRef()
  const [state, dispatch] = useReducer(reducer, { expenses: expenseList });
  const [toUpdate , setUpdate] = useState(false)
  const [editID , setID] = useState("")

  
  

  const addExpense = (expense) => {
    dispatch({ type: "ADD_EXPENSE", payload: { expense } });
  };

  const deleteExpense = (id) => {
    dispatch({ type: "REMOVE_EXPENSE", payload: { id } });
  };


  const changeExpenseToUpdate = (id) => { 
    let index = -1
    state.expenses.forEach((item,i)=>{
      if(item.id==id){
        index = i
      }
    })
    expenseTextInput.current.value = state.expenses[index].text
    expenseAmountInput.current.value =  state.expenses[index].amount
    setUpdate(true)
    setID(id)

    // dispatch({ type: "UPDATE_EXPENSE", payload: { id } });
  }

  const editExpense = (expense)=>{

    dispatch({ type: "UPDATE_EXPENSE", payload: { expense, editID: expense.id } });
    setUpdate(false)

  }

  return (
    <>
      <h2 className="mainHeading">Expense Tracker</h2>
      <div className="App">
      <ExpenseForm
        expenseTextInput={expenseTextInput}
        expenseAmountInput={expenseAmountInput}
         addExpense={addExpense}
         toUpdate={toUpdate}
         editExpense= {editExpense}
         editID={editID} />
      
        <div className="expenseContainer">
        
        
          <ExpenseInfo expenses={state.expenses} />
          <ExpenseList
            expenses={state.expenses}
            deleteExpense={deleteExpense}
            toUpdate={toUpdate}
            changeExpenseToUpdate = {changeExpenseToUpdate}
            
          />
        </div>
      </div>
    </>
  );
}

export default App;
