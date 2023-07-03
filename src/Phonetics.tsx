import React, { useState } from 'react';
import { TPhonetics } from './types';
import ReactAudioPlayer from 'react-audio-player';

type TProps = {
    audio: string | undefined;
}
export default function Phonetics({ audio }: TProps ) {
    const [playerEl, setPlayerEl] = useState<ReactAudioPlayer | null>(null);

    const playAudio = () => {
        if(playerEl !== null) {
            playerEl.audioEl.current?.play()
        }
    }

    return (
        <div className="phonetics">
            <button className='btn' onClick={playAudio}>Listen</button>
            <ReactAudioPlayer
                src={audio}
                style={{width: '80px', height: '50px'}}
                ref={(element) => setPlayerEl(element)}
            />
            {playerEl === null && (
                <p>Sorry, we couldn't find an audio file for this word</p>
                )}
        </div>
    )
}