export interface IExample {
    id: string,
    createName: string,
    maDeThi: string,
}
export interface ITopic {
    id: string,
    type: string, // mã code 
    topic: string,
    note: string[],
    example: string
}
export interface ITypeTopic {
    type: string,
    name: string
}
export interface IQuestions {
    id: string,
    title: string,
    answer: string[],
    correctAnswer: string,
    type: string,
    topic: string
}

export interface ISelectAnswer {
    answer: string,
    question: string,
    correctAnswer: string
}
// export interface ISelectAnswer {
//     answer: string,
//     question: string,
//     correctAnswer: string
// }


