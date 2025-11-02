import React, { useState, useEffect } from 'react';
import './RandomCodeGenerator.css'; // Ye CSS file hum agle step main banayenge

// Copy icon
const CopyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
        <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
        <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zM-1 7a.5.5 0 0 1 .5-.5h15a.5.5 0 0 1 0 1H-.5A.5.5 0 0 1-1 7zM5 1.5A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5v1A1.5 1.5 0 0 1 9.5 4h-3A1.5 1.5 0 0 1 5 2.5v-1z"/>
    </svg>
);

const RandomCodeGenerator = () => {
    const [code, setCode] = useState('');
    const [copied, setCopied] = useState(false);
    const [codeLength, setCodeLength] = useState(12); // Default length 12

    // Code generate karne ka function
    const generateCode = () => {
        const length = codeLength; 
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        setCode(result);
        setCopied(false); 
    };

    // Pehli baar load hone par, aur length change hone par
    useEffect(() => {
        generateCode();
    }, [codeLength]); 

    // Copy function
    const copyToClipboard = () => {
        if (!code) return; 

        navigator.clipboard.writeText(code).then(() => {
            setCopied(true);
            setTimeout(() => {
                setCopied(false);
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
        });
    };

    return (
        <div className="code-generator-container">
            <h3>Random Code Generator</h3>
            
            {/* Length Slider */}
            <div className="length-slider-wrapper">
                <label htmlFor="codeLength">Length: {codeLength}</label>
                <input 
                    type="range" 
                    id="codeLength"
                    min="6"    
                    max="32"   
                    value={codeLength}
                    onChange={(e) => setCodeLength(e.target.value)} 
                    className="length-slider"
                />
            </div>

            {/* Code Display Area */}
            <div className="code-display-wrapper">
                <input 
                    type="text" 
                    value={code} 
                    readOnly 
                    className="code-display"
                    placeholder="Generating..."
                />
                <button 
                    onClick={copyToClipboard} 
                    className="copy-btn"
                    title="Copy to clipboard"
                    disabled={copied} 
                >
                    {copied ? 'Copied!' : <CopyIcon />}
                </button>
            </div>

            {/* Generate Button */}
            <button onClick={generateCode} className="generate-btn">
                Generate New Code
            </button>
        </div>
    );
};

export default RandomCodeGenerator;