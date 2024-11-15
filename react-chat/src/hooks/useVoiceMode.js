import {useEffect, useRef, useState} from "react";

export const useVoiceMode = ({messageInput}) => {
    const [isVoiceMode, setIsVoiceMode] = useState(true);
    const [voiceStatus, setVoiceStatus] = useState('pending');
    const [voiceFile, setVoiceFile] = useState(null);
    const audioChunks = useRef([]);
    const mediaRecorder = useRef(null);
    const mediaStream = useRef(null);
    const onVoiceRecording = async () => {
        setVoiceStatus('recording')
        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            mediaStream.current = stream;
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


    }

    const onVoiceStopRecord = (e) => {
        e.preventDefault();
        if (mediaRecorder.current) {
            mediaRecorder.current.stop();
            if (mediaStream.current) {
                mediaStream.current.getTracks().forEach(track => track.stop())
            }
            setVoiceStatus('recorded');
        }
    }

    const onVoiceSent = () => {

        setVoiceFile(null);
        setIsVoiceMode(false);
        setVoiceStatus('pending');
    }



    useEffect(() => {
        if (!messageInput) {
            setIsVoiceMode(true);
            return;
        }
        setIsVoiceMode(false);
    }, [messageInput]);


    return {isVoiceMode, voiceFile, voiceStatus, onVoiceStopRecord, onVoiceRecording, onVoiceSent};
}