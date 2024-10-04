import "./App.css";
import axios from "axios"
import { useEffect, useState } from "react";
import Cards from "./Components/Common/Cards/Cards";
import { IoSearch } from "react-icons/io5";

const App = () => {
  const [product, setProduct] = useState([]);
  const [Category, setCategory] = useState([]);
  const [isloader, setLoader] = useState(false);
  const [filterData, setFilterData] = useState([]);
  const [inputs, setInputs] = useState('');
  const [found, setFound] = useState(false);

  const getData = async ()=>{
    setLoader(true);
    try {
      const data = await axios.get('http://freetestapi.com/api/v1/cars')
      const response = data ?.data;
      setProduct(response);
      setLoader(false);
      const Categories = [... new Set(response.map((item)=>item.year))];
      setCategory(Categories);
      setFilterData(response)
    } 
    
    catch (error) {
      console.log(error);
      setLoader(false);
    }
  }

  const handleCategory = (cat)=>{
    const filterd = product.filter((item, index)=>{
      return item.year == cat;
    })
    if(cat == "All"){
      setFilterData(product)
    }
    else{
      setFilterData(filterd);
    }
  }

  const handleEnter = (e)=>{
    if(e.key == "Enter"){
      handleSubmit();
    }
  }

  const handleSubmit = ()=>{
    const SearchedData = filterData.filter((item)=>{
      return item.model.trim().toLowerCase().includes(inputs.trim().toLowerCase());
    })
    if(SearchedData.length == 0){
      setFound(true);
    }
    else{
      setFilterData(SearchedData);
      setInputs('');
    }
  }

  useEffect(()=>{
    getData();
  },[])

  return (
    <div className="content">
      <div className="container">
        <div className="search-content">
          <select onChange={(e)=>handleCategory(e.target.value)}>
            <option value="All">All Years</option>
            {Category.map((item, index)=>{
              return(
                <option key={index} value={item}>{item}</option>
              )
            })}
          </select>

            <div className="input-wrapper">
              <input onKeyUp={handleEnter} type="text" value={inputs} onChange={(e)=>setInputs(e.target.value)} placeholder="Searching Products..."/>
              <IoSearch onClick={handleSubmit}/>
            </div>

        </div>
        <div className="card-wrapper">
          {found ? <div className="error">Data not Found...</div> : 
            <>
            {isloader ? <div className="loader"></div> : 
            <>
            {filterData.map((item, index)=>{
              return(
                <Cards key={index} data={item}/>
              )
            })}
            </>
            }
            </>
          }
          
          
        </div>
      </div>
    </div>
  )
}

export default App
