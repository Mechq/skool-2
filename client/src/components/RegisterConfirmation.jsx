export default function AccountConfirmation(formData) {

    const checkFormData = () => {
        console.log(formData);
    }

    return (
        <div>
            <h1>Account aangemaakt</h1>

            <button onClick={checkFormData()}>check formData</button>
        </div>  
    )  
}