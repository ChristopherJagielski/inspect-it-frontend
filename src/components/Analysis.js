import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Analyse() {

    const [result, setNewResult] = useState([])
    const defectUrl = '/defects/'

    useEffect(() => {
        getDefects()
    }, []);

    function getDefects() {

        axios({
            method: 'GET',
            url: defectUrl
        }).then((response) => {
            const data = response.data
            setNewResult(data)
            console.log(result)
        }

        )
    }

    return <div>
        <ul>
            <li>
                {() => {
                    result.map({(i) => {
                        i.serial_number
                    }})
                }}
            </li>
        </ul>
    </div>

}