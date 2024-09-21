"use client";
import React from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Formik } from "formik";
import axios from "axios";
import {API_ENDPOINTS} from "@/lib/apiConfig";
import {useRouter} from "next/navigation";
import {toast, Bounce, ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormValues {
    username: string;
    password: string;
    confirmpassword: string;
}
export function SignupFormDemo() {
const router = useRouter();
const [loading, setLoading] = React.useState(false);
    return (
        <div
            className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200 text-center">
                Welcome to News Portal
            </h2>
                <ToastContainer/>
            <Formik
                initialValues={{username: "", password: "", confirmpassword: ""}}
                validate={(values: FormValues) => {
                    const errors: { [key: string]: string } = {};
                    if (!values.username) {
                        errors.username = "User name is required";
                    }
                    if (!values.password) {
                        errors.password = "Password is required";
                    } else if (values.password !== values.confirmpassword) {
                        errors.confirmpassword = "Passwords do not match";
                    }
                    return errors;
                }}
                onSubmit={async (values: FormValues, {setSubmitting, resetForm}) => {

                    setLoading(true)
                    try {
                        const response = await axios.post(API_ENDPOINTS.REGISTER, {
                            username: values.username,
                            password: values.password,
                        });
                        localStorage.setItem("token", response.data.token);
                        console.log(response)
                        toast.success('🦄 Register successfully!', {
                            position: "top-right",
                            autoClose: 5000,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                            theme: "light",
                            transition: Bounce,
                        });
                        setLoading(false)
                        resetForm();
                        router.push('/auth/login');
                    } catch (error: any) {
                        console.log("Error registering user:", error.response?.data.message);
                        toast.error(error.response?.data.message,{
                                position: "top-right",
                                autoClose: 5000,
                                hideProgressBar: false,
                                closeOnClick: true,
                                pauseOnHover: true,
                                draggable: true,
                                progress: undefined,
                                theme: "light",
                                transition: Bounce,
                        }
                        )
                        setLoading(false)

                    } finally {
                        setSubmitting(false);
                    }
                }}
            >
                {({
                      values,
                      errors,
                      touched,
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                  }) => (
                    <form className="my-8" onSubmit={handleSubmit}>
                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="username">User Name</Label>
                            <Input
                                id="username"
                                placeholder="User Name"
                                type="text"
                                name="username"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.username}
                            />
                            {errors.username && touched.username && (
                                <div className="text-red-500">{errors.username}</div>
                            )}
                        </LabelInputContainer>

                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                placeholder="••••••••"
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            {errors.password && touched.password && (
                                <div className="text-red-500">{errors.password}</div>
                            )}
                        </LabelInputContainer>

                        <LabelInputContainer className="mb-4">
                            <Label htmlFor="confirmpassword">Confirm Password</Label>
                            <Input
                                id="confirmpassword"
                                placeholder="••••••••"
                                type="password"
                                name="confirmpassword"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.confirmpassword}
                            />
                            {errors.confirmpassword && touched.confirmpassword && (
                                <div className="text-red-500">{errors.confirmpassword}</div>
                            )}
                        </LabelInputContainer>

                        <button
                            className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            {
                                loading ? <div role="status">
                                    <svg aria-hidden="true"
                                         className="inline w-4 h-4 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                         viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                            fill="currentColor"/>
                                        <path
                                            d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                            fill="currentFill"/>
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div> : <div> Sign up &rarr;</div>
                            }

                            <BottomGradient/>
                        </button>
                    </form>
                )}
            </Formik>
            <Link href={"/auth/login"}>
                <div className={cn('spinner-border')}></div>
                <button
                    className="bg-gradient-to-bl relative group/btn from-gray-500 dark:from-zinc-400 dark:to-zinc-400 to-neutral-600 block dark:bg-zinc-400 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]">
                    Login &rarr;
                    <BottomGradient/>
                </button>


            </Link>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span
                className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"/>
            <span
                className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent"/>
        </>
    );
};

const LabelInputContainer = ({
                                 children,
                                 className,
                             }: {
    children: React.ReactNode;
    className?: string;
}) => {
    return <div className={cn("flex flex-col space-y-2 w-full", className)}>{children}</div>;
};
