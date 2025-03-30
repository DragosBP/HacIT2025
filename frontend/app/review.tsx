"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useState} from "react";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useUser } from "../userContext";
import secureLocalStorage from "react-secure-storage";

export default function Login() {
    const router = useRouter();
    const { setUser } = useUser();
    const [errorMessage, setErrorMessage] = useState('');

    const validationSchema = React.useMemo(
        () => 
            Yup.object().shape({
                email: Yup.string().email("Invalid email").required("Email is required"),
                password: Yup.string().min(8, "Password should be at least 8 characters").required("Password is required")
            }),
        []
    );

    const logIn = async (values: { email: string; password: string }) => {
        const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, values);
        return response.data;
    };

    const handleSubmit = async (
        values: { email: string; password: string },
        { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
    ) => {
        setErrorMessage('');
        try {
            const data = await logIn(values);
            secureLocalStorage.setItem("token", data);

            const user = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user/me`, {
                headers: {
                    Authorization: `Bearer ${data}`,
                },
            });

            if (user.status === 200) {
                setUser(user.data);
                router.push("/");
            } else {
                setErrorMessage("Invalid email or password");
            }
        } catch {
            setErrorMessage("Invalid email or password");
        }
        setSubmitting(false);
    };

    return (
        <div className="flex flex-col justify-center items-center align-middle h-[80vh]">
            <img src="./logo.png" alt="logo" className="max-w-36 max-h-36" />
            
            <Formik
                initialValues={{ email: "", password: "" }}
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
								type="email"
								id="email"
								name="email"
								placeholder="E-mail"
								className="autofill peer placeholder-white h-full w-full rounded-md border border-[#6D214F] bg-transparent px-3 py-3 font-walter text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:outline-0 disabled:border-0 disabled:bg-[#6D214F]"
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
								className="autofill peer placeholder-white h-full w-full rounded-md border border-[#6D214F] bg-transparent px-3 py-3 font-walter text-sm font-normal text-white outline outline-0 transition-all placeholder-shown:border focus:border-2 focus:outline-0 disabled:border-0 disabled:bg-[#6D214F]"
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

                        <div className="text-base text-center mb-2 mt-4 font-walter text-[#2C3A47]">Don't have an account? <a href="/register" className="text-[#182C61]">Register here!</a></div>
                        
                        <div className="flex justify-center">
                            <button 
                                className="relative before:border-solid before:border-[1px] rotate-[-0.1rad] rounded-none mt-2 text-white text-xl before:border-black font-walter h-10 w-20 before:absolute before:top-[2px] before:left-[-5px] before:w-full before:h-full bg-[#6D214F] before:-z-10 before:content-['']"
                                type="submit"
                            >
                                Login
                            </button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
