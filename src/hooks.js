import {useState, useEffect} from 'react';
import axios from 'axios';
import {v4 as uuidv4} from 'uuid';

const useFlip = (defaultValue) => {
  const [isFacingUp, setIsFacingUp] = useState(defaultValue);
  const flipCard = () => {
    setIsFacingUp(isUp => !isUp);
  };

  return [isFacingUp, flipCard];
};

const useLocalStorage = (key, item) => {
  let initialValue = item;
  if (localStorage.getItem(key)) {
    initialValue = JSON.parse(localStorage.getItem(key));
  }
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);
  return [state, setState];
}

const useAxios = (url, formatter, id) => {
  const [array, setArray] = useLocalStorage(id,[]);
  const addToArr = async (arg) => {
    const response = await axios.get(url+'/'+arg);
    setArray(arr => [...arr, {...formatter(response.data), id: uuidv4() }]);
  };
  const removeAll = () => {
    setArray(arr => []);
  }
  return [array, addToArr, removeAll];
};

export {useFlip, useAxios, useLocalStorage};