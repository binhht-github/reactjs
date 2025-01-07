import React, { useEffect, useState } from 'react';
import { child, getDatabase, onValue, ref, get, set, push, update } from "firebase/database";
import { ITopic, IVocabulary } from '../Interface/Interfaces';
import axios from 'axios';
import { apiKey, baseURL, spreadsheetId } from './config';

export const getDataTest = () => {
    console.log("test");
    // doc toan bo
    const database = getDatabase();
    const starCountRef = ref(database, 'Vocabulary');
    onValue(starCountRef, (snapshot) => {
        const data = snapshot.val();
        // console.log(data);
    });

    //Đọc dữ liệu một lần bằng get()
    const dbRef = ref(getDatabase());
    get(child(dbRef, `Vocabulary/1`)).then((snapshot: any) => {
        if (snapshot.exists()) {
            console.log(snapshot.val());
        } else {
            console.log("No data available");
        }
    }).catch((error: any) => {
        console.error(error);
    });
}

export const writeDataTest = () => {
    //// ghi du lieu one
    // const db = getDatabase();
    // set(ref(db, 'Vocabulary/' + "123"), {
    //     username: "name",
    //     email: "email",
    //     profile_picture: "imageUrl"
    // });
    //// write with array
    // const db = getDatabase();
    // const vocaburalyRef = ref(db, 'Vocabulary/123');
    // const newVocabulary = pa(vocaburalyRef);
    // set(newVocabulary, {
    //     username: "name 2",
    //     email: "email 2",
    //     profile_picture: "imageUrl 2"
    // });


    // let topicData: ITopic[] = [];
    // const reqDataConvert = topicData.reduce((acc, cur, index) => {
    //     acc[cur.id] = cur;
    //     return acc;
    // }, {} as Record<string, object>);
    // console.log(reqDataConvert);

    // const db = getDatabase();
    // set(ref(db, 'Vocabulary/' + "123"), {
    //     username: "name 1231231",
    //     email: "email",
    //     profile_picture: "imageUrl"
    // })
    //     .then((response: any) => {
    //         console.log(response);

    //         // Data saved successfully!
    //     })
    //     .catch((error: any) => {
    //         console.log(error);

    //     });


    // const db = getDatabase();

    // // A post entry.
    // const postData = {
    //     username: "name postData",
    //     email: "email postData",
    //     profile_picture: "imageUrl postData"
    // };

    // // Get a key for a new Post.
    // const newPostKey = push(child(ref(db), 'posts')).key;

    // // Write the new post's data simultaneously in the posts list and the user's post list.
    // const updates: any = {};
    // updates['/Vocabulary/' + newPostKey] = postData;

    // return update(ref(db), updates);
}



//////////////////////////////////////////////////


interface IVocabularyTest {
    vocabularyID: string,
    userID: string,
    status: boolean,
    createDate: string
}
export const getVocabularyTest = () => {
    const result = serverVocabulary.filter((item) => {
        if (serverVocabularyUser.findIndex(i => i.vocabularyID == (item.id + "")) == -1) {
            return item;
        }
    })
    var shuffled = result.slice(0), i = result.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, 3);

}
export const getVocabulary = () => {
    const minList = serverVocabularyUser.filter(item => item.status == false);
    let result = serverVocabulary.filter((item) => {
        if (minList.findIndex(i => i.vocabularyID == (item.id + "")) >= 0) {
            return item;
        }
    });
    return result;
}
export const getVocabularyRandom = () => {

    var shuffled = serverVocabularyUser.slice(0), i = serverVocabularyUser.length, temp, index;
    while (i--) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(0, serverVocabularyUser.length > 10 ? 10 : serverVocabularyUser.length);
}
export const updateVocabularyRank = (vocabularyID: string, statusRank: boolean) => {
    const index = serverVocabularyUser.findIndex(item => item.vocabularyID == vocabularyID)
    serverVocabularyUser[index].status = statusRank;
}

export const addVocabularyUser = (vocabulars: IVocabulary[]) => {
    const data = vocabulars.map((item) => {
        return {
            vocabularyID: item.id + "",
            userID: "user1",
            status: false,
            createDate: "date"
        }
    })
    serverVocabularyUser.push(...data)
}


export const Log = () => {
    console.log("serverVocabularyUser: ", serverVocabularyUser);

}

export const getVocabularyGGSheet = async () => {

    const range = "Vocabulary!A2:D10000000";
    const url = `${baseURL}/${spreadsheetId}/values/${range}?key=${apiKey}`;
    const result = await axios.get(url)
    const data = result.data.values.map((item: any, index: number) => {
        const [vocabularyID, vocabulary, semantics] = result.data.values[index];
        return { vocabularyID, vocabulary, semantics }
    })

    return {
        data: data,
        status: result.status
    }

}






const serverVocabularyUser = [
    {
        vocabularyID: "1",
        userID: "user1",
        status: true,
        createDate: "Date"
    },
    {
        vocabularyID: "2",
        userID: "user1",
        status: true,
        createDate: "Date"
    },
    {
        vocabularyID: "5",
        userID: "user1",
        status: true,
        createDate: "Date"
    },
    {
        vocabularyID: "7",
        userID: "user1",
        status: false,
        createDate: "Date"
    },
    {
        vocabularyID: "9",
        userID: "user1",
        status: false,
        createDate: "Date"
    },
    {
        vocabularyID: "6",
        userID: "user1",
        status: true,
        createDate: "Date"
    },
    {
        vocabularyID: "12",
        userID: "user1",
        status: true,
        createDate: "Date"
    },
    {
        vocabularyID: "14",
        userID: "user1",
        status: false,
        createDate: "Date"
    },
    {
        vocabularyID: "17",
        userID: "user1",
        status: true,
        createDate: "Date"
    },
    {
        vocabularyID: "21",
        userID: "user1",
        status: true,
        createDate: "Date"
    },
    {
        vocabularyID: "13",
        userID: "user1",
        status: true,
        createDate: "Date"
    },
    {
        vocabularyID: "22",
        userID: "user1",
        status: true,
        createDate: "Date"
    },
]


const serverVocabulary = [
    {
        "id": 1,
        "vocabylary": "Father",
        "semantics": "Bố (Bố\/Bố)",
        "pronounce": "fɑːðə (dæd\/ ˈdædi)",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 2,
        "vocabylary": "Mother",
        "semantics": "Mẹ (Mẹ\/Mẹ)",
        "pronounce": "ˈmʌðə (mɒm\/mʌm)",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 3,
        "vocabylary": "Son",
        "semantics": "Con trai",
        "pronounce": "sʌn",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 4,
        "vocabylary": "Daughter",
        "semantics": "Con gái",
        "pronounce": "ˈdɔːtə",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 5,
        "vocabylary": "Parent",
        "semantics": "cha mẹ",
        "pronounce": "ˈpeərᵊnt",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 6,
        "vocabylary": "Children",
        "semantics": "Child - Children",
        "pronounce": "ʧaɪld  ˈʧɪldrən",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 7,
        "vocabylary": "Husband",
        "semantics": "Chồng",
        "pronounce": "ˈhʌzbənd",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 8,
        "vocabylary": "Wife",
        "semantics": "Vợ",
        "pronounce": "waɪf",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 9,
        "vocabylary": "Brother",
        "semantics": "Anh trai",
        "pronounce": "ˈbrʌðə",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 10,
        "vocabylary": "Sister",
        "semantics": "Em gái",
        "pronounce": "ˈsɪstə",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 11,
        "vocabylary": "Uncle",
        "semantics": "Chú",
        "pronounce": "ˈʌŋkᵊl",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 12,
        "vocabylary": "Aunt",
        "semantics": "Dì",
        "pronounce": "ɑːnt",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 13,
        "vocabylary": "Nephew",
        "semantics": "Cháu trai",
        "pronounce": "ˈnɛfjuː",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 14,
        "vocabylary": "Niece",
        "semantics": "cháu gái",
        "pronounce": "niːs",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 15,
        "vocabylary": "Cousin",
        "semantics": "Anh em họ",
        "pronounce": "ˈkʌzᵊn",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 16,
        "vocabylary": "Grandmother",
        "semantics": "Bà (Thường gọi là: Bà, bà)",
        "pronounce": "ˈɡrænmʌðə (Thuong goi lɑː: ˈɡræni, ˈɡrænmɑː)",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 17,
        "vocabylary": "Granny",
        "semantics": "bà ngoại",
        "pronounce": "ˈɡræni",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 18,
        "vocabylary": "grandma",
        "semantics": "bà",
        "pronounce": "ˈɡrænmɑː",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 19,
        "vocabylary": "Grandfather",
        "semantics": "Ông nội (Thường gọi là: ông nội)",
        "pronounce": "ˈɡrænfɑːðə (Thuong goi lɑː: ˈɡrænpɑː)",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 20,
        "vocabylary": "Grandparents",
        "semantics": "ông bà",
        "pronounce": "ˈɡrænpeərᵊnt",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 21,
        "vocabylary": "Boyfriend",
        "semantics": "bạn trai",
        "pronounce": "ˈbɔɪfrɛnd",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 22,
        "vocabylary": "Girlfriend",
        "semantics": "bạn gái",
        "pronounce": "ˈɡɜːlfrɛnd",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 23,
        "vocabylary": "Partner",
        "semantics": "Cộng sự",
        "pronounce": "ˈpɑːtnə",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 24,
        "vocabylary": "Godfather",
        "semantics": "Cha đỡ đầu",
        "pronounce": "ˈɡɒdˌfɑːðə",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 34,
        "vocabylary": "Bright",
        "semantics": "Sáng lạng, tươi tắn",
        "pronounce": "braɪt",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 35,
        "vocabylary": "Breeze",
        "semantics": "Gió Nhẹ",
        "pronounce": "briːz",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 36,
        "vocabylary": "Clear",
        "semantics": "Thông thoáng, sặc sẽ",
        "pronounce": "klɪə",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 37,
        "vocabylary": "Cloudy",
        "semantics": "Nhiều mây",
        "pronounce": "ˈklaʊdi",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 38,
        "vocabylary": "Dry",
        "semantics": "Khô",
        "pronounce": "draɪ",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 39,
        "vocabylary": "Fine",
        "semantics": "Khỏe",
        "pronounce": "faɪn",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 40,
        "vocabylary": "Foggy",
        "semantics": "có sương mù",
        "pronounce": "ˈfɒɡi",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 41,
        "vocabylary": "Haze",
        "semantics": "Sương mù",
        "pronounce": "heɪz",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 42,
        "vocabylary": "Humid",
        "semantics": "Ẩm ướt",
        "pronounce": "ˈhjuːmɪd",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 43,
        "vocabylary": "Gloomy",
        "semantics": "ảm đạm",
        "pronounce": "ˈɡluːmi",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 44,
        "vocabylary": "Mild",
        "semantics": "Nhẹ",
        "pronounce": "maɪld",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 45,
        "vocabylary": "Partially cloudy",
        "semantics": "Có mây một phần:",
        "pronounce": "ˈpɑːʃᵊli ˈklaʊdi:",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 46,
        "vocabylary": "Overcast",
        "semantics": "U ám",
        "pronounce": "ˈəʊvəkɑːst",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 47,
        "vocabylary": "Sunny",
        "semantics": "Nhiều nắng",
        "pronounce": "ˈsʌni",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 48,
        "vocabylary": "Wet",
        "semantics": "Ướt",
        "pronounce": "wɛt",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 49,
        "vocabylary": "Windy",
        "semantics": "Có gió",
        "pronounce": "ˈwɪndi",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 50,
        "vocabylary": "blizzard",
        "semantics": "bão tuyết",
        "pronounce": "ˈblɪzəd",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 51,
        "vocabylary": "blustery",
        "semantics": "ồn ào",
        "pronounce": "ˈblʌstᵊri",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 52,
        "vocabylary": "damp",
        "semantics": "ẩm ướt",
        "pronounce": "dæmp",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 53,
        "vocabylary": "drizzle",
        "semantics": "mưa phùn ",
        "pronounce": "ˈdrɪzᵊl",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 54,
        "vocabylary": "flood",
        "semantics": "lụt",
        "pronounce": "flʌd",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 55,
        "vocabylary": "hail",
        "semantics": "mưa đá, gọi ..., đến từ, xuất xứ ",
        "pronounce": "heɪl",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 56,
        "vocabylary": "hurricane",
        "semantics": "cơn bão",
        "pronounce": "ˈhʌrɪkən",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 57,
        "vocabylary": "gale",
        "semantics": "cơn gió mạnh",
        "pronounce": "ɡeɪl",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 58,
        "vocabylary": "rain",
        "semantics": "cơn mưa",
        "pronounce": "reɪn",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 59,
        "vocabylary": "rainbow",
        "semantics": "cầu vồng",
        "pronounce": "ˈreɪnbəʊ",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 60,
        "vocabylary": "rainstorm",
        "semantics": "mưa bão",
        "pronounce": "ˈreɪnstɔːm",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 61,
        "vocabylary": "mist",
        "semantics": "sương mù",
        "pronounce": "mɪst",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 62,
        "vocabylary": "lightning",
        "semantics": "tia sét",
        "pronounce": "ˈlaɪtnɪŋ",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 63,
        "vocabylary": "thunder",
        "semantics": "sấm sét",
        "pronounce": "ˈθʌndə",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 64,
        "vocabylary": "thunderstorm",
        "semantics": "dông",
        "pronounce": "THəndərˌstôrm",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 65,
        "vocabylary": "shower",
        "semantics": "vòi sen",
        "pronounce": "ˈʃaʊə",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 66,
        "vocabylary": "snow",
        "semantics": "tuyết",
        "pronounce": "snəʊ",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 67,
        "vocabylary": "snowflake",
        "semantics": "bông tuyết",
        "pronounce": "ˈsnəʊfleɪk",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 68,
        "vocabylary": "snowstorm",
        "semantics": "bão tuyết",
        "pronounce": "ˈsnəʊstɔːm",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 69,
        "vocabylary": "storm",
        "semantics": "bão",
        "pronounce": "stɔːm",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 70,
        "vocabylary": "typhoon",
        "semantics": "cơn bão",
        "pronounce": "taɪˈfuːn",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 71,
        "vocabylary": "tornado",
        "semantics": "cơn lốc xoáy",
        "pronounce": "tɔːˈneɪdəʊ",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 72,
        "vocabylary": "weather forecast",
        "semantics": "dự báo thời tiết:",
        "pronounce": "ˈwɛðə ˈfɔːkɑːst:",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 73,
        "vocabylary": "downpour",
        "semantics": "trận mưa như trút nước",
        "pronounce": "ˈdaʊnpɔː",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 74,
        "vocabylary": "rainfall",
        "semantics": "lượng mưa",
        "pronounce": "ˈreɪnfɔːl",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 75,
        "vocabylary": "torrential rain",
        "semantics": "mưa xối xả",
        "pronounce": "tôˈren(t) reɪn",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 76,
        "vocabylary": "CV",
        "semantics": "CV (viết tắt của sơ yếu lý lịch)",
        "pronounce": "siː-viː   ( kəˌrik(y)ələm ˈvēˌtī )",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 77,
        "vocabylary": "Application form",
        "semantics": "Đơn đăng ký",
        "pronounce": "ˌæplɪˈkeɪʃᵊn fɔːm",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 78,
        "vocabylary": "Interview",
        "semantics": "Phỏng vấn",
        "pronounce": "ˈɪntəvjuː",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 79,
        "vocabylary": "Job",
        "semantics": "Công việc",
        "pronounce": "ʤɒb",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 80,
        "vocabylary": "Career",
        "semantics": "Sự nghiệp",
        "pronounce": "kəˈrɪə",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 81,
        "vocabylary": "Part time",
        "semantics": "Bán thời gian",
        "pronounce": "pɑːt taɪm",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 82,
        "vocabylary": "Full time",
        "semantics": "Toàn thời gian",
        "pronounce": "fʊl taɪm",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 83,
        "vocabylary": "Permanent",
        "semantics": "Vĩnh viễn",
        "pronounce": "ˈpɜːmənənt",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 84,
        "vocabylary": "Temporary",
        "semantics": "Tạm thời",
        "pronounce": "ˈtɛmpᵊrᵊri",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 85,
        "vocabylary": "Appointment",
        "semantics": "Cuộc hẹn",
        "pronounce": "əˈpɔɪntmənt",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 86,
        "vocabylary": "advert",
        "semantics": "Quảng cáo hoặc quảng cáo",
        "pronounce": "æd ɔːr ˈædvɜːt",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 87,
        "vocabylary": "Contract",
        "semantics": "Hợp đồng",
        "pronounce": "ˈkɒntrækt",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 88,
        "vocabylary": "Notice period",
        "semantics": "Thời gian thông báo",
        "pronounce": "ˈnəʊtɪs ˈpɪəriəd",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 89,
        "vocabylary": "Holiday entitlement",
        "semantics": "Quyền nghỉ lễ",
        "pronounce": "ˈhɒlədeɪ ɪnˈtaɪtᵊlmənt",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 90,
        "vocabylary": "Sick pay",
        "semantics": "Lương ốm đau",
        "pronounce": "sɪk peɪ",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 91,
        "vocabylary": "Holiday pay",
        "semantics": "Lương nghỉ lễ",
        "pronounce": "ˈhɒlədeɪ peɪ",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    },
    {
        "id": 92,
        "vocabylary": "Overtime",
        "semantics": "Làm thêm giờ",
        "pronounce": "ˈəʊvətaɪm",
        "describe": "mo ta",
        "verb": {
            "example": "he fathered three children",
            "verb": "(của một người đàn ông) gây ra sự mang thai và sinh ra (một đứa trẻ)."
        },
        "noun": {
            "example": "Margaret's father died at an early age",
            "noun": "một người đàn ông trong mối quan hệ với con cái của mình."
        },
        "adjective": {
            "example": "",
            "adjective": ""
        },
    }
];
