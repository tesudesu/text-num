import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { letterToNum, numToLetter, encrypt, decrypt } from './solver.js';
import { quote } from './quote.js';

const Ed = () => {
  const [isEncrypt, setIsEncrypt] = useState(1);
  const [displace, setDisplace] = useState(0);
  const [input, setInput] = useState(quote);
  const [output, setOutput] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const res = encrypt(quote, 0);
    setOutput(res);
  }, []);

  const handleInput = (e) => {
    setInput(e.target.value);
    setError('');
  }

  const handleEncrypt = () => {
    setIsEncrypt(1);
  }

  const handleDecrypt = () => {
    setIsEncrypt(0);
  }

  const handleDisplace = (e) => {
    setDisplace(e.target.value);
    setError('');
  }

  const handleConvert = () => {
    if (!/^(-)?\d+$/.test(displace)) {
      setError('Must be an integer');
      setOutput('');
      return;
    }
    if (isEncrypt === 1) {
      const res = encrypt(input, displace);
      setOutput(res);
    } else {
      const res = decrypt(input, displace);
      setOutput(res);
    }
  }

  const enterListener = (e) => {
    if (e.key === 'Enter') {
      handleConvert();
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(output);
  }

  let colorScheme1 = isEncrypt === 1 ? '#646f60' : '#f3ffef';
  let colorScheme2 = isEncrypt === 1 ? '#f3ffef' : '#646f60';

  let outputIsPresent;
  if (output) {
    outputIsPresent = (
      <button id='copyToClipboard' onClick={handleCopy} title='Copy'><img src="./copy.svg" alt="Copy" />
      </button>
    );
  }

  return (
    <div id='container'>
      <main>
        <h1>&#40;simple&#41; number encrypter & decrypter</h1>
        <h4>where A = 1, B = 2 ...</h4>

        <p id='select'>
          <button id='encrypt' style={{ backgroundColor: colorScheme1, color: colorScheme2 }} onClick={handleEncrypt}>Encrypt</button>
          <button id='decrypt' style={{ backgroundColor: colorScheme2, color: colorScheme1 }} onClick={handleDecrypt}>Decrypt</button>
        </p>
        
        <textarea id='textbox' value={input} onChange={handleInput} onKeyDown={enterListener} maxLength='5000' />
        
        <div id='offset-enter-container'>
          <div id='offset'>
            <div>
              <label id='offset-label'>Offset: </label>
              <input id='offset-box' type='number' step='1' value={displace} onChange={handleDisplace} onKeyDown={enterListener} />
            </div>
            <div id='error'>
              {error}
            </div>
            <div id='offset-example'>
              E.g. If offset is 1, the letter A corresponds with the number 2 &#40;instead of 1&#41;.<br />If offset is -2, the letter A corresponds with the number 25.
            </div>
          </div>
          <div>
            <button id='enter' onClick={handleConvert}>ENTER</button>
          </div>
        </div>

        <div id='output-container'>
          {outputIsPresent}
          <div id='output'>
            {output}
          </div>
        </div>
      </main>

      <footer>
        <a href='mailto:witty.opposum@gmail.com'>© Te Su</a>
      </footer>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Ed />);