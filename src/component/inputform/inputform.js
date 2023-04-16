import React from 'react';

class InputForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      year: '',
      month: '',
      day: '',
      time_of_day: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const inputData = {
      year: this.state.year,
      month: this.state.month,
      day: this.state.day,
      time_of_day: this.state.time_of_day,
    };
    // TODO: send inputData to backend using HTTP request
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Year:
          <input type="text" name="year" value={this.state.year} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Month:
          <input type="text" name="month" value={this.state.month} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Day:
          <input type="text" name="day" value={this.state.day} onChange={this.handleChange} />
        </label>
        <br />
        <label>
          Time of day:
          <input
            type="text"
            name="time_of_day"
            value={this.state.time_of_day}
            onChange={this.handleChange}
          />
        </label>
        <br />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default InputForm;
