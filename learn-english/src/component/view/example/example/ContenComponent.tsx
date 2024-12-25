import React, { useRef, useState } from "react";
import { useOutsideClick } from "../../../hook/useOutsideClick";

interface IProps {
  value: string,
  onUpdate: Function,
  className: string,
  dataName?: string,
  placeHoder?: string
}

function ContenComponent({ value, onUpdate, className, dataName, placeHoder }: IProps) {
  const editorRef = useRef<HTMLInputElement | null>(null);
  const ref = useOutsideClick(() => {
    setShowStyle(false)
  });
  const [currentStyle, setCurrentStyle] = useState<string>("");
  const [showStyle, setShowStyle] = useState<boolean>(false)

  const applyStyle = (style: string) => {
    editorRef.current?.focus();
    document.execCommand(style, false);
    if (currentStyle == style) {
      setCurrentStyle("")
    } else {
      setCurrentStyle(style); // Optional: Track current style
    }
  };
  const pasteAsPlainText = (event: any) => {
    event.preventDefault()

    const text = event.clipboardData.getData('text/plain')
    document.execCommand('insertHTML', false, text)
  }


  // const placeHoder: string = "Topic"
  return (
    <>
      <div
        ref={ref}
        style={{
          maxWidth: "100%",
          minWidth: "200px",
          border: "1px dashed #ccc",
          margin: "auto",
          padding: '2px 0px 2px 10px',
          position: "relative",
        }}
        className={className!}
      >
        <div
          style={{
            display: "none"
          }}
          {...showStyle ? {
            style: {
              display: 'block', position: "absolute",
              top: '-25px',
              left: "calc(50% - 50px)",
              backgroundColor: "white"
            }
          } : null}
        >
          <button className="px-2 mx-1 border border-black rounded-sm" {...currentStyle == "bold" ? { style: { backgroundColor: 'red' } } : null} onClick={() => applyStyle("bold")}>B</button>
          <button className="px-2 mx-1 border border-black rounded-sm" {...currentStyle == "italic" ? { style: { backgroundColor: 'red' } } : null} onClick={() => applyStyle("italic")}>I</button>
          <button className="px-2 mx-1 border border-black rounded-sm" {...currentStyle == "underline" ? { style: { backgroundColor: 'red' } } : null} onClick={() => applyStyle("underline")}>U</button>
        </div>
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          data-name={dataName}
          style={{
            outline: 'none'
          }}
          onFocus={(e) => {
            if (placeHoder == e.target.innerText) {
              e.target.innerText = ""
            }
            setShowStyle(true)
          }}
          onBlur={(e) => {
            if (e.target.innerHTML == "<br>" || e.target.innerHTML == "") {
              e.target.innerText = placeHoder ? placeHoder : ""
            }
            onUpdate(e, e.target.innerHTML + '')
          }}
          onPaste={(e: any) => { pasteAsPlainText(e) }}
          onKeyDown={(e) => {
            if (e.ctrlKey && e.keyCode == 66) {
              if (currentStyle == "bold") {
                setCurrentStyle("")
              } else {
                setCurrentStyle("bold")
              }
            }
            if (e.ctrlKey && e.keyCode == 85) {
              if (currentStyle == "underline") {
                setCurrentStyle("")
              } else {
                setCurrentStyle("underline")
              }
            }
            if (e.ctrlKey && e.keyCode == 73) {
              if (currentStyle == "italic") {
                setCurrentStyle("")
              } else {
                setCurrentStyle("italic")
              }
            }

          }}
          dangerouslySetInnerHTML={{ __html: value.length == 0 ? placeHoder! : value }}
        >
        </div>
      </div >
    </>

  );
}

export default ContenComponent;
