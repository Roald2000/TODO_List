import PTypes from 'prop-types';
const Form = ({ formSubmit = (e) => { e.preventDefault() }, formTitle = "This is a Form Component", formClass, formInputWrapperClass, formSubmitWrapperClass, formInputs, formButtons }) => {
    return (
        <form onSubmit={formSubmit} className={formClass}>
            <div>
                <h1 className='text-2xl'>{formTitle}</h1>
            </div>
            <div className={formInputWrapperClass}>
                {Array.isArray(formInputs) ? formInputs : [formInputs]}
            </div>
            <div className={formSubmitWrapperClass}>
                {Array.isArray(formButtons) ? formButtons : [formButtons]}
            </div>
        </form>
    );
};

export default Form

Form.propTypes = {
    formClass: PTypes.string,
    formInputWrapperClass: PTypes.string,
    formSubmitWrapperClass: PTypes.string,
    formSubmit: PTypes.func,
    formTitle: PTypes.string,
    formInputs: PTypes.oneOfType([
        PTypes.element,
        PTypes.arrayOf(PTypes.element)
    ]),
    formButtons: PTypes.oneOfType([
        PTypes.element,
        PTypes.arrayOf(PTypes.element)
    ])
};