import React from 'react';
import { Link } from 'react-router-dom';

function Card({ product }) {
  return (
    <Link key={product.id} to={`/specefic/${product.id}`} className="group p-2 rounded outline outline-1 outline-slate-400">
      <div className="h-72 mb-4">
        <img src={product.imageSrc} alt="" className="h-full w-full object-cover object-center duration-100 group-hover:opacity-75" />
      </div>
      <div className="px-2">
        <h3 className="mb-[-4px] text-xl font-bold text-green-950">₹ 54,000</h3>
        <h5 className="text-sm text-green-950">2022 - 12,500 km</h5>
        <div className="text-sm text-slate-600">Excellent condition avenger 220 bike</div>
        <div className="flex justify-between text-xs text-slate-600">
          <div className="">Newtown, Kolkata</div>
          <div className="">3 DAYS AGO</div>
        </div>
      </div>
      <div className="p-2 flex justify-between items-center">
        <button onClick={(e) => { e.preventDefault(); alert("Update is detouched") }} className="px-3 py-2 rounded-sm outline outline-1 outline-slate-300 bg-gray-100">
          <i className="fa-solid fa-pen text-2xl text-blue-600"></i>
        </button>
        <button onClick={(e) => { e.preventDefault(); alert("Delete is detouched") }} className="px-3 py-2 rounded-sm outline outline-1 outline-slate-300 bg-gray-100">
          <i className="fa-solid fa-trash text-2xl text-red-600"></i>
        </button>
      </div>
    </Link>
  )
}

export default Card;
