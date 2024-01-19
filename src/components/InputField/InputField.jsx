import React from "react";
import "./InputField.css";

export default function InputField({
  isEdit,
  value,
  name,
  id,
  disable,
  onChange,
  required,
  maxlength,
  minlength,
  max,
  ...props
}) {
  const Placeholder = props.placeholder ? props.placeholder : "Enter Text";
  const Type = props.type ? props.type : "text";
  const cat = props.cat ? props.cat : Placeholder;

  return (
    <>
      <label className="input-main-style">
        <div className="if-txt">{cat}</div>
        <input
          type={Type}
          name={name}
          id={id}
          maxLength={maxlength}
          minLength={minlength}
          disabled={disable}
          defaultValue={value}
          onChange={onChange}
          required={required}
          placeholder={Placeholder}
          max={max}
          style={{
            borderRadius: props.radius ? props.radius : "10px",
            width: props.width ? props.width : "",
            border: props.isErr ? "1px solid red" : "",
            borderColor: props.isErr ? "red;" : "",
            backgroundColor: props.isErr ? "white" : "white",
          }}
          className="if-input"
        />
        {props.isErr ? (
          <div
            className="err-txt"
            style={{
              display: "flex",
              width: "150px",
              position: "absolute",
            }}
          >
            {props.errorMsg}
          </div>
        ) : null}
      </label>
    </>
  );
}
