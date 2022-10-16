import React from "react";
import "./styles.scss";

const CustomSelect = React.forwardRef(
  (
    {
      register,
      label,
      options,
      dispatch = () => {},
      id,
      className,
      children,
      placeholder,
      requirementField = true,
    },
    ref
  ) => {
    // render option
    const renderSelectOption = () => {
      if (options) {
        return options.map((item) => {
          return (
            <option value={item.id} key={item.id}>
              {item.name}
            </option>
          );
        });
      }
    };

    return (
      <>
        <div className={`custom-select__wrapper ${className ? className : ""}`}>
          <h1 className="custom-select__label">
            {label}
            {requirementField && <span className="field-requirment">*</span>}
          </h1>
          <select
            id={id}
            name={id}
            {...register(id)}
            className="select"
            required
          >
            <option hidden value="">
              {placeholder}
            </option>
            {renderSelectOption()}
          </select>
          <p className="custom-input__error">{children}</p>
        </div>
      </>
    );
  }
);

export default CustomSelect;
