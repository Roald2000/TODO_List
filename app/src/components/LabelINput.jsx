import PTypes from 'prop-types';

const LabelInput = ({ inputRef = null, inputDefaultValue = null, labelClass, htmlFor = "", inputText, inputID, inputClass, inputType, inputOnChange, inputRequired }) => {
    return (
        <label className={labelClass} htmlFor={!inputID ? htmlFor : inputID}>
            <span>{inputText}</span>
            <input defaultValue={inputDefaultValue} ref={inputRef} onChange={inputOnChange} type={inputType} className={inputClass} id={inputID} required={inputRequired} />
        </label>
    );
};

export default LabelInput;

LabelInput.propTypes = {
    inputRef: PTypes.oneOfType([
        PTypes.string,
        PTypes.number,
        PTypes.bool,
        PTypes.func,
        PTypes.object
    ]),
    inputDefaultValue: PTypes.oneOfType([
        PTypes.string,
        PTypes.number,
    ]),
    labelClass: PTypes.string,
    htmlFor: PTypes.string,
    inputText: PTypes.string,
    inputID: PTypes.string,
    inputType: PTypes.string,
    inputClass: PTypes.string,
    inputOnChange: PTypes.func,
    inputRequired: PTypes.bool
};