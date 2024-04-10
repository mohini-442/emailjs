import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import emoji from '../assets/images/icons8-success-64.png'
import Swal from 'sweetalert2'

export const Contactus = () => {
    const [loading, setLoading] = React.useState(false);
    const [success, setsuccess] = React.useState(false);
    const [error, seterror] = React.useState(false)

    const form = useRef();

    const sendEmail = (e) => {
        e.preventDefault();
        setLoading(true)
        emailjs
            .sendForm('service_oputy2w', 'template_pow1icq', form.current, {
                publicKey: 'aWvYs68OVYaD76bn2',

            })

            .then(
                () => {
                    console.log('SUCCESS!');
                    setLoading(false);
                    // setsuccess(true)
                    Swal.fire({
                        title: "Good job!",
                        text: "You clicked the button!",
                        icon: "success"
                    });
                },
                (error) => {
                    console.log('FAILED...', error.text);
                    setLoading(false);
                    // seterror(true)
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong!",
                        footer: '<a href="#">Why do I have this issue?</a>'
                    });
                },
            );
    };

    return (
        <div className='min-h-screen flex justify-center items-center '>
            <form className='w-[489px] mx-auto p-[32px_30px_36px_30px] bg-white border-[6px] border-[#EEF7EA] rounded-[15px]' ref={form} onSubmit={sendEmail}>
                <h2 className='text-[24px] font-libre font-normal'>Contact us! someone from <span className=' font-medium text-[#88C701] '> Evergreen </span>will reach out to you soon</h2>
                <div className='flex flex-col pt-5'>
                    <input type="text" placeholder='Name' className='w-full font-poppins outline-none focus:border-[#88C701] focus:shadow-[0px_0px_0px_3px#38B0001A] font-normal text-[16px] text-[#808080] border border-[#0000001A] p-[16px_12px] h-[48px] rounded-[10px]' name="user_name" />
                </div>
                <div className='pt-[9px]'>
                    <input type="number" placeholder='Phone' name="phn_number" className='w-full font-poppins outline-none focus:border-[#88C701] focus:shadow-[0px_0px_0px_3px#38B0001A] font-normal text-[16px] text-[#808080] border border-[#0000001A] p-[16px_12px] h-[48px] rounded-[10px]' />
                </div>
                <div className='pt-[9px]'>
                    <input type="email" placeholder='Email' name="user_email" className='w-full font-poppins outline-none focus:border-[#88C701] focus:shadow-[0px_0px_0px_3px#38B0001A] font-normal text-[16px] text-[#808080] border border-[#0000001A] p-[16px_12px] h-[48px] rounded-[10px]' />
                </div>
                <div className='pt-[9px]'>
                    <input type="text" placeholder='Address' name="address" className='w-full font-poppins outline-none focus:border-[#88C701] focus:shadow-[0px_0px_0px_3px#38B0001A] font-normal text-[16px] text-[#808080] border border-[#0000001A] p-[16px_12px] h-[48px] rounded-[10px]' />
                </div>
                <div className='pt-[9px]'>
                    <textarea type="message" name="message" placeholder='message' className='w-full h-[148px] font-poppins outline-none focus:border-[#88C701] focus:shadow-[0px_0px_0px_3px#38B0001A] font-normal text-[16px] text-[#808080] border border-[#0000001A] p-[16px_12px] resize-none rounded-[10px]' />
                </div>
                <input type="submit" value={`${loading ? "Sending..." : "Send"}`}
                    className={` ${loading ? "opacity-70" : "opacity-100"} cursor-pointer w-full p-[15px_27px] rounded-[25px] bg-[#88C701] mt-6 text-white font-poppins font-medium text-[16px]`} />
            </form>

            {success ? <div className='absolute w-[250px] h-[200px] p-[24px_12px]  bg-[#88C701] rounded-[15px] flex justify-center items-center flex-col'>
                <h3 className='font-poppins text-white text-center text-[20px] pt-2 font-medium'>successfully send</h3>
                <img src={emoji} alt="emoji" />
                <button onClick={() => setsuccess(false)} className='text-black font-medium absolute top-2 end-3'>close</button>
            </div> : ""}

            {error ? <div className='absolute w-[250px] h-[200px] p-[24px_12px]  bg-[#da321c] rounded-[15px] flex justify-center items-center flex-col'>
                <h3 className='font-poppins text-white text-center text-[20px] pt-2 font-medium'> failure</h3>
                <img src={emoji} alt="emoji" />
                <button onClick={() => seterror(false)} className='text-black font-medium absolute top-2 end-3'>close</button>
            </div> : ""}

        </div>
    );
};