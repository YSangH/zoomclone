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
}: {
  label: string;
  // isInvalid: boolean;
  options: any;
  onChange: any;
  selectedOptions: any;
  singleSelection?: { asPlainText: boolean } | boolean;
  isClearable: boolean;
  placeholder: string;
}) {
  return (
    <EuiFormRow label={label}>
      <EuiComboBox
        options={options}
        onChange={onChange}
        selectedOptions={selectedOptions}
        singleSelection={singleSelection}
        isClearable={isClearable}
        placeholder={placeholder}
        renderOption={(option) => (
          <div>
            <EuiIcon type="arrowDown" />
            {option.label}
          </div>
          )}
      />
    </EuiFormRow>
  );
}

export default UserField;
