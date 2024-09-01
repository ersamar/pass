import React from 'react';
import s from "./style.module.css";
import lock from "./lock.png";

export function PassHeader() {
  return (
    <div className={s.root}>
      <img src={lock} alt="lock" className={s.icon} />
      <div className={s.line}>
        <h1 className={s.header}>Passrator</h1>
        <p className={s.para}>Create strong and secure passwords to keep your account safe online.</p>
      </div>
    </div>
  );
}
