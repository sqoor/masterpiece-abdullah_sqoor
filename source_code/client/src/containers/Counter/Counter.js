import React, { Component } from "react";
import { connect } from "react-redux";
import actions from "../../store/actions";

import "../../components/CounterControl/CounterControl.css";

import CounterControl from "../../components/CounterControl/CounterControl";
import CounterOutput from "../../components/CounterOutput/CounterOutput";

class Counter extends Component {
  state = {
    counter: 0
  };

  counterChangedHandler = (action, value) => {
    switch (action) {
      case "inc":
        this.setState(prevState => {
          return { counter: prevState.counter + 1 };
        });
        break;
      case "dec":
        this.setState(prevState => {
          return { counter: prevState.counter - 1 };
        });
        break;
      case "add":
        this.setState(prevState => {
          return { counter: prevState.counter + value };
        });
        break;
      case "sub":
        this.setState(prevState => {
          return { counter: prevState.counter - value };
        });
        break;
      default:
        // jsut to get ride of the warning
        break;
    }
  };

  render() {
    return (
      <div>
        {/* <CounterOutput value={this.state.counter} /> */}
        <CounterOutput value={this.props.ctr} />
        <CounterControl label="Increment" clicked={this.props.onIncrement} />
        <CounterControl label="Decrement" clicked={this.props.onDecrement} />
        <CounterControl label="Add 5" clicked={() => this.props.onAdd(5)} />
        <CounterControl
          label="Subtract 5"
          clicked={() => this.props.onSubtract(5)}
        />

        <hr />
        <button
          className="CounterControl"
          onClick={() => this.props.saveResult(this.props.ctr)}
        >
          Store Result
        </button>
        <ul>
          {this.props.results.map(result => (
            <li
              key={result.id}
              onClick={() => this.props.deleteResult(result.id)}
            >
              {result.value}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ctr: state.ctr.counter,
    results: state.res.results
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onIncrement: () => dispatch({ type: actions.INCREMENT }),
    onDecrement: () => dispatch({ type: actions.DECREMENT }),
    onAdd: value => dispatch({ type: actions.ADD, value }),
    onSubtract: value => dispatch({ type: actions.SUBTRACT, value }),
    saveResult: value => dispatch({ type: actions.SAVE, value }),
    deleteResult: id => dispatch({ type: actions.DELETE, id })
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Counter);
