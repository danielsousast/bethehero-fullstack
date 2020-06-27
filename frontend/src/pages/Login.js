import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { FiLogIn } from 'react-icons/fi';
import logo from '../assets/img/logo.svg';
import heroes from '../assets/img/heroes.png';

export default function Login({history}){
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await api.post('/sessions', {id, password});
  
      localStorage.setItem('ongId', id);    
      localStorage.setItem('ongName', response.data.ong.name); 
      localStorage.setItem('token',response.data.token)   
      history.push('/profile');
    } catch (error) {
      
    }
        
  }

  return (
    <div className="login-container">
      <section className="section-form">
        <img src={logo} alt="Be The Hero"/>

        <form onSubmit={handleSubmit}>
          <h1>Faça seu login</h1>

          <input type="text" placeholder="Sua ID"
            value={id}
            onChange={(event => setId(event.target.value))}
            className="input-login"
          />

          <input type="text" placeholder="Sua senha"
            value={password}
            onChange={(event => setPassword(event.target.value))}
          />
          <button className="button">Entrar</button>

          <Link to="/register"className="link">
            <FiLogIn size={16} color="#e02041"/>  
            Não tenho cadastro
          </Link>
        </form>

      </section>
      <img src={heroes} alt="Heroes" className="heroes"/>
    </div>
  );
}
