import React from 'react';
import { child, getDatabase, onValue, ref, get, set, push, update } from "firebase/database";
import { ITopic } from '../Interface/Interfaces';

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

