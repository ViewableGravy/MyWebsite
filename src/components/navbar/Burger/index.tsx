import React from "react";

import './_Burger.scss';

type TBurgerToggle = React.FC<{
    active: boolean,
    setActive: (active: boolean) => void
}>

export const BurgerToggle: TBurgerToggle = ({ active, setActive }) => (
    <div className="Header__burger" onClick={() => setActive(!active)}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
);
