import React, { useState, useRef } from 'react';
import emailjs from 'emailjs-com';
import Swal from 'sweetalert2';

export const Contactus = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        number: "",
        email: "",
        address: "",
        message: "",
    });

    const inputCon = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const validateForm = () => {
        const regex = {
            name: /^[a-zA-Z\s]+$/,
            number: /^[0-9]+$/,
            email: /^\S+@\S+\.\S+$/,
            address: /^[a-zA-Z0-9\s,.'-]{3,}$/,
            message: /^[a-zA-Z\s]+$/,
        };

        const errors = {};

        if (!regex.name.test(formData.name.trim())) {
            errors.name = "Invalid name";
        }

        if (!regex.number.test(formData.number.trim())) {
            errors.number = "Invalid number";
        }

        if (!regex.email.test(formData.email.trim())) {
            errors.email = "Invalid email";
        }

        if (!regex.address.test(formData.address.trim())) {
            errors.address = "Invalid address";
        }

        if (!regex.message.test(formData.message.trim())) {
            errors.message = "Invalid message";
        }

        return errors;
    };

    const formRef = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        const errors = validateForm();

        if (Object.keys(errors).length !== 0) {
            setError(errors);
            return;
        }

        setLoading(true);

        emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', formRef.current, 'YOUR_USER_ID')
            .then((result) => {
                console.log('Email successfully sent!', result.text);
                setLoading(false);
                setSuccess(true);
                Swal.fire({
                    title: "Success!",
                    text: "Your message has been sent successfully!",
                    icon: "success"
                });
            }, (error) => {
                console.error('Email sending failed:', error.text);
                setLoading(false);
                setError(true);
                Swal.fire({
                    title: "Error!",
                    text: "Failed to send your message. Please try again later.",
                    icon: "error"
                });
            });

        setFormData({
            name: "",
            number: "",
            email: "",
            address: "",
            message: "",
        });
    };

    return (
        <div className='min-h-screen flex justify-center items-center '>
            <form className='w-[489px] mx-auto p-[32px_30px_36px_30px] bg-white border-[6px] border-[#EEF7EA] rounded-[15px]' ref={formRef} onSubmit={sendEmail}>
                <h2 className='text-[24px] font-libre font-normal'>Contact us! someone from <span className=' font-medium text-[#88C701] '> Evergreen </span>will reach out to you soon</h2>
                <div className='flex flex-col pt-5'>
                    <input type="text" placeholder='Name' className='w-full font-poppins outline-none focus:border-[#88C701] focus:shadow-[0px_0px_0px_3px#38B0001A] font-normal text-[16px] text-[#808080] border border-[#0000001A] p-[16px_12px] h-[48px] rounded-[10px]' name="name" value={formData.name} onChange={inputCon} />
                    {error.name && <p className="font-Exo font-normal text-red-800 ">{error.name}</p>}
                </div>
                <div className='pt-[9px]'>
                    <input type="text" placeholder='Phone' className='w-full font-poppins outline-none focus:border-[#88C701] focus:shadow-[0px_0px_0px_3px#38B0001A] font-normal text-[16px] text-[#808080] border border-[#0000001A] p-[16px_12px] h-[48px] rounded-[10px]' name="number" value={formData.number} onChange={inputCon} />
                    {error.number && <p className="font-Exo font-normal text-red-800 ">{error.number}</p>}
                </div>
                <div className='pt-[9px]'>
                    <input type="email" placeholder='Email' name="email" className='w-full font-poppins outline-none focus:border-[#88C701] focus:shadow-[0px_0px_0px_3px#38B0001A] font-normal text-[16px] text-[#808080] border border-[#0000001A] p-[16px_12px] h-[48px] rounded-[10px]' value={formData.email} onChange={inputCon} />
                    {error.email && <p className="font-Exo font-normal text-red-800 ">{error.email}</p>}
                </div>
                <div className='pt-[9px]'>
                    <input type="text" placeholder='Address' name="address" className='w-full font-poppins outline-none focus:border-[#88C701] focus:shadow-[0px_0px_0px_3px#38B0001A] font-normal text-[16px] text-[#808080] border border-[#0000001A] p-[16px_12px] h-[48px] rounded-[10px]' value={formData.address} onChange={inputCon} />
                    {error.address && <p className="font-Exo font-normal text-red-800 ">{error.address}</p>}
                </div>
                <div className='pt-[9px]'>
                    <textarea placeholder='Message' name="message" className='w-full h-[148px] font-poppins outline-none focus:border-[#88C701] focus:shadow-[0px_0px_0px_3px#38B0001A] font-normal text-[16px] text-[#808080] border border-[#0000001A] p-[16px_12px] resize-none rounded-[10px]' value={formData.message} onChange={inputCon}></textarea>
                    {error.message && <p className="font-Exo font-normal text-red-800 ">{error.message}</p>}
                </div>
                <input type="submit" value={`${loading ? "Sending..." : "Send"}`} className={` ${loading ? "opacity-70" : "opacity-100"} cursor-pointer w-full p-[15px_27px] rounded-[25px] bg-[#88C701] mt-6 text-white font-poppins font-medium text-[16px]`} />

                {/* {success && <div className='absolute w-[250px] h-[200px] p-[24px_12px]  bg-[#88C701] rounded-[15px] flex justify-center items-center flex-col'>
                    <h3 className='font-poppins text-white text-center text-[20px] pt-2 font-medium'>Successfully sent</h3>
                    <img src={emoji} alt="emoji" />
                    <button onClick={() => setSuccess(false)} className='text-black font-medium absolute top-2 end-3'>Close</button>
                </div>} */}
            </form>
        </div>
    );
};
