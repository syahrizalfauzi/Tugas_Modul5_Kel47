import { useState } from "react";
import Modal from "react-modal";
import './ProductCard.css';


const ProductCard = (props) => {
  const [showDesc, setShowDesc] = useState(false);

  const handleBukaDeskripsi = () => setShowDesc(true);
  const handleTutupDeskripsi = () => setShowDesc(false);

  return (
    <div style={{ border: "2px solid black" }}>
      <img
        src={props.product.image}
        alt={props.product.title}
        style={{
          height: 256,
        }}
      />
      <h3>{props.product.title}</h3>
      <button onClick={handleBukaDeskripsi}>Lihat deskripsi</button>
      <Modal isOpen={showDesc}>
        <div>
          <b>Deskripsi produk :</b>
          <p>{props.product.description}</p>
          <button onClick={handleTutupDeskripsi}>Tutup</button>
        </div>
      </Modal>
      <p>Harga : {props.product.price} USD</p>
    </div>
  );
};

export default ProductCard;
