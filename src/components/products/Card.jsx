import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { authorizedAxios } from '../../axios/axios';
import { formattedPrice } from "../../utils/formattedPrice";
import ProductContext from "../../context/ProductContext";

function Card({ product }) {
  const context = useContext(ProductContext);

  const deleteBike = async payload => {
    try {
      const res = await authorizedAxios.delete("/admins/delete/", { data: payload });
      console.log("res:", res);
      const data = res?.data;
      console.log("data:", data);
      const bikes = [...context.bikes];

      const newBikes = bikes.filter(bike => {
        return bike.bike_model_id !== payload.model_id
      });

      context.setBikes(newBikes);
    } catch (err) {
      console.log("err:", err);
    }
  }

  const deleteABike = e => {
    e.preventDefault();
    const payload = {
      model_id: product?.bike_model_id
    }
    deleteBike(payload);
  }

  return (
    <Link to={`/specefic/${product.id}`} className="group p-2 rounded outline outline-1 outline-slate-400">
      <div className="h-72 mb-4">
        <img src={`https://api.utsavchatterjee.me${product?.image_path}`} alt="" className="h-full w-full object-cover object-center duration-100 group-hover:opacity-75" />
      </div>
      <div className="px-2">
        <h3 className="mb-[-4px] text-xl font-bold text-green-950">₹ {formattedPrice(product?.bike_meta[0]?.asking_price)}</h3>
        <h5 className="text-sm text-green-950">{product?.bike_meta[0]?.buy_year} - {product?.bike_meta[0]?.kms_run} km</h5>
        <div className="text-sm text-slate-600">{product?.bike_meta[0]?.details}</div>
        <div className="flex justify-between text-xs text-slate-600">
          <div className="">Newtown, Kolkata</div>
          <div className="">3 DAYS AGO</div>
        </div>
      </div>
      <div className="p-2 flex justify-between items-center">
        <button onClick={(e) => { e.preventDefault(); alert("Update is detouched") }} className="px-3 py-2 rounded-sm outline outline-1 outline-slate-300 bg-gray-100">
          <i className="fa-solid fa-pen text-2xl text-blue-600"></i>
        </button>
        <button onClick={deleteABike} className="px-3 py-2 rounded-sm outline outline-1 outline-slate-300 bg-gray-100">
          <i className="fa-solid fa-trash text-2xl text-red-600"></i>
        </button>
      </div>
    </Link>
  )
}

export default Card;
