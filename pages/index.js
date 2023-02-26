import { useEffect, useState } from 'react'
import styles from "../styles/Home.module.css"

export default function Home() {
  // State containers
  const [equation, setEquation] = useState("")
  const [result, setResult] = useState("")
  const [showInputErrorMessage, setShowInputErrorMessage] = useState(false)

  // Effect that calls the `calculate` API whenever the user updates the equation
  useEffect(() => {
    setShowInputErrorMessage(false)
    fetch("/api/calculate", {
      method: "POST",
      body: JSON.stringify({ equation })
    })
      .then(res => res.json())
      .then(res => {
        // If the calculation was successful, show the result
        if ("successful" === res.message) {
          setResult(res.result)
        } else {
          // else, show an error message
          setShowInputErrorMessage(true)
        }

      })
  // This effect runs whenever the `equation` state container is updated
  }, [equation])

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <div>The Modern Calculator</div>
      </div>
      <div className={styles.inputContainer}>
        {/* Input box for the equation */}
        <input
          value={equation}
          placeholder="Enter your equation here"
          onChange={ev => setEquation(ev.target.value)}
          className={styles.inputBox} />
          {/* Result text */}
        {(!showInputErrorMessage && result ?
          <div className={styles.resultContainer}>
            <p>Result: <b>{result}</b></p>
          </div>
          : <div />)}
          {/* Error text */}
        {(showInputErrorMessage ? <p>There&apos;s something wrong with your equation (maybe it&apos;s incomplete?)</p> : <div />)}
        <br />
      </div>
    </div>
  )
}
