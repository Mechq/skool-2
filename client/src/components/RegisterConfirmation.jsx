import { useEffect } from "react";

export default function AccountConfirmation({formData}) {

    console.log(formData)
    const createDatabaseAccount = (formData) => {
        console.log("Printing database info: " + formData)
        fetch('/api/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
      })
          .then(response => {
              if (!response.ok) {
                  throw response
              }
              return response.json()
          })
          .then(data => {
              console.log('Success:', data);
          })
          .catch((error) => {
              console.error('Error:', error);
          });
      }
      
      useEffect(() => {
            createDatabaseAccount(formData)
        }, [formData])
        
    return (
        <div>
            <h1>Account aangemaakt</h1>
        </div>  
    )  
}