import React, { useEffect, useState } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data);
      console.log(response.data)
    });
  }, []);

  async function handleAddRepository() {
    const repo = {
      title: `Desafio Bootcamp ${Date.now()}`,
	    url: "http://github.com/...",
	    techs: ["Node.js", "ReactJS"]
    }
    const addRepository = await api.post('/repositories', repo);
    setRepositories([...repositories, addRepository.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const newRepositories = repositories.filter(repository => repository.id !== id);
    setRepositories(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
           <li key={repository.id}>
            {repository.title}
  
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
