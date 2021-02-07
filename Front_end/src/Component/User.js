import React from "react";


class User extends React.Component
{
        constructor(props) 
        {
                super(props);
        };

        render()
        {
          return (
                <div className="App">
                  <header className="App-header">
                    <p>
                      User page.
                    </p>
                  </header>
                </div>
              );
        }
}

export default User;
