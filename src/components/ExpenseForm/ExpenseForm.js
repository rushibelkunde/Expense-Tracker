
import styles from "./ExpenseForm.module.css";

const ExpenseForm = ({ addExpense, toUpdate , editExpense, editID ,expenseTextInput, expenseAmountInput}) => {
  
  
  // Use the useEffect hook here, to check if an expense is to be updated
  // If yes, the autofill the form values with the text and amount of the expense
  

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let expenseText = expenseTextInput.current.value;
    let expenseAmount = expenseAmountInput.current.value;
    if (parseInt(expenseAmount) === 0) {
      return;
    }


    if(toUpdate){
      const expense = {
        text: expenseText,
        amount: expenseAmount,
        id: editID,
      };

      editExpense(expense)

      clearInput();
      return;

    }
    else{
      const expense = {
        text: expenseText,
        amount: expenseAmount,
        id: new Date().getTime(),
        date: new Date().toLocaleDateString()
      };
      addExpense(expense);
      
      clearInput();
      return;
    }

    

    // Logic to update expense here
  };

  const clearInput = () => {
    expenseAmountInput.current.value = "";
    expenseTextInput.current.value = "";
  };

  
   

  

  

  return (
    <form className={styles.form} onSubmit={onSubmitHandler}>
      {/* Change text to Edit Transaction if an expense is to be updated */}
      <h3>{toUpdate? "Edit Transaction" : "Add new transaction"}</h3>
      <label htmlFor="expenseText">Text</label>
      <input
        id="expenseText"
        className={styles.input}
        type="text"
        placeholder="Enter text..."
        ref={expenseTextInput}
        required
      />
      <div>
        <label htmlFor="expenseAmount">Amount</label>
        <div>(negative - expense,positive-income)</div>
      </div>
      <input
        className={styles.input}
        id="expenseAmount"
        type="number"
        placeholder="Enter amount..."
        ref={expenseAmountInput}
        required
      />
      <button className={styles.submitBtn}>
        {toUpdate? "Edit Transaction" : "Add Transaction"}
      </button>
    </form>
  );
};


export default ExpenseForm;
