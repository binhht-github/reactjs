import React, { useState } from "react";
import mammoth from "mammoth";
import Parser from "html-react-parser";
import { topicArray } from "../view/example/Topics";
import { ref, set } from "firebase/database";
import { database } from "../../firebase";

const convertID = ["A", "B", "C", "D", "E", "F"];

const ReadWord = () => {
  const [topic, setTopic] = useState([]);
  const [question, setQuestions] = useState([{}]);
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const arrayBuffer = await file.arrayBuffer();
      var options = {
        styleMap: ["b => strong", "u => u"],
      };
      mammoth
        .convertToHtml({ arrayBuffer: arrayBuffer }, options)
        .then((result) => {
          const exampleID = generateRandomId();
          const arraySplit = splitToBlocksRegex(result.value);
          let arrayRemovePTag = [];
          arraySplit.forEach((e) => {
            arrayRemovePTag.push(removeMultipleSpaces(removePTags(e)));
          });
          console.log(arraySplit);
          console.log(
            "============================================================================="
          );

          // tìm index các topic vs questions
          let indexArrayRemovePTag = [];
          const regexTopic =
            /mark the letter A, B, C, or D on your answer sheet /i;
          const regexQuestions = /question/i;
          arrayRemovePTag.map((item, index) => {
            if (removeHTMLTags(item).search(regexTopic) >= 0) {
              console.log({
                type: "Topic",
                item: item,
                index: index,
              });

              indexArrayRemovePTag.push({
                type: "Topic",
                item: item,
                index: index,
              });
            }
            if (
              item.search(regexQuestions) >= 0 &&
              item.search(regexQuestions) < 10 // check xem có ở vị trí đầu k
            ) {
              console.log({
                type: "Questions",
                item: item,
                index: index,
              });

              indexArrayRemovePTag.push({
                type: "Questions",
                item: item,
                index: index,
              });
            }
            // if (
            //   item.search(regexQuestions) < 0 &&
            //   item.search(regexQuestions) >= 10 &&
            //   item.search(regexTopic) < 0
            // ) {
            //   indexArrayRemovePTag.push({
            //     type: "Undefined",
            //     item: item,
            //     index: index,
            //   });
            // }
          });

          // lọc topic vs question  ra khỏi arrayRemovePTag
          let arrayTopic = [];
          let arrayQuestion = [];
          const findCode = (item) => {
            let code = topicArray.find(
              (topic) => item.indexOf(topic.topic) >= 0
            );
            if (code) {
              return code.type;
            }
            return "";
          };
          let indexTopicTemp = 0;
          let idTopicTemp = 0;
          indexArrayRemovePTag.map((item, index) => {
            // tìm từ vị trí đàu tiên đến vị trí áp chót (lenght-1)
            if (index < indexArrayRemovePTag.length - 1) {
              // lọc topic
              if (item.type == "Topic") {
                idTopicTemp = generateRandomId();
                indexTopicTemp = item.index;
                if (indexArrayRemovePTag[index + 1].type != "Questions") {
                  return;
                }
                arrayTopic.push({
                  id: idTopicTemp,
                  type: findCode(arrayRemovePTag[item.index]),
                  topic: arrayRemovePTag[item.index],
                  note: arrayRemovePTag.slice(
                    item.index + 1,
                    indexArrayRemovePTag[index + 1].index
                  ),
                  example: "ex" + exampleID,
                });
              }
              // lọc questions
              if (item.type == "Questions") {
                let questionsItem = arrayRemovePTag.slice(
                  item.index,
                  indexArrayRemovePTag[index + 1].index
                );

                console.log(questionsItem);

                arrayQuestion.push({
                  id: generateRandomId(),
                  lable: validateLable(
                    questionsItem.filter((e) => {
                      if (
                        e.indexOf("A.") == -1 &&
                        e.indexOf("B.") == -1 &&
                        e.indexOf("C.") == -1 &&
                        e.indexOf("D.") == -1 &&
                        removeHTMLTags(e).search(
                          /mark the letter A, B, C, or D on your answer sheet /i
                        ) == -1
                      ) {
                        return e;
                      }
                    })
                  ),
                  answer: validateAnswer(
                    questionsItem.filter((e) => {
                      if (
                        (e.indexOf("A.") >= 0 ||
                          e.indexOf("B.") >= 0 ||
                          e.indexOf("C.") >= 0 ||
                          e.indexOf("D.") >= 0) &&
                        e.search(
                          /mark the letter A, B, C, or D on your answer sheet /i
                        ) == -1
                      ) {
                        return e;
                      }
                    })
                  ),
                  topic: idTopicTemp,
                  type: findCode(arrayRemovePTag[indexTopicTemp]),
                });
              }
            }
            // tìm từ vị trí cuối (từ vị trí này k còn topic nữa)
            if (index == indexArrayRemovePTag.length - 1) {
              // lọc questions
              if (item.type == "Questions") {
                let lastQuestion = arrayRemovePTag.slice(
                  item.index,
                  arrayRemovePTag.length
                );
                arrayQuestion.push({
                  id: generateRandomId(),
                  lable: validateLable(
                    lastQuestion.filter((e) => {
                      if (
                        e.indexOf("A.") == -1 &&
                        e.indexOf("B.") == -1 &&
                        e.indexOf("C.") == -1 &&
                        e.indexOf("D.") == -1 &&
                        e.search(
                          /mark the letter A, B, C, or D on your answer sheet /i
                        ) == -1
                      ) {
                        return e;
                      }
                    })
                  ),
                  answer: validateAnswer(
                    lastQuestion.filter((e) => {
                      if (
                        (e.indexOf("A.") >= 0 ||
                          e.indexOf("B.") >= 0 ||
                          e.indexOf("C.") >= 0 ||
                          e.indexOf("D.") >= 0) &&
                        e.search(
                          /mark the letter A, B, C, or D on your answer sheet /i
                        ) == -1
                      ) {
                        return e;
                      }
                    })
                  ),
                  topic: idTopicTemp,
                  type: findCode(arrayRemovePTag[indexTopicTemp]),
                });
              }
            }
          });

          writeExample({
            id: "ex" + exampleID,
            createName: "",
            maDeThi: "",
          });
          writeTopic(arrayTopic);
          wirteQuestions(arrayQuestion);
          setTopic(arrayTopic);
          setQuestions(arrayQuestion);
          console.log(arrayTopic);
          console.log(arrayQuestion);
        })
        .catch((err) => {
          console.error("Error reading .docx file", err);
        });
    }
  };

  // id: idTopicTemp,
  //                 type: findCode(arrayRemovePTag[item.index]),
  //                 topic: arrayRemovePTag[item.index],
  //                 note
  function writeExample(example) {
    set(ref(database, "Example/" + example.id), {
      id: example.id,
      createName: example.createName,
      maDeThi: example.maDeThi,
    });
  }
  function writeTopic(topicArray) {
    topicArray.map((item) =>
      set(ref(database, "Topic/" + item.id), {
        id: item.id,
        type: item.type,
        topic: item.topic,
        note: item.note,
        example: item.example,
      })
    );
  }
  function wirteQuestions(questionArray) {
    questionArray.map((item) =>
      set(ref(database, "Questions/" + item.id), {
        id: item.id,
        lable: item.lable,
        answer: item.answer,
        topic: item.topic,
        type: item.type,
      })
    );
  }

  const validateLable = (lable) => {
    let lableTemp = lable.join("");
    lableTemp = removeFirstTag(lableTemp);

    return lableTemp.slice(lableTemp.indexOf(":") + 1, lableTemp.length - 1);
  };
  const validateAnswer = (answer) => {
    let answerIndex = [];
    let answerResult = [];
    let convertToText = removeMultipleSpaces(answer.join(""));
    convertToText = convertToText.replace(/<strong[^>]*>|<\/strong>/g, "");
    [...convertToText].map((item, index) => {
      if (
        item + [...convertToText][index + 1] == "A." ||
        item + [...convertToText][index + 1] == "B." ||
        item + [...convertToText][index + 1] == "C." ||
        item + [...convertToText][index + 1] == "D."
      ) {
        answerIndex.push(index);
      }
    });
    //"<strong>Question 2: A.</strong> c<u>a</u>t
    // <strong> B.</strong> h<u>a</u>t
    // <strong> C.</strong> m<u>a</u>n
    // <strong> D.</strong> c<u>a</u>ke"
    answerIndex.map((item, index) => {
      if (index < answerIndex.length - 1) {
        answerResult.push(
          convertToText.slice(answerIndex[index] + 2, answerIndex[index + 1])
        );
      }
      if (index == answerIndex.length - 1) {
        answerResult.push(
          convertToText.slice(answerIndex[index] + 2, convertToText.length)
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
  function removeFirstTag(str) {
    const regex = /<(\w+)[^>]*>(.*?)<\/\1>/;
    return str.replace(regex, "$2");
  }
  function generateRandomId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
  }
  // so sanh theo phan tram % => chua lam
  String.prototype.equiValent = function (str) {
    let percent = 0;
    // xóa hastag - xóa ký tự trống - xóa ký tự  k phải là chữ
    let strInput = str
      .replace(/<[^>]*>/g, "")
      .replace(/\s+/g, "")
      .replace(/[^0-9a-zA-Z]/g, "");
    let thisStr = [
      ...this.replace(/<[^>]*>/g, "")
        .replace(/\s+/g, "")
        .replace(/[^0-9a-zA-Z]/g, ""),
    ];
    thisStr.forEach((text) => {
      [...strInput].find((e) => (e == text ? (percent += 1) : null));
    });
    console.log((percent / strInput.length) * 100);

    return (percent / strInput.length) * 100 >= 95 ? true : false;
  };

  return (
    <div>
      <h2>Convert .docx to JSON</h2>
      <input type="file" accept=".docx" onChange={handleFileChange} />
      <button
        className="bg-red-500 rounded-lg  p-3"
        onClick={() => {
          let text =
            "Mark the letter A, B, C, or D on your answer sheet to indicate the word(s) CLOSEST in meaning to the underlined word(s) in each of the following questions.";
          console.log(
            text.equiValent(
              "Mark the letter A, B, C, ora D on your answer sheet to indicate the word(s) CLOSEST in meaning to the underlined word(s) in each of the following questions."
            )
          );
        }}
      >
        show result
      </button>
      {/* <div>{text}</div> */}

      <div>
        {topic.map((topic, topicIndex) => {
          return (
            <div key={topicIndex}>
              <span>
                <b>{Parser(topic.topic)}</b>
                {question.length > 1
                  ? question.map((question, questionIndex) => {
                      if (question.topic == topic.id) {
                        return (
                          <div key={questionIndex} className="block">
                            <div>
                              <strong>Question {questionIndex + 1}: </strong>
                              {question.lable ? (
                                <>
                                  <span>{Parser(question.lable)} </span>
                                  <div className="">
                                    {question.answer.length > 0
                                      ? question.answer.map((e, i) => {
                                          return (
                                            <span key={i + e}>
                                              <strong>{convertID[i]}.</strong>{" "}
                                              {Parser(e)}
                                            </span>
                                          );
                                        })
                                      : null}
                                  </div>
                                </>
                              ) : (
                                <>
                                  {question.answer.length > 0
                                    ? question.answer.map((e, i) => {
                                        return (
                                          <span key={i + e}>
                                            <strong>{convertID[i]}.</strong>{" "}
                                            {Parser(e)}
                                          </span>
                                        );
                                      })
                                    : null}
                                </>
                              )}
                            </div>
                          </div>
                        );
                      }
                    })
                  : null}
              </span>
            </div>
          );
        })}
      </div>
      {/* ================== */}
    </div>
  );
};

export default ReadWord;
