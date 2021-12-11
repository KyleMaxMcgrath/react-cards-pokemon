import {useState} from 'react';
import axios from 'axios';
import {u4 as uuid} from 'uuid';

const useFlip = (defaultValue) => {
  const [isFacingUp, setIsFacingUp] = useState(defaultValue);
  const flipCard = () => {
    setIsFacingUp(isUp => !isUp);
  };

  return [isFacingUp, flipCard];
};


const useAxios = (url) => {
  const [array, setArray] = useState([]);
  const addToArr = async () => {
    const response = await axios.get(url);
    setArray(arr => [...arr, { ...response.data, id: uuid() }]);
  };
  return [array, addToArr];
};

export {useFlip, useAxios};