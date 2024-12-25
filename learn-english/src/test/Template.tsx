import React from 'react';

function Template() {
    return (
        <div className="min-h-screen bg-blue-100 text-gray-800 flex flex-col items-center py-10">
            {/* Header */}
            <header className="bg-blue-600 text-white w-full py-4 text-center font-bold text-xl shadow-md">
                VocabTrainer™
            </header>

            {/* Main Container */}
            <main className="bg-white w-11/12 md:w-3/4 lg:w-2/3 rounded-lg shadow-lg p-6">
                {/* Question Section */}
                <section className="mb-6">
                    <p className="text-lg text-gray-700 font-medium mb-2">
                        In this question, <span className="font-bold text-blue-600">lightning</span> is a noun that means an electric discharge between clouds or from cloud to earth.
                    </p>
                </section>

                {/* Image Options */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                    {[
                        { src: "https://via.placeholder.com/150", alt: "Option 1" },
                        { src: "https://via.placeholder.com/150", alt: "Option 2" },
                        { src: "https://via.placeholder.com/150", alt: "Option 3" },
                        { src: "https://via.placeholder.com/150", alt: "Option 4" },
                    ].map((image, index) => (
                        <div
                            key={index}
                            className="relative border rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition-transform duration-300"
                        >
                            <img src={image.src} alt={image.alt} className="w-full h-32 object-cover" />
                            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center text-white font-bold">
                                Choose the best picture for lightning
                            </div>
                        </div>
                    ))}
                </div>

                {/* Vocabulary Details */}
                <div className="mb-6">
                    <h2 className="text-2xl text-blue-600 font-semibold mb-2">lightning</h2>
                    <p className="text-gray-700 mb-2">
                        <span className="font-bold">Pronunciation:</span> /\u02c8la\u026atn\u026a\u014b/
                    </p>
                    <p className="text-gray-700 mb-4">
                        When you see sudden bright flashes of light in the sky, you’re seeing <span className="font-bold">lightning</span>, the release of electricity between clouds or the ground.
                    </p>
                </div>

                {/* Buttons */}
                <div className="flex justify-between">
                    <button className="px-4 py-2 bg-gray-300 rounded-lg text-gray-700 font-medium shadow-md hover:bg-gray-400 transition">Previous</button>
                    <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md font-medium hover:bg-yellow-400 transition">
                        Next question
                    </button>
                </div>
            </main>

            {/* Footer */}
            <footer className="text-gray-500 text-sm mt-10">
                &copy; 2024 VocabTrainer™
            </footer>
        </div>
    );
}

export default Template;
