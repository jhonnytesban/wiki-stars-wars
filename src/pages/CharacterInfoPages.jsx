import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import InfoCharacter from "../components/InfoCharacter";
import Spinner from "../components/Spinner";

const CharacterInfoPages = () => {
  const { id } = useParams();

  const [infoCharacter, setInfoCharacter] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetching = async () => {
      const res = await fetch(
        `https://gateway.marvel.com:443/v1/public/characters/${id}/comics?ts=1&apikey=e0c810e28c52ded9f0f495bb89bdab0e&hash=4d198f7702c7709fd1edcdae03375c96`
      );
      const dataRes = await res.json();
      const { results } = await dataRes.data;
      setInfoCharacter(results);
      setIsLoading(false);
      console.log(results);
    };
    fetching();
  }, []);

  return (
    <>
      <h1>Cómics relacionados con el personaje</h1>
      <div className="container-listcharacter">
        {isLoading ? (
          <Spinner />
        ) : (
          infoCharacter.map((info) => <InfoCharacter key={info.id} info={info} />)
        )}
      </div>
    </>
  );
};

export default CharacterInfoPages;
