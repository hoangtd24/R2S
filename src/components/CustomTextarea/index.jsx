import React, { useState } from "react";
import "./styles.scss";;

const CustomTextarea = ({
  label,
  id,
  type,
  placeholder,
  children,
  register,
  contents,
  check = false,
  requirementField = true,
}) => {

  const [sampleFormActive, setSampleFormActive] = useState("")

  return (
    <div className="custom-textarea">
      <label htmlFor={id} className="custom-textarea__label">
        {label}
        {requirementField && <span className="field-requirment">*</span>}
      </label>
      <div
        style={{height:"150px"}}
        className={
          check
            ? "custom-input__textarea-disabled"
            : "custom-textarea__textfield"
        }
      >
        <textarea
          type={type}
          id={id}
          disabled={check}
          placeholder={placeholder}
          {...register(id)}
          rows={5}
          value={contents}
          onChange={() => setSampleFormActive(contents)}
        />
        {check ? null : (
          <p className="custom-textarea__error">
            {children || (
              <span
                style={{
                  marginTop: "2px",
                  fontSize: "12px",
                  fontStyle: "italic",
                  color: "#999",
                }}
              >
                (Tối đa 1500 ký tự)
              </span>
            )}
          </p>
        )}
      </div>
    </div>
  );
};

export default CustomTextarea;
