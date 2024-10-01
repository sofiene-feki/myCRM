import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { currentUser } from '../functions/user';
import { auth } from '../services/firebase';

const UserProvider = ({ children }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true); // add a loading state
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    // Check local storage for user state
    const userState = JSON.parse(localStorage.getItem('userState'));
    if (userState) {
      dispatch({
        type: 'LOGGED_IN_USER',
        payload: userState,
      });
      setLoading(false);
    } else {
      const unsubscribe = auth.onAuthStateChanged(async (user) => {
        if (user) {
          const idTokenResult = await user.getIdTokenResult();
          currentUser(idTokenResult.token)
            .then((res) => {
              console.log('rsssss', res.data);

              const userState = {
                email: res.data.email,
                name: res.data.name,
                token: idTokenResult.token,
                role: res.data.role,
                _id: res.data._id,
              };

              // Store user state in local storage
              localStorage.setItem('userState', JSON.stringify(userState));

              dispatch({
                type: 'LOGGED_IN_USER',
                payload: userState,
              });
            })
            .catch((err) => console.log('here the', err));
        } else {
          dispatch({
            type: 'LOGGED_OUT_USER',
          });
        }
        setLoading(false);
      });

      return unsubscribe;
    }
  }, [dispatch]);


  useEffect(() => {
    if (!user) {
      localStorage.removeItem('userState');
    } else {
      localStorage.setItem('userState', JSON.stringify(user));
    }
  }, [user]);
  

  if (loading) {
    return <div>Loading...</div>; // show loading message
  }

  return <>{children}</>;
};

export default UserProvider;
