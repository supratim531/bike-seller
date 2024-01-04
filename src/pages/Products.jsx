import React, { useEffect, useState } from 'react';
import { unauthorizedAxios } from '../axios/axios';
import Card from '../components/products/Card';
import Search from '../components/products/Search';
import ProductContext from '../context/ProductContext';

function Products() {
  const [bikes, setBikes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const getBikes = async () => {
    try {
      const res = await unauthorizedAxios.get("/customer/get-bikes/");
      console.log("res:", res);
      const data = res?.data;
      console.log("data:", data, data?.bikes);
      setBikes(data?.bikes);
      setIsLoading(false);
    } catch (err) {
      console.log("err:", err);
    }
  }

  useEffect(() => {
    getBikes();
  }, []);

  const contextData = {
    bikes, setBikes
  };

  return (
    <ProductContext.Provider value={contextData}>
      {
        isLoading ? "Loading..." : <>
          <div className="mx-auto max-w-2xl py-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <Search />
          </div>
          <div className="">
            <div className="mx-auto max-w-2xl pt-2 pb-6 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
              <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {
                  bikes.map(bike => (
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
