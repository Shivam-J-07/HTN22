import { useEffect, useState } from 'react';
import Filters from './Filters';
import Result from './Result';
import ResultPreview from './ResultPreview';
import Directions from './Directions';

function Messages() {
    const [recipient, setRecipient] = useState("arnavgupta");
    const [messages, setMessages] = useState([
        {
            "recipient": "arnavgupta",
            "messages": [
                {
                    "author": "arnavgupta",
                    "message": "ur mom is cool"
                },
                {
                    "author": "padenaaaa",
                    "message": "thx"
                },
            ]
        }
    ]);
    const [message, setMessage] = useState("");

    useEffect(() => {
        // call api to populate nearby bikes
        
    }, []);

    return (
        <div className="Messages">
            <h1>Messages</h1>
        </div>
    ); 
}

export default Messages;