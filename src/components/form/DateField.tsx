import React from "react";
import { EuiDatePicker, EuiFormRow } from "@elastic/eui";
import moment from "moment";

function DateField({
  selected,
  setStartDate,
}: {
  selected: moment.Moment;
  setStartDate: React.Dispatch<React.SetStateAction<moment.Moment>>;
}) {
  return (
    <EuiFormRow label="Date">
      <EuiDatePicker
        selected={selected}
        onChange={(date) => setStartDate(date!)}
      />
    </EuiFormRow>
  );
}

export default DateField;
