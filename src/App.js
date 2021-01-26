import React, { useState } from 'react'

import {FaFemale, FaMale, FaMinus, FaPlus} from 'react-icons/fa'

import './index.css'


function Result({imc, status, gender, age}) {
  return (
    <div className="result">
        <h3>Resultado</h3>
        <p>Imc: {imc}</p>
        <p>Status: {status}</p>
      </div>
  )
}

function Field({label, value, setValue}) {
  function handleSumValue() {
    setValue(value + 1)
  }

  function handleSubValue() {
    setValue(value - 1)
  }

  return (
      <div className="field blue-box m-left">
        <p>{label}</p>
        <input className="input-field" type="number" min="0" name={label} onChange={ev => setValue(ev.target.value)} value={value}/>
        <div className="range-button">
          <button type="button" onClick={handleSubValue}>
            <FaMinus />
          </button>

          <button type="button" onClick={handleSumValue}>
            <FaPlus />
          </button>
        </div>
      </div>
  )
}

export default function App() {
  const [imc, setImc] = useState(0)
  const [altura, setAltura] = useState(0)
  const [peso, setPeso] = useState(0)
  const [status, setStatus] = useState("")
  const [text, setText] = useState("")
  const [gender, setGender] = useState("")
  const [age, setAge] = useState(0)
  const [show, setShow] = useState(false)

  function handleSubmit(ev) {
    ev.preventDefault()
    const computedImc = peso/((altura/100)**2)
    setImc(computedImc)

    if (computedImc < 18.5) {
      setStatus("Abaixo do peso")
    } else if (computedImc >= 18.5 && computedImc <= 24.9) {
      setStatus("Peso Normal")
    } else if (computedImc >= 25 && computedImc <= 29.9) {
      setStatus("Sobrepeso")
    } else if (computedImc >= 30 && computedImc <= 34.9) {
      setStatus("Obesidade grau 1")
    } else if (computedImc >= 35 && computedImc <= 39.9) {
      setStatus("Obesidade grau 2")
    } else if (computedImc > 40) {
      setStatus("Obesidade grau 3")
    }

    setShow(true)
  }

  return (
    <div className="App">
      <h3 className="app-title">Calculadora de IMC</h3>
      <div className="page-container">
      <div className={`content ${show && "move-content"}`}>
        <form onSubmit={handleSubmit}>
          <div className="field d-flex-row">
            <div className="gender-box m-right">
              <input className="gender-checkbox" type="radio" name="gender" value="male" id="male" onChange={ev => setGender(ev.target.value)}/>
              <label htmlFor="male">
                <FaMale size={28}/>
                masculino
              </label>
            </div>
            <div className="gender-box">
              <input className="gender-checkbox" type="radio" name="gender" value="female" id="female" onChange={ev => setGender(ev.target.value)}/>
              <label htmlFor="female">
                <FaFemale size={28}/>
                feminino
              </label>
            </div>
          </div>

          <div className="field blue-box">
            <p>altura</p>
            <span className="range-value">{altura} cm</span>
            <input className="slider" type="range" min="1" max="250" name="altura" onChange={ev => setAltura(ev.target.value)}/>
          </div>

          <div className="d-flex-row">
            <Field label="peso" value={peso} setValue={setPeso} />

            <Field label="idade" value={age} setValue={setAge} />
          </div>

          <button className="button" type="submit">Calcular</button>
        </form>

        {
          show && (
            <Result imc={imc} status={status} gender={gender} age={age}/>
          ) 
        }
      </div>

      </div>
    </div>
  );
}
