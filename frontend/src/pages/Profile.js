/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiTrash2, FiEdit2 } from "react-icons/fi";
import logo from "../assets/img/logo.svg";
import api from "../services/api";
import { useMemo } from "react";

export default function Profile({history}) {
  const token = localStorage.getItem('token')
  const ongName = localStorage.getItem("ongName");

  const [total, setTotal] = useState()
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [incidents, setIncidents] = useState([]);
  const [nextDisacled, setNextDisabled] = useState(false)
  const [previousDisable, setPreviousDisable] = useState(true)

  const totalPage = useMemo(() =>{
     return Math.ceil(total/6) 
  }, [total])

  async function loadNextIncidents() {
    setPage(page+1)
    setPreviousDisable(false)
  }

  async function loadPreviousIncidents() {
    setPage(page-1)
    setNextDisabled(false)
   
    if(page <= 1) {

      return;
    }
  }

  useEffect(()=>{
    if(page <=1) {
      setPreviousDisable(true)
    }
    if(page== totalPage){
      setNextDisabled(true)
    }
  },[page])

  useEffect(() => {
    async function loadIncidents(){

      const response = await api.get("/profile", {
        headers: {Authorization:`Bearer ${token}`},
        params:{page}
      });
  
      setIncidents(response.data.ongs);
      setTotal(response.data.total)
      setLoading(false);
     
    }

    loadIncidents()
  }, [page]);

  async function handleRemove(id) {
    await api.delete(`/incidents/${id}`, {
      headers: {Authorization:`Bearer ${token}`}
    });

    setIncidents([incidents.filter((item) => item.id !== id)]);
  }

  function handleEdit(id) {
    history.push(`/incidents/edit/${id}`)
  }

  function handleLogout(){
      localStorage.clear();
      history.push('/');
  }

  return (
    <div className="profile-container">
      <header>
        <div className="header-logo">
          <img src={logo} alt="Be The Hero" />

          <span className="ongname">
            Bem vinda a <strong>{ongName}</strong>
          </span>
        </div>

        <div className="header-buttons">
          <Link to="/incidents/new" className="button">
            Novo caso
          </Link>
          <button type="button" onClick={handleLogout}>Sair</button>
        </div>

      </header>

      <h1>Casos cadastrados</h1>
      <ul>
        {incidents &&
          incidents.map((incident) => (
            <li key={String(incident.id)}>
              <strong>CASO:</strong>
              <p>{incident.title}</p>

              <strong>DESCRIÇÃO:</strong>
              <p>{incident.description}</p>

              <strong>VALOR:</strong>
              <p>
                {Intl.NumberFormat("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                }).format(incident.value)}
              </p>

              <button type="button" onClick={() => handleEdit(incident.id)} className="edit-button">
                <FiEdit2 size={20} color="#a8a8b3" />
              </button>
              <button type="button" onClick={() => handleRemove(incident.id)}>
                <FiTrash2 size={20} color="#a8a8b3" />
              </button>
            </li>
          ))}
      </ul>
      <div className="pagination">
        <button onClick={loadPreviousIncidents} disabled={previousDisable}>Anterior</button>
            <span>{`${page}/${totalPage}`}</span>
        <button onClick={loadNextIncidents} disabled={nextDisacled}>Proximo</button>
      </div>
    </div>
  );
}
