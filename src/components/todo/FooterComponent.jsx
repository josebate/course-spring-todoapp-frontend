import {useContext} from "react";
import {AuthContext} from "./security/AuthContext";

export function FooterComponent() {

    const authContext = useContext(AuthContext)

    console.log(`Footer component - ${authContext.number}`)

    return (
        <footer className={"footer"}>
            <div className={"container"}>
                Your Footer
            </div>
        </footer>
    )
}