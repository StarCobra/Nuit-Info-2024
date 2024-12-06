import React, { useState, useEffect } from 'react';

const Modal = ({ pokemon }) => {

    const [selectPokemon, setSelectPokemon] = useState('');
    const getPokemonImage = (pokemon) => {

        switch (pokemon) {
            case "Carapagos":
                setSelectPokemon(`/QRCode/${pokemon}.png`);
                break;
            case "Etournmi":
                setSelectPokemon(`/QRCode/${pokemon}.png`);

                break;
            case "Flamiaou":
                setSelectPokemon(`/QRCode/${pokemon}.png`);
                break;

            case "Gorythmic":
                setSelectPokemon(`/QRCode/${pokemon}.png`);

                break;
            case "Leopardus":
                setSelectPokemon(`/QRCode/${pokemon}.png`);

                break;
            case "Lougaroc":
                setSelectPokemon(`/QRCode/${pokemon}.png`);

                break;
            case "Mustebouee":
                setSelectPokemon(`/QRCode/${pokemon}.png`);

                break;
            case "Nemelios":
                setSelectPokemon(`/QRCode/${pokemon}.png`);

                break;
            case "Pandaspiegle":
                setSelectPokemon(`/QRCode/${pokemon}.png`);

                break;
            case "Phanpy":
                setSelectPokemon(`/QRCode/${pokemon}.png`);

                break;
            case "Poussacha":
                setSelectPokemon(`/QRCode/${pokemon}.png`);

                break;
            case "Rhinoferos":
                setSelectPokemon(`/QRCode/${pokemon}.png`);

                break;
            case "Ursaring":
                setSelectPokemon(`/QRCode/${pokemon}.png`);

                break;
            case "Wailmer":
                setSelectPokemon(`/QRCode/${pokemon}.png`);
                break;
            default:
                setSelectPokemon('');
        }
    }
    useEffect(() => {
        getPokemonImage(pokemon);
    }, [pokemon]);
    return (
        <div className='modal-container'>
            <div className="modal-content">
                <img src={selectPokemon} alt="" />
            </div>
        </div>
    );
}

export default Modal;
