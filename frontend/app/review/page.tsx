"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useUser } from "../userContext";
import secureLocalStorage from "react-secure-storage";

export default function Review() {
    const router = useRouter();
    const { user } = useUser();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const token = secureLocalStorage.getItem("token");

    const validationSchema = Yup.object().shape({
        cartierName: Yup.string().required("Neighborhood is required"),
        title: Yup.string().required("Title is required"),
        content: Yup.string().min(10, "Review must be at least 10 characters").required("Review content is required"),
        rating: Yup.number().min(1).max(5).required("Rating is required"),
    });

    interface ReviewFormValues {
        cartierName: string;
        title: string;
        content: string;
        rating: number;
    }

    const submitReview = async (values: ReviewFormValues, { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }) => {
        try {
            const payload = {
                userId: user?._id,
                cartierName: values.cartierName,
                title: values.title,
                text: values.content,
                grade: values.rating,
            };
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/review`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (response.status === 201) {
                setSuccessMessage("Review submitted successfully!");
                setTimeout(() => router.push(`/${values.cartierName}`), 2000);
            }
        } catch (error) {
            setErrorMessage("Failed to submit review. Please try again.");
        }
        setSubmitting(false);
    };

    return (
        <div className="h-[100vh] flex flex-col justify-center items-center align-middle bg-[#7f8c8d]">
            <h1 className="text-2xl font-bold mb-4">Submit a Review</h1>
            <Formik
                initialValues={{ cartierName: "Baneasa", title: "", content: "", rating: 5 }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setErrorMessage('');
                    setSuccessMessage('');
                    submitReview(values, { setSubmitting });
                }}
            >
                {(formik) => (
                    <Form className="mt-4 w-80">
                        <div className="mb-4">
                            <Field as="select" name="cartierName" className="border rounded p-2 w-full bg-[#34495e] text-white hover:bg-[#2c3e50]">
                                <option value="Baneasa">Baneasa</option>
                                <option value="Tei">Tei</option>
                                <option value="Tei-Toboc">Tei-Toboc</option>
                                <option value="1-Mai">1-Mai</option>
                                <option value="13-Septembrie">13-Septembrie</option>
                                <option value="Aparatorii-Patriei">Aparatorii-Patriei</option>
                                <option value="Andronache">Andronache</option>
                                <option value="Aviatiei">Aviatiei</option>
                                <option value="Aviatorilor">Aviatorilor</option>
                                <option value="Berceni">Berceni</option>
                                <option value="Bucurestii-Noi">Bucurestii-Noi</option>
                                <option value="Carol">Carol</option>
                                <option value="Centrul-Vechi">Centrul-Vechi</option>
                                <option value="Vitan">Vitan</option>
                                <option value="Chitila">Chitila</option>
                                <option value="Cismigiu">Cismigiu</option>
                                <option value="Colentina">Colentina</option>
                                <option value="Constantin-Brancusi">Constantin-Brancusi</option>
                                <option value="Cotroceni">Cotroceni</option>
                                <option value="Crangasi">Crangasi</option>
                                <option value="Decebal">Decebal</option>
                                <option value="Dorobanti">Dorobanti</option>
                                <option value="Dristor">Dristor</option>
                                <option value="Drumul-Taberei">Drumul-Taberei</option>
                                <option value="Ferentari">Ferentari</option>
                                <option value="Floreasca">Floreasca</option>
                                <option value="Gara-de-Nord">Gara-de-Nord</option>
                                <option value="Giulesti">Giulesti</option>
                                <option value="Grozavesti">Grozavesti</option>
                                <option value="Herastrau">Herastrau</option>
                                <option value="Iancului">Iancului</option>
                                <option value="Izvor">Izvor</option>
                                <option value="Nerva-Traian">Nerva-Traian</option>
                                <option value="Obor">Obor</option>
                                <option value="Pantelimon">Pantelimon</option>
                                <option value="Rahova">Rahova</option>
                                <option value="Regie">Regie</option>
                                <option value="Romana">Romana</option>
                                <option value="Stefan-cel-Mare">Stefan-cel-Mare</option>
                                <option value="Theodor-Pallad">Theodor-Pallad</option>
                                <option value="Timpuri-Noi">Timpuri-Noi</option>
                                <option value="Tineretului">Tineretului</option>
                                <option value="Titan">Titan</option>
                                <option value="Vacaresti">Vacaresti</option>
                            </Field>
                            <ErrorMessage name="cartierName" component="div" className="text-red-500 mt-1" />
                        </div>
                        <div className="mb-4">
                            <Field type="text" name="title" placeholder="Review Title" className="border rounded p-2 w-full bg-[#34495e] text-white" />
                            <ErrorMessage name="title" component="div" className="text-red-500 mt-1" />
                        </div>
                        <div className="mb-4">
                            <Field as="textarea" name="content" placeholder="Write your review..." className="border rounded p-2 w-full h-20 bg-[#34495e] text-white" />
                            <ErrorMessage name="content" component="div" className="text-red-500 mt-1" />
                        </div>
                        <div className="mb-4">
                            <Field as="select" name="rating" className="border rounded p-2 w-full bg-[#34495e] text-white hover:bg-[#2c3e50]">
                                <option value="5">5 - Excellent</option>
                                <option value="4">4 - Very Good</option>
                                <option value="3">3 - Average</option>
                                <option value="2">2 - Poor</option>
                                <option value="1">1 - Terrible</option>
                            </Field>
                            <ErrorMessage name="rating" component="div" className="text-red-500 mt-1" />
                        </div>
                        {errorMessage && <div className="text-red-500 text-center mb-2">{errorMessage}</div>}
                        {successMessage && <div className="text-green-500 text-center mb-2">{successMessage}</div>}
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
                            Submit Review
                        </button>
                    </Form>
                )}
            </Formik>
        </div>
    );
}
