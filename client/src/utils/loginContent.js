import logo from '../assets/logo.png';

const loginContent = {
    img: logo,
    head: "TaskFlow",
    subHead: "Stay organized, stay ahead",
    welcome: "Welcome back",
    guide: "Sign in to continue to your tasks",
    forgot: "Forgot password?",
    signupQuery: "Don't have an account?",
    signupLinkText: "Sign up",
    inputs: [
        {
            label: "Email address",
            icon: "",
            type: "text",
            placeholder: "Enter your email"
        },
        {
            label: "Password",
            icon: "",
            type: "password",
            placeholder: "Enter your password"
        }
    ],

    button: {
        text: "Sign in",
        loadingText: "Signing in...",
        type: "submit"
    }
};

export {
    loginContent
}