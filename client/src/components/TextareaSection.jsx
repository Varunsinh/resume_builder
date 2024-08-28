import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateWorkExp } from '../redux/resumeDataSlice';

const TextareaSection = (props) => {
    const [value, setValue] = useState(props.value);
    const showErrorMessages = useSelector(state => state.dataStore.showErrorMessages);
    // const dispatch = useDispatch();

    const checkValidation = () => {
        // this function checks the validation of the input given by the user.
        let errorMessage = "";
        if (props.validation && props.validation.required && value === "") {
            //this will throw error as 'required' if the user hasn't filled that input but the validation={required:true}.
            errorMessage = '*required!'
        }

        else if(props.validation && props.validation.maxLengthRequired && value.length>props.validation.maxLengthRequired){
            // this will throw error as 'write upto n characters' when the user exceeds the character limit provided as validation={maxLengthRequired:n}.
                errorMessage='write upto '+props.validation.maxLengthRequired+' characters'
        }

        else if (props.validation && props.validation.checkType && props.validation.checkType === 'email') {
            //this will throw error as "Invalid Email address!" when the user input doesn't match with the pattern of email, if validation={checkType:email}.
            if (!(/\S+@\S+\.\S+/.test(value))) {
                errorMessage = "Invalid Email address!"
            }
        }

        return errorMessage
    }

    let errorMessage = checkValidation() // this variable stores the returned value 'i.e errorMessage' by calling the function on each render of the component.

    useEffect(() => {
        //this callback function is only called once the page renders.
        if (props.validation && props.validation.required) {
            if (value === "") {
                props.onChange(value, '*required!')
            }
        }
    }, [])


    useEffect(() => {
        // This is called everytime the input value is changed.
        // Debouncing is implemented here. So that the props.onChange() function is not called 
        // on every character input.
        let timerOutId;

        if (value !== props.value && props.onChange) {
            timerOutId = setTimeout(() => {
                //this props.onChange function sends the 'value' which equals user input to the parent component where this 'TextareaSection' component is rendered.
                //as there is no validation attribute passed to this component,as props from the parent so it will pass "" in place of errorMessage.
                props.onChange(value, "")

            }, 500)
        }
        return () => {
            clearTimeout(timerOutId)
        }
    }, [value]);


    // const handleChange = (e) => {
    //     setValue(e.target.value);
    //     dispatch(updateWorkExp({
    //         index: props.index, // Ensure you pass the correct index
    //         key: props.name, // Ensure you pass the correct key
    //         value: e.target.value
    //     }));
    // };

    return (
        <div className="flex flex-col gap-1">
            <div style={((value !== "" || showErrorMessages === true) && errorMessage !== "") ?
                { display: 'block', position: 'absolute', bottom: -18, color: "rgb(247, 89, 89)", } :
                { display: 'none' }}>{errorMessage}
            </div>
            <textarea
                cols="30" rows="5"
                {...props}
                className='outline-none border py-2 px-3 rounded-md 
        hover:border-[#adadad] focus:border-[#074468]'
                value={value || ""}
                onChange={(e) => setValue(e.target.value)}

            />
            {/* </textarea> */}
        </div>

    )
}

export default TextareaSection;