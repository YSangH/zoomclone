import { EuiComboBox , EuiFormRow, EuiIcon } from "@elastic/eui";
import React from "react";

function UserField({
  label,
  // isInvalid,
  options,
  onChange,
  selectedOptions,
  singleSelection = false,
  isClearable,
  placeholder,
  isInvalid,
  error,
}: {
  label: string;
  options: any;
  onChange: any;
  selectedOptions: any;
  singleSelection?: { asPlainText: boolean } | boolean;
  isClearable: boolean;
  placeholder: string;
  isInvalid: boolean;
  error: Array<string>;
}) {
  return (
    <EuiFormRow label={label} isInvalid={isInvalid} error={error}>
      <EuiComboBox
        options={options}
        onChange={onChange}
        selectedOptions={selectedOptions}
        singleSelection={singleSelection}
        isClearable={isClearable}
        placeholder={placeholder}
        isInvalid={isInvalid}
      />
    </EuiFormRow>
  );
}

export default UserField;
