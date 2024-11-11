class AudioService {
    constructor() {
        this.audioCache = new Map();

        this.loadAudio('messageSent', 'sounds/sentMessage.wav');
        this.loadAudio('messageReceived', 'sounds/receivedMessage.wav');
        this.loadAudio('error', 'sounds/error.wav');
    }

    loadAudio(key, src) {
        if (!this.audioCache.has(key)) {
            const audio = new Audio(src);
            this.audioCache.set(key, audio);
        }
    }

    play(key, volume = 1.0) {
        const audio = this.audioCache.get(key);
        if (audio) {
            audio.volume = volume;
            audio.currentTime = 0; // Перемотка на начало
            audio.play().catch((error) => {
                console.error(`Ошибка воспроизведения звука (${key}):`, error);
            });
        } else {
            console.warn(`Звук с ключом "${key}" не найден.`);
        }
    }

    // Метод для остановки звука
    stop(key) {
        const audio = this.audioCache.get(key);
        if (audio) {
            audio.pause();
            audio.currentTime = 0;
        }
    }
}

const audioService = new AudioService();
export default audioService;
