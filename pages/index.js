import { useEffect, useState } from 'react'
import styles from "../styles/Home.module.css"

export default function Home() {
  const [equation, setEquation] = useState("")
  const [result, setResult] = useState("")
  const [showInputErrorMessage, setShowInputErrorMessage] = useState(false)
  const [history, setHistory] = useState([])

  useEffect(() => {
    try {
      setShowInputErrorMessage(false)
      setResult(eval(equation))
    } catch (e) {
      setShowInputErrorMessage(e instanceof ReferenceError || e instanceof SyntaxError)
    }

  }, [equation])

  const onSavePressed = () => {
    setHistory([...history, result])
    fetch("/api/results/save", {
      method: "POST",
      body: JSON.stringify({ data: result })
    })
    .then(() => {
      console.log("request sent")
    })
    // Save to db
  }

  useEffect(() => {
    fetch("/api/results/fetchAll")
      .then(res => res.json())
      .then(res => {
        setHistory(res?.data?.results)
      })
  }, [])

  return (
    <div className={styles.mainContainer}>
      <div className={styles.titleContainer}>
        <div>The Modern Calculator</div>
      </div>
      <div className={styles.inputContainer}>
        <input
          value={equation}
          placeholder="Enter your equation here"
          onChange={ev => setEquation(ev.target.value)}
          className={styles.inputBox} />
        <br />
        {(!showInputErrorMessage && result ?
          <div className={styles.resultContainer}>
            <p>Result: <b>{result}</b></p>
            <input
              className={styles.inputButton}
              type="button"
              onClick={onSavePressed}
              value="Save to History" />
          </div>
          : <div />)}
        {(showInputErrorMessage ? <p>There&apos;s something wrong with your equation.</p> : <div />)}
        <br />
      </div>
      <div className={styles.historyContainer}>
        {(history?.length > 0 ? <p>Saved Results</p> : <p />)}
        {(
          history?.slice(-5).reverse().map(elem => {
            return <div className={styles.historyItem} key={elem}>
              <p>{elem}</p>
              <input
                className={styles.inputButton}
                type="button"
                onClick={() => {
                  setEquation(equation + elem)
                }}
                value="Copy" />
            </div>
          })
        )}
      </div>
    </div>
  )
}
