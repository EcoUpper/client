import { useState, useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { AuthContext } from "../../context/auth.context"
import "./ProposalCard.css"

function NewProposal(props) {

    const {fetchProposals} = props

    const { user } = useContext(AuthContext)
    const { itemId } = useParams();

    const [date, setDate] = useState("")
    const [time, setTime] = useState("")
    const dateTime = new Date(date + 'T' + time);

    const navigate = useNavigate()
    const apiUrl = process.env.REACT_APP_SERVER_URL + "/db/proposals/" + itemId + "/new"

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
                setDate("")
                setTime("")
                
                fetchProposals()
                navigate(`/market/${itemId}`)
            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <>
            <div className="newProposalForm">
                <form className="innerNewProposalForm" onSubmit={handleSubmit} >
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
                        <label>Pickup time</label>
                        <input
                            type="time"
                            name="time"
                            onChange={(e) => setTime(e.target.value)}
                            value={time}
                        />
                    </div>
                    <button id="submit-prop" type="submit">Submit proposal</button>
                </form>
            </div>
        </>
    )
}

export default NewProposal