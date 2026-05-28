import React, { useState } from 'react';
import './CodeTester.css';

const defaultCode = `<!DOCTYPE html>
<html>
<body>
  <h1>Hello, World!</h1>
  <p>Edit this code to test your HTML/CSS/JS.</p>
</body>
</html>`;

export default function CodeTester() {
  const [code, setCode] = useState(defaultCode);
  const [output, setOutput] = useState('');
  const [activeTab, setActiveTab] = useState('html');

  const runCode = () => {
    setOutput(code);
  };

  const clearCode = () => {
    setCode('');
    setOutput('');
  };

  const insertTemplate = (template) => {
    setCode(template);
  };

  const templates = {
    html: `<!DOCTYPE html>
<html>
<body>
  <h1>Hello, World!</h1>
  <p>Edit this code to test your HTML/CSS/JS.</p>
</body>
</html>`,
    react: `<!DOCTYPE html>
<html>
<body>
  <div id="root"></div>
  <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
  <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
  <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
  <script type="text/babel">
    function App() {
      return <h1>Hello from React!</h1>;
    }
    ReactDOM.createRoot(document.getElementById('root')).render(<App />);
  </script>
</body>
</html>`,
    canvas: `<!DOCTYPE html>
<html>
<body>
  <canvas id="canvas" width="300" height="200"></canvas>
  <script>
    const ctx = document.getElementById('canvas').getContext('2d');
    ctx.fillStyle = '#667eea';
    ctx.fillRect(20, 20, 260, 160);
    ctx.fillStyle = '#fff';
    ctx.font = '20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('Hello Canvas!', 150, 110);
  </script>
</body>
</html>`
  };

  return (
    <div className="code-tester">
      <h2 className="code-title">Code Tester</h2>
      <p className="code-subtitle">Write HTML/CSS/JS and preview it live.</p>

      <div className="code-toolbar">
        <div className="template-btns">
          {Object.keys(templates).map((key) => (
            <button key={key} className="template-btn" onClick={() => insertTemplate(templates[key])}>
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>
        <div className="action-btns">
          <button className="run-btn" onClick={runCode}>Run</button>
          <button className="clear-btn" onClick={clearCode}>Clear</button>
        </div>
      </div>

      <div className="code-editor">
        <textarea
          className="code-textarea"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          spellCheck={false}
        />
      </div>

      <div className="code-output">
        <div className="output-label">Output</div>
        {output ? (
          <iframe
            className="output-frame"
            title="code-output"
            srcDoc={output}
            sandbox="allow-scripts allow-modals"
          />
        ) : (
          <div className="output-empty">Click "Run" to see the result.</div>
        )}
      </div>
    </div>
  );
}
