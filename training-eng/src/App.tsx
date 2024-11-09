import React from 'react';
import logo from './logo.svg';
import './App.css';
import Vocabulary from './component/view/Vocabulary';
import Hearder from './component/Hearder';
import NavigationBar from './component/NavigationBar';
import { Route, RouterProvider, Routes } from 'react-router-dom';
import Listening from './component/view/Listening';
import Reading from './component/view/Reading';
import Example from './component/view/example/Example';
import Menu from './component/Menu';
import WordReader from './WordReader';
import Grammar from './component/view/Grammar';
import ReadWord from './component/test/ReadWord';
import DocxToJsonConverter from './component/test/DocxToJsonConverter';

function App() {
  return (
    <div>
      <ReadWord />
    </div>
    // <div className='h-screen w-screen relative'>
    //   <Routes>
    //     <Route path='/' element={<Vocabulary></Vocabulary>}></Route>
    //     <Route path='/vocabulary' element={<Vocabulary></Vocabulary>}></Route>
    //     <Route path='/reading' element={<Reading></Reading>}></Route>
    //     <Route path='/listening' element={<Listening></Listening>}></Route>
    //     <Route path='/grammar' element={<Grammar></Grammar>}></Route>
    //     <Route path='/example' element={<Example></Example>}></Route>
    //   </Routes>
    //   <Menu />
    //   <NavigationBar></NavigationBar>
    // </div>
  );
}

export default App;











// import React, { useState } from "react";
// import mammoth from "mammoth";
// import Parser from "html-react-parser";
// import { topicArray } from "../view/example/Topics";

// const convertID = ["A", "B", "C", "D", "E", "F"];

// const DocxToJsonConverter = () => {
//   const [jsonOutput, setJsonOutput] = useState([]);
//   const [topic, setTopic] = useState([]);
//   const [question, setQuestions] = useState([{}]);
//   const handleFileChange = async (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const arrayBuffer = await file.arrayBuffer();

//       // Convert the .docx content to HTML or plain text
//       var options = {
//         styleMap: ["b => strong", "u => u"],
//       };
//       mammoth
//         .convertToHtml({ arrayBuffer: arrayBuffer }, options)
//         .then((result) => {
//           const resultArray = splitToBlocksRegex(result.value);
//           let array = [];
//           resultArray.forEach((e) => {
//             array.push(removePTags(e));
//           });

//           setTopic(validateTopic(array));
//         })
//         .catch((err) => {
//           console.error("Error reading .docx file", err);
//         });
//       // mammoth
//       //   .convertToHtml({ arrayBuffer: arrayBuffer }, options)
//       //   .then((result) => {
//       //

//       //     // chia array theo <p> vs lọc bỏ </p>
//       //     const resultArray = result.value.split("<p>");
//       //     const array = [];
//       //     resultArray.map((ef) => {
//       //       if (ef.search("</p>")) {
//       //         array.push(ef.slice(0, ef.length - 4));
//       //       }
//       //     });

//       //     //
//       //     // lọc topic
//       //     setTopic(validateTopic(array));

//       //     // tìm index question

//       //     // setQuestions(validateQuestion(array));
//       //     // setQuestions(questionArray);

//       //     // setJsonOutput(result.value.split("<p>"));
//       //   })
//       //   .catch((err) => {
//       //     console.error("Error reading .docx file", err);
//       //   });
//       //   mammoth
//       //     .extractRawText({ arrayBuffer: arrayBuffer }, options)
//       //     .then((result) => {
//       //       //
//       //       //
//       //       //

//       //       const text = result.value; // Extracted text
//       //       const json = { content: text }; // Convert text to JSON
//       //       //   setJsonOutput(JSON.stringify(json, null, 2)); // Format JSON with indentation

//       //       //   setJsonOutput(result.value.split("\n")); // Format JSON with indentation
//       //     })
//       //     .catch((err) => {
//       //       console.error("Error reading .docx file", err);
//       //     });
//     }
//   };

//   const validateTopic = (array) => {
//     // let regex = /mark the letter A, B, C, or D on your answer sheet /i;
//     // const topicArray = array.filter((item) => {
//     //   if (item.search(regex) >= 0) {
//     //     return item;
//     //   }
//     // });
//     // return topicArray;
//     let regexTopic = /mark the letter A, B, C, or D on your answer sheet /i;
//     const indexTopic = [];
//     array.filter((item, index) => {
//       if (item.search(regexTopic) >= 0) {
//         indexTopic.push({ index: index, item: item });
//       }
//     });

//     const findCode = (item) => {
//       let code = topicArray.find((topic) => item.indexOf(topic.topic) >= 0);
//       if (code) {
//         return code.type;
//       }
//       return "";
//     };
//     let topicArray1 = [];
//     let questionsArray = [];
//     indexTopic.map((item, index) => {
//       if (index < indexTopic.length - 1) {
//         let itemTopic = array.slice(item.index, indexTopic[index + 1].index);
//         topicArray1.push(removeHTMLTags(itemTopic[0]));
//         questionsArray.push({
//           item: itemTopic.slice(itemTopic.length - (itemTopic.length - 1)),
//           type: findCode(itemTopic[0]),
//         });
//       }
//       if (index == indexTopic.length - 1) {
//         let lastTopic = array.slice(
//           indexTopic[indexTopic.length - 1].index,
//           array.length
//         );
//         topicArray1.push(removeHTMLTags(lastTopic[0]));
//         questionsArray.push({
//           item: lastTopic.slice(lastTopic.length - (lastTopic.length - 1)),
//           type: findCode(lastTopic[0]),
//         });
//         // questionsArray.push(
//         //   // array.slice(item.index + 1, indexTopic[index + 1].index - 1)
//         //   ...lastTopic.slice(lastTopic.length - (lastTopic.length - 1))
//         // );
//       }
//     });
//     let topicReturn = [];
//     topicArray1.forEach((item) => {
//       topicArray.forEach((t) => {
//         if (item.indexOf(t.topic) >= 0) {
//           topicReturn.push({
//             type: t.type,
//             topic: t.topic,
//             note: "",
//           });
//         } else {
//           //add  new topic
//           //
//           //
//         }
//       });
//     });
//     validateQuestion(questionsArray);
//     // setQuestions(validateQuestion(questionsArray));

//     return topicReturn;
//   };

//   const validateQuestion = (arryTemp) => {
//     let regexQuestions = /question/i;
//     const indexQuestiuons = [];
//     let questionsArraySlice = [];
//     arryTemp.map((item, index) => {
//       item.item.forEach((i) => {
//         questionsArraySlice.push({ item: i, type: item.type });
//       });
//     });

//     questionsArraySlice.filter((item, idx) => {
//       if (
//         item.item.search(regexQuestions) >= 0 &&
//         item.item.search(regexQuestions) < 900
//       ) {
//         indexQuestiuons.push({ index: idx, it: item, code: item.type });
//       }
//     });
//     // // lọc question
//     const questionArray = [];

//     indexQuestiuons.map((item, idx) => {
//       if (idx < indexQuestiuons.length - 1) {
//         let itemQuestion = questionsArraySlice.slice(
//           item.index,
//           indexQuestiuons[idx + 1].index
//         );

//         questionArray.push({
//           title: validateTitle(
//             itemQuestion.filter((e) => {
//               if (
//                 e.item.indexOf("A.") == -1 &&
//                 e.item.indexOf("B.") == -1 &&
//                 e.item.indexOf("C.") == -1 &&
//                 e.item.indexOf("D.") == -1 &&
//                 e.item.search(
//                   /mark the letter A, B, C, or D on your answer sheet /i
//                 ) == -1
//               ) {
//                 return e;
//               }
//             })
//           ),
//           answer: validateAnswer(
//             itemQuestion.filter((e) => {
//               if (
//                 (e.item.indexOf("A.") >= 0 ||
//                   e.item.indexOf("B.") >= 0 ||
//                   e.item.indexOf("C.") >= 0 ||
//                   e.item.indexOf("D.") >= 0) &&
//                 e.item.search(
//                   /mark the letter A, B, C, or D on your answer sheet /i
//                 ) == -1
//               ) {
//                 return e;
//               }
//             })
//           ),
//           dapandung: 1,
//           code: itemQuestion[0].type,
//           type: "",
//         });
//       }

//       // if (idx == indexQuestiuons.length - 1) {
//       //   let itemLast = questionsArraySlice.slice(
//       //     indexQuestiuons[indexQuestiuons.length - 1].index,
//       //     questionsArraySlice.length
//       //   );

//       //   questionArray.push({
//       //     title: validateTitle(
//       //       itemLast.filter((e) => {
//       //         if (
//       //           e.indexOf("A.") == -1 &&
//       //           e.indexOf("B.") == -1 &&
//       //           e.indexOf("C.") == -1 &&
//       //           e.indexOf("D.") == -1 &&
//       //           e.search(
//       //             /mark the letter A, B, C, or D on your answer sheet /i
//       //           ) == -1
//       //         ) {
//       //           return e;
//       //         }
//       //       })
//       //     ),
//       //     answer: validateAnswer(
//       //       itemLast.filter((e) => {
//       //         if (
//       //           (e.indexOf("A.") >= 0 ||
//       //             e.indexOf("B.") >= 0 ||
//       //             e.indexOf("C.") >= 0 ||
//       //             e.indexOf("D.") >= 0) &&
//       //           e.search(
//       //             /mark the letter A, B, C, or D on your answer sheet /i
//       //           ) == -1
//       //         ) {
//       //           return e;
//       //         }
//       //       })
//       //     ),
//       //     dapandung: 1,
//       //     code: "NA-1",
//       //     type: "",
//       //   });
//       // }
//     });
//     console.log(questionArray);

//     return questionArray;
//   };

//   const validateTitle = (str) => {
//     console.log(str);

//     // return strTemp.slice(strTemp.indexOf(":") + 11, strTemp.length - 1);
//     return "str";
//   };
//   const validateAnswer = (answer) => {
//     // console.log(answer);

//     let answerIndex = [];
//     let answerResult = [];
//     let answerTemp = [];
//     answer.forEach((e) => {
//       answerTemp.push(e.item);
//     });
//     let convertToText = removeMultipleSpaces(answerTemp.join(""));

//     [...convertToText].map((e, i) => {
//       if (
//         e + [...convertToText][i + 1] == "A." ||
//         e + [...convertToText][i + 1] == "B." ||
//         e + [...convertToText][i + 1] == "C." ||
//         e + [...convertToText][i + 1] == "D."
//       ) {
//         answerIndex.push(i);
//       }
//     });

//     answerIndex.map((e2, i2) => {
//       if (i2 < answerIndex.length - 1) {
//         answerResult.push(
//           convertToText.slice(answerIndex[i2] + 2, answerIndex[i2 + 1])
//         );
//       }
//       if (i2 == answerIndex.length - 1) {
//         answerResult.push(
//           convertToText.slice(answerIndex[i2] + 2, convertToText.length - 1)
//         );
//       }
//     });

//     return answerResult;
//   };

//   function removeMultipleSpaces(str) {
//     return str.replace(/\s+/g, " ");
//   }
//   function removeHTMLTags(str) {
//     // Sử dụng RegEx để tìm và thay thế tất cả các thẻ HTML
//     return str.replace(/<[^>]*>/g, "");
//   }
//   function removePTags(htmlString) {
//     return htmlString.replace(/<p[^>]*>|<\/p>/g, "");
//   }

//   function splitToBlocks(html) {
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(html, "text/html");

//     // Lấy tất cả các thẻ block (bạn có thể tùy chỉnh selector)
//     const blocks = doc.querySelectorAll("div, p, h1, h2, h3, h4, h5, h6");

//     // Chuyển đổi NodeList thành mảng và lấy nội dung HTML của mỗi thẻ
//     return Array.from(blocks).map((block) => block.outerHTML);
//   }
//   function splitToBlocksRegex(html) {
//     // Biểu thức chính quy đơn giản để tìm các thẻ block
//     // const regex = /<(\w+)[^>]*>(.*?)<\/\1>/g;
//     const regex = /<(\w+)>(.*?)<\/\1>/g;
//     const matches = [];
//     let match;

//     while ((match = regex.exec(html)) !== null) {
//       matches.push(match[0]);
//     }

//     return matches;
//   }
//   // so sanh theo phan tram % => chua lam
//   String.prototype.equiValent = function (str) {
//     let percent = 0;
//     [...this].forEach((text) => {});
//     return this.toLowerCase() + str;
//   };

//   return (
//     <div>
//       <h2>Convert .docx to JSON</h2>
//       <input type="file" accept=".docx" onChange={handleFileChange} />
//       <button
//         className="bg-red-500 rounded-lg  p-3"
//         onClick={() => {
//           let text = "ABCSDSASDA";
//           console.log(text.equiValent(" gfhdfghfg"));
//           console.log(question);
//           for (let i = 0; i < 10; i++) {
//             if (i < 5) {
//               console.log(i);
//               return;
//             }
//           }
//         }}
//       >
//         show result
//       </button>
//       {/* <div>{text}</div> */}
//       {jsonOutput && (
//         <>
//           <div>
//             {question.map((item, index) => {
//               return (
//                 <div key={index} className="block">
//                   <div>
//                     {/* <span>{item.title} </span> */}
//                     {item.title
//                       ? item.title.map((e, i) => {
//                           return <span key={i + e}>{Parser(e)} </span>;
//                         })
//                       : null}
//                   </div>
//                   <div className="">
//                     {item.answer
//                       ? item.answer.map((e, i) => {
//                           return (
//                             <span key={i + e}>
//                               <strong>{convertID[i]}.</strong> {Parser(e)}
//                             </span>
//                           );
//                         })
//                       : null}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//           {/* ================== */}
//         </>
//       )}
//     </div>
//   );
// };

// export default DocxToJsonConverter;

// // let regexQuestions = /question/i;
// //           const indexQuestiuons = [];
// //           array.filter((item, idx) => {
// //             if (
// //               item.search(regexQuestions) >= 0 &&
// //               item.search(regexQuestions) < 900
// //             ) {
// //               indexQuestiuons.push({ index: idx, it: item });
// //             }
// //           });

// //           // lọc question
// //           const questionArray = [];
// //           indexQuestiuons.map((item, idx) => {
// //             if (idx < indexQuestiuons.length - 1) {
// //               let itemQuestion = array.slice(
// //                 item.index,
// //                 indexQuestiuons[idx + 1].index
// //               );
// //               questionArray.push({
// //                 title: itemQuestion.filter((e) => {
// //                   if (
// //                     e.search("A.") == -1 &&
// //                     e.search("B.") == -1 &&
// //                     e.search("C.") == -1 &&
// //                     e.search("D.") == -1 &&
// //                     e.search(
// //                       /mark the letter A, B, C, or D on your answer sheet /i
// //                     ) == -1
// //                   ) {
// //                     return e;
// //                   }
// //                 }),
// //                 answer: validateAnswer(
// //                   itemQuestion.filter((e) => {
// //                     if (
// //                       (e.search("A.") >= 0 ||
// //                         e.search("B.") >= 0 ||
// //                         e.search("C.") >= 0 ||
// //                         e.search("D.") >= 0) &&
// //                       e.search(
// //                         /mark the letter A, B, C, or D on your answer sheet /i
// //                       ) == -1
// //                     ) {
// //                       return e;
// //                     }
// //                   })
// //                 ),
// //               });
// //             }

// //             if (idx == indexQuestiuons.length - 1) {
// //               let itemLast = array.slice(
// //                 indexQuestiuons[indexQuestiuons.length - 1].index,
// //                 array.length
// //               );
// //               questionArray.push({
// //                 title: itemLast.filter((e) => {
// //                   if (
// //                     e.search("A.") == -1 &&
// //                     e.search("B.") == -1 &&
// //                     e.search("C.") == -1 &&
// //                     e.search("D.") == -1 &&
// //                     e.search(
// //                       /mark the letter A, B, C, or D on your answer sheet /i
// //                     ) == -1
// //                   ) {
// //                     return e;
// //                   }
// //                 }),
// //                 answer: validateAnswer(
// //                   itemLast.filter((e) => {
// //                     if (
// //                       (e.search("A.") >= 0 ||
// //                         e.search("B.") >= 0 ||
// //                         e.search("C.") >= 0 ||
// //                         e.search("D.") >= 0) &&
// //                       e.search(
// //                         /mark the letter A, B, C, or D on your answer sheet /i
// //                       ) == -1
// //                     ) {
// //                       return e;
// //                     }
// //                   })
// //                 ),
// //               });
// //             }
// //           });

