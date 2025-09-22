import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function useLoginToast() {
  const { pathname, state } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (state?.showLoginToast) {
      toast.success("Successfully logged in!");
      navigate(pathname, { replace: true });
    }
  }, [navigate, pathname, state?.showLoginToast]);
}

export default useLoginToast;
