export default function AppLogo({ className }) {

    return (
        <div className={className}>
            <img
                className="block h-auto w-6 lg:w-8"
                src={window.location.origin + "/vendor/img/short_logo.svg"}
                alt="Logo"
            />
            <img
                className="h-auto w-32 lg:w-36 ml-2"
                src={window.location.origin + "/vendor/img/text_logo.svg"}
                alt="Develup"
            />
        </div>
    );
}
