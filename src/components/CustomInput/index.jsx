import React, { useEffect } from "react";
import "./styles.scss";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useState } from "react";

const CustomInput = ({
  label,
  id,
  type,
  placeholder,
  children,
  register,
  check = false,
  requirementField = true,
  visibility = false,
  className,
  radius,
  height,
  border,
  icon,
  setValue,
  subtitle,
}) => {
  const [isHide, setIsHide] = useState(false);

  const handleHide = () => {
    setIsHide(!isHide);
  };

  useEffect(() => {
    if (check) {
      setValue(id, null);
    }
  }, [check]);

  const isErrorMessage = (children) => {
    if (typeof children === "object") {
      return (
        (children[0] === undefined || children[1] !== undefined) &&
        (children[0] !== undefined || children[1] === undefined)
      );
    } else {
      return children === undefined;
    }
  };

  return (
    <div className={`custom-input ${className ? className : ""} `}>
      <label htmlFor={id} className="custom-input__label">
        {label}
        {requirementField && <span className="field-requirment">*</span>}
      </label>
      <div
        className={` ${type === "file" && "file-input"}
          ${
            check
              ? "custom-input__textfield-disabled"
              : "custom-input__textfield"
          }
          
        `}
      >
        {icon}
        <input
          style={{
            borderRadius: radius ? radius : "",
            height: height ? height : "",
            border: border ? border : "",
          }}
          type={type === "password" ? (isHide ? "text" : "password") : type}
          id={id}
          placeholder={placeholder}
          disabled={check}
          {...register(id)}
        />
        {!check && (
          <p className="custom-input__error">
            {isErrorMessage(children) ? (
              <span
                style={{
                  marginTop: "2px",
                  fontSize: "12px",
                  fontStyle: "italic",
                  color: "#999",
                }}
              >
                {subtitle}
              </span>
            ) : (
              children
            )}
          </p>
        )}
        {visibility && (
          <div className="visibility-icon" onClick={handleHide}>
            {isHide ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomInput;
