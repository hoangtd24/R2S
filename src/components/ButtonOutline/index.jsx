import React from "react";
import "./styles.scss";

export default function ButtonOutline({
  className,
  name,
  width,
  height,
  bg,
  outline,
  color,
  fz,
  onClick,
  icon,
  radius,
  padding,
}) {
  return (
    <button
      onClick={onClick || (() => {})}
      className={`btn-outline ${className ? className : ""}`}
      style={{
        width: width ? width : "",
        height: height ? height : "",
        backgroundColor: bg ? bg : "",
        outline: outline ? outline : "",
        color: color ? color : "",
        fontSize: fz ? fz : "",
        borderRadius: radius ? radius : "",
        padding: padding ? padding : "",
      }}
    >
      {icon ? icon : ""}
      {name}
    </button>
  );
}
