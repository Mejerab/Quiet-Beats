import { FaEye, FaEyeSlash, FaFacebookF } from "react-icons/fa";
import Ballpit from "../animation/BallPit";
import SplitedText from "../animation/SplitedText";
import PointHook from "../hooks/PointHook";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useContext, useState } from "react";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import toast from "react-hot-toast";
import useAxiosPublic from "../hooks/useAxiosPublic";
import OTPInput from "react-otp-input";

const Login = () => {
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const [otp, setOtp] = useState(false);
    const [show, setShow] = useState(false);
    const [ema, setEmail] = useState(null);
    SplitedText();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });
    const {
        register: register2,
        handleSubmit: handleSubmit2,
        formState: { errors: err },
    } = useForm({ mode: 'onSubmit', reValidateMode: 'onSubmit' });
    errors;
    err;
    const { login, googleLogin, facebookLogin } = useContext(AuthContext);
    const onSubmit = async (data) => {
        if (!data.email) return;
        try {
            const result = await axiosPublic.post(`/exist/${data.email}`);
            const output = result.data.success;
            if (output) {
                const send = await axiosPublic.post('/send-email', { email: data.email });
                if (send.data) {
                    setEmail(data.email);
                    setStep(2);
                }
            }
            else {
                return Swal.fire({
                    title: 'Error!',
                    text: 'Email not found.',
                    icon: 'error',
                    confirmButtonText: 'Return',
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    backdrop: 'blur(50px) grayscale(50%)',
                    customClass: {
                        confirmButton: 'swalButton',
                    }
                })
            }
        } catch (error) {
            console.log(error);
        }
        // login(data.email, data.pass)
        //     .then(async (result) => {
        //         if (result) {
        //             const res = await axiosPublic.post('/users', { email: data.email })
        //             if (res.data.success) {
        //                 setType(true);
        //                 setEmail(data.email);
        //             }
        //         }
        //     })
        //     .catch(error => {
        //         console.log(error);
        //         Swal.fire({
        //             title: 'Error!',
        //             text: 'Invalid Email or Password.',
        //             icon: 'error',
        //             confirmButtonText: 'Return',
        //             background: 'rgba(0, 0, 0, 0.5)',
        //             color: 'white',
        //             backdrop: 'blur(50px) grayscale(50%)',
        //             customClass: {
        //                 confirmButton: 'swalButton',
        //             }
        //         })
        //     })
    }
    const onError = (errors) => {
        for (const msg of Object.values(errors)) {
            toast.error(msg.type === 'minLength' ? 'Passowrd must have 7 characters' : msg.message, {
                style: {
                    background: 'rgba(0, 0, 0, 0.6)',
                    border: '1px solid #49DC67',
                    color: 'white'
                }
            })
        }
    }
    const onErr = (err) => {
        for (const msg of Object.values(err)) {
            toast.error(msg.type === 'minLength' ? 'Passowrd must have 7 characters' : msg.message, {
                style: {
                    background: 'rgba(0, 0, 0, 0.6)',
                    border: '1px solid #49DC67',
                    color: 'white'
                }
            })
        }
    }
    const handleGoogle = () => {
        googleLogin()
            .then(async (result) => {
                console.log(result);
                try {
                    const res = await axiosPublic.get(`/user/${result.user.email}`)
                    if (res.data === "") {
                        const data = {
                            name: result.user.displayName,
                            email: result.user.email,
                            image: result.user.photoURL,
                            provider: result.providerId
                        }
                        const postRes = await axiosPublic.post('/verify', data)
                        if (postRes.data) {
                            Swal.fire({
                                title: 'Success',
                                text: 'You have successfully logged in.',
                                icon: 'success',
                                confirmButtonText: 'Continue',
                                background: 'rgba(0, 0, 0, 0.5)',
                                color: 'white',
                                backdrop: 'blur(50px) grayscale(50%)',
                                customClass: {
                                    confirmButton: 'swalButton',

                                }
                            });
                            navigate('/dashboard');
                        }
                        else {
                            Swal.fire({
                                title: 'Error!',
                                text: 'Facing some problems to let you in. Try again later.',
                                icon: 'error',
                                confirmButtonText: 'Return',
                                background: 'rgba(0, 0, 0, 0.5)',
                                color: 'white',
                                backdrop: 'blur(50px) grayscale(50%)',
                                customClass: {
                                    confirmButton: 'swalButton',
                                }
                            })
                        }
                    }
                    else {
                        Swal.fire({
                            title: 'Success',
                            text: 'You have successfully logged in.',
                            icon: 'success',
                            confirmButtonText: 'Continue',
                            background: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            backdrop: 'blur(50px) grayscale(50%)',
                            customClass: {
                                confirmButton: 'swalButton',

                            }
                        });
                        navigate('/dashboard');
                    }
                } catch (err) {
                    console.log(err);
                    if (err === 'auth/account-exists-with-different-credential') {
                        return Swal.fire({
                            title: 'Error!',
                            text: 'This emailalready logged in with different credential.',
                            icon: 'error',
                            confirmButtonText: 'Return',
                            background: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            backdrop: 'blur(50px) grayscale(50%)',
                            customClass: {
                                confirmButton: 'swalButton',
                            }
                        })
                    }
                    Swal.fire({
                        title: 'Error!',
                        text: 'Facing some problems to let you in. Try again later.',
                        icon: 'error',
                        confirmButtonText: 'Return',
                        background: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        backdrop: 'blur(50px) grayscale(50%)',
                        customClass: {
                            confirmButton: 'swalButton',
                        }
                    })
                }
            })
    }
    const handleFacebook = () => {
        facebookLogin()
            .then(async (result) => {
                try {
                    const res = await axiosPublic.get(`/user/${result.user.email}`)
                    if (res.data === "") {
                        const data = {
                            name: result.user.displayName,
                            email: result.user.email,
                            image: result.user.photoURL,
                            provider: result.providerId
                        }
                        const postRes = await axiosPublic.post('/verify', data)
                        if (postRes.data) {
                            Swal.fire({
                                title: 'Success',
                                text: 'You have successfully logged in.',
                                icon: 'success',
                                confirmButtonText: 'Continue',
                                background: 'rgba(0, 0, 0, 0.5)',
                                color: 'white',
                                backdrop: 'blur(50px) grayscale(50%)',
                                customClass: {
                                    confirmButton: 'swalButton',

                                }
                            });
                            navigate('/dashboard');
                        }
                        else {
                            Swal.fire({
                                title: 'Error!',
                                text: 'Facing some problems to let you in. Try again later.',
                                icon: 'error',
                                confirmButtonText: 'Return',
                                background: 'rgba(0, 0, 0, 0.5)',
                                color: 'white',
                                backdrop: 'blur(50px) grayscale(50%)',
                                customClass: {
                                    confirmButton: 'swalButton',
                                }
                            })
                        }
                    }
                    else {
                        Swal.fire({
                            title: 'Success',
                            text: 'You have successfully logged in.',
                            icon: 'success',
                            confirmButtonText: 'Continue',
                            background: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            backdrop: 'blur(50px) grayscale(50%)',
                            customClass: {
                                confirmButton: 'swalButton',

                            }
                        });
                        navigate('/dashboard');
                    }
                } catch (error) {
                    console.log('err', error);
                }
            })
            .catch(err => {
                console.log(err);
                if (err === 'auth/account-exists-with-different-credential') {
                    return Swal.fire({
                        title: 'Error!',
                        text: 'This emailalready logged in with different credential.',
                        icon: 'error',
                        confirmButtonText: 'Return',
                        background: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        backdrop: 'blur(50px) grayscale(50%)',
                        customClass: {
                            confirmButton: 'swalButton',
                        }
                    })
                }
                Swal.fire({
                    title: 'Error!',
                    text: 'Facing some problems to let you in. Try again later.',
                    icon: 'error',
                    confirmButtonText: 'Return',
                    background: 'rgba(0, 0, 0, 0.5)',
                    color: 'white',
                    backdrop: 'blur(50px) grayscale(50%)',
                    customClass: {
                        confirmButton: 'swalButton',
                    }
                })
            })
    }
    const handleOTP = async (e) => {
        e.preventDefault();
        const res = await axiosPublic.post('/verify', { email: ema, otp });
        if (res.data.success) {
            setStep(3)
        }
        else {
            toast.error(res.data.message, {
                style: {
                    background: 'rgba(0, 0, 0, 0.6)',
                    border: '1px solid #49DC67',
                    color: 'white'
                }
            })
            setOtp(false);
        }
    }
    const handleLogin = async (data) => {
        if (data.pass && ema) {
            login(ema, data.pass)
                .then(result => {
                    if (result.user) {
                        Swal.fire({
                            title: 'Success',
                            text: 'You have successfully logged in.',
                            icon: 'success',
                            confirmButtonText: 'Continue',
                            background: 'rgba(0, 0, 0, 0.5)',
                            color: 'white',
                            backdrop: 'blur(50px) grayscale(50%)',
                            customClass: {
                                confirmButton: 'swalButton',
                            }
                        });
                        navigate('/dashboard');
                    }
                })
                .catch(err => {
                    console.log('login err', err);
                    Swal.fire({
                        title: 'Error!',
                        text: 'Facing some problems to let you in. Try again later.',
                        icon: 'error',
                        confirmButtonText: 'Return',
                        background: 'rgba(0, 0, 0, 0.5)',
                        color: 'white',
                        backdrop: 'blur(50px) grayscale(50%)',
                        customClass: {
                            confirmButton: 'swalButton',
                        }
                    })
                })
        }
    }
    return (
        <div className="max-h-screen flex flex-col items-center justify-center relative overflow-hidden">
            <Ballpit
                count={50}
                gravity={0}
                friction={0.9975}
                wallBounce={0.95}
                followCursor={false}
                maxY={3}
            />
            <div className="absolute lg:top-1/2 lg:-translate-1/2 lg:left-1/2 lg:w-1/3 h-4/5 bg-transparent backdrop-blur-3xl rounded-2xl text-center flex flex-col justify-center p-6">
                <PointHook title={'Login'} />
                {step === 2 ? <p className="text-lg text-[#49DC67] mt-3">Enter otp that you received on your email.</p>: step === 3? 'Enter Your Password' : ''}
                {step === 2 ?
                    <form onSubmit={handleOTP}>
                        <OTPInput
                            value={otp}
                            onChange={setOtp}
                            numInputs={6}
                            containerStyle={{ justifyContent: 'center', margin: '25px 0' }}
                            inputStyle={{
                                width: '40px',
                                borderRadius: '12px',
                                border: '1px solid #49DC67',
                                fontSize: '30px',
                                margin: '7px'

                            }}
                            renderSeparator={<span>--</span>}
                            renderInput={(props) => <input {...props} />} />
                        <button className="cursor-pointer btn w-[60%] h-[45px] bg-[#121212] text-[#121212] hover:text-[#49DC67] border-0 overflow-hidden font-bold text-base rounded button-ani relative mx-auto"><span className="z-10">Verify</span></button>
                    </form> : step === 3 ?
                        <form onSubmit={handleSubmit2(handleLogin, onErr)}>
                            <div className="relative my-7">
                                <input name="pass" {...register2('pass', { required: 'Passowrd must be 7 characters', minLength: { value: 7 } })} placeholder="Password" type={show ? 'text' : 'password'} className="text-white input rounded bg-transparent placeholder:text-[#ffffff99] focus:border-[#49DC67] py-6 backdrop-blur-2xl focus:outline-0 border-[#49DC6766]" />
                                {show ?
                                    <FaEyeSlash onClick={() => setShow(!show)} className="z-30 select-none text-xl absolute top-3.5 cursor-pointer right-[120px] text-[#49DC67]" />
                                    :
                                    <FaEye onClick={() => setShow(!show)} className="z-30 select-none text-xl absolute top-3.5 cursor-pointer right-[120px] text-[#49DC67]" />
                                }
                            </div>
                            <button className="cursor-pointer btn w-[60%] h-[45px] bg-[#121212] text-[#121212] hover:text-[#49DC67] border-0 overflow-hidden font-bold text-base rounded button-ani relative"><span className="z-10">Login</span></button>
                        </form>
                        :
                        <form onSubmit={handleSubmit(onSubmit, onError)} className="mt-5 space-y-4 w-full">
                            <input {...register('email', { required: 'Email is required.' })} placeholder="Email Address" type="email" className="text-white input rounded bg-transparent placeholder:text-[#ffffff99] focus:border-[#49DC67] py-6 backdrop-blur-2xl focus:outline-0 border-[#49DC6766]" />
                            <button className="cursor-pointer btn w-[60%] h-11.25 bg-[#121212] text-[#121212] hover:text-[#49DC67] border-0 overflow-hidden font-bold text-base rounded button-ani relative"><span className="z-10">Login</span></button>
                        </form>
                }
                <p className="mt-4">Don't have an account ? <Link to='/register' className="prime hover:underline cursor-pointer">Register Now</Link></p>
                <div className="w-[80%] lg:w-[60%] mt-4 mx-auto space-y-4">
                    <button onClick={handleGoogle} className="btn bg-transparent border-[#ffffff66] hover:border-white transition-colors relative py-6 font-bold w-full rounded-full border flex items-center gap-x-4"><FcGoogle className="text-2xl ml-3 absolute top-3 left-px lg:left-3" />Continue with Google</button>
                    <button onClick={handleFacebook} className="btn bg-transparent border-[#ffffff66] hover:border-white transition-colors relative py-6 font-bold w-full rounded-full border flex items-center gap-x-4"><FaFacebookF className="text-2xl ml-3 absolute top-3 -left-1 lg:left-3 text-[#1877F2]" />Continue with Facebook</button>
                </div>
            </div>
        </div>
    );
};

export default Login;