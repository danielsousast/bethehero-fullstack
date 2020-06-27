import React, { useEffect } from 'react';
import { View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import {Feather} from '@expo/vector-icons'
import logo from '../../assets/logo.png'
import { styles } from './styles';
import Incident from '../../components/Incident';
import * as MailComposer from 'expo-mail-composer';



export default function Incidents({navigation, route}){
  const {incident} = route.params;
  
  const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso: ${incident.title} `;


  function semMail(){
   MailComposer.composeAsync({
      subject:`Herói do caso: ${incident.title}`,
      recipients:[`${incident.email}`],
      body:message
   });
  }

  function sendWhatsApp() {
    Linking.openURL(`whatsapp://send?phone=55${incident.whatsapp}&text=${message}`)
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image  source={logo} />
        
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Feather name="arrow-left" size={28} color="#e82041"/>
        </TouchableOpacity>    
      </View>

      <Incident data={incident} detail/>

      <View style={styles.contact}>
          <Text style={styles.heroTitle}>Salve o dia!</Text>
          <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>

          <Text style={styles.heroDescription}>Entre em contato</Text>
          
          <View style={styles.actions}>
            <TouchableOpacity style={styles.action} onPress={sendWhatsApp}>
                <Text style={styles.actionText}>WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.action} onPress={semMail}>
                <Text style={styles.actionText}>Email</Text>
            </TouchableOpacity>
          </View>
      </View>
    
    </View>
  )
}