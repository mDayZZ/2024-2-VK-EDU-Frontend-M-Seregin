import languageData from "../../utils/languages.json";

const ChooseTranslate = ({langState, setLangState}) => {

    const onLangChange = (e) => {
        setLangState(e.target.value);
    }

    return (
        <div>
            <select
                name='translateFrom'
                value={langState}
                onChange={onLangChange}
            >
                {Object.entries(languageData).map(([key, label]) => (
                    <option key={key} value={key}>
                        {label}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default ChooseTranslate;