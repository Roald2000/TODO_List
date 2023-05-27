
import PTypes from 'prop-types';

const FormSubmitButton = ({ buttonText = "Button", buttonType = "button", buttonClass = "p-1 rounded-md bg-slate-100", buttonClick }) => {
    return (
        <button type={buttonType} onClick={buttonClick} className={buttonClass}>
            {buttonText}
        </button>
    );
};

FormSubmitButton.propTypes = {
    buttonText: PTypes.string,
    buttonType: PTypes.string,
    buttonClass: PTypes.string,
    buttonClick: PTypes.func
};


export default FormSubmitButton