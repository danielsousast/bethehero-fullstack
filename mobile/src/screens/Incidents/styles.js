import {StyleSheet} from 'react-native'
import Constants from "expo-constants";

export const styles = StyleSheet.create({
  container: {
      flex:1,
      paddingHorizontal:24,
      paddingTop: Constants.statusBarHeight + 20
  },
  header: {
      flexDirection:'row',
      justifyContent: 'space-between',
      alignItems:'center',
      width: '100%'
  },
  headerText: {
      fontSize: 15,
      color: '#737380'
  },
  bold: {
      fontWeight: 'bold',
  },
  title: {
    fontSize: 30,
    marginBottom: 16,
     marginTop: 48, 
     color: '#13131a',
     fontWeight: 'bold'
  },
  description: {
    fontSize: 18,
    lineHeight: 24,
    color:'#737380'
  },
  incidentList: {
      marginTop:32,
  }
})