'use client'
import React, { useState } from 'react';
import Image from 'next/image'

const bnToEnAlpha = {
    'অ': 'A', 'আ': 'Aa', 'ই': 'I', 'ঈ': 'II', 'উ': 'U', 'ঊ': 'UU', 'ঋ': 'RR',
    'এ': 'E', 'ঐ': 'OI', 'ও': 'O', 'ঔ': 'OU', 'ক': 'k', 'খ': 'kh',
    'গ': 'g', 'ঘ': 'ɡh', 'ঙ': 'NG', 'চ': 'c', 'ছ': 'ch', 'জ': 'j',
    'ঝ': 'jh', 'ঞ': 'NJ', 'ট': 'T', 'ঠ': 'Th', 'ড': 'D', 'ঢ': 'Dh',
    'ণ': 'N', 'ত': 't', 'থ': 'th', 'দ': 'd', 'ধ': 'dh', 'ন': 'n',
    'প': 'p', 'ফ': 'ph', 'ব': 'b', 'ভ': 'bh', 'ম': 'm', 'য': 'J',
    'র': 'r', 'হ': 'H', 'ক্ষ': 'kK', 'ল': 'l', 'শ': 'sh', 'ষ': 'Sh', 'স': 's',
    'ড়': 'rh', 'ঢ়': 'rhh', 'য়': 'y', 'ৎ': 't//', 'ং': 'NNG', 'ঃ': 'h', 'ঁ': 'NN',
    'া': 'a', 'ি': 'i', 'ী': 'ii', 'ু': 'u', 'ূ': 'uu', 'ৃ': 'rR',
    'ে': 'e', 'ৈ': 'oi', 'ৌ': 'ou', '্': ':/', '।': '.'
};

function splitBengaliWord(word) {
    const splitWord = [];
    let i = 0;

    while (i < word.length) {
        if (['ে', 'ি', 'ৈ'].includes(word[i])) {
            if (i > 0) {
                splitWord.pop();
                splitWord.push(word[i]);
                splitWord.push(word[i - 1]);
            } else {
                splitWord.push(word[i]);
            }
        } else if (word[i] === 'ো') {
            if (i > 0) {
                splitWord.pop();
                splitWord.push('ে');
                splitWord.push(word[i - 1]);
                splitWord.push('া');
            } else {
                splitWord.push(word[i]);
            }
        } else if (word[i] === 'ৌ') {
            if (i > 0) {
                splitWord.pop();
                splitWord.push('ে');
                splitWord.push(word[i - 1]);
                splitWord.push('ৌ');
            } else {
                splitWord.push(word[i]);
            }
        } else if (word[i] === '্') {
            if (i < word.length - 1) {
                if (word[i + 1] === 'র') {
                    splitWord.push('R');
                    i += 1;
                } else if (['য', 'ম', 'ল', 'ব'].includes(word[i + 1])) {
                    const mapping = { 'য': 'Y', 'ম': 'M', 'ল': 'L', 'ব': 'W' };
                    splitWord.push(mapping[word[i + 1]]);
                    i += 1;
                } else {
                    splitWord.push('/');
                }
            } else {
                splitWord.push(':/');
            }
        } else {
            splitWord.push(word[i]);
        }
        i += 1;
    }

    return splitWord;
}

function convertBengaliToEnglish(bengaliChar) {
    return bnToEnAlpha[bengaliChar] || bengaliChar;
}

const HomePage = ({ label, value, onChange }) => {

    const [inputText, setInputText] = useState('');
    const [outputText, setOutputText] = useState('');
    const [showCopyButton, setShowCopyButton] = useState(false);
    const [isFirstColumnVisible, setIsFirstColumnVisible] = useState(true);

    const handleInputChange = (event) => {
        setInputText(event.target.value);
    };

    const isBengali = (text) => {
        const bengaliCharacters = /[\u0980-\u09FF]/;
        return bengaliCharacters.test(text);
    };

    const handleProcessClick = () => {
        if (isBengali(inputText)) {
            //   setOutputText(inputText);
            setOutputText(`{\\bng ${splitBengaliWord(inputText).map(char => convertBengaliToEnglish(char)).join('')}}`);
            setInputText('');
            setShowCopyButton(true);
        } else {
            alert('Input text is not in Bengali.');
        }
    };

    const handleCopyButtonClick = () => {
        navigator.clipboard.writeText(outputText);
        alert('Text copied to clipboard!');
    };

    const toggleFirstColumnVisibility = () => {
        setIsFirstColumnVisible(!isFirstColumnVisible);
    };

    const currentYear = new Date().getFullYear();

    const handleDownload = () => {
        const link = document.createElement('a');
        link.href = 'https://drive.google.com/uc?id=1GXMFLtxucIk6qRst9QqAp3JNfaUGP5_F';
        link.target = '_blank';
        link.download = 'Curriculum-Vitae-of-Tonmoy-Talukder.pdf'; // Set the desired filename for the downloaded file
        link.click();
    };

    return (
        <div className=''>
            <div style={{ height: '10%' }}>
                <Image
                    src="https://i.ibb.co/BTZDb4q/bntex.png"
                    alt="Image"
                    width={70}
                    height={70}
                    className="mx-auto"
                />
            </div>
            {isFirstColumnVisible ? (
                <></> ) : (<p className='text-center'>Procedures</p>)}
            <div className='flex justify-center'>
            
                    
                <button
                    className="toggle-button"
                    onClick={toggleFirstColumnVisibility}
                >
                    {isFirstColumnVisible ? (
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 15l7-7 7 7"
                        />
                    </svg>
                    ) : (<svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    )}
                </button>
            </div>
            <div className="flex flex-col md:flex-row" style={{ height: '80%' }}>
                <div className={`md:w-1/5 p-4 bg-gray-200 ${isFirstColumnVisible ? '' : 'hidden'}`}>
                    {/* Content for the first column */}
                    <button className='p-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4' onClick={handleDownload}>Download bangla_commands.tex</button>
                    <br></br>
                    <br></br>
                    <h1 className='text-xl'>Instructions:</h1>
                    <ol className='text-sm'>
                        <li>1{')'} Begin by downloading the file <code className='italic'>bangla_commands.tex</code> from this location.</li>
                        <li>2{')'} Place the <code className='italic'>bangla_commands.tex</code> file in the same folder as the <code className='italic'>main.tex</code> file.</li>
                        <li>3{')'} Insert the command <code className='italic'>\input{'{'}bangla_commands{'}'}</code> after the <code className='italic'>\documentclass</code> command.</li>
                        <li>4{')'} Your setup is now prepared. Convert any Bengali sentence into LaTeX commands here and then copy and paste it into the relevant sections of your LaTeX file.</li>
                    </ol>
                </div>
                <div className="grid justify-items-center md:w-4/5 p-4 bg-gray-300">
                    {/* Content for the second column */}
                    {/* <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            {label}
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="text"
                            value={value}
                            onChange={onChange}
                        />
                    </div> */}
                    <div className="flex flex-col md:flex-row items-center w-full">
                        <div className="md:w-1/2 p-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                Bangla Text
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                placeholder='Write your Bangla Text here...'
                                value={inputText}
                                onChange={handleInputChange}
                                style={{ height: '300px', resize: 'none' }}
                            />
                        </div>
                        <div className="md:w-1/2 p-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2">
                                LaTeX Format
                            </label>
                            <textarea
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                value={outputText}
                                style={{ height: '300px', resize: 'none' }}
                                readOnly
                            />
                        </div>
                    </div>
                    <button
                        className="w-1/4 p-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4 md:mt-0"
                        onClick={handleProcessClick}
                    >
                        Process
                    </button>
                    <br></br>
                    {showCopyButton && (
                        <button
                            className="md:w-1/4 p-4 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4 md:mt-0"
                            onClick={handleCopyButtonClick}
                        >
                            Copy Text
                        </button>
                    )}
                </div>
            </div>
            <div className='text-center pt-1' style={{ height: '10%' }}>
                <p className='text-xl font-semibold text-green-500'>bnTeX: Latex solution for Bangla</p>
                <span className='text-slate-500'>&copy; {currentYear}, Tonmoy Talukder. All rights reserved.</span><br></br>
            </div>
        </div>
    );
};

export default HomePage;