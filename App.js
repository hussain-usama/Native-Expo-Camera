import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ExpoCamera from "./src/camera";

export default function App() {

  const [openCamera, setOpenCamera] = useState(false)
  const [clicked, setClicked] = useState(false);
  const [list, setList] = useState([]);
  const [image, setImage] = useState(null);
  
  const handleCamera=()=>{
    if(openCamera){
      discardImage()
    }else{
      setOpenCamera(true)
    }
  }
  console.log(list,'list')
  const discardImage=()=>{
    setClicked(false)
    setOpenCamera(false)
    setImage(null)
  }

  const saveImage=()=>{
      let temp=[...list]
      temp.push(image)
      setList(temp)
      discardImage()
  }

  return (
    <ScrollView >
      {openCamera ?
      <ExpoCamera setClicked={setClicked} clicked={clicked} setImage={setImage} image={image}/> 
      : null}

      {(list?.length && !openCamera) ?
        <View style={{display:"flex", justifyContent:'center', alignItems:"center"}}>
            {list.map((item,index) => (
              <View key={index} style={{ width: 300,borderWidth:2 , borderColor:"black", display:'flex', alignItems:"center", marginTop:10 }}>
                <Image source={{ uri: item }} width={200} height={200} />
                <Text style={{fontSize:30}}>{item.text}</Text>
              </View>
            ))}
          </View> : null}

      <View style={styles.container}>
      {clicked && <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={discardImage}>
              <Text style={styles.cameraBtn}>Discard</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} >
              <Text style={styles.cameraBtn} onPress={saveImage}>Save</Text>
            </TouchableOpacity>
          </View>}

        <TouchableOpacity
          onPress={handleCamera}
          style={styles.cameraBtn}
        >
          <Text style={styles.cameraBtn}>{!openCamera ? 'Open' : 'Close'} Camera</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    position:'relative',
    margin: 50
  },
  buttonContainer:{
 display:'flex'
  },
  cameraBtn: {
    color:'#fff',
    backgroundColor: "#000",
    color: "#fff",
    textAlign: "center",
    padding: 5,
    fontSize: 20,
    // position:'absolute',
    // bottom:0
  },
});