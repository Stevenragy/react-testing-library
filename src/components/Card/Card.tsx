import { FC, useState } from "react";
import heartFilled from "../../svgs/heartFilled.svg";
import heartOutlined from "../../svgs/heartOutlined.svg";
// import { PetsContext } from "../Pets/Pets";
import "./card.css";
import { CardProps } from "./types";

const Card: FC<CardProps> = (props) => {
    const { email, name, phone, image, favoured } = props;
    // const { cats, setCats } = useContext(PetsContext);
    const [isFavoured, setIsFavoured] = useState(favoured);

    // const updateFavourite = (index: number, favoured: boolean) => {
    //     // const updatedCats = [...cats];
    //     // updatedCats[index].favoured = favoured;
    //     // setCats(updatedCats);
    // };

    const toggleFavoured = () => {
        // updateFavourite(index, !isFavoured);
        setIsFavoured(!isFavoured);
    };

    return (
        <article className="card">
            <div className="card-header">
                <img src={image.url} alt={image.alt} className="card-img" />
                <button className="heart" onClick={toggleFavoured}>
                    {isFavoured ? <img src={heartFilled} alt="filled heart" /> : <img src={heartOutlined} alt="outlined heart" />}
                </button>
            </div>
            <div className="card-content">
                <h3>{name}</h3>
                <p>{phone}</p>
                <p>{email}</p>
            </div>
        </article>
    );
};

export default Card;