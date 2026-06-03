import React from 'react'
import { AccountBtn } from '../components/AccountBtn';
import { loginContent } from '../utils/loginContent';

const Login = () => {
    return (
        <div className='w-screen h-screen flex items-center justify-center inter-font'>
            <div className='flex flex-col items-center justify-center px-8 py-6 gap-6 border-1 border-amber-100 rounded-xl'>
                <div className='flex flex-col items-center gap-2'>
                    <img src={loginContent.img} alt="" className='w-25 h-25 rounded-full' />
                    <div className='flex flex-col items-center'>
                        <h2 className='text-xl font-bold'>{loginContent.head}</h2>
                        <h4 className='text-gray-500'>{loginContent.subHead}</h4>
                    </div>
                </div>
                <div className='flex flex-col gap-3'>
                    <div>
                        <h1 className='text-2xl font-bold'>{loginContent.welcome}</h1>
                        <h4 className='text-gray-500'>{loginContent.guide}</h4>
                    </div>

                    <div className='flex flex-col gap-4 w-full'>
                        {loginContent.inputs.map((item, idx) => (
                            <div key={idx} className='flex flex-col gap-1 text-sm w-full'>
                                <label htmlFor={`input-${idx}`} className='text-gray-300'>{item.label}</label>

                                <input id={`input-${idx}`} type={item.type} placeholder={item.placeholder} className='border-1 focus:border-2 px-2 py-3 rounded-xl w-full min-w-[300px] outline-none' />
                            </div>
                        ))}
                    </div>

                    <div className='flex justify-end text-sm text-blue-600 cursor-pointer'>
                        <h3>{loginContent.forgot}</h3>
                    </div>

                    <div className='pt-4'>
                        <AccountBtn 
                        text={loginContent.button.text}
                        type={loginContent.button.type}
                        />
                    </div>

                    <div className='flex gap-1 justify-center'>
                        <h2 className='text-gray-500'>{loginContent.signupQuery}</h2>
                        <h3 className='text-blue-600 cursor-pointer'>{loginContent.signupLinkText}</h3>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;