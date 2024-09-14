import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort(
    (evtA, evtB) => (new Date(evtA.date) < new Date(evtB.date) ? +1 : 1) // Affichage des événements du plus ancien au plus récent
  );

  const nextCard = () => {
    setIndex((prevIndex) =>
      prevIndex < byDateDesc.length - 1 ? prevIndex + 1 : 0
    );
  };

  useEffect(() => {
    const timer = setInterval(nextCard, 5000);
    return () => clearInterval(timer); // nettoyer l'intervalle
  }, [byDateDesc.length]); // re éxécuter l'effet si la longueur du tableau change
  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, idx) => (
        <div
          key={event.id}
          className={`SlideCard SlideCard--${
            index === idx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc.map((event, radioIdx) => (
            <input
              key={event.id}
              type="radio"
              name="pagination"
              checked={index === radioIdx} // coche le bullet point si son index correspond à celui de la diapo actuelle
              onChange={() => setIndex(radioIdx)} // Met à jour l'état quand le bullet point est cliqué
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
