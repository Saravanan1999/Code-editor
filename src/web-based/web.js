import React , { useState, useEffect } from "react";
import Editor from './Editor'
import useLocalStorage from './hooks/useLocalStorage'
const handleLangChange=()=> {
  var selector = document.getElementById("filename");
  if(selector.value == "HTML"){
     var con = document.querySelectorAll(".editor-container"); 
     con[0].style.display="block";
     con[1].style.display = "none";
     con[2].style.display = "none";
    
  }
  if(selector.value == "CSS"){
    var con = document.querySelectorAll(".editor-container"); 
     con[0].style.display="none";
     con[1].style.display = "block";
     con[2].style.display = "none";
     
     
  }
  if(selector.value == "JS"){
    var con = document.querySelectorAll(".editor-container"); 
     con[0].style.display="none";
    con[1].style.display = "none";
     con[2].style.display = "block";
    
  }
}
const options = [
  { value: "HTML", label: "index.html" },
  { value: "CSS", label: "index.css" },
  { value: "JS", label: "index.js" }
  
];
function Web() {
  const [html, setHtml] = useLocalStorage('html', '')
  const [css, setCss] = useLocalStorage('css', '')
  const [js, setJs] = useLocalStorage('js', '')
  const [srcDoc, setSrcDoc] = useState('')
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
          <style>${css}</style>
          <script>${js}</script>
        </html>
      `)
    }, 250)

    return () => clearTimeout(timeout)
  }, [html, css, js])

  return ( 
  <>
  <div id="header">
      <h2>Code Editor</h2>
  </div>
  <div className="pane top-pane">
    
    <div className="panes" >
        <h3>File Explorer</h3>
        <select id="filename" size="3" onChange={option => handleLangChange()}>
          <option value="HTML" selected>index.html</option>
          <option value="CSS">index.css</option>
          <option value="JS">index.js</option>
           
        </select> 
    </div>
    <Editor
      language= "xml"
      displayName="index.html"
      value={html}
      className = "html"
      id="HTML"
      onChange={setHtml}
    />
    <Editor
      language="css"
      displayName="index.css"
      value={css}
      id = "CSS"
      onChange={setCss}
    />
    <Editor
      language="javascript"
      displayName="index.js"
      value={js}
      id = "JS"
      onChange={setJs}
    />
    
  </div>
  <div className="pane">
    <iframe
      srcDoc={srcDoc}
      title="output"
      sandbox="allow-scripts"
      frameBorder="0"
      width="100%"
      height="100%"
    />
  </div>
</>
  )
}

export default Web;
