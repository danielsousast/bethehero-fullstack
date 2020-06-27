import {StyleSheet} from 'react-native'

export const styles = StyleSheet.create({
  incident: {
      padding: 24,
      borderRadius: 8,
      backgroundColor: '#fff',
      marginBottom: 16
  },
  incidentProperty: {
      fontSize: 14,
      color:'#41414d',
      fontWeight:'bold'
  },
  incidentValue: {
      marginTop: 8,
      fontSize: 15,
      marginBottom: 24,
      color: '#737380'
  },
  detailButton: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems:'center'
  }, 
  detailButtonTitle: {
      color: '#e02041',
      fontSize: 15,
      fontWeight: 'bold'
  }
})