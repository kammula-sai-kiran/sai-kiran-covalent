import { MODAL_FIELDS } from "../constants";


const generateModalContent =(cryptoData) => 
{
   return MODAL_FIELDS.map((key) => ({
    key,
    value: cryptoData[key],
  }))
}

export default generateModalContent;