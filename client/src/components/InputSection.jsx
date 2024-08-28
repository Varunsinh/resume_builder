import { useEffect, useState } from "react"
import { useSelector } from "react-redux";


const InputSection = ({ label, ...props }) => {
  const [value, setValue] = useState(props.value);
  const showErrorMessages = useSelector(state => state.dataStore.showErrorMessages);


  const checkValidation =()=>{
    // this function checks the validation of the input given by the user.
    let errorMessage = "";
    if(props.validation && props.validation.required &&  value===""){
        //this will throw error as 'required' if the user hasn't filled that input but the validation={required:true}.
            errorMessage='*required!'
    }
    
    // else if(props.validation && props.validation.maxLengthRequired && value.length>props.validation.maxLengthRequired){
    //     // this will throw error as 'write upto n characters' when the user exceeds the character limit provided as validation={maxLengthRequired:n}.
    //         errorMessage='write upto '+props.validation.maxLengthRequired+' characters'
    // }

    else if(props.validation &&  props.validation.checkType && props.validation.checkType==='email'){
        //this will throw error as "Invalid Email address!" when the user input doesn't match with the pattern of email, if validation={checkType:email}.
        if(!(/\S+@\S+\.\S+/.test(value))){
            errorMessage="Invalid Email address!"
        }
    }

    return errorMessage
}

let errorMessage = checkValidation() // this variable stores the returned value 'i.e errorMessage' by calling the function on each render of the component.

useEffect(() => {
    //this callback function is only called once the page renders.
    if(props.validation && props.validation.required){
        if(value===""){
            props.onChange(value,'*required!')
        }
    }
}, [])

useEffect(() => {
// This is called everytime the input value is changed.
// Debouncing is implemented here. So that the props.onChange() function is not called 
// on every character input.

   let timerOutId;
   
   if(value !== props.value && props.onChange){
        timerOutId = setTimeout(()=>{
            if(props.validation){
                //this props.onChange function sends the 'value' which equals user input alongwith the 'errorMessage' to the parent component where this 'InputSection' component is rendered.
                props.onChange(value, errorMessage)
            }
            else{
                //if there is no validation attribute passed to this component,as props from the parent then this condition will execute.
                props.onChange(value, "")
            }
        },500)
   }
    return()=>{
        clearTimeout(timerOutId)
    }
}, [value])

  return (
    <div className="flex flex-col gap-1 relative">
      <div style={((value !== "" || showErrorMessages === true) && errorMessage !== "") ? 
      { display: 'block', position: 'absolute', bottom: -18, color: "rgb(247, 89, 89)", } : 
      { display: 'none' }}>{errorMessage}
      </div>
      {label && <label className="font-medium text-lg">{label}</label>}
      <input type="text" {...props}
        className='outline-none border py-2 px-3 rounded-md 
        hover:border-[#adadad] focus:border-[#074468]'
        value={value || ""}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  )
}

export default InputSection