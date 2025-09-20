//Riya ekahne paste korish tor code ar components gulo component folder e
import { useEffect } from "react";
import { fetchIssues } from "../supabase/api/issues";

const HomePage = () => {
  useEffect(() => {
    async function getAllIssues() {
      const result = await fetchIssues({ category_id: 1 });
      if (!result.success) return console.log(result.error);
      console.log(result.data);
    }

    getAllIssues();
  }, []);
  return <div>HomePage💩</div>;
};

export default HomePage;
