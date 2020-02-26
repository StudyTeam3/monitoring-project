import React from "react";
import moment from "moment";
import "../css/DatePicker.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
import "react-day-picker/lib/style.css";
import { connect } from "react-redux";
import { formatDate, parseDate } from "react-day-picker/moment";
import { fromAction, toAction } from "../store/modules/filterModules";

class DatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.handleFromChange = this.handleFromChange.bind(this);
    this.handleToChange = this.handleToChange.bind(this);
    this.fromAction = this.props.fromAction.bind(this);
    this.toAction = this.props.toAction.bind(this);
    this.state = {
      from: undefined,
      to: undefined
    };
  }

  showFromMonth() {
    const { from, to } = this.state;
    if (!from) {
      return;
    }
    if (moment(to).diff(moment(from), "months") < 2) {
      this.to.getDayPicker().showMonth(from);
    }
  }

  handleFromChange(from) {
    // Change the from date and focus the "to" input field
    this.setState({ from });
    this.fromAction(from);
  }

  handleToChange(to) {
    this.setState({ to }, this.showFromMonth,  this.toAction(to));
  }

  render() {
    const { from, to } = this.state;
    const modifiers = { start: from, end: to };
    return (
      <div className="InputFromTo">
        <DayPickerInput
          value={from}
          placeholder="Start Time"
          format="YYYY-MM-DD"
          formatDate={formatDate}
          parseDate={parseDate}
          dayPickerProps={{
            selectedDays: [from, { from, to }],
            disabledDays: { after: to },
            toMonth: to,
            modifiers,
            numberOfMonths: 2,
            onDayClick: () => this.to.getInput().focus()
          }}
          onDayChange={this.handleFromChange}
        />{" "}
        —{" "}
        <span className="InputFromTo-to">
          <DayPickerInput
            ref={el => (this.to = el)}
            value={to}
            placeholder="End Time"
            format="YYYY-MM-DD"
            formatDate={formatDate}
            parseDate={parseDate}
            dayPickerProps={{
              selectedDays: [from, { from, to }],
              disabledDays: { before: from },
              modifiers,
              month: from,
              fromMonth: from,
              numberOfMonths: 2
            }}
            onDayChange={this.handleToChange}
          />
        </span>
      </div>
    );
  }
}

export default connect(
  null,
  dispatch => ({
    fromAction: (data) => {
      dispatch(fromAction(data));
    },
    toAction: (data) => {
      dispatch(toAction(data));
    }
  })
)(DatePicker);
