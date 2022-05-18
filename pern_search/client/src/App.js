import { useState } from 'react';

function App() {
  const [name, setName] = useState('');
  const [users, setUsers] = useState([]);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length === 0) return;

    try {
      const response = await fetch(
        `http://localhost:5000/users/?name=${name}`,
        {
          method: 'GET',
          headers: { 'content-Type': 'application/json' },
        }
      );

      const parsedResponse = await response.json();

      console.log(parsedResponse);
      setUsers(parsedResponse);
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <div className="container text-center">
        <h1 className="my-5">Party List</h1>
        <form className="d-flex mx-auto w-50" onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control"
            onChange={handleChange}
            value={name}
            name="name"
            placeholder="Enter user"
          />
          <button className="btn btn-success">Submit</button>
        </form>

        <table className="table my-5 w-50 mx-auto">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => {
              return (
                <>
                  <tr key={user.user_id}>
                    <td>{user.first_name}</td>
                    <td>{user.last_name}</td>
                  </tr>
                </>
              );
            })}
          </tbody>
        </table>
        <h3>{users.length === 0 && 'No results found'}</h3>
      </div>
    </>
  );
}

export default App;
