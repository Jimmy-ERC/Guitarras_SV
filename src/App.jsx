import Guitar from "./components/Guitar.jsx";
import Header from "./components/Header.jsx";
import { db } from "./data/db.js";
import { useState } from "react";

function App() {
  const [data, setData] = useState(db); // db se puede colocar directamente aquí, ya que es estático
  const [cart, setCart] = useState([]);

  function handleAddToCart(item) {
    // findIndex devuelve el índice del elemento que cumple la condición, o -1 si no lo encuentra
    const itemExists = cart.findIndex((cartItem) => cartItem.id === item.id);

    if (itemExists >= 0) {
      const updatedCart = [...cart];

      updatedCart[itemExists].quantity += 1;

      setCart(updatedCart);
    } else {
      item.quantity = 1;

      setCart((prevCart) => [...prevCart, item]);
    }
  }

  return (
    <>
      <Header cart={cart} />
      <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>

        <div className="row mt-5">
          {data.map((guitar) => {
            return (
              <Guitar
                key={guitar.id}
                guitar={guitar}
                handleAddToCart={handleAddToCart}
              />
            );
          })}
        </div>
      </main>

      <footer className="bg-dark mt-5 py-5">
        <div className="container-xl">
          <p className="text-white text-center fs-4 mt-4 m-md-0">
            GuitarLA - Todos los derechos Reservados
          </p>
        </div>
      </footer>
    </>
  );
}

export default App;
