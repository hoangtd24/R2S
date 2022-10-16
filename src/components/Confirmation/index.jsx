import Button from "../Button";
import ButtonOutline from "../ButtonOutline";
import "./styles.scss";

const Confirmation = ({
  text,
  nameBtnYes,
  nameBtnNo,
  setOpen,
  func,
  image,
  className,
}) => {
  const handleClose = () => setOpen(false);
  return (
    <div className={`confirmation__wrapper ${className ? className : ""}`}>
      <img src="https://cdn-icons-png.flaticon.com/512/1162/1162410.png" alt="" className="confirmation__img" />
      <h1 className="confirmation__title">{text}</h1>
      <div className="confirmation__btns">
        <Button
          onClick={func}
          className="confirmation__btn-close"
          name={nameBtnYes}
          fz="14px"
          outline="1.5px solid #DEDEDE"
        />
        {nameBtnNo && (
          <ButtonOutline
            className="confirmation__btn-cancel"
            onClick={handleClose}
            name={nameBtnNo}
            bg="#F3F4F6"
            color="#111111"
            radius="4px"
            fz="14px"
            outline="1.5px solid #DEDEDE"
          />
        )}
      </div>
    </div>
  );
};

export default Confirmation;
