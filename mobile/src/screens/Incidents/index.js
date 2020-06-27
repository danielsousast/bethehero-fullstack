import React, { useState, useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import {Feather} from '@expo/vector-icons'
import logo from '../../assets/logo.png'
import { styles } from './styles';
import Incident from '../../components/Incident';
import api from '../../services/api';

export default function Incidents({navigation}){
  const [incidentsList, setIncidentsList] = useState([]);
  const [incidentsTotal, setIncidentsTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);

  async function loadIncidents(){
    if(loading) {
      return;
    }

    if((incidentsTotal > 0) && (incidentsList.length === incidentsTotal)) {
      return;
    }

    setLoading(true);
    const response = await api.get('/incidents', {
      params:{page}
    });
  
    setIncidentsList([...incidentsList,...response.data]);
    setIncidentsTotal(response.headers['x-total-count']);
    setPage(page+1);
    setLoading(false);
  }

  useEffect(() => {
    loadIncidents()
  }, []);

  function handleNavigation(incident) {
    navigation.navigate('Detail', {incident})
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image  source={logo} />
        <Text style={styles.headerText}>Total de <Text style={styles.bold}>{incidentsTotal} casos</Text></Text>
      </View>
      <Text style={styles.title}>Bem vindo!</Text>
      <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

      <FlatList 
        style={{marginTop:10}}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{paddingVertical:20}}
        data={incidentsList}
        onEndReached={loadIncidents}
        onEndReachedThreshold={0.2}
        keyExtractor={item => String(item.id)}
        renderItem={({item}) => <Incident data={item} onPress={() => handleNavigation(item)}/>}
      />
    </View>
  )
}