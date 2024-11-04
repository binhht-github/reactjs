import Docxtemplater from "docxtemplater";
import JSZip from "jszip";
import PizZip from "pizzip";
import React, { useState } from "react";

export default function ReadWord() {
  const [state, setState] = useState({
    original: [],
    edit: [],
    arrayO: [],
    arrayE: [],
  });
  const { original, edit, arrayO, arrayE } = state;

  const showFile = async (e) => {
    console.log("showfile", e);
    e.preventDefault();
    const reader = new FileReader();
    reader.onload = async (e) => {
      const content = e.target.result;
      var doc = new Docxtemplater(new PizZip(content), {
        paragraphLoop: true,
        linebreaks: true,
      });
      doc.setData({
        name: "123",
      });
      var text = doc.getFullText();
      console.log(doc);
      console.log(text.split("Question"));
      doc.render();
    };
    reader.readAsBinaryString(e.target.files[0]);
    // e.preventDefault();
    // const reader = new FileReader();
    // reader.onload = async ({ target: { result } }) => {
    //   /*const reg = /__[A-Z]+(?:_[A-Z]+)*__/gi;
    //         const row = result.split("\n");
    //         let arrayO = result.match(reg);
    //         setState((prev) => ({
    //           ...prev,
    //           original: row,
    //           edit: row,
    //           arrayO,
    //           arrayE: arrayO
    //         }));*/
    //   var zip = new JSZip();
    //   //   zip.loadAsync(result).then(function (zip) {
    //   //     var doc = new Docxtemplater().loadZip(zip);
    //   //     var text = doc.getFullText();
    //   //     console.log(text);
    //   //   });
    // };
    // reader.readAsText(e.target.files[0]);
  };

  // const onChange = (value, label, key) => {
  //     console.log(value, label, key);
  //     console.log(
  //         original.map((e, k) =>
  //             e.includes(label)
  //                 ? value === ""
  //                     ? label
  //                     : e.replace(label, value)
  //                 : edit[k]
  //         )
  //     );
  //     setState((prev) => ({
  //         ...prev,
  //         edit: prev.original.map((e, k) =>
  //             e.includes(label)
  //                 ? value === ""
  //                     ? label
  //                     : e.replace(label, value)
  //                 : prev.edit[k]
  //         ),
  //         arrayE: prev.arrayE.map((e, k) =>
  //             k === key ? (value === "" ? label : value) : e
  //         )
  //     }));
  // };

  console.log(state);

  return (
    <div className="App">
      <div style={{ flex: 1 }}>
        <div style={{}}>
          <input type="file" onChange={(e) => showFile(e)} />
          {arrayO.map((label, key) => (
            <div key={key} style={{ paddingTop: 5 }}>
              {/* <TextField
                                id="outlined-basic"
                                label={label}
                                variant="outlined"
                                size={"small"}
                                onChange={({ target: { value } }) =>
                                    onChange(value, label, key)
                                }
                            /> */}
            </div>
          ))}
        </div>
        <div>
          {edit.map((el, key) => (
            <div key={key}>{el}</div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, backgroundColor: "#4287f5" }}>
        {arrayO.map((el, key) => (
          <div key={key}>{el}</div>
        ))}
      </div>
      <div style={{ flex: 1, backgroundColor: "#f5cb42" }}>
        {arrayE.map((el, key) => (
          <div key={key}>{el}</div>
        ))}
      </div>
    </div>
  );
}
