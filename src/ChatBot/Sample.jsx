import React, { useState } from 'react';
import promptSamples from '../ChatBot/data/general.json';

// 💬 Format bot message with bold, list, and line breaks
const formatText = (text) => {
  return text
    .replace(/^\*([IVXLCDM]+\..*?)\*/gm, "<h3>$1</h3>")
    .replace(/^\s*\*(.*?)\*:/gm, "<strong>$1:</strong>")
    .replace(/^\s*\*(.*?)$/gm, "<li>$1</li>")
    .replace(/(<li>[\s\S]*?<\/li>)/g, "<ul>$1</ul>")
    .replace(/\*(.*?)\*/g, "<strong>$1</strong>")
    .replace(/\n{2,}/g, "<br/><br/>")
    .replace(/\n/g, "<br/>");
};

const Sample = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleDropdown = (index) => {
    setOpenIndex(prev => prev === index ? null : index);
  };

  return (
    <div className="fixed top-0 left-0 w-screen h-screen bg-white z-50 overflow-auto" style={{ padding: '2rem', width: '100vw', margin: '0 auto' }}>
      <h1 style={{fontSize:"5rem" , display:"flex" , justifyContent: "center"}}>Welcome to Sample Page 🧪</h1>

      <div style={{ marginTop: '2rem' }}>
        
       
        {promptSamples.map((sample, index) => (
          <div key={index} style={{ marginBottom: '1rem' }}> 
          {sample.title && (
              <h1 style={{ margin: '2rem', color: '#555' , fontSize:'4rem'}}>{sample.title}</h1>
            )}

          <div
            key={index}
            style={{
              border: '1px solid #ccc',
              borderRadius: '8px',
              marginBottom: '1rem',
              padding: '1rem',
              backgroundColor: '#f9f9f9',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
              overflowWrap: 'break-word'
            }}
          >

            <button
              onClick={() => toggleDropdown(index)}
              style={{
                width: '100%',
                textAlign: 'left',
                background: 'transparent',
                border: 'none',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                padding: '0.5rem 0',
                color: '#333'
              }}
            >
              📨 {sample.prompt}
            </button>

            {openIndex === index && (
              <div
                style={{
                  marginTop: '0.75rem',
                  backgroundColor: '#444',
                  color: '#fff',
                  padding: '1rem',
                  borderRadius: '6px',
                  whiteSpace: 'pre-wrap',
                }}
                dangerouslySetInnerHTML={{ __html: formatText(sample.output) }}
              />
            )}
          </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Sample;
