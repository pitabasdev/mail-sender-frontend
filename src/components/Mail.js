import React, { useState } from 'react'
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';

export default function Mail() {
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('');
    const[message,setMessage]=useState('')
    const [show, setShow] = useState(false);
    console.log(email, subject);

    const submit = async (e) => {
        e.preventDefault();
        const res=await fetch('http://localhost:5000/mail',{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({
                email,subject,message

            })
        })
        const data = await res.json();
        console.log(data);

        if (data.status === 401 || !data) {
            console.log("error")
        } else {
            setShow(true);
            setEmail("")
            console.log("Email sent")
        }

    }
    return (
        <div>
            {
                show ? <Alert variant="primary" onClose={() => setShow(false)} dismissible>
                    Your Email Succesfully Send
                </Alert> : ""
            }
            <div className='d-flex justify-content-center mt-3'>
                <h2>Send Mail to your Friend😁</h2>
            </div>
            <div className='d-flex justify-content-center mt-3 '>
                <Form className='mt-2 col-lg-4'>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Enter Your Friend Gmail</Form.Label>
                        <Form.Control onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter email" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicText">
                        <Form.Label>Title of the Message means Subject</Form.Label>
                        <Form.Control onChange={(e) => setSubject(e.target.value)} type="text" placeholder="Enter Subject" />
                    </Form.Group>

                    <FloatingLabel
                        controlId="floatingTextarea"
                        label="Enter Your Message....."
                        className="mb-3"
                    >
                        <Form.Control onChange={(e) => setMessage(e.target.value)} as="textarea" placeholder="Enter Your Message....." />
                    </FloatingLabel>

                    <Button variant="primary" onClick={submit} type="submit">
                        Send
                    </Button>
                </Form>
            </div>
        </div>
    )
}
