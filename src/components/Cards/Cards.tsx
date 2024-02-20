// import { useContext } from "react";
import { FC } from "react";
import Card from "../Card/Card";
// import { PetsContext } from "../Pets/Pets";
import "./Cards.css";
import { CardsProps } from "./types";

const Cards: FC<CardsProps> = (props) => {
    const { cats } = props;
    // const { cats } = useContext(PetsContext);

    return (
        <div className="pet-cards-container">
            {cats.map((cat, index) => {
                const { color, email, favoured, gender, image, name, phone, id } = cat;
                return (
                    <Card
                        key={id}
                        name={name}
                        phone={phone}
                        email={email}
                        image={image}
                        favoured={favoured}
                        index={index}
                        color={color}
                        gender={gender}
                    />
                );
            })}
        </div>
    );
};

export default Cards;
