import "./LogoSelector.css";

import { logos }

from "./logosData";

const LogoSelector = ({

  selectedLogo,

  setSelectedLogo

}) => {

  return (

    <div className="logo-selector">

      <h3>

        Choose Logo

      </h3>

      <div className="logo-grid">

        {

          logos.map(

            (logo) => (

              <div

                key={logo.id}

                className={

                  selectedLogo ===

                  logo.image

                    ?

                    "logo-card active"

                    :

                    "logo-card"

                }

                onClick={() =>

                  setSelectedLogo(

                    logo.image

                  )

                }

              >

                <img

                  src={
                    logo.image
                  }

                  alt={
                    logo.name
                  }

                  className=
                  "logo-preview"

                />

              </div>

            )

          )

        }

      </div>

    </div>

  );

};

export default LogoSelector;