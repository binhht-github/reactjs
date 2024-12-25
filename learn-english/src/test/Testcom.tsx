import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { onValue, ref } from 'firebase/database';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, query, where, getDocs } from "firebase/firestore";

function Testcom() {

    const [accCurrent, setAccCurrent] = useState<{ email: string, password: string } | null>(null)




    const databe = db
    useEffect(() => {
        // const dbRef2 = ref(databe, 'Topic');
        const q = query(collection(db, "Test"));
        const docSnap = getDocs(q)
            .then((res: any) => {
                res.docs.forEach((doc: any) => {
                    // doc.data() is never undefined for query doc snapshots
                    console.log(doc.id, " => ", doc.data());
                });
            })
            .catch((e) => {
                console.log(e);
            });

        // if (docSnap.exists()) {
        //     console.log("Document data:", docSnap.data());
        // } else {
        //     // docSnap.data() will be undefined in this case
        //     console.log("No such document!");
        // }
    }, [])
    const handleUpdateAcc = (e: any) => {
        if (e.target.name == "email") {
            setAccCurrent({
                email: e.target.value,
                password: accCurrent?.password!
            })
        }
        if (e.target.name == "password") {
            setAccCurrent({
                email: accCurrent?.email!,
                password: e.target.value
            })
        }

    }
    const signUp = () => {
        if (accCurrent != null) {
            createUserWithEmailAndPassword(auth, accCurrent.email, accCurrent.password)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    console.log(userCredential);
                    setAccCurrent(null)
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(error);

                    // ..
                });
        }
    }
    const handleSignIn = () => {
        if (accCurrent != null) {
            signInWithEmailAndPassword(auth, accCurrent?.email!, accCurrent?.password!)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // ...
                    setAccCurrent(null)
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        }

    }
    const handleSignOut = () => {
        signOut(auth).then((res) => {
            // Sign-out successful.
            console.log(res);
            setAccCurrent(null)
        }).catch((error) => {
            console.log(error);
            // An error happened.
        });
    }

    return (
        <div className='h-screen w-screen flex justify-center items-center'>
            <div className='w-96 h-96 bg-slate-500 flex justify-center items-center flex-col'>
                <input name="email" onChange={(e) => { handleUpdateAcc(e) }} className='m-2' type="text" />
                <input name="password" onChange={(e) => { handleUpdateAcc(e) }} className='m-2' type="text" />
                <button onClick={() => { signUp() }}>sign up</button>
                <button onClick={() => { handleSignIn() }}>sign in</button>
                <button onClick={() => { handleSignOut() }}>log out</button>
            </div>
        </div>
    );
}

export default Testcom;
