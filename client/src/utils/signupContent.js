import logo from '../assets/logo.png';

const signupContent = {
    img: logo,
    head: "TaskFlow",
    subHead: "Create your free account",
    welcome: "Get started",
    guide: "Join thousands of productive users",
    signinQuery: "Already have an account?",
    signinLinkText: "Sign in",
    inputs: [
        {
            label: "Full name",
            name: "name",
            type: "text",
            placeholder: "Enter your name"
        },
        {
            label: "Email address",
            name: "email",
            type: "text",
            placeholder: "Enter your email"
        },
        {
            label: "Password",
            name: "password",
            type: "password",
            placeholder: "Create a password"
        }
    ],

    button: {
        text: "Create Account",
        loadingText: "Creating Account...",
        type: "submit"
    }
};

export { signupContent }