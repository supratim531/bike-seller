import React from 'react';
import Card from '../components/products/Card';
import Search from '../components/products/Search';

const products = [
  {
    id: 1,
    name: 'Bike 1',
    href: '#',
    price: '$48',
    imageSrc: 'https://images.unsplash.com/photo-1700295617594-2151de5db8e4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  },
  {
    id: 2,
    name: 'Bike 2',
    href: '#',
    price: '$35',
    imageSrc: 'https://images.unsplash.com/photo-1655179552613-4532b003cd50?q=80&w=1920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt: 'Olive drab green insulated bottle with flared screw lid and flat top.',
  },
  {
    id: 3,
    name: 'Bike 3',
    href: '#',
    price: '$89',
    imageSrc: 'https://images.unsplash.com/photo-1525160354320-d8e92641c563?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt: 'Person using a pen to cross a task off a productivity paper card.',
  },
  {
    id: 4,
    name: 'Bike 4',
    href: '#',
    price: '$35',
    imageSrc: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt: 'Hand holding black machined steel mechanical pencil with brass tip and top.',
  },
  {
    id: 5,
    name: 'Bike 5',
    href: '#',
    price: '$48',
    imageSrc: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    imageAlt: 'Tall slender porcelain bottle with natural clay textured body and cork stopper.',
  }
]

function Products() {
  return (
    <>
      <div className="mx-auto max-w-2xl py-4 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <Search />
      </div>
      <div className="">
        <div className="mx-auto max-w-2xl pt-2 pb-6 px-4 sm:px-6 lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {
              products.map((product) => (
                <Card product={product} />
              ))
            }
          </div>
        </div>
      </div>
    </>
  );
}

export default Products;
