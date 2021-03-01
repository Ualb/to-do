import { Fragment } from "react/cjs/react.production.min";
import { TextInput, Chip } from "react-materialize";


const Filter = () => {
    return (
        <Fragment className="scrolling">
            <div className="scrolling__container_3">
                <div className="scrolling__container__title"><h5>Filtrar Por</h5></div>
                <div className="title-filter">
                    <TextInput
                        id="TextInput-4"
                        label="Título"
                    />
                </div>
                <div className="tag-filter">
                    <Chip
                        close={false}
                        options={null}
                        className="chip"
                    >
                        familia
                    </Chip>
                    <Chip
                        close={false}
                        options={null}
                        className="chip"
                    >
                        restaurante
                    </Chip>
                    <Chip
                        close={false}
                        options={null}
                        className="chip"
                    >
                        viaje
                    </Chip>
                    <Chip
                        close={false}
                        options={null}
                        className="chip"
                    >
                        compras
                    </Chip>
                    <Chip
                        close={false}
                        options={null}
                        className="chip"
                    >
                        gym
                    </Chip>
                    <Chip
                        close={false}
                        options={null}
                        className="chip"
                    >
                        aprendizajes
                    </Chip>
                </div>
                <div className="state-filter">
                    <p>Estado</p>
                    <button className="custom-button">Hecho</button>
                    <button className="custom-button">Pendiente</button>
                </div>
            </div>
        </Fragment>
    )
}

export default Filter;