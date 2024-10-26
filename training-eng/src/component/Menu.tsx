import React, { useState } from 'react';

function Menu() {
    const [modelMenu, setModelMenu] = useState<boolean>(false)
    return (
        <div className='absolute top-4 right-4'>
            <div
                className="relative cursor-pointer size-16 bg-[url('https://cdn-media.sforum.vn/storage/app/media/wp-content/uploads/2023/11/avatar-vo-tri-thumbnail.jpg')] bg-cover bg-no-repeat rounded-full"
                onClick={() => { setModelMenu(!modelMenu) }}
            >
                <div className='absolute w-72 h-96 top-20 right-0 bg-red-300 ' style={{ display: `${modelMenu ? 'block' : 'none'}` }}>

                </div>
            </div>

        </div>
    );
}

export default Menu;
