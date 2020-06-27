import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { styles } from "./styles";

export default function Incident({ data, onPress, detail }) {
  return (
    <View style={styles.incident}>
      <Text style={styles.incidentProperty}>ONG:</Text>
      <Text style={styles.incidentValue}>{data.name}</Text>

      <Text style={styles.incidentProperty}>CASO:</Text>
      <Text style={styles.incidentValue}>{data.title}</Text>

      {detail && 
        <>
            <Text style={styles.incidentProperty}>Descrição:</Text>
            <Text style={styles.incidentValue}>{data.description}</Text>
        </>    
      }

      <Text style={styles.incidentProperty}>VALOR:</Text>
      <Text style={[styles.incidentValue, {marginBottom:detail? 0:24}]}>
        {
          Intl.NumberFormat('pt-BR', {style:'currency',currency:'BRL'})
          .format(data.value)
        }
      </Text>

      {!detail &&
            <TouchableOpacity style={styles.detailButton}
            onPress={onPress}
          >
            <Text style={styles.detailButtonTitle}>Ver mais detalhes</Text>
            <Feather name="arrow-right" size={16} color="#e02041" />
          </TouchableOpacity>
      
      }
    </View>
  );
}
