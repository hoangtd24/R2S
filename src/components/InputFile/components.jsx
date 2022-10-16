import "./styles.scss";
const BASEURL = process.env.REACT_APP_API
export const ImageUpload = ({
  text = "Chỉ hỗ trợ file JPG, PNG. Kích thước tối đa 512KB.",
  img,
  imageCurrent
}) => {
  return (
    <>
      <div className="image-upload">
        <img
          src={
            img === ""
              ? (imageCurrent ? `${imageCurrent}` : "https://img.icons8.com/color/180/000000/image.png") 
              : img
          }
          alt=""
          className="image-upload__img"
        />
        {img === "" && (
          <p className="image-upload__text">
            <span style={{ color: "red" }}>*</span>
            {text}
          </p>
        )}
      </div>
    </>
  );
};

export const FileUpload = ({
  text = "Chỉ hỗ trợ file DOCX, PDF.",
  fileName,
}) => {
  return (
    <>
      <div className="file-upload">
        {!fileName && (
          <img
            src={"https://img.icons8.com/clouds/100/000000/file.png"}
            alt=""
            className="file-upload__img"
          />
        )}
        <p className={`${fileName && "selected"} file-upload__text`}>
          <span style={{ color: "red" }}>{!fileName && "*"}</span>
          {fileName === "" ? text : fileName}
        </p>
      </div>
    </>
  );
};
