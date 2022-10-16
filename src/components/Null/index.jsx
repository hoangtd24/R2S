import "./styles.scss";

const Null = ({ text, height, fs, fw, image, className }) => {
  return (
    <div
      style={{
        height: height ? height : "",
        fontSize: fs ? fs : "",
      }}
      className={`null__wrapper ${className}`}
    >
      {image && <img className="null__img" src={image} alt="" />}
      <h1 style={{ fontWeight: fw ? fw : "" }}>{text}</h1>
    </div>
  );
};

export default Null;
