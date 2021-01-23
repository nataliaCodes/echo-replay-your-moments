import { useState, useEffect } from 'react';

import Button from '../shared/Button';
import TogglingEditForm from '../shared/TogglingEditForm';

export default function Moment(props) {

  const { cookies } = props;

  //state for the form toggled by 'Add moment'
  const [showForm, setShowForm] = useState(false);

  //state for the Add moment input
  const [newMom, setNewMom] = useState("");

  //state for the alert showing user they created the moment
  const [showAlert, setShowAlert] = useState(false);

  const handleSave = (newValue) => {

    setShowForm(false);
    setShowAlert(true);

    const userId = cookies.user;

    //send data to back-end
    // return axios.post('http://localhost:3001/api/categories', { newCateg, userId })
    //   .then(response => {

    //     const categ = [...state.categories, newCateg];
    //     setState(prev => ({...prev, categories: categ}))

    //   })
    //   .catch(err => { console.log('error:', err) })
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, 3500);
    return () => clearTimeout(timer);
  }, [showAlert]);

  return (
    <div className="Moment">
      <Button onClick={() => setShowForm(true)}>Add moment</Button>
      <br /><br />
      {showForm && (
        <TogglingEditForm
          placeholder="Insert moment name"
          name="new-moment"
          value={newMom}
          onMoments={true}
          onChange={(e) => setNewMom(e.target.value)}
          onSave={() => handleSave(newMom)}
          onCancel={() => setShowForm(false)}
        />
      )}
    </div>
  );
}