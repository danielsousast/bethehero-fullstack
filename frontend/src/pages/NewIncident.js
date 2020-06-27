import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import logo from '../assets/img/logo.svg';
import api from '../services/api';
import { useEffect } from 'react';


export default function Register({history, match}){
    const token = localStorage.getItem('token')
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState(0);
    const [incident, setIncident] = useState({});

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            if(match.params){
                await api.put(`/incidents/${match.params.id}`, {
                    title, description, value
                    }, {
                        headers: {Authorization:`Bearer ${token}`},
                    },
                );
                history.push('/profile');
                return;
            }
            await api.post('/incidents', {
                title, description, value
            }, {
                headers: {Authorization:`Bearer ${token}`}
            });

            history.push('/profile');
        } catch (error) {
            
        }
    }

    useEffect(() => {
        async function showIncident() {
            if(match.params.id) {
                const response = await api.get(`/incidents/${match.params.id}`)

                setTitle(response.data.title)
                setDescription(response.data.description)
                setValue(response.data.value)
            }
        }

        showIncident();
    }, [match.params.id])

  return (
    <div className="box-container">
        <div className="box-content">
            <section>
                <img src={logo} alt="Be The Hero"/>
                <h1>{match.params.id? 'Alterar caso' : 'Cadastrar novo caso'}</h1>
                <p>
                    Descreva o caso detalhadamente e encontre um herói para resolver isso
                </p>
              
                <Link to="/profile" className="link">
                    <FiArrowLeft size={16} color="#e02041"/>  
                    Voltar ao início
                </Link>
            </section>
            <form onSubmit={handleSubmit}>
                <input placeholder="Título do caso"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />
                <textarea placeholder="Descrição"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}                
                />
                <input placeholder="Valor em R$"
                    value={value}
                    onChange={(event) => setValue(event.target.value)}                
                />

                <button className="button" type="submit">Salvar</button>
            </form>
        </div>
    </div>
  );
}
