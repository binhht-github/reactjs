import React, { useEffect, useRef, useState } from 'react';


const AudioPlayer: React.FC = () => {
    // Khai báo state với kiểu dữ liệu
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [volume, setVolume] = useState<number>(1);  // Mức âm lượng (0 đến 1)
    const [currentTime, setCurrentTime] = useState<number>(0);  // Thời gian hiện tại
    const [duration, setDuration] = useState<number>(0);  // Thời gian tổng (duration)

    // Khai báo ref với kiểu dữ liệu là HTMLAudioElement
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Hàm xử lý play/pause
    const handlePlayPause = () => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.pause();
            } else {
                audioRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    // Hàm xử lý thay đổi âm lượng
    const handleVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            const volumeValue = parseFloat(event.target.value);
            setVolume(volumeValue);
            audioRef.current.volume = volumeValue;
        }
    };

    // Hàm xử lý sự kiện thay đổi progress bar
    const handleProgressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            const timeValue = parseFloat(event.target.value);
            audioRef.current.currentTime = timeValue;
            setCurrentTime(timeValue);
        }
    };

    // Hàm cập nhật currentTime khi audio đang phát
    const updateCurrentTime = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    // Lắng nghe sự kiện timeupdate khi audio thay đổi thời gian load 1 l
    useEffect(() => {
        console.log("load");

        const audioElement = audioRef.current;
        if (audioElement) {
            audioElement.ontimeupdate = updateCurrentTime;
            audioElement.onloadedmetadata = () => {
                if (audioElement.duration) {
                    setDuration(audioElement.duration);  // Cập nhật thời gian tổng
                }
            };
        }
        return () => {
            if (audioElement) {
                audioElement.ontimeupdate = null;
            }
        };
    }, []);

    return (
        <>
            <div className={`bg-[#f5b764] rounded-3xl `}>
                <div className=' w-full h-16'>
                    <div className='w-full h-16 flex items-center '>
                        <audio ref={audioRef} src="../audio/I Need Your Love.mp3" />
                        <div className='size-8 w-10  ml-2'>
                            {isPlaying ?
                                <svg onClick={handlePlayPause} width="100%" height="100%" viewBox="0 0 6 8" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                                    <title>pause [#1006]</title>
                                    <desc>Created with Sketch.</desc>
                                    <defs></defs>
                                    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g id="Dribbble-Light-Preview" transform="translate(-227.000000, -3765.000000)" fill="#000000">
                                            <g id="icons" transform="translate(56.000000, 160.000000)">
                                                <path d="M172,3605 C171.448,3605 171,3605.448 171,3606 L171,3612 C171,3612.552 171.448,3613 172,3613 C172.552,3613 173,3612.552 173,3612 L173,3606 C173,3605.448 172.552,3605 172,3605 M177,3606 L177,3612 C177,3612.552 176.552,3613 176,3613 C175.448,3613 175,3612.552 175,3612 L175,3606 C175,3605.448 175.448,3605 176,3605 C176.552,3605 177,3605.448 177,3606" id="pause-[#1006]"></path>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                                :
                                <svg onClick={handlePlayPause} width="100%" height="100%" viewBox="0 0 11 14" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                    <title>play_arrow</title>
                                    <desc>Created with Sketch.</desc>
                                    <g id="Icons" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                                        <g id="Rounded" transform="translate(-753.000000, -955.000000)">
                                            <g id="AV" transform="translate(100.000000, 852.000000)">
                                                <g id="-Round-/-AV-/-play_arrow" transform="translate(646.000000, 98.000000)">
                                                    <g>
                                                        <rect id="Rectangle-Copy-50" x="0" y="0" width="24" height="24"></rect>
                                                        <path d="M7,6.82 L7,17.18 C7,17.97 7.87,18.45 8.54,18.02 L16.68,12.84 C17.3,12.45 17.3,11.55 16.68,11.15 L8.54,5.98 C7.87,5.55 7,6.03 7,6.82 Z" id="🔹Icon-Color" fill="#1D1D1D"></path>
                                                    </g>
                                                </g>
                                            </g>
                                        </g>
                                    </g>
                                </svg>
                            }
                        </div>
                        <div className='flex-1 ml-4 mr-1'>
                            <input
                                type="range"
                                min="0"
                                max={duration}
                                step="0.1"
                                value={currentTime}
                                onChange={handleProgressChange}
                                className='w-full '
                            />
                        </div>
                        <div className='mx-2 w-24 flex'>
                            <svg width={"24px"} height={"24px"} version="1.1" id="Icons" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 32 32" >

                                <g>
                                    <path d="M20.4,2.9c-0.3-0.2-0.7-0.1-1,0.1L9.7,10H3c-0.6,0-1,0.4-1,1v10c0,0.6,0.4,1,1,1h6.7l9.7,7.1c0.2,0.1,0.4,0.2,0.6,0.2
		c0.2,0,0.3,0,0.5-0.1c0.3-0.2,0.5-0.5,0.5-0.9V3.8C21,3.4,20.8,3,20.4,2.9z"></path>
                                    <path d="M27.1,9.3c-0.4-0.4-1-0.4-1.4,0s-0.4,1,0,1.4C27.2,12.1,28,14,28,16s-0.8,3.9-2.3,5.3c-0.4,0.4-0.4,1,0,1.4
		c0.2,0.2,0.5,0.3,0.7,0.3c0.2,0,0.5-0.1,0.7-0.3C29,20.9,30,18.6,30,16S29,11.1,27.1,9.3z"></path>
                                    <path d="M24.7,12.7c-0.4-0.4-1-0.4-1.4,0.1c-0.4,0.4-0.3,1,0.1,1.4c0.5,0.5,0.8,1.2,0.8,1.9s-0.3,1.4-0.8,1.9
		c-0.4,0.4-0.4,1-0.1,1.4c0.2,0.2,0.5,0.3,0.7,0.3c0.2,0,0.5-0.1,0.7-0.3c1-0.9,1.5-2.1,1.5-3.3S25.6,13.5,24.7,12.7z"></path>
                                </g>
                            </svg>
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                                className='w-16'
                            />
                        </div>

                    </div>
                </div>
                <audio ref={audioRef} src={"../audio/I Need Your Love.mp3"} preload="metadata" />
            </div>

        </>

    );
}

export default AudioPlayer;
