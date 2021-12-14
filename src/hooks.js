import {useState} from 'react';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';

const useFlip = (defaultValue) => {
  const [isFacingUp, setIsFacingUp] = useState(defaultValue);
  const flipCard = () => {
    setIsFacingUp(isUp => !isUp);
  };

  return [isFacingUp, flipCard];
};


const useAxios = (url, formatter) => {
  const [array, setArray] = useState([]);
  const addToArr = async (arg) => {
    const response = await axios.get(url+'/'+arg);
    setArray(arr => [...arr, {...formatter(response.data), id: uuidv4() }]);
  };
  const removeAll = () => {
    setArray(arr => []);
  }
  return [array, addToArr, removeAll];
};

export {useFlip, useAxios};