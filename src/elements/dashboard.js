
import { Row, NavItem, Col, Navbar, Container, Icon } from "react-materialize";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";


const DashBoard = () => {
    return (
        <>
            {!localStorage.getItem('user') ?
                <Redirect to="/" />
                :
                <>
                    <div>
                        <Icon>
                            person
                        </Icon>
                    </div>
                </>
            }

        </>
    );
}

export default DashBoard;