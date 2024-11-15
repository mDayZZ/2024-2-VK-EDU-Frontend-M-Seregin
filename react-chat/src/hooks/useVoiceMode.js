import {useEffect, useRef, useState} from "react";

export const useVoiceMode = ({messageInput, }) => {
    const [isVoiceMode, setIsVoiceMode] = useState(true);
    const [voiceStatus, setVoiceStatus] = useState('pending');
    const [voiceFile, setVoiceFile] = useState(null);
    const audioChunks = useRef([]);
    const mediaRecorder = useRef(null);

    const onVoiceRecording = async () => {
        setVoiceStatus('recording')
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaRecorder.current = new MediaRecorder(stream);
            mediaRecorder.current.ondataavailable = (event) => {
                audioChunks.current.push(event.data);
            };

            mediaRecorder.current.onstop = () => {
                const audioBlob = new Blob(audioChunks.current, {type: 'audio/wav'});
                const audioFile = new File([audioBlob], 'message.wav', {type: 'audio/wav'});
                setVoiceFile(audioFile);
                audioChunks.current = [];
            }

            mediaRecorder.current.start();

        } catch (e) {
            console.error('error recording voice message', e);
            setVoiceStatus('pending');
        }


        console.log('пошла запись запись пошла')
    }

    const onVoiceStopRecord = () => {
        if (mediaRecorder.current) {
            mediaRecorder.current.stop();
            setVoiceStatus('recorded')
            console.log('записан, ждёт отправки')
        }
    }



    useEffect(() => {
        console.log(messageInput)
        if (!messageInput) {
            setIsVoiceMode(true);
            return;
        }
        setIsVoiceMode(false);
    }, [messageInput]);


    return {isVoiceMode, voiceFile, voiceStatus, onVoiceStopRecord, onVoiceRecording};
}