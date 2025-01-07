import React, { useEffect, useState } from 'react';
import { IVocabulary } from '../../../Interface/Interfaces';
import { addVocabularyUser, getVocabularyTest, updateVocabularyRank } from '../../../services/VocaburalyServices';

function VocabularyNew(props: any) {
    const [vocabularys, setVocabularys] = useState<IVocabulary[]>([])
    const [indexVocavulary, setIndexVocabulary] = useState<number>(0)
    let countFaill = 0;
    useEffect(() => {
        setVocabularys(getVocabularyTest())
        console.log("reload New");

    }, [props.modelView])

    const handleNewVocabulary = (event: any) => {
        if (event.key === 'Enter') {
            if (checkVocalary(event.target.value)) {
                event.target.value = ''
                event.target.classList.remove("faill");
                event.target.classList.remove("faill-animation");
                setIndexVocabulary(indexVocavulary + 1)
            } else {
                countFaill++;
                if (countFaill == 5) {
                    console.log("mist");
                }
                event.target.classList.add("faill");
                event.target.classList.add("faill-animation");
                event.target.addEventListener('animationend', function () {
                    event.target.classList.remove('faill-animation');
                });
            }

        }
    }
    const checkVocalary = (vovabulary: string) => {

        if (vovabulary.toLowerCase() == vocabularys[indexVocavulary].vocabylary.toLowerCase()) {
            if (indexVocavulary == vocabularys.length - 1) {
                console.log("end list");
                // alert("có vẻ như bạn đã nhớ hết được những từ đã học, vậy học tiếp các từ mới nhé")
                alert("có vẻ bạn đã thuộc từ mới, mình chuyển qua ôn lại những từ cũ nhé")
                props.setModelView(true);
                addVocabularyUser(vocabularys)
                // setVocabularys(getVocabulary());
                return true
            }
            setIndexVocabulary(indexVocavulary + 1)
            return true;
        } else {
            console.log(false);
            // updateVocabularyRank(vocabularys[indexVocavulary].id + "", false);
            return false;
        }

    }
    return (
        <div className=' w-full h-full'>
            <div className=" h-1/3 flex flex-col items-center justify-center ">
                <h2 className=" font-fontCursive text-5xl my-4">{vocabularys.length > 0 && vocabularys[indexVocavulary].vocabylary}</h2>
                <p className="mb-4">
                    <strong>Phát âm:</strong> {vocabularys.length > 0 && vocabularys[indexVocavulary].pronounce}
                </p>
                <input
                    type="text"
                    onKeyDown={handleNewVocabulary}
                    onBlur={(e) => {
                        e.target.classList.remove("faill");
                        e.target.classList.remove("faill-animation");
                        console.log("blur");

                    }}
                    placeholder="Vocabulary"
                    className="px-4 py-2 w-4/6 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600"
                />
            </div>
            <div className='p-5 bg-[#fff] w-[95%] h-2/3 m-auto rounded-lg '>
                {
                    vocabularys.length > 0 && vocabularys[indexVocavulary].noun.noun &&
                    <div className="mb-4">
                        <p className='font-bold'>Danh từ (Noun)</p>
                        <p>
                            {vocabularys[indexVocavulary].noun.noun}
                        </p>
                        <p>
                            {vocabularys[indexVocavulary].noun.example}</p>
                    </div>
                }
                {
                    vocabularys.length > 0 && vocabularys[indexVocavulary].verb.verb &&
                    <div className="mb-4">
                        <p className='font-bold'>Động từ (Verb)</p>
                        <p>
                            {vocabularys[indexVocavulary].verb.verb}
                        </p>
                        <p>
                            {vocabularys[indexVocavulary].verb.example}
                        </p>
                    </div>
                }

                {
                    vocabularys.length > 0 && vocabularys[indexVocavulary].adjective.adjective &&
                    <div className="mb-4">
                        <p className='font-bold'>Tính từ (Adjective)</p>
                        <p>
                            {vocabularys[indexVocavulary].adjective.adjective}
                        </p>
                        <p>
                            {vocabularys[indexVocavulary].adjective.example}
                        </p>
                    </div>
                }
            </div>
        </div>
    );
}

export default VocabularyNew;
