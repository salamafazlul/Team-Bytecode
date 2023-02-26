import React from "react";
import './IncrementDecrement.css';

class IncrementDecrement extends React.Component
{
    state = { counter: 0 };

    handleDecrement = () => {
        let value = this.state.counter - 1;

        this.setState({counter: value});
    }

    handleIncrement = () => {
        let value = this.state.counter + 1;

        this.setState({counter: value});
    }

    handleChange = (e) => {
        let value = (e.target.value ? parseInt(e.target.value) : 0);

        this.setState({counter: value});
    }

    render()
    {
        return (
            <div className="increment-decrement">
                <button className="count-btn count-down" type="button" onClick={this.handleDecrement}>-</button>
                <input type="number" name="counter" className="counter" value={this.state.counter} onChange={this.handleChange} />
                <button className="count-btn count-up" type="button" onClick={this.handleIncrement}>+</button>
            </div>
        );
    }
};

export default IncrementDecrement;