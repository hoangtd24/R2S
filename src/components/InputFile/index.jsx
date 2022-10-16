import { useState } from "react";
import { FileUpload, ImageUpload } from "./components";
import "./styles.scss";

const InputFile = ({
  label,
  id,
  format = "not image",
  children,
  register,
  unregister = null,
  defaultValue,
  requirementField = true,
  className,
  radius,
  height,
  border,
  icon,
  top,
  setValue,
  imageCurrent
}) => {
  let accept;
  let text;
  switch (format) {
    case "image":
      accept = ".png, .jpg, .jpeg, .gif, .bmp";
      text = "Chỉ hỗ trợ file .jpg .png và kích thước tối đa 512KB.";
      break;
    case "doc":
      accept = ".docx";
      text = "Chỉ hỗ trợ file .docx.";
      break;
    case "pdf":
      accept = ".pdf";
      text = "Chỉ hỗ trợ file .pdf.";
      break;
    case "excel":
      accept = ".xlsx";
      text = "Chỉ hỗ trợ file .xlxs"
      break;
    default: // all of file (except image)
      accept = ".docx, .pdf, .xlsx";
      text = "Chỉ hỗ trợ file .docx, .pdf, .xlxs";
      break;
  }

  const [imgSrc, setImgSrc] = useState("");
  const [fileName, setFileName] = useState("");

  const handlePreviewFile = (e) => {
    if (e.target.files && e.target.files[0]) {
      let imgFile = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (x) => {
        setImgSrc(x.target.result);
      };
      reader.readAsDataURL(imgFile);
      setValue(id, imgFile);
      setFileName(imgFile.name);
    }
  };

  let component;
  switch (format) {
    case "image":
      component = <ImageUpload imageCurrent={imageCurrent} text={text} img={imgSrc} />;
      break;
    default: //word or pdf or excel
      component = (
        <FileUpload text={text} format={format} fileName={fileName} />
      );
  }

  return (
    <div className={`custom-input ${className ? className : ""} `}>
      <label htmlFor={id} className="custom-input__label">
        {label}
        {requirementField && <span className="field-requirment">*</span>}
        {component}
      </label>
      {<p className="custom-input__error">{children}</p>}
      <div
        className={` ${"file-input"}
          ${"custom-input__textfield"}
        `}
      >
        {icon}
        <input
          style={{
            borderRadius: radius ? radius : "",
            height: height ? height : "",
            border: border ? border : "",
          }}
          id={id}
          type="file"
          name={id}
          {...register(id)}
          onChange={handlePreviewFile}
          accept={accept}
        />
      </div>
    </div>
  );
};

export default InputFile;
