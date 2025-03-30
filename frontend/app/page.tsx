"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import * as Yup from "yup";
import { Formik, Form, Field, ErrorMessage } from "formik";

export default function ReviewForm() {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const validationSchema = Yup.object().shape({
        title: Yup.string().required("Title is required"),
        content: Yup.string().min(10, "Review must be at least 10 characters").required("Review content is required"),
        rating: Yup.number().min(1).max(5).required("Rating is required"),
    });

    const submitReview = async (values: { title: string; content: string; rating: number }) => {
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/reviews`, values);
            if (response.status === 201) {
                setSuccessMessage("Review submitted successfully!");
                setTimeout(() => router.push("/reviews"), 2000);
            }
        } catch (error) {
            setErrorMessage("Failed to submit review. Please try again.");
        }
    };

    return (
        <div className="flex flex-col justify-center items-center align-middle h-[80vh]">
            <h1 className="text-2xl font-bold mb-4">Submit a Review</h1>

            <Formik
                initialValues={{ title: "", content: "", rating: 5 }}
                validationSchema={validationSchema}
                onSubmit={(values, { setSubmitting }) => {
                    setErrorMessage('');
                    setSuccessMessage('');
                    submitReview(values);
                    setSubmitting(false);
                }}
            >
                {(formik) => (
                    <Form className="mt-4 w-80">
                        <div className="mb-4">
                            <Field
                                type="text"
                                name="title"
                                placeholder="Review Title"
                                className="border rounded p-2 w-full"
                            />
                            <ErrorMessage name="title" component="div" className="text-red-500 mt-1" />
                        </div>

                        <div className="mb-4">
                            <Field
                                as="textarea"
                                name="content"
                                placeholder="Write your review..."
                                className="border rounded p-2 w-full h-20"
                            />
                            <ErrorMessage name="content" component="div" className="text-red-500 mt-1" />
                        </div>

                        <div className="mb-4">
                            <Field as="select" name="rating" className="border rounded p-2 w-full">
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