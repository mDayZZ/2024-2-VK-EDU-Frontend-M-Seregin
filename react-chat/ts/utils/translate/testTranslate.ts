import translate from "./index";


const startTesting = async ()  => {
    const translatedText = await translate({from: 'ru', to: 'en', text: 'привет бротишка'});
    console.log('бу испугался');
    console.log(translatedText);
}
console.log('te')
startTesting();