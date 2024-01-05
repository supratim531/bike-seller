import React, { useEffect, useState } from 'react';
import { unauthorizedAxios } from '../axios/axios';
import Card from '../components/products/Card';
import Search from '../components/products/Search';
import Loader from '../components/main/Loader';
import ProductContext from '../context/ProductContext';

function Products() {
  const [bikes, setBikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchBikes, setSearchBikes] = useState("");
  const [filteredBikes, setFilteredBikes] = useState([]);

  const getBikes = async () => {
    try {
      const res = await unauthorizedAxios.get("/customer/get-bikes/");
      console.log("res:", res);
      const data = res?.data;
      console.log("data:", data, data?.bikes);
      setBikes(data?.bikes);
      setFilteredBikes(data?.bikes);
      setIsLoading(false);
    } catch (err) {
      console.log("err:", err);
    }
  }

  const filterBikes = () => {
    const searchedBikes = bikes.filter(bike => {
      return bike.bike_model.toLowerCase().match(searchBikes.toLowerCase().trim()) || bike.brand_name.toLowerCase().match(searchBikes.toLowerCase().trim()) || bike.bike_name.toLowerCase().match(searchBikes.toLowerCase().trim());
    });
    setFilteredBikes(searchedBikes);
  }

  useEffect(() => {
    getBikes();
  }, []);

  useEffect(() => {
    filterBikes();
  }, [searchBikes]);

  const contextData = {
    bikes, setBikes,
    filteredBikes, setFilteredBikes
  };

  return (
    <ProductContext.Provider value={contextData}>
      <div className="mx-auto max-w-2xl py-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <Search setSearchBikes={setSearchBikes} />
      </div>
      {
        isLoading ? <Loader /> : <>
          <div className="">
            {
              (filteredBikes.length === 0 && bikes.length !== 0) &&
              <div className="mx-auto max-w-2xl pt-2 pb-6 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <div className="p-1 break-all bg-gray-50">No result found for "<b>{searchBikes}</b>"</div>
              </div>
            }
            <div className="mx-auto max-w-2xl pt-2 pb-6 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {
                  filteredBikes.map(bike => (
                    <Card product={bike} />
                  ))
                }
              </div>
            </div>
          </div>
        </>
      }
    </ProductContext.Provider>
  );
}

export default Products;
