import {
  useState,
  type ChangeEvent,
} from 'react'
import './App.css'
interface Project {
  id: number
  name: string
  author: string
  status: string
}
const projects: Project[] = [
  {
    id: 1,
    name: "Code2Work Dashboard",
    author: "Ala",
    status: "En cours"
  },
  {
    id: 2,
    name: "Application E-commerce",
    author: "Ahmed",
    status: "Terminé"
  },
  {
    id: 3,
    name: "AI Chatbot",
    author: "Sarah",
    status: "En attente"
  },
  {
    id: 4,
    name: "Gestion des stocks",
    author: "Mohamed",
    status: "En cours"
  }
]
function App() {
  const projectName = "Code2Work Dashboard"
  const currentYear = new Date().getFullYear()
  const firstName = "Ala"
  const isLoggedIn = true
  const currentDate = new Date().toLocaleDateString('fr-FR')
  const notificationCount = 5
  const [completedTasks, setCompletedTasks] = useState<number>(0)
  const [userName, setUserName] = useState<string>("Ala")
  const [score, setScore] = useState<number>(0)
  const [formName, setFormName] = useState<string>("")
  const [formEmail, setFormEmail] = useState<string>("")
  const [formMessage, setFormMessage] = useState<string>("")

  const handleNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUserName(event.target.value)
  }

  const handleFormNameChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setFormName(event.target.value)
  }

  const handleFormEmailChange = (
    event: ChangeEvent<HTMLInputElement>
  ): void => {
    setFormEmail(event.target.value)
  }

  const handleFormMessageChange = (
    event: ChangeEvent<HTMLTextAreaElement>
  ): void => {
    setFormMessage(event.target.value)
  }

  const handleSubmit = (event: React.SyntheticEvent<HTMLFormElement>): void => {
    event.preventDefault()

    console.log("Formulaire envoyé :", {
      name: formName,
      email: formEmail,
      message: formMessage
    })
  }
  const handleCompleteTask = (): void => {
    setCompletedTasks((prevCount) => prevCount + 1)
  }

  const handleIncreaseScore = (): void => {
    setScore((previousScore) => previousScore + 1)
  }

  const handleResetName = (): void => {
    setUserName("Ala")
  }

  return (
    <div>
      <h1>Welcome to {projectName}</h1>
      <p>React app successfully running in {currentYear} 🎉</p>
      {isLoggedIn ? (
        <h1>Bienvenue {firstName} !</h1>
      ) : (
        <h1>Veuillez vous connecter pour continuer</h1>
      )}

      <p>Nous sommes le {currentDate}</p>

      <p>
        Vous avez {notificationCount} nouvelles notifications
      </p>
      <div>
        <h1>Mes projets récents</h1>
        {projects.map((project) => (
          <div key={project.id}>
            <h2>{project.name}</h2>
            <p>Auteur : {project.author}</p>
            <p>Statut : {project.status}</p>
          </div>
        ))}
      </div>

      <div>
        <h1>Tableau de bord</h1>

        <h2>Bienvenue {userName} !</h2>

        <div>
          <label htmlFor="userName">Modifier votre nom :</label>

          <input
            id="userName"
            type="text"
            value={userName}
            onChange={handleNameChange}
            placeholder="Entrez votre nom"
          />

          <button onClick={handleResetName}>
            Réinitialiser le nom
          </button>
        </div>
      </div>

      {/* <div>
        <h1>Tableau de bord</h1>
        <h2>Bienvenue {userName} !</h2>
        <div>
          <label>Modifier votre nom :</label>
          <input
            type="text"
            value={userName}
            onChange={handleNameChange}
            placeholder="Entrez votre nom"
          />
        </div>
      </div> */}
      <div>
        <h1>Gestion des tâches</h1>
        <p>
          Tâches complétées : {completedTasks}
        </p>

        <button onClick={handleCompleteTask}>
          Compléter une tâche
        </button>
      </div>
      <div>
        <h1>Mon compteur de score</h1>

        <p>Votre score actuel est : <strong>{score}</strong></p>

        <button onClick={handleIncreaseScore}>
          Augmenter le score
        </button>
      </div>
      <div>
        <h1>Formulaire de contact</h1>

        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="formName">Nom :</label>
            <input
              id="formName"
              type="text"
              value={formName}
              onChange={handleFormNameChange}
              placeholder="Entrez votre nom"
            />
          </div>

          <div>
            <label htmlFor="formEmail">Adresse e-mail :</label>
            <input
              id="formEmail"
              type="email"
              value={formEmail}
              onChange={handleFormEmailChange}
              placeholder="Entrez votre adresse e-mail"
            />
          </div>

          <div>
            <label htmlFor="formMessage">Message :</label>
            <textarea
              id="formMessage"
              value={formMessage}
              onChange={handleFormMessageChange}
              placeholder="Écrivez votre message"
              rows={5}
            />
          </div>

          <button type="submit">Envoyer</button>
        </form>

        <h2>Aperçu en temps réel</h2>

        <p>Nom : {formName || "Non renseigné"}</p>
        <p>E-mail : {formEmail || "Non renseigné"}</p>
        <p>Message : {formMessage || "Aucun message"}</p>
      </div>


    </div>
  )
}

export default App