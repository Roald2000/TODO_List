import PTypes from 'prop-types';

import { useEffect, useRef, useState } from 'react';

import { MakeRequest, closeModal, openModal } from './Helper.js';

import Form from './components/Form.jsx';
import LabelInput from './components/LabelINput.jsx';
import FormSubmitButton from './components/FormSubmitButton.jsx';
import DialogModal from './components/DialogModal.jsx';

const { fetchData, insertData, updateData, deleteData } = MakeRequest;

const ListItems = ({ data, setUpdateValues, loadList }) => {
    if (Array.isArray(data)) {
        return data.map((item, key) => (

            <tr key={key} className={'bg-blue-100'} >
                <td className='p-1 text-start'>{item.todo_id}</td>
                <td className='p-1 text-start'>{item.todo}</td>
                <td className='p-1 text-start'>{item.start_date}</td>
                <td className='p-1 text-start'>{item.due_date}</td>
                <td className='p-1 text-start flex flex-row gap-3'>
                    <button type='button' onClick={() => {
                        openModal('md');
                        setUpdateValues({
                            'todo_id': item.todo_id,
                            'todo': item.todo,
                            'start_date': item.start_date,
                            'due_date': item.due_date
                        })
                    }}>Modify</button>
                    <button type='button' onClick={async () => {
                        try {
                            const response = await deleteData(`/todo_delete/${item.todo_id}`);
                            const { data } = response;
                            alert(data);
                            setTimeout(loadList, 100);
                        } catch (error) {
                            console.error(error.message);
                        }
                    }}>Delete</button>
                </td>
            </tr >
        ));
    } else {
        return (
            <tr>
                <td colSpan={5} className='bg-red-700 text-white p-1 text-center'>{data}</td>
            </tr>
        );
    }
};

ListItems.propTypes = {
    data: PTypes.oneOfType([
        PTypes.array,
        PTypes.string
    ]),
    setUpdateValues: PTypes.func,
    loadList: PTypes.func

};


const App = () => {

    const [inputValue, setInputValue] = useState();
    const [listValues, setListValues] = useState();

    //#region
    const loadList = async () => {
        try {
            const response = await fetchData('/todo_list');
            const { data } = response;
            setListValues(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        loadList();
    }, []);

    const handleInputChange = (e) => {
        setInputValue((values) => ({ ...values, [e.target.id]: e.target.value }));
    };

    const handleAddItem = async (event) => {
        event.preventDefault();
        try {
            const { start_date, due_date } = inputValue;

            const startDate = start_date.split('-')[2];
            const dueDate = due_date.split('-')[2];

            if (startDate > dueDate) {
                alert('Start Date cannot be set after Before Date!');
            } else {
                const response = await insertData('/todo_add', inputValue);
                const { data } = response;
                alert(data);
                loadList();
            }

        } catch (error) {
            console.error(error.message);
        }
    };

    const handleClear = async (event) => {
        event.preventDefault();
        try {
            const response = await deleteData('/todo_clear');
            const { data } = response;
            alert(data);
            setTimeout(loadList, 100);
        } catch (error) {
            console.error(error.message);
        }
    };
    //#endregion
    // Initialize state variables for update values
    const [updateValues, setUpdateValues] = useState({
        todoId: null,
        todo: null,
        startDate: null,
        dueDate: null
    });

    // Create refs for input elements
    const todoInputRef = useRef(null);
    const startDateInputRef = useRef(null);
    const dueDateInputRef = useRef(null);

    // Handle the submission of the update form
    const handleModalSubmitUpdate = async (event) => {
        event.preventDefault();
        try {
            const startDate = parseInt(startDateInputRef.current.value.split('-')[2]);
            const dueDate = parseInt(dueDateInputRef.current.value.split('-')[2]);

            if (startDate > dueDate) {
                alert('Start Date cannot be set after Due Date!');
            } else {
                const payload = {
                    todo: todoInputRef.current.value,
                    start_date: startDateInputRef.current.value,
                    due_date: dueDateInputRef.current.value
                };

                const response = await updateData('/todo_update/' + updateValues?.todoId, payload);
                const { data } = response;
                alert(data);
                setTimeout(loadList, 100);
            }
        } catch (error) {
            console.log(error);
        }
    };


    return (
        <div className='flex flex-col justify-start items-start'>

            <DialogModal
                modalID='md'
                modalElements={
                    <Form key={1}
                        formClass={'p-3 bg-[#ccc3] rounded-md w-[368px] flex flex-col gap-3'}
                        formSubmit={handleModalSubmitUpdate}
                        formTitle={`Modifying Item #${updateValues.todo_id}`}
                        formInputWrapperClass={'flex flex-col gap-2'}
                        formInputs={[
                            <LabelInput
                                key={1}
                                labelClass={"flex flex-col gap-1"}
                                inputType={"text"}
                                inputText={"Todo"}
                                inputClass={"p-1 rounded-md bg-slate-200"}
                                inputOnChange={handleInputChange}
                                inputID={"todo"}
                                inputRequired={true}
                                inputRef={todoInputRef}
                                inputDefaultValue={updateValues.todo}
                            />,
                            <LabelInput
                                key={2}
                                labelClass={"flex flex-col gap-1"}
                                inputType={"date"}
                                inputText={"Start Date"}
                                inputClass={"p-1 rounded-md bg-slate-200"}
                                inputOnChange={handleInputChange}
                                inputID={"start_date"}
                                inputRequired={true}
                                inputRef={startDateInputRef}
                                inputDefaultValue={updateValues.start_date}
                            />,
                            <LabelInput
                                key={3}
                                labelClass={"flex flex-col gap-1"}
                                inputType={"date"}
                                inputText={"Due Date"}
                                inputClass={"p-1 rounded-md bg-slate-200"}
                                inputOnChange={handleInputChange}
                                inputID={"due_date"}
                                inputRequired={true}
                                inputRef={dueDateInputRef}
                                inputDefaultValue={updateValues.due_date}
                            />,
                        ]}
                        formSubmitWrapperClass={''}
                        formButtons={[
                            <FormSubmitButton key={1} buttonType='submit' buttonText='Submit' />,
                            <FormSubmitButton key={2} buttonClick={() => closeModal('md')} buttonText='Close' />
                        ]}
                    />} />

            <Form
                formClass={'flex flex-col gap-3 p-6 rounded-md bg-slate-300 mx-auto my-6  w-[468px]'}
                formSubmit={handleAddItem}
                formTitle={"TODO List"}
                formInputWrapperClass={'flex flex-col gap-1 items-stretch justify-stretch'}
                formInputs={[
                    <LabelInput
                        key={1}
                        labelClass={"flex flex-col gap-1"}
                        inputType={"text"}
                        inputText={"Todo"}
                        inputClass={"p-1 rounded-md bg-slate-100"}
                        inputOnChange={handleInputChange}
                        inputID={"todo"}
                        inputRequired={true}
                    />,
                    <LabelInput
                        key={2}
                        labelClass={"flex flex-col gap-1"}
                        inputType={"date"}
                        inputText={"Start Date"}
                        inputClass={"p-1 rounded-md bg-slate-100"}
                        inputOnChange={handleInputChange}
                        inputID={"start_date"}
                        inputRequired={true}
                    />,
                    <LabelInput
                        key={3}
                        labelClass={"flex flex-col gap-1"}
                        inputType={"date"}
                        inputText={"Due Date"}
                        inputClass={"p-1 rounded-md bg-slate-100"}
                        inputOnChange={handleInputChange}
                        inputID={"due_date"}
                        inputRequired={true}
                    />,

                ]}
                formSubmitWrapperClass={'flex flex-row gap-1 items-stretch justify-stretch'}
                formButtons={[
                    <FormSubmitButton key={1} buttonType={"submit"} buttonText={"Add"} />,
                    <FormSubmitButton key={2} buttonType={"reset"} buttonClick={handleClear} buttonText={"Reset"} />
                ]} />

            <table className=' mx-auto my-6 w-[568px]'>
                <thead>
                    <tr className='bg-blue-500'>
                        <th className='p-2 text-start'>ID</th>
                        <th className='p-2 text-start'>To Do</th>
                        <th className='p-2 text-start'>Start</th>
                        <th className='p-2 text-start'>Due</th>
                        <th className='p-2 text-start'>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <ListItems
                        data={listValues}
                        setUpdateValues={setUpdateValues}
                        loadList={loadList}
                    />
                </tbody>
            </table>

        </div>
    );
};

export default App;


