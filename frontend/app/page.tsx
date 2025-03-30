"use client";
import React from 'react';
import NavBar from './components/nav';

const neighborhoods = [
  { name: "Băneasa", top: "20%", left: "45%" },
  { name: "Tei", top: "39%", left: "57%" },
  { name: "Tei Toboc", top: "34%", left: "61%" },
  { name: "1 Mai", top: "35%", left: "32%" },
  { name: "13 Septembrie", top: "54%", left: "39%" },
  { name: "Aparatorii Patriei", top: "75%", left: "65%" },
  { name: "Andronache", top: "30%", left: "67%" },
  { name: "Aviatiei", top: "31%", left: "50%" },
  { name: "Aviatorilor", top: "40%", left: "45%" },
  { name: "Berceni", top: "70%", left: "55%" },
  { name: "Bucurestii Noi", top: "24%", left: "30%" },
  { name: "Carol", top: "58%", left: "50%" },
  { name: "Centrul Vechi", top: "50%", left: "53%" },
  { name: "Vitan", top: "59%", left: "59%" },
  { name: "Chitila", top: "30%", left: "25%" },
  { name: "Cismigiu", top: "49%", left: "49%" },
  { name: "Colentina", top: "39%", left: "65%" },
  { name: "Constantin Brancusi", top: "55%", left: "19%" },
  { name: "Cotroceni", top: "50%", left: "42%" },
  { name: "Crangasi", top: "42%", left: "30%" },
  { name: "Decebal", top: "52%", left: "63%" },
  { name: "Dorobanti", top: "40%", left: "48%" },
  { name: "Dristor", top: "55%", left: "67%" },
  { name: "Drumul Taberei", top: "55%", left: "35%" },
  { name: "Ferentari", top: "65%", left: "45%" },
  { name: "Floreasca", top: "35%", left: "53%" },
  { name: "Gara de Nord", top: "44%", left: "40%" },
  { name: "Giulesti", top: "36%", left: "28%" },
  { name: "Grozavesti", top: "45%", left: "38%" },
  { name: "Herastrau", top: "29%", left: "47%" },
  { name: "Iancului", top: "48%", left: "61%" },
  { name: "Izvor", top: "52%", left: "47%" },
  { name: "Nerva Traian", top: "56%", left: "56%" },
  { name: "Obor", top: "43%", left: "62%" },
  { name: "Pantelimon", top: "45%", left: "75%" },
  { name: "Rahova", top: "70%", left: "35%" },
  { name: "Regie", top: "44%", left: "35%" },
  { name: "Romana", top: "45%", left: "50%" },
  { name: "Stefan cel Mare", top: "43%", left: "53%" },
  { name: "Theodor Pallady", top: "62%", left: "80%" },
  { name: "Timpuri Noi", top: "56%", left: "54%" },
  { name: "Tineretului", top: "65%", left: "55%" },
  { name: "Titan", top: "54%", left: "72%" },
  { name: "Vacaresti", top: "64%", left: "60%" },
];

export default function Home() {
  return (
    <div className="flex flex-col bg-[#7f8c8d]">
      <NavBar />
      <div className='flex justify-center w-full scroll-x-hidden'>
        <div className='relative'>
          <img src='./harta.png' alt='harta' className='max-h-[93vh] max-w-[90vw]  rounded-[10%] py-8'></img>

          {neighborhoods.map((hood) => (
            <button
              key={hood.name}
              style={{ top: hood.top, left: hood.left }}
              onClick={() => alert(`You clicked on ${hood.name}`)}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
            >
              <img 
                src="/pin.png" 
                alt="pin" 
                className="w-14 h-14" 
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
