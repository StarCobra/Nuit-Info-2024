import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import PropTypes from 'prop-types';

const generateRandomPosition = (boatPosition) => {
    const offset = 100; // Zone de spawn autour du bateau
    return {
        x: boatPosition.x + (Math.random() * offset * 2 - offset),
        y: 0,
        z: boatPosition.z + (Math.random() * offset * 2 - offset),
    };
};

const Collectible = ({ position, onCollect }) => {
    const handleClick = () => {
        onCollect(); // Notifie que le collectible a été collecté
    };

    return (
        <mesh onClick={handleClick} position={position}>
            <boxGeometry />
            <meshStandardMaterial color="red" />
        </mesh>
    );
};

const CollectiblesManager = ({ boatRef }) => {
    const [collectibles, setCollectibles] = useState([]);
    const maxCollectibles = 3;

    useFrame(() => {
        if (!boatRef.current) return;
        const boatPosition = boatRef.current.position;

        if (collectibles.length < maxCollectibles) {
            const newCollectibles = [];
            for (let i = collectibles.length; i < maxCollectibles; i++) {
                const position = generateRandomPosition(boatPosition);
                newCollectibles.push({ id: i, position });
            }
            setCollectibles((prev) => [...prev, ...newCollectibles]);
        }
    });

    const collectCollectible = (id) => {
        setCollectibles((prev) =>
            prev.filter((collectible) => collectible.id !== id)
        );

        if (boatRef.current) {
            const boatPosition = boatRef.current.position;
            const newPosition = generateRandomPosition(boatPosition);
            setCollectibles((prev) => [
                ...prev,
                { id: prev.length, position: newPosition },
            ]);
        }
    };

    return (
        <>
            {collectibles.map((collectible) => (
                <Collectible
                    key={collectible.id}
                    position={[
                        collectible.position.x,
                        collectible.position.y,
                        collectible.position.z,
                    ]}
                    onCollect={() => collectCollectible(collectible.id)}
                />
            ))}
        </>
    );
};

CollectiblesManager.propTypes = {
    boatRef: PropTypes.shape({
        current: PropTypes.object,
    }).isRequired,
};

Collectible.propTypes = {
    position: PropTypes.arrayOf(PropTypes.number).isRequired,
    onCollect: PropTypes.func.isRequired,
};

export default CollectiblesManager;

