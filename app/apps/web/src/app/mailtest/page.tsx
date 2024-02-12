import EmailResetPwd from "../../components/ui/mails/email-changepwd";
import EmailWelcome from "../../components/ui/mails/email-welcome";

export default function PAGE():JSX.Element {
    return(
        <div>
        <div className="border border-2 border-red-600">
            <EmailResetPwd mail="essais@gmail.com" token="azertyuiopmlkjhgfdsqwxcvbn" urlBase="http://localhost:3001" />
        </div>
        <div className="border border-2 border-yellow-600">
            <EmailWelcome mail="essais@gmail.com" token="azertyuiopmlkjhgfdsqwxcvbn" urlBase="http://localhost:3001" />
        </div>
        </div>
    );
}