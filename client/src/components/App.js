import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./NavBar";
import Login from "../pages/Login";
import NewExercise from "../pages/NewExercise";
import ExerciseList from "../pages/ExerciseList";
import NewLog from "../pages/NewLog";
import Show from "../pages/Show";
import LogList from "../pages/LogList";
import UpdateLog from "../pages/UpdateLog";


function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {  
    // auto-login
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setUser(user));
      }
    })
;  }, []);


  // Create log
  function handleCreateLog(log) {
    setUser((prevUser) => {
      const newLogs = [...prevUser.logs, log];
      const updatedExercises = prevUser.exercises.map((exercise) => {
        if (exercise.id == log.exercise.id) {
          return {
            ...exercise,
            logs: [...exercise.logs, log],
          };
        } else {
          return exercise;
        }
      });
      return {
        ...prevUser,
        logs: newLogs,
        exercises: updatedExercises,
      };
    });
  }

  // Update log
  function handleUpdateLog(updatedLog) {
    setUser((prevUser) => {
      const updatedLogs = prevUser.logs.map((log) => {
        if (log.id == updatedLog.id) {
          return updatedLog;
        } else {
          return log;
        }
      });
      const updatedExercises = prevUser.exercises.map((exercise) => {
        if (exercise.id == updatedLog.exercise.id) {
          const updatedExerciseLogs = exercise.logs.map((log) => {
            if (log.id == updatedLog.id) {
              return updatedLog;
            } else {
              return log;
            }
          });
          return {
            ...exercise,
            logs: updatedExerciseLogs,
          };
        } else {
          return exercise;
        }
      });

      return {
        ...prevUser,
        logs: updatedLogs,
        exercises: updatedExercises,
      };
    });
  }

  // Delete log
  function handleDeleteLog(logId) {
    setUser((prevUser) => {
      const updatedLogs = prevUser.logs.filter((log) => log.id !== logId);
      const updatedExercises = prevUser.exercises.map((exercise) => {
        const updatedExerciseLogs = exercise.logs.filter((log) => log.id !== logId);
        return {
          ...exercise,
          logs: updatedExerciseLogs,
        };
      });
      return {
        ...prevUser,
        logs: updatedLogs,
        exercises: updatedExercises,
      };
    });
  }

  if (!user) return <Login onLogin={setUser} />;

  return (
    <>
      <NavBar user={user} setUser={setUser} />
      <main>
        <Routes>
          <Route path="/new_exercise" element={<NewExercise user={user} setUser={setUser}/>}>
          </Route>

          <Route path="/exercises" element={<ExerciseList user={user} />}>
          </Route>

          <Route path="/exercises/:id" element={<Show user={user} setUser={setUser}/>}>   
          </Route>

          <Route path="/new_logs" element={<NewLog user={user} onCreateLog={handleCreateLog} />}>  
          </Route>

          <Route path="/update_log/:id"  element={<UpdateLog user={user} onUpdateLog={handleUpdateLog} />}>          
          </Route>

          <Route path="/history" element={<LogList user={user} setUser={setUser} onDelete={handleDeleteLog}/>}>           
          </Route>

          <Route path="/" element={<LogList user={user} />}>         
          </Route>
        </Routes>
      </main>
    </>
  );
}

export default App;