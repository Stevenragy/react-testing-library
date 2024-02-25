import "./Pets.css";
import Filter from "../Filter/Filter";
import Cards from "../Cards/Cards";

import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const PetsContext = createContext({
    cats: [],
    setCats: () => {},
});

const Pets = () => {
    const [cats, setCats] = useState([]);
    // const [filteredCats, setFilteredCats] = useState([]);
    // const [filters, setFilters] = useState({
    //     gender: "any",
    //     favoured: "any",
    // });

    const fetchCats = async () => {
        const response = await axios.get("http://localhost:4000/cats");
        setCats(response.data);
        // setFilteredCats(response.data);
    };

    useEffect(() => {
        fetchCats();
    }, []);

    // useEffect(() => {
    //     let catsFiltered = [...cats];
    //     if (filters.gender !== "any") {
    //         catsFiltered = catsFiltered.filter((cat) => cat.gender === filters.gender);
    //     }
    //     if (filters.favoured !== "any") {
    //         catsFiltered = catsFiltered.filter((cat) => {
    //             console.log(cat.favoured, filters.favoured, cat.favoured === filters.favoured);
    //             return cat.favoured === (filters.favoured === "favoured" ? true : false);
    //         });
    //     }
    //     setFilteredCats(catsFiltered);
    // }, [filters]);

    return (
        <div className="container">
            <div className="app-container">
                {/* <PetsContext.Provider value={{ cats: filteredCats, setCats }}> */}
                {/* <Filter filters={filters} setFilters={setFilters} /> */}
                <Filter />
                <Cards cats={cats} />
                {/* </PetsContext.Provider> */}
            </div>
        </div>
    );
};

export default Pets;
