import PTypes from 'prop-types';
const DialogModal = ({ modalID = "modal", modalElements = <></> }) => {
    return <dialog id={modalID}>
        {Array.isArray(modalElements) ? modalElements : [modalElements]}
    </dialog>
}
export default DialogModal

DialogModal.propTypes = {
    modalElements: PTypes.oneOfType([
        PTypes.element,
        PTypes.arrayOf(PTypes.element)
    ]),
    modalID: PTypes.string
}