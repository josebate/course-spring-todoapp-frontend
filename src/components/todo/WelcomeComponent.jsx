import {Link, useParams} from "react-router-dom";
import axios from 'axios'
import {useState} from "react";
import {retrieveHelloWorldBean, retrieveHelloWorldPathVariable} from "./api/HelloWorldApiService";
import {useAuth} from "./security/AuthContext";

export function WelcomeComponent() {

    const {username} = useParams()

    const authContext = useAuth()

    const [message, setMessage] = useState(null)

    function callHelloWorldRestApi(){

        retrieveHelloWorldPathVariable(username, authContext.token)
            .then( (response) => successfulResponse(response) )
            .catch( (error) => errorResponse(error) )
            .finally( () => console.log('cleanup') )
    }

    function successfulResponse(response){
        console.log(response)
        setMessage(response.data.message)
    }

    function errorResponse(error){
        console.log(error)
    }

    return (
        <div className={"WelcomeComponent"}>
            <h1>Welcome {username}</h1>
            <div>
                Manage your todos - <Link to={"/todos"}>Go here</Link>
            </div>
            <div>
                <button className="btn btn-success m-5" onClick={callHelloWorldRestApi}>Call Hello World</button>
            </div>
            <div className={"text-info"}>{message}</div>
        </div>
    )
}