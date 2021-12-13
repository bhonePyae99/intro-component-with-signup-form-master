const Input = ({ name, type, className, label, errors, ...rest }) => {
  if (errors[name]) {
    className += " is-invalid";
  }
  return (
    <div className="input">
      <input
        {...rest}
        name={name}
        type={type}
        className={className}
        id={name}
        placeholder={label}
      />
      {errors && (
        <div
          style={{ display: "flex", justifyContent: "flex-end" }}
          className="invalid-feedback"
        >
          <small>{errors[name]}</small>
        </div>
      )}
    </div>
  );
};

export default Input;
