
"use client"
import Link from "next/link";
import {withAuthInfo,useLogoutFunction, useRedirectFunctions} from "@propelauth/react";
import {UserCog} from "lucide-react";
import Image from "next/image";


const Navbar = ({isLoggedIn}) => {

    const logoutFn = useLogoutFunction()
    const {redirectToSignupPage, redirectToLoginPage, redirectToAccountPage} = useRedirectFunctions()


    return (
        <nav className="border-b dark:bg-gray-800 dark:border-gray-700">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1  md:px-5">

                {/*<Link href={"/"} className={"text-2xl font-bold text-green-500"}>*/}
                {/*    Mad Molecool*/}
                {/*</Link>*/}

                <Image src={"/image.png"} width={200} height={150} alt={"navbar image for madmolecool"}/>

                {/*Mobile view*/}

                <div className="hidden w-full md:block md:w-auto" id="navbar-solid-bg">

                    <ul className="flex items-center font-medium rounded-lg bg-gray-50 md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-transparent dark:bg-gray-800 md:dark:bg-transparent dark:border-gray-700">

                        {
                            isLoggedIn && (
                                <>
                                    <li>
                                        <a href="/notebooks"
                                           className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Notebooks</a>
                                    </li>

                                    <li>
                                        <a href="#"
                                           className="block py-2 px-3 md:p-0 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-green-700 dark:text-white md:dark:hover:text-green-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Search Chemcyclopedia</a>
                                    </li>
                                </>
                            )
                        }

                        {
                            isLoggedIn ?
                                (
                                    <div className={"flex items-center space-x-5"}>

                                        <button onClick={() => redirectToAccountPage()} type="button" className="flex gap-2 text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            <UserCog className={"w-5 h-5"} /> Account
                                        </button>

                                        <button onClick={() => logoutFn()} type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Logout
                                        </button>
                                    </div>


                                ) :
                                (
                                    <div className="flex items-center space-x-5">

                                        <button onClick={() => redirectToLoginPage()} type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Login
                                        </button>

                                        <button onClick={() => redirectToSignupPage()} type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                            Register
                                        </button>
                                    </div>
                                )
                        }

                    </ul>
                </div>
            </div>
        </nav>

    )
}

export default withAuthInfo(Navbar);