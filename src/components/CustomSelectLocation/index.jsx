import React from "react";

const CustomSelectLocation = React.forwardRef(
  (
    {
      register,
      label,
      options,
      id,
      className,
      children,
      placeholder,
      requirementField = true,
      onChange
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
            onChange={(e) => onChange(e.target.value)}
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

export default CustomSelectLocation;
