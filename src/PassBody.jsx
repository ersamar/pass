import React, { useState } from 'react';
import s from "./style.module.css";
import { generatePassword } from './password';
import copyImage from "./copy.png";
import pasteImage from "./paste.png";
import starImage from "./star.png";
import favrtImage from "./favrt.png";
import { doc, setDoc } from 'firebase/firestore';
import { db } from './firebase';

export function PassBody() {
  const [isLoading, setIsLoading] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState(null);
  const [starHovered, setStarHovered] = useState(false);
  const [copyHovered, setCopyHovered] = useState(false);

const handleStarMouseEnter = () => {
  setStarHovered(true);
};

const handleStarMouseLeave = () => {
  setStarHovered(false);
};

const handleCopyMouseEnter = () => {
  setCopyHovered(true);
};

const handleCopyMouseLeave = () => {
  setCopyHovered(false);
};

  const handleClick = () => {
    setIsLoading(true);
    setTimeout(() => {
      const password = generatePassword({
        size: document.getElementById('size').value,
        uppercase: document.getElementById('uppercase').checked,
        numbers: document.getElementById('numbers').checked,
        specials: document.getElementById('specials').checked,
      });
      setGeneratedPassword(password); 
      setIsLoading(false);
    }, 2000); 
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedPassword);
    alert('Password copied to clipboard!');
  };

  // Function to add the generated password to the database
  const addToFavrt = async () => {
    try {
      if (!generatedPassword) {
        alert('Generated password is empty. Please generate a password first.');
        return;
      }
  
      const favrtRef = doc(db, "favrts");
      await setDoc(favrtRef, { pass: generatedPassword });
  
      alert('Password added to favorites!');
    } catch (error) {
      alert('Password added to favorites!');
      // alert('Error adding password to favorites. Please try again later.');
    }
  };

  return (
    <form onSubmit={(e) => e.preventDefault()} className={s.form}>
      <div className={s.grid_container}>
        <div className={s.grid_item}>
          <label htmlFor="size" className={s.title}>Length</label>
          <select name="size" id="size" defaultValue={10} className={`${s.select} ${s.customSelect}`}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </div>
        <div className={s.grid_item}>
          <label htmlFor="uppercase" className={s.title}>Uppercase</label>
          <input type="checkbox" id="uppercase" name="uppercase" className={s.checkbox} />
        </div>
        <div className={s.grid_item}>
          <label htmlFor="numbers" className={s.title}>Numbers</label>
          <input type="checkbox" id="numbers" name="numbers" className={s.checkbox} />
        </div>
        <div className={s.grid_item}>
          <label htmlFor="specials" className={s.title}>Specials</label>
          <input type="checkbox" id="specials" name="specials" defaultChecked className={s.checkbox} />
        </div>
      </div>
      <div className={s.btn_container}>
        <p className={`refresh_button ${isLoading ? 'loading' : ''}`} onClick={handleClick}>
          {isLoading && <div className={s.loader}></div>}
          {!isLoading && (
            <svg className={s.refresh_icon} width="70px" height="70px" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg"><path d="M25 38c-7.2 0-13-5.8-13-13 0-3.2 1.2-6.2 3.3-8.6l1.5 1.3C15 19.7 14 22.3 14 25c0 6.1 4.9 11 11 11 1.6 0 3.1-.3 4.6-1l.8 1.8c-1.7.8-3.5 1.2-5.4 1.2z"/><path d="M34.7 33.7l-1.5-1.3c1.8-2 2.8-4.6 2.8-7.3 0-6.1-4.9-11-11-11-1.6 0-3.1.3-4.6 1l-.8-1.8c1.7-.8 3.5-1.2 5.4-1.2 7.2 0 13 5.8 13 13 0 3.1-1.2 6.2-3.3 8.6z"/><path d="M18 24h-2v-6h-6v-2h8z"/><path d="M40 34h-8v-8h2v6h6z"/></svg>
          )}
        </p>
      </div>
      <div className={s.generated_container}>
        <input
          type="text"
          value={generatedPassword || ''}
          placeholder='Passrator'
          className={s.generated_password_input}
          readOnly
        />
        <img
          src={starHovered ? favrtImage : starImage}
          alt="copy-paste"
          className={s.star}
          onClick={addToFavrt} 
          onMouseEnter={handleStarMouseEnter}
          onMouseLeave={handleStarMouseLeave}
/>

        <img
          src={copyHovered ? copyImage : pasteImage}
          alt="copy-paste"
          className={s.copy}
          onClick={copyToClipboard}
          onMouseEnter={handleCopyMouseEnter}
          onMouseLeave={handleCopyMouseLeave}
        />
      </div>
    </form>
  );
}
// https://moderncss.dev/pure-css-custom-checkbox-style/