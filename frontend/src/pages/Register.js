import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import api from "../services/api";
import logo from "../assets/img/logo.svg";

export default function Register({history}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  async function handleSubmit(event) {
    event.preventDefault();
    try {
        const response = await api.post('/ongs', {
            name, email, whatsapp, city, uf
        });
        
        history.push('/');

        //localStorage.setItem('ongId', response.data.id);        
    } catch (error) {
        
    }
  }

  return (
    <div className="box-container">
      <div className="box-content">
        <section>
          <img src={logo} alt="Be The Hero" />
          <h1>Cadastro</h1>
          <p>
            Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem
            os casos da sua ONG
          </p>

          <Link to="/" className="link">
            <FiArrowLeft size={16} color="#e02041" />
            Já tenho cadastro
          </Link>
        </section>
        <form onSubmit={handleSubmit}>
          <input placeholder="Nome da ONG" 
            value={name}
            onChange={event => setName(event.target.value)}
          />
          <input type="email" placeholder="Email" 
            value={email}
            onChange={event => setEmail(event.target.value)}          
          />
          <input placeholder="WhatsApp" 
            value={whatsapp}
            onChange={event => setWhatsapp(event.target.value)}          
          />

          <div className="input-group">
            <input placeholder="Cidade" 
                value={city}
                onChange={event => setCity(event.target.value)}            
            />
            <input placeholder="UF" style={{ width: 80 }} 
                value={uf}
                onChange={event => setUf(event.target.value)}            
            />
          </div>

          <button className="button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}
