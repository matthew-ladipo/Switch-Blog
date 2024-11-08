import React from "react";
import style from  './Backdrop.module.css'

const BcakDrop = (props) => {
  return <div className={style.backdrop} onClick={props.onCancel}>  </div>;
};

export default BcakDrop;
