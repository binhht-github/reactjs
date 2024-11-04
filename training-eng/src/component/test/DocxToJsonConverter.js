import React, { useState } from "react";
import mammoth from "mammoth";
import Parser from "html-react-parser";
import { topicArray } from "../view/example/Topics";

const convertID = ["A", "B", "C", "D", "E", "F"];

const DocxToJsonConverter = () => {
  const [jsonOutput, setJsonOutput] = useState([]);
  const [topic, setTopic] = useState([]);
  const [question, setQuestions] = useState([{}]);
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();

      // Convert the .docx content to HTML or plain text
      var options = {
        styleMap: ["b => strong", "u => u"],
      };
      mammoth
        .convertToHtml({ arrayBuffer: arrayBuffer }, options)
        .then((result) => {
          console.log();

          const resultArray = splitToBlocksRegex(result.value);
          let array = [];
          resultArray.forEach((e) => {
            array.push(removePTags(e));
          });
          console.log(array);

          // console.log(testArray);
          // lọc topic
          setTopic(validateTopic(array));

          // tìm index question

          setQuestions(validateQuestion(array));
          // setQuestions(questionArray);

          // setJsonOutput(result.value.split("<p>"));
        })
        .catch((err) => {
          console.error("Error reading .docx file", err);
        });
      // mammoth
      //   .convertToHtml({ arrayBuffer: arrayBuffer }, options)
      //   .then((result) => {
      //     console.log(splitToBlocksRegex(result.value));

      //     // chia array theo <p> vs lọc bỏ </p>
      //     const resultArray = result.value.split("<p>");
      //     const array = [];
      //     resultArray.map((ef) => {
      //       if (ef.search("</p>")) {
      //         array.push(ef.slice(0, ef.length - 4));
      //       }
      //     });

      //     // console.log(testArray);
      //     // lọc topic
      //     setTopic(validateTopic(array));

      //     // tìm index question

      //     // setQuestions(validateQuestion(array));
      //     // setQuestions(questionArray);

      //     // setJsonOutput(result.value.split("<p>"));
      //   })
      //   .catch((err) => {
      //     console.error("Error reading .docx file", err);
      //   });
      //   mammoth
      //     .extractRawText({ arrayBuffer: arrayBuffer }, options)
      //     .then((result) => {
      //       //   console.log(result.value.split("\n"));
      //       //   console.log(result.value);
      //       //   console.log(result);

      //       const text = result.value; // Extracted text
      //       const json = { content: text }; // Convert text to JSON
      //       //   setJsonOutput(JSON.stringify(json, null, 2)); // Format JSON with indentation

      //       //   setJsonOutput(result.value.split("\n")); // Format JSON with indentation
      //     })
      //     .catch((err) => {
      //       console.error("Error reading .docx file", err);
      //     });
    }
  };

  const validateTopic = (array) => {
    // let regex = /mark the letter A, B, C, or D on your answer sheet /i;
    // const topicArray = array.filter((item) => {
    //   if (item.search(regex) >= 0) {
    //     return item;
    //   }
    // });
    // return topicArray;
    let regexTopic = /mark the letter A, B, C, or D on your answer sheet /i;
    const indexTopic = [];
    array.filter((item, index) => {
      if (item.search(regexTopic) >= 0) {
        indexTopic.push({ index: index, item: item });
      }
    });

    let topicArray = [];
    indexTopic.map((item, index) => {
      if (index < indexTopic.length - 1) {
        let itemTopic = array.slice(item.index, indexTopic[index + 1].index);
        topicArray.push(removeHTMLTags(itemTopic[0]));
      }
      if (index == indexTopic.length - 1) {
        let lastTopic = array.slice(
          indexTopic[indexTopic.length - 1].index,
          array.length
        );
        topicArray.push(removeHTMLTags(lastTopic[0]));
      }
    });

    return topicArray;
  };

  const validateQuestion = (array) => {
    let regexQuestions = /question/i;
    const indexQuestiuons = [];
    array.filter((item, idx) => {
      if (
        item.search(regexQuestions) >= 0 &&
        item.search(regexQuestions) < 900
      ) {
        indexQuestiuons.push({ index: idx, it: item });
      }
    });

    // lọc question
    const questionArray = [];
    indexQuestiuons.map((item, idx) => {
      if (idx < indexQuestiuons.length - 1) {
        let itemQuestion = array.slice(
          item.index,
          indexQuestiuons[idx + 1].index
        );
        questionArray.push({
          title: itemQuestion.filter((e) => {
            if (
              e.search("A.") == -1 &&
              e.search("B.") == -1 &&
              e.search("C.") == -1 &&
              e.search("D.") == -1 &&
              e.search(
                /mark the letter A, B, C, or D on your answer sheet /i
              ) == -1
            ) {
              return e;
            }
          }),
          answer: validateAnswer(
            itemQuestion.filter((e) => {
              if (
                (e.search("A.") >= 0 ||
                  e.search("B.") >= 0 ||
                  e.search("C.") >= 0 ||
                  e.search("D.") >= 0) &&
                e.search(
                  /mark the letter A, B, C, or D on your answer sheet /i
                ) == -1
              ) {
                return e;
              }
            })
          ),
          dapandung: 1,
          code: "NA-1",
          type: "",
        });
      }

      if (idx == indexQuestiuons.length - 1) {
        let itemLast = array.slice(
          indexQuestiuons[indexQuestiuons.length - 1].index,
          array.length
        );
        questionArray.push({
          title: itemLast.filter((e) => {
            if (
              e.search("A.") == -1 &&
              e.search("B.") == -1 &&
              e.search("C.") == -1 &&
              e.search("D.") == -1 &&
              e.search(
                /mark the letter A, B, C, or D on your answer sheet /i
              ) == -1
            ) {
              return e;
            }
          }),
          answer: validateAnswer(
            itemLast.filter((e) => {
              if (
                (e.search("A.") >= 0 ||
                  e.search("B.") >= 0 ||
                  e.search("C.") >= 0 ||
                  e.search("D.") >= 0) &&
                e.search(
                  /mark the letter A, B, C, or D on your answer sheet /i
                ) == -1
              ) {
                return e;
              }
            })
          ),
        });
      }
    });
    return questionArray;
  };

  const validateAnswer = (answer) => {
    let answerIndex = [];
    let answerResult = [];
    let convertToText = removeMultipleSpaces(answer.join(""));

    [...convertToText].map((e, i) => {
      if (e == "A" || e == "B" || e == "C" || e == "D") {
        answerIndex.push(i);
      }
    });

    answerIndex.map((e2, i2) => {
      if (i2 < answerIndex.length - 1) {
        answerResult.push(
          convertToText.slice(answerIndex[i2] + 2, answerIndex[i2 + 1])
        );
      }
      if (i2 == answerIndex.length - 1) {
        answerResult.push(
          convertToText.slice(answerIndex[i2] + 2, convertToText.length - 1)
        );
      }
    });

    return answerResult;
  };

  function removeMultipleSpaces(str) {
    return str.replace(/\s+/g, " ");
  }
  function removeHTMLTags(str) {
    // Sử dụng RegEx để tìm và thay thế tất cả các thẻ HTML
    return str.replace(/<[^>]*>/g, "");
  }
  function removePTags(htmlString) {
    return htmlString.replace(/<p[^>]*>|<\/p>/g, "");
  }

  function splitToBlocks(html) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, "text/html");

    // Lấy tất cả các thẻ block (bạn có thể tùy chỉnh selector)
    const blocks = doc.querySelectorAll("div, p, h1, h2, h3, h4, h5, h6");

    // Chuyển đổi NodeList thành mảng và lấy nội dung HTML của mỗi thẻ
    return Array.from(blocks).map((block) => block.outerHTML);
  }
  function splitToBlocksRegex(html) {
    // Biểu thức chính quy đơn giản để tìm các thẻ block
    // const regex = /<(\w+)[^>]*>(.*?)<\/\1>/g;
    const regex = /<(\w+)>(.*?)<\/\1>/g;
    const matches = [];
    let match;

    while ((match = regex.exec(html)) !== null) {
      matches.push(match[0]);
    }

    return matches;
  }

  return (
    <div>
      <h2>Convert .docx to JSON</h2>
      <input type="file" accept=".docx" onChange={handleFileChange} />
      <button
        className="bg-red-500 rounded-lg  p-3"
        onClick={() => {
          console.log(topic);
          console.log(question);
          // console.log(jsonOutput);
          console.log(topicArray);

          let regex = "Mark the letter A, B, C, or D on your answer sheet";

          String.prototype.equals = function (str) {
            return this.toLowerCase();
          };
        }}
      >
        show result
      </button>
      {/* <div>{text}</div> */}
      {jsonOutput && (
        <>
          <div>
            {question.map((item, index) => {
              return (
                <div key={index} className="block">
                  <div>
                    {item.title
                      ? item.title.map((e, i) => {
                          return <span key={i + e}>{Parser(e)} </span>;
                        })
                      : null}
                  </div>
                  <div className="">
                    {item.answer
                      ? item.answer.map((e, i) => {
                          return (
                            <span key={i + e}>
                              <strong>{convertID[i]}.</strong> {Parser(e)}
                            </span>
                          );
                        })
                      : null}
                  </div>
                </div>
              );
            })}
          </div>
          {/* ================== */}
        </>
      )}
    </div>
  );
};

export default DocxToJsonConverter;

// let regexQuestions = /question/i;
//           const indexQuestiuons = [];
//           array.filter((item, idx) => {
//             if (
//               item.search(regexQuestions) >= 0 &&
//               item.search(regexQuestions) < 900
//             ) {
//               indexQuestiuons.push({ index: idx, it: item });
//             }
//           });

//           // lọc question
//           const questionArray = [];
//           indexQuestiuons.map((item, idx) => {
//             if (idx < indexQuestiuons.length - 1) {
//               let itemQuestion = array.slice(
//                 item.index,
//                 indexQuestiuons[idx + 1].index
//               );
//               questionArray.push({
//                 title: itemQuestion.filter((e) => {
//                   if (
//                     e.search("A.") == -1 &&
//                     e.search("B.") == -1 &&
//                     e.search("C.") == -1 &&
//                     e.search("D.") == -1 &&
//                     e.search(
//                       /mark the letter A, B, C, or D on your answer sheet /i
//                     ) == -1
//                   ) {
//                     return e;
//                   }
//                 }),
//                 answer: validateAnswer(
//                   itemQuestion.filter((e) => {
//                     if (
//                       (e.search("A.") >= 0 ||
//                         e.search("B.") >= 0 ||
//                         e.search("C.") >= 0 ||
//                         e.search("D.") >= 0) &&
//                       e.search(
//                         /mark the letter A, B, C, or D on your answer sheet /i
//                       ) == -1
//                     ) {
//                       return e;
//                     }
//                   })
//                 ),
//               });
//             }

//             if (idx == indexQuestiuons.length - 1) {
//               let itemLast = array.slice(
//                 indexQuestiuons[indexQuestiuons.length - 1].index,
//                 array.length
//               );
//               questionArray.push({
//                 title: itemLast.filter((e) => {
//                   if (
//                     e.search("A.") == -1 &&
//                     e.search("B.") == -1 &&
//                     e.search("C.") == -1 &&
//                     e.search("D.") == -1 &&
//                     e.search(
//                       /mark the letter A, B, C, or D on your answer sheet /i
//                     ) == -1
//                   ) {
//                     return e;
//                   }
//                 }),
//                 answer: validateAnswer(
//                   itemLast.filter((e) => {
//                     if (
//                       (e.search("A.") >= 0 ||
//                         e.search("B.") >= 0 ||
//                         e.search("C.") >= 0 ||
//                         e.search("D.") >= 0) &&
//                       e.search(
//                         /mark the letter A, B, C, or D on your answer sheet /i
//                       ) == -1
//                     ) {
//                       return e;
//                     }
//                   })
//                 ),
//               });
//             }
//           });
