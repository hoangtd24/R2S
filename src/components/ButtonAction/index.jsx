import "./styles.scss";

const ButtonAction = ({
  onClick,
  height,
  width,
  borderTop,
  borderRight,
  borderBottom,
  borderLeft,
  amountDemands = "",
  amountApplications = "",
  name,
  icon,
  fontSize,
  color = "",
  disabled = false,
  onMouseEnter,
}) => {
  return (
    <div
      className={`button-action__wrapper ${disabled ? "disabled" : ""}`}
      style={{
        width: width,
        height: height,
        // border: border ? border : "",
        borderTop: borderTop ? borderTop : undefined,
        borderRight: borderRight ? borderRight : undefined,
        borderBottom: borderBottom ? borderBottom : undefined,
        borderLeft: borderLeft ? borderLeft : undefined,
        color: color,
      }}
    >
      <div
        onMouseEnter={onMouseEnter}
        onClick={onClick}
        className="button-action__container"
      >
        {icon}
        <p className="button-action__name" style={{ fontSize: fontSize }}>
          {amountApplications || amountDemands !== ""
            ? `${amountApplications}/${amountDemands} `
            : ""}
          {`${name}`}
        </p>
      </div>
    </div>
  );
};

export default ButtonAction;
