import React from 'react';
import { database } from '../firebase';
import { onValue, query, ref } from 'firebase/database';

export function getExample() {
    const dbRefExample = ref(database, "Example");
    onValue(
        query(dbRefExample),
        (snapshot) => {
            if (snapshot.exists()) {
                const randomIndex = Math.floor(Math.random() * snapshot.size);
                const exampleID = Object.keys(snapshot.val())[randomIndex];
                return exampleID
            }
        },
        {
            onlyOnce: true,
        }
    );
}

