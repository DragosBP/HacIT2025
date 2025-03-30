"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState} from "react";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function Register() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');

    const validationSchema = React.useMemo(
        () => 
            Yup.object().shape({
                firstName: Yup.string().required("First name is required"),
                lastName: Yup.string().required("Last name is required"),
                email: Yup.string().email("Invalid email").required("Email is required"),
                password: Yup.string().min(8, "Password should be at least 8 characters").required("Password is required")
            }),
        []
    );

    const register = async (values: { firstName: string; lastName: string; email: string; password: string }) => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, values);
        return response.data;
    };

    const handleSubmit = async (
        values: { firstName: string; lastName: string; email: string; password: string },
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        setErrorMessage('');
        try {
            await register(values);
            router.push("/login");
        } catch {
            setErrorMessage("Email already exists");
        }
        setSubmitting(false);
    };

    return (
        <div className="flex flex-col justify-center items-center align-middle h-[100vh] bg-[#7f8c8d]">
            <img src="./logoHack.png" alt="logo" className="max-w-36 max-h-36" />
                    
            <Formik
                initialValues={{ firstName: "", lastName: "", email: "", password: "" }}
                enableReinitialize
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) =>
                    handleSubmit(values, { setSubmitting })
                }
            >
                {(formik) => (
                    <Form className="mt-8 mb-2 w-80">
                        <div className="flex flex-col mb-6">
                            <Field
                                type="text"
                                id="firstName"
                                name="firstName"
                                placeholder="First name"
                                className="autofill peer placeholder-white h-full w-full rounded-md border border-[#2D2D2D] bg-transparent px-3 py-3 font-walter text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:outline-0 disabled:border-0 disabled:bg-[#2D2D2D]"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 mt-2 align-middle text-center font-walter"
                            />
                        </div>

                        <div className="flex flex-col mb-6">
                            <Field
                                type="text"
                                id="lastName"
                                name="lastName"
                                placeholder="Last name"
                                className="autofill peer placeholder-white h-full w-full rounded-md border border-[#2D2D2D] bg-transparent px-3 py-3 font-walter text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:outline-0 disabled:border-0 disabled:bg-[#2D2D2D]"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 mt-2 align-middle text-center font-walter"
                            />
                        </div>

                        <div className="flex flex-col mb-6">
                            <Field
                                type="email"
                                id="email"
                                name="email"
                                placeholder="E-mail"
                                className="autofill peer placeholder-white h-full w-full rounded-md border border-[#2D2D2D] bg-transparent px-3 py-3 font-walter text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:outline-0 disabled:border-0 disabled:bg-[#2D2D2D]"
                            />
                            <ErrorMessage
                                name="email"
                                component="div"
                                className="text-red-500 mt-2 align-middle text-center font-walter"
                            />
                        </div>
        
                        <div className="flex flex-col mb-6">
                            <Field
                                type="password"
                                id="password"
                                name="password"
                                placeholder="********"
                                className="autofill peer placeholder-white h-full w-full rounded-md border border-[#2D2D2D] bg-transparent px-3 py-3 font-walter text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:outline-0 disabled:border-0 disabled:bg-[#2D2D2D]"
                            />
                            <ErrorMessage
                                name="password"
                                component="div"
                                className="text-red-500 mt-2 align-middle text-center font-walter"
                            />
                        </div>
                                
                        {errorMessage && (
                            <div className="text-red-500 text-center mb-2 font-walter">{errorMessage}</div>
                        )}
                                
                        <div className="flex justify-center">
                            <button 
                                className="relative before:border-solid before:border-[1px] rotate-[-0.1rad] rounded-none mt-2 text-white text-xl before:border-black font-walter h-10 w-20 before:absolute before:top-[2px] before:left-[-5px] before:w-full before:h-full bg-[#2980b9] before:-z-10 before:content-['']"
                                type="submit"
                            >
                                Register
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}