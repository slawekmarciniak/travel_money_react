const Result = ({ currency, amount, ratio }) => {
  if (amount <= 0) {
    return (
      <div className="result">
        <span className="result__element">Result: </span>
      </div>
    );
  }
  const result = (amount / ratio).toFixed(2);
  return (
    <div className="result">
      <span className="result__element">Result: </span>
      <span className="result__element">{result}</span>
      <span className="result__element">{currency}</span>
    </div>
  );
};

const Select = ({ currencyName, handleBuyCurrency }) => {
  return (
    <select
      className="selectCurrency input"
      name="currency"
      id="1"
      value={currencyName}
      onChange={handleBuyCurrency}
    >
      <option value="">Select currency to buy</option>
      <option value="EUR">EUR</option>
      <option value="GBP">GBP</option>
      <option value="CHF">CHF</option>
      <option value="USD">USD</option>
    </select>
  );
};

const Input = ({ amount, handleAmount }) => {
  return (
    <input
      className="inputAmountOfMoney input"
      type="number"
      value={amount}
      placeholder="Enter amount of money (PLN)"
      onChange={handleAmount}
    />
  );
};

class Cantor extends React.Component {
  state = {
    currencyName: "",
    amount: "",
    ratio: 0,
  };

  handleBuyCurrency = (e) => {
    console.log(e.target.value);
    this.setState({
      currencyName: e.target.value,
    });

    if (e.target.value !== "") {
      fetch(`https://api.nbp.pl/api/exchangerates/rates/A/${e.target.value}/`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          this.setState({
            ratio: data.rates[0].mid,
          });
        });
    }
  };

  handleAmount = (e) => {
    if (!this.state.currencyName) {
      alert("Please select currency");
    } else if (e.target.value < 0) {
      this.setState({
        amount: 0,
      });
    } else {
      this.setState({
        amount: e.target.value,
      });
    }
  };

  render() {
    return (
      <>
        <div className="wrapper">
          <Select
            currencyName={this.state.currencyName}
            handleBuyCurrency={this.handleBuyCurrency}
          />
          <Input amount={this.state.amount} handleAmount={this.handleAmount} />
          <Result
            currency={this.state.currencyName}
            amount={this.state.amount}
            ratio={this.state.ratio}
          />
        </div>
      </>
    );
  }
}

ReactDOM.render(<Cantor />, document.getElementById("root"));
