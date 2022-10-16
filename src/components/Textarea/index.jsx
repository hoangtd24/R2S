import "./styles.scss";
import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const Textarea = ({
  label,
  id,
  placeholder,
  children = null,
  register,
  check = false,
  requirementField = true,
  setValue,
  defaultValue,
  textAlign,
  isUpdate = false,
  subtitle,
}) => {
  useEffect(() => {
    register(id);
  }, [register]);

  useEffect(() => {
      setValue(id, defaultValue);
  }, [defaultValue]);
  const [showError1, setShowError1] = useState(false);
  const [showError2, setShowError2] = useState(true);

  let errorMessage = " * Bạn phải nhập quyền lợi của ứng viên...";

  const handleOnChange = (content, delta, source, editor) => {
    if (editor.getText()?.length <= 1) {
      setShowError1(true);
      setShowError2(true);
    } else {
      setShowError1(false);
      setShowError2(false);
    }
    setValue(id, content);
  };
  return (
    <>
      <div
        style={{
          textAlign: textAlign ? textAlign : "",
          // hover: hover ? hover : "",
        }}
        className="custom-textarea"
      >
        <label htmlFor={id} className="custom-textarea__label">
          {label}
          {requirementField && <span className="field-requirment">*</span>}
        </label>
        <div
          id={id}
          className={
            check
              ? "custom-input__textarea-disabled"
              : "custom-textarea__textfield"
          }
        >
          <ReactQuill
            theme="snow"
            onChange={handleOnChange}
            placeholder={placeholder}
            defaultValue={defaultValue}
          />
          {check ? null : (
            <p className="custom-textarea__error">
              {(children === null
                ? showError1
                  ? errorMessage
                  : ""
                : showError2
                ? children
                : "") || (
                <span
                  style={{
                    marginTop: "2px",
                    fontSize: "12px",
                    fontStyle: "italic",
                    color: "#555",
                  }}
                >
                  {subtitle}
                </span>
              )}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Textarea;
