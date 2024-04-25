import React, {useState} from "react";
import ApiService from "../ApiService";
import toast from "react-hot-toast";
import {handleApiErrors} from "../HelperMethods";

export default function RegisterPage(){
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const apiService = new ApiService();

    const handleLogin = () => {
        // Implement login functionality here
        console.log('Username:', username);
        console.log('Password:', password);
    };
    
    async function registerUser() {
        try {
            await apiService.registerUser({email, username, password});
            toast("Register success, Please login now");
        } catch (ex) {
            handleApiErrors(ex);
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Create an account</h2>
                </div>
                <form className="mt-8 space-y-6" onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
                    <input type="hidden" name="remember" value="true" />
                    <div className="rounded-md shadow-sm -space-y-px">
                        <div>
                            <label htmlFor="username" className="sr-only">Email</label>
                            <input id="email" name="email" type="text" autoComplete="email" required
                                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                   placeholder="Email" value={email}
                                   onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="username" className="sr-only">Username</label>
                            <input id="username" name="username" type="text" autoComplete="username" required
                                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                   placeholder="Username" value={username}
                                   onChange={(e) => setUsername(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor="password" className="sr-only">Password</label>
                            <input id="password" name="password" type="password" autoComplete="current-password"
                                   required
                                   className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                   placeholder="Password" value={password}
                                   onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <div>
                        <button type="submit"
                                onClick={registerUser}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                            Register
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}