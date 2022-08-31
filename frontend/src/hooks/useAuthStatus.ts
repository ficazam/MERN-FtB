import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";

export const useAuthStatus = () => {
  const [logged, setLogged] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);

  const { user } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (user) {
      setLogged(true);
    } else {
      setLogged(false);
    }

    setLoading(false);
  }, [user]);

  return { loading, logged };
};
