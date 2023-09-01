import { useState, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"

function NewProposal() {

    const { user } = useContext(AuthContext)
    const { itemId } = useParams();

    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const dateTime = new Date(date + 'T' + time);

    const navigate = useNavigate()
    const apiUrl = `http://localhost:5005/db/proposals/${itemId}/new`

    function handleSubmit(e) {
        e.preventDefault()

        const body = {
            date: dateTime,
            created_by: user,
        }

        fetch(apiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body)
        })
            .then((res) => {
                res.json()
            })
            .then((newProposal) => {
                console.log(newProposal)
                setDate("")
                setTime("")
                
                navigate(`/market/${itemId}`)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <>
            <div>
                <form onSubmit={handleSubmit} >
                    <div>
                        <label>Date</label>
                        <input
                            type="date"
                            name="date"
                            onChange={(e) => setDate(e.target.value)}
                            value={date}
                        />
                    </div>
                    <div>
                        <label>Starting time</label>
                        <input
                            type="time"
                            name="time"
                            onChange={(e) => setTime(e.target.value)}
                            value={time}
                        />
                    </div>
                    <button type="submit">Create event</button>
                </form>
            </div>
        </>
    )
}

export default NewProposal