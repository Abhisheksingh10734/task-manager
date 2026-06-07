import React, { useState } from "react";
import { AccountBtn } from "../components/AccountBtn";
import { loginContent } from "../utils/loginContent";
import { api } from "../api/axios";
import { validateLogin } from "../utils/validateLogin";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import LoginLoader from "../components/Loader";

const Login = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ email: "", password: "" });
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateLogin(formData);
        if (Object.keys(validationErrors).length > 0) {
            toast.error(Object.values(validationErrors)[0], {
                id: "error"
            });
            return;
        }

        try {
            setIsLoading(true);
            const res = await api.post("/api/login", formData);
            setIsLoading(false);
            toast.success("Login successful");

                setTimeout(() => navigate("/app/dashboard"), 500);

        } catch (err) {
            toast.error(err.response?.data?.message || "Login failed");
        } finally {
            setIsLoading(false);
        }

        setFormData({
            email: "",
            password: ""
        });
    };

    return (
        <>

        <LoginLoader isLoading={isLoading}/>

        <div className="w-screen h-screen flex items-center justify-center inter-font">

            {/* FORM WRAPPER */}
            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center justify-center px-8 py-6 gap-6 border-1 border-amber-100 rounded-xl"
            >
                {/* HEADER */}
                <div className="flex flex-col items-center gap-2">
                    <img
                        src={loginContent.img}
                        alt=""
                        className="w-25 h-25 rounded-full"
                    />
                    <div className="flex flex-col items-center">
                        <h2 className="text-xl font-bold">{loginContent.head}</h2>
                        <h4 className="text-gray-500">{loginContent.subHead}</h4>
                    </div>
                </div>

                {/* TITLE */}
                <div className="flex flex-col gap-3">
                    <div>
                        <h1 className="text-2xl font-bold">{loginContent.welcome}</h1>
                        <h4 className="text-gray-500">{loginContent.guide}</h4>
                    </div>

                    {/* DYNAMIC INPUTS */}
                    <div className="flex flex-col gap-4 w-full">
                        {loginContent.inputs.map((item, idx) => (
                            <div key={idx} className="flex flex-col gap-1 text-sm w-full">
                                <label className="text-gray-300">{item.label}</label>

                                <input
                                    name={item.name}
                                    type={item.type}
                                    placeholder={item.placeholder}
                                    onChange={handleChange}
                                    value={formData[item.name] || ""}
                                    autoComplete='off'
                                    className="border-1 focus:border-2 px-2 py-3 rounded-xl w-full min-w-[300px] outline-none"
                                />
                            </div>
                        ))}
                    </div>

                    {/* FORGOT PASSWORD */}
                    <div className="flex justify-end text-sm text-blue-600 cursor-pointer">
                        <h3>{loginContent.forgot}</h3>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <div className="pt-4 active:scale-95 transition-all">
                        <AccountBtn
                            text={loginContent.button.text}
                            type={loginContent.button.type}
                        />
                    </div>

                    {/* SIGNUP */}
                    <div className="flex gap-1 justify-center">
                        <h2 className="text-gray-500">
                            {loginContent.signupQuery}
                        </h2>
                        <Link to="/signup"><h3 className="text-blue-600 cursor-pointer">
                            {loginContent.signupLinkText}
                        </h3></Link>
                    </div>
                </div>
            </form>
        </div>
        </>
    );
};

export default Login;